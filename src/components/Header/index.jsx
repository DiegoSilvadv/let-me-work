import { Container } from './styles';
import { useEffect, useState, Redirect } from 'react'
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { MdKeyboardBackspace } from "react-icons/md";
import { FiLogOut } from "react-icons/fi";
import firebase from '../../services/firebaseConnection';
import logo from '../../assets/logo.svg';
import { toast } from 'react-toastify';
import { useUser } from '../../hooks/useUser';


export function Header() {

    const userIdLogged = localStorage.getItem('userStorage');
    const [photo, setPhoto] = useState('');
    const [name, setName] = useState('');

    const history = useHistory();

    const handleLogout = () => {
        localStorage.removeItem('userStorage');
        toast.success("Até logo!")
        history.push(`/`)
    }

    function handleViewProfile() {
        if (userIdLogged)
            history.push(`/offer-service/${userIdLogged}`)

    }

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

    useEffect(() => {
        if (userIdLogged)
            isUserLogged();

        console.log(userIdLogged)
    }, [userIdLogged])


    return (
        <Container>

            {userIdLogged ? null : (
                <Link to='/'>
                    <MdKeyboardBackspace size={25} color="#fff" />
                </Link>
            )}

            <div>
                {name ? (
                    <small>{name}</small>
                ) : null}


                {photo ? (
                    <button onClick={() => handleViewProfile()}>
                        <img src={photo} className="userAvatar" alt="Avatar" />
                    </button>
                ) : (
                    <Link to="/">
                        <img src={logo} className={'logo'} alt="Logo" />
                    </Link>
                )}

                {userIdLogged ?
                    <button onClick={handleLogout} className="logout">
                        <FiLogOut size={20} />
                    </button> : null}
            </div>
        </Container>

    )
}