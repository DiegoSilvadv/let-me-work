import styled from 'styled-components'

export const Container = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    div{
        margin-top: -10rem;
        margin-bottom: 3rem;
        width: 90%;
        max-width: 650px;

        h3 {
            font-size: 1.2rem;
            width: 100%;
            max-width: 300px;
        }
        
        p {
            margin-top: 1rem;
            width: 100%;
            font-size: 0.8rem;
            color: #EDF2F7;
            max-width: 250px;
        }
    }

    form {
        width: 90%;
        max-width: 650px;
        background-color: #fff;
        color: #4A5568;
        border-radius: 0.5rem;
        padding: 0.7rem;
        display: flex;
        justify-content: center;
        align-items: flex-start;
        flex-direction: column;

        img {
            border-radius: 50%;
            display: block;
            margin: 1rem auto;
        }

        input, textarea {
            width: 100%;
            padding: 0.5rem;
            border: none;
            border-radius: 0.3rem;
            background-color: #EDF2F7
        }
        label {
            margin: 0.5rem 0;
        }

        textarea {
            resize: vertical;
            height: 100px;
        }

        button {
            width: 150px;
            padding: 0.5em;
            display: block;
            margin: 1rem auto;
            border-radius: 0.5rem;
            border: none;
            background-color: #33CC95;
            color: #FFFFFF;

        }

        
    }

`