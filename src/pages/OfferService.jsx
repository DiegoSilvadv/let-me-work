import { Container } from '../styles/offerService';
import { useState, useEffect } from 'react';
import firebase from '../services/firebaseConnection';
import { useParams, useHistory } from 'react-router-dom';
import { Header } from '../components/Header';
import Footer from '../components/Footer'
import { FiUpload } from 'react-icons/fi';



export function OfferService() {
    const history = useHistory();
    const { id } = useParams();
    const [displayName, setDisplayName] = useState('');
    const [occupation, setOccupation] = useState('Pedreiro');
    const [city, setCity] = useState('');
    const [description, setDescription] = useState('');
    const [phone, setPhone] = useState('');
    const [dayPrice, setDayPrice] = useState('');
    const [photoURL, setPhotoURL] = useState('');

    const [occupations, setOccupations] = useState([]);
    const [imageAvatarUrl, setImageAvatarUrl] = useState(null);
    const [avatarUrl, setAvatarUrl] = useState(photoURL && photoURL);

    useEffect(() => {

        if (id) {
            firebase.firestore().collection('user').doc(id)
                .get()
                .then(async (doc) => {

                    if (doc.exists) {
                        const { displayName, occupationId, city, description, phoneNumber, dayPrice, photoURL } = doc.data();

                        setDisplayName(displayName);
                        setOccupation(occupationId);
                        setCity(city);
                        setDescription(description);
                        setPhone(phoneNumber);
                        setDayPrice(dayPrice);
                        setPhotoURL(photoURL);
                    }

                })
            getOccupations();

        }

    }, [])

    async function handleEditUser(e) {
        e.preventDefault();
        if (displayName === ''
            || city === '' || description === '' ||
            phone === '' || dayPrice === ''
        ) {
            alert('Preencha todas suas informações.')
        }
        else if (displayName !== '' && imageAvatarUrl !== null) {
            handlUploadImage()
        } 
        else {

            await firebase.firestore().collection('user').doc(id).update({
                city: city,
                dayPrice: dayPrice,
                description: description,
                displayName: displayName,
                occupation: occupation,
                phoneNumber: phone
            }).then(() => {
                alert("Ok, agora você tem mais chances de ser encontrado")
                history.push('/works')
            })
        }

    }

    async function getOccupations() {

        const data = [];
        await firebase.firestore().collection('occupations')
            .get()
            .then((snapshot) => {
                snapshot.forEach((doc) => {
                    data.push({
                        occupationName: doc.data().occupation,
                    })

                })
                setOccupations(data);
            })
    }

    function handleChangeFile(e) {
        if(e.target.files[0]){
            const image = e.target.files[0];

            if(image.type === 'image/jpeg' || image.type === 'image/png'){
                setImageAvatarUrl(image)
                setAvatarUrl(URL.createObjectURL(e.target.files[0]))
                alert(avatarUrl)
            }else {
                alert('Envie uma imagem do tipo PNG ou JPEG');
                setImageAvatarUrl(null);
                return null;
            }
        }
    }

    async function handlUploadImage() {
        const currentId = id;
        alert(currentId)
        await firebase.storage()
            .ref(`images/${currentId}/${imageAvatarUrl.name}`)
            .put(imageAvatarUrl)
            .then( async () => {
                await firebase.storage()
                    .ref(`images/${currentId}`)
                    .child(imageAvatarUrl.name).getDownloadURL()
                    .then( async (url) => {
                        let urlPhoto = url;
                        await firebase.firestore().collection('user')
                            .doc(currentId)
                            .update({
                                photoURL: urlPhoto,
                            })
                            .then( () => {
                                alert("ok")
                            })
                    })

            })
    }


    return (
        <>
            <Container>
                <Header />
                <div>
                    <h3>Que Incrivel que voce quer oferecer seus serviços</h3>
                    <p>Primeiro passa é preencher esse formulario de inscrição</p>
                </div>
                <form onSubmit={handleEditUser}>
                    <label className="avatar">
                        <span>
                            <FiUpload color="#fff" size={25} />
                        </span>
                        <input type="file" accept="image/*" onChange={handleChangeFile}/> <br />
                        <img src={photoURL} alt="avatar" />
                    </label>

                    <label>Nome</label>
                    <input
                        type="text"
                        value={displayName}
                        onChange={(e) => setDisplayName(e.target.value)}
                    />
                    <label>Ramo de atividade</label>
                    <select name="cars" id="cars" onChange={(e) => setOccupation(e.target.value)}>
                        {occupations.map((occupation) =>
                            (<option value={occupation.id} >{occupation.occupationName}</option>)
                        )}
                    </select>
                    <label>Cidade</label>
                    <input
                        type="text"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                    />
                    <label>Descrição</label>
                    <textarea
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    <label>Telefone <small>(WhatsApp)</small></label>
                    <input
                        type="text"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                    />
                    <label>Preço/dia</label>
                    <input
                        type="number"
                        value={dayPrice}
                        onChange={(e) => setDayPrice(e.target.value)}
                    />
                    <button type="submit">Salvar</button>
                </form>

            </Container>
            <Footer />
        </>

    )
}