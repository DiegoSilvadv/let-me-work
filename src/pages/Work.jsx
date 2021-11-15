import { Container, SeachContainer, AvatarInfo } from '../styles/work.js';
import { useState, useEffect } from 'react'
import { Header } from '../components/Header';
import { BsWhatsapp } from 'react-icons/bs';
import { FiSearch } from 'react-icons/fi';

import firebase from '../services/firebaseConnection'

export function Work() {


    const [users, setUsers] = useState([]);
    const [metier, setMetier] = useState('');

    async function LoadUsers() {
        await firebase.firestore().collection('user').get()
            .then((snapshot) => {
                const data = [];
                snapshot.forEach((doc) => {
                    data.push({
                        photoURL: doc.data().photoURL,
                        displayName: doc.data().displayName,
                        price: doc.data().dayPrice,
                        metier: doc.data().metier,
                        city: doc.data().city,
                        description: doc.data().description,
                        phone: doc.data().phoneNumber,
                    })

                console.log(data.phoneNumber)

                })
                setUsers(data);
            })
    }

    async function handlSeachUser() {

        if(metier === ''){
            LoadUsers();
        } else {
            await firebase.firestore().collection('user').orderBy('metier').startAt(metier).endAt(metier).get()
            .then((snapshot) => {
                const data = [];
                snapshot.forEach((doc) => {
                    data.push({
                        photoURL: doc.data().photoURL,
                        displayName: doc.data().displayName,
                        price: doc.data().dayPrice,
                        metier: doc.data().metier,
                        city: doc.data().city,
                        description: doc.data().description,
                        phone: doc.data().phoneNumber,

                    })
                })
                console.log(snapshot)
                setUsers(data);
            })
        } 
    }

    useEffect(() => {

        LoadUsers();
    }, []);

    return (
        <Container>
            <Header />
            <h3>Estes são <br />os Profissionais disponíveis.</h3>

            <main>
                <SeachContainer>
                    <div>
                        <input
                            type="text"
                            placeholder="Ramo"
                            value={metier}
                            onChange={(e) => setMetier(e.target.value)}
                        />
                        <button onClick={handlSeachUser}>
                            <FiSearch size={20} color="#fff"/>
                        </button>
                    </div>
                </SeachContainer>

                {
                    users.map((user) => {
                        return (
                            <AvatarInfo key={user.uid}>
                                <header>
                                    <img src={user.photoURL} alt="avatar" />
                                    <strong>{user.displayName}</strong>
                                    <small>{user.metier}</small>
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
                    })
                }

            </main>
        </Container>
    )
}