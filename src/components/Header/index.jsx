import { Container } from './styles';
import { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom';
import { MdKeyboardBackspace } from "react-icons/md";
import { FiLogOut } from "react-icons/fi";
import firebase from '../../services/firebaseConnection';
import logo from '../../assets/logo.svg';

export function Header() {
    const history = useHistory();
    const userIdLogged = localStorage.getItem('userStorage');
    const [photo, setPhoto] = useState('');
    const [name, setName] = useState('');

    async function isUserLogged() {
        const user = await firebase.firestore().collection('user').doc(userIdLogged).get()
            .then((snapshot) => {
                const { photoURL, displayName } = snapshot.data();
                setName(displayName);
                setPhoto(photoURL);
            })

        if (!user) {
            return;
        }
    }

    function handleLogout() {
        localStorage.removeItem('userStorage');
        history.push('/')
    }

    function handleViewProfile() {
        history.push(`/offer-service/${userIdLogged}`)
    }

    useEffect(() => {
        if (userIdLogged)
            isUserLogged();
        else return;

    })


    return (
        <Container>
            <Link to='/'>
                <MdKeyboardBackspace size={25} color="#fff" />
            </Link>
            <div>
                {name ? (
                    <small>{name}</small>
                ) : null}
                <button onClick={handleViewProfile}>
                    <img src={photo ? photo : logo} className={photo ? 'userAvatar' : 'logo'} alt="logo" />
                </button>
                {userIdLogged ?
                    <button onClick={handleLogout} className="logout">
                        <FiLogOut size={20} />
                    </button> : null}
            </div>

        </Container>

    )
}