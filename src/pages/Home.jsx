import { Container } from '../styles/home.js';
import { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import Logo from '../assets/logo.svg';
import firebase from '../services/firebaseConnection';
import { toast } from 'react-toastify';
import {ThemeProvider} from "styled-components";
import { GlobalStyles } from '../styles/global'
import { lightTheme, darkTheme } from "../components/Theme"



export function Home() {
    const history = useHistory();
    const userIdLogged = localStorage.getItem('userStorage');
    const [isLoading, setIsLoading] = useState(false);
    const [theme, setTheme] = useState('light');

    const themeToggler = () => {
      theme === 'light' ? setTheme('dark') : setTheme('light')
    }

    async function ShowPopUpGoogle() {
        const provider = new firebase.auth.GoogleAuthProvider()
        const result = await firebase.auth().signInWithPopup(provider);

        if (result.user) {
            const { uid, displayName, photoURL, phoneNumber } = result.user;

            await firebase.firestore().collection('user').doc(uid)
                .get()
                .then(async (doc) => {

                    if (doc.exists) {
                        toast.success("Bem vindo de Volta")
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
                            toast.success("Parabens por se cadastrar")
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
    }, [userIdLogged])
    
    async function handlSingIn(e) {
        e.preventDefault();
        setIsLoading(true);
    
        await ShowPopUpGoogle();
        setIsLoading(false);
    }

    return (
        <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
            <GlobalStyles />
        <Container>
            <button onClick={themeToggler}>Switch Theme</button>
            <section>
                <img src={Logo} alt="Logo" />
                <p>Sua plataforma de serviços</p>

                <button id="pay-services" onClick={handlSingIn}>
                    <FcGoogle size={30} />{ isLoading ? 'Carregando...': 'Oferecer Seviço'  }
                </button>
                <Link to="/works" id="check-works">Contratar serviço</Link>
                
            </section>
        </Container>
        </ThemeProvider>
    )
}