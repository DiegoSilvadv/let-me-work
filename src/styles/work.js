import styled from 'styled-components'

export const Container = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    h3 {
        width: 90%;
        margin-top: -10rem;
        margin-bottom: 3rem;
        
    }
    main {
        width: 90%;
    }

    #unsuccessfulSearch {
            width: 100%;
            height: 100%;
            margin-top: 200px;
            display: flex;
            justify-content: center;
            align-items: center;

            color: black;
        }


`

export const SeachContainer = styled.section`
    width: 100%;    
    display: flex;
    flex-direction: column;

   
    div {
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;

        margin: 0 auto;
        max-width: 350px;

        label {
            flex-direction: column;
            padding: 1rem 0;
         }

        select {
            width: 100%;
            padding: 0.5rem;
            height: 40px;
            margin: 0 0.1rem;
            border-radius: 0.2rem;
            border: none;
            background-color: white;
            box-shadow: 0 0 1rem rgba(0, 0, 0, 0.3);
        }

        button {
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: row;
            padding: 0.5rem;
            height: 40px;
            margin: 0 0.1rem;
            border-radius: 0.2rem;
            border: none;

            background-color: #34af23;
        }

    }
`

export const AvatarInfo = styled.section`
    width: 100%;
    background-color: #fff;
    border-radius: 0.3rem;
    color: grey;
    margin: 1.5rem 0;
    box-shadow: 0 0 1rem rgba(0, 0, 0, 0.3);

    margin: 1.5rem auto;
    max-width: 500px;

    p {
        padding: 1rem;
    }

    header {
        padding: 1rem;
        width: 100%;
        display: flex;
        justify-content: start;
        align-items: center;
        flex-direction: column;
        text-align: center;

        strong {
            margin: 0.3rem 0;
            color: #5429CC;
            font-weight: bold;
        }

        small {
            padding: 0.2rem
        }

    }

    img {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        border-radius: 1px solid #5429CC;
        object-fit: cover;
    }

    footer {
        border-top: 1px solid #ccc;
        border-radius: 0 0 0.3rem 0.3rem;
        width: 100%; 
        display: flex;
        justify-content: space-between;
        align-items: center;
        background-color: #FAFAFC;
        padding: 1rem;

        a {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 35px;
            text-decoration: none;
            background-color: #34af23;
            color: #fff;
            font-size: 0.9rem;
            border: none;
            padding: 0.5rem;
            border-radius: 0.5rem;
            font-weight: bold;
            transition: background-color 500ms;

            svg {
                margin: 0 0.3rem;
            }

            &:hover {
                background-color: #5429CC;
            }
        }

    
    }


`