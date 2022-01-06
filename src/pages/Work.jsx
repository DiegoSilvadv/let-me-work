import { Container, SeachContainer, AvatarInfo } from '../styles/work.js';
import { useState, useEffect } from 'react'
import { Header } from '../components/Header';
import { BsWhatsapp } from 'react-icons/bs';

import firebase from '../services/firebaseConnection'

export function Work() {


    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState('Todos');
    const [occupations, setOccupations] = useState([]);

    async function LoadUsers() {
        await firebase.firestore().collection('user').get()
            .then((snapshot) => {
                const data = [];
                snapshot.forEach((doc) => {
                    data.push({
                        photoURL: doc.data().photoURL,
                        displayName: doc.data().displayName,
                        price: doc.data().dayPrice,
                        occupation: doc.data().occupation,
                        city: doc.data().city,
                        description: doc.data().description,
                        phone: doc.data().phoneNumber,
                    })

                    console.log(data.phoneNumber)

                })
                setUsers(data);
            })
    }

    async function getOccupations() {

        const data = [];
        await firebase.firestore().collection('occupations').orderBy('occupation', 'desc')
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

    async function searchUserByOccupation() {

        if (search === "Todos") {
            LoadUsers()
        } else {
            await firebase.firestore().collection('user').where("occupation", "==", search)
                .get()
                .then((snapshot) => {
                    const data = [];
                    snapshot.forEach((doc) => {
                        data.push({
                            photoURL: doc.data().photoURL,
                            displayName: doc.data().displayName,
                            price: doc.data().dayPrice,
                            occupation: doc.data().occupation,
                            city: doc.data().city,
                            description: doc.data().description,
                            phone: doc.data().phoneNumber,
                        })
                        console.log(data)
                    })
                    setUsers(data);
                })

            console.log(users)
        }


    }

    useEffect(() => {
        LoadUsers();
        getOccupations();
        searchUserByOccupation()
    }, [search]);

    return (
    
            <Container>
                <Header />
                <h3>Estes são <br />os Profissionais disponíveis.</h3>

                <main>
                    <SeachContainer>
                        <div>
                            <label for="occupations">Consulte por ramo de atividade:</label>
                            <select name="occupations" id="occupations" onChange={(e) => setSearch(e.target.value)}>
                                {occupations.map((occupation) => (<option value={occupation.id} >{occupation.occupationName}</option>))}
                            </select>
                        </div>
                    </SeachContainer>

                    {users.length <= 0 ? <p id="unsuccessfulSearch">😒Sem dados para mostrar...😒</p> : (
                        users.map((user) => {
                            return (
                                <AvatarInfo key={user.uid}>
                                    <header>
                                        <img src={user.photoURL} alt="avatar" />
                                        <strong>{user.displayName}</strong>
                                        <small>{user.occupation}</small>
                                        <small>{user.city}</small>
                                    </header>
                                    <p>{user.description ? user.description : "Nenhuma descrição..."}</p>

                                    <footer>
                                        <small>Preço/Dia R$ {user.price},00</small>
                                        <a href={`https://api.whatsapp.com/send?phone=55${user.phone}&text=Ol%C3%A1%20vim%20pelo%20aplicativo%20LetMeWork%2C%20gostaria%20de%20um%20or%C3%A7amento%2C%20por%20favor!`}>
                                            <BsWhatsapp size={18} /> Entrar em contato
                                        </a>
                                    </footer>
                                </AvatarInfo>
                            )
                        }
                        )

                    )}

                </main>
            </Container>
    )
}


