import { Container } from '../styles/home.js';
import { useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import Logo from '../assets/logo.svg';
import firebase from '../services/firebaseConnection';

export function Home() {
    const history = useHistory();
    const userIdLogged = localStorage.getItem('userStorage');

    async function ShowPopUpGoogle() {
        const provider = new firebase.auth.GoogleAuthProvider();
        const result = await firebase.auth().signInWithPopup(provider);

        if (result.user) {
            const { uid, displayName, photoURL, phoneNumber } = result.user;

            await firebase.firestore().collection('user').doc(uid)
                .get()
                .then(async (doc) => {

                    if (doc.exists) {
                        alert("Bem vindo de Volta")
                        history.push(`/offer-service/${uid}`);
                        localStorage.setItem('userStorage', uid);
                    }
                    else {
                        await firebase.firestore().collection('user').doc(uid).set({
                            displayName: displayName,
                            photoURL: photoURL,
                            phoneNumber: phoneNumber,
                            occupation: '',
                            dayPrice: 0,
                            city: '',
                            description: '',
                        }).then(() => {
                            alert("Parabens por se cadastrar")
                            localStorage.setItem('userStorage', uid);
                        })
                    }
                })
        }
    }

    useEffect(() => {
        if(userIdLogged){
            history.push('/works')
        }
    })
    
    function handlSingIn(e) {
        e.preventDefault();
        ShowPopUpGoogle();
    }

    return (
        <Container>
            <section>
                <img src={Logo} alt="Logo" />
                <p>Sua plataforrma de serviços</p>

                <button id="pay-services" onClick={handlSingIn}>
                    <FcGoogle size={30} />Oferecer Seviço
                </button>
                <button>
                    <Link to="/works">Contratar serviço</Link>
                </button>
            </section>
        </Container>
    )
}