import { Container } from '../styles/offerService';
import { useState, useEffect } from 'react';
import firebase from '../services/firebaseConnection';
import { useParams, useHistory } from 'react-router-dom';
import { Header } from '../components/Header';
export function OfferService() {
    const history = useHistory();
    const { id } = useParams();
    const [displayName, setDisplayName] = useState('');
    const [metier, setMetier] = useState('');
    const [city, setCity] = useState('');
    const [description, setDescription] = useState('');
    const [phone, setPhone] = useState('');
    const [dayPrice, setDayPrice] = useState('');
    const [photoURL, setPhotoURL] = useState('');

    useEffect(() => {
        if (id) {
            firebase.firestore().collection('user').doc(id)
                .get()
                .then(async (doc) => {

                    if (doc.exists) {
                        const { displayName, metier, city, description, phoneNumber, dayPrice, photoURL } = doc.data();

                        setDisplayName(displayName);
                        setMetier(metier);
                        setCity(city);
                        setDescription(description);
                        setPhone(phoneNumber);
                        setDayPrice(dayPrice);
                        setPhotoURL(photoURL);
                    }

                })
        }
    })
    async function handleEditUser(e) {
        e.preventDefault();
        if (displayName === '' || metier === ''
            || city === '' || description === '' ||
            phone === '' || dayPrice === ''
        ) {
            alert('Preencha todas suas informações.')
        } else {
            await firebase.firestore().collection('user').doc(id).update({
                city: city,
                dayPrice: dayPrice,
                description: description,
                displayName: displayName,
                metier: metier,
                phoneNumber: phone
            }).then(() => {
                alert("Ok, agora você tem mais chances de ser encontrado")
                history.push('/works')
            })
        }

    }


    return (
        <Container>
            <Header />
            <div>
                <h3>Que Incrivel que voce quer oferecer seus serviços</h3>
                <p>Primeiro passa é preencher esse formulario de inscrição</p>
            </div>
            <form onSubmit={handleEditUser}>
                <img src={photoURL} alt="avatar"/>
                <label>Nome</label>
                <input
                    type="text"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                />
                <label>Ramo de atividade</label>
                <input
                    type="text"
                    value={metier}
                    onChange={(e) => setMetier(e.target.value)}
                />
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
    )
}