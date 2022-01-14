import styled from 'styled-components'

export const Container = styled.div`
    width: 100vw;
    height: 100vh;

    background-color: #5429CC;
    display: flex;
    justify-content: center;
    align-items: center;

    .react-toggle-track{
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: row;
    }


    section {
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;

        p{
            font-weight: 300;
            font-size: 1.2rem;
            margin: 1rem 0;
        }

        button, #check-works  {
            width: 14rem;
            padding: 1.5rem;
            margin-top: 1rem;
            border-radius: 0.3rem;
            border: none;
            background: #6933FF;
            font-weight: 600;

            display: flex;
            justify-content: center;
            align-items: center;
            color: #fff;

            svg {
                margin-right: 4%;
            }
        }

        #pay-services {
            background-color: #33CC95;
        }
         
        a {
            color: #fff;
            text-decoration: none;
            display: flex;
            justify-content: center;
            align-items: center;
            width: 100%;

            height: 100%;
        }

    }

`