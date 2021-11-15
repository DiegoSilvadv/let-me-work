import styled from 'styled-components'

export const Container = styled.header`
    width: 100%;
    height: 250px;

    background-color: #5429CC;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    flex-direction: row;
    padding-top: 1rem;

    a {
        color: #fff;
        text-decoration: none;
        margin: 0 0.9rem;
    }

    

    div {
        width: 100%;
        display: flex;
        justify-content: flex-end;
        align-items: center;

        small {
            margin-right: 1rem;
            margin-left: auto;
        }

        .userAvatar {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            margin-right: 2rem;        
        }

        .logo {
            height: 25px;
            margin-right: 1rem;
        }
        button {
            background: none;
            border: none;
        }

        .logout {
            background: none;
            border: none;
            margin-left:auto;
            margin-right: 1rem;
            svg {
                color: #fff;
            }
        }
    }


`