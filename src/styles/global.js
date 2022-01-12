import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    outline: 0;
}

body {
    background: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
    -webkit-font-smoothing: antialiased;
}

body, input, button {
    font-family: 'Roboto', sans-serif;
    font-size: 16px;
}

h1, h2, h3, h4, h5, h6, strong {
    font-weight: 500;
}

@media(max-width: 1080px){
    html {
        font-size: 93.75%;
    }
}
@media(max-width: 720){
    html {
        font-size: 87.5%;
    }
}

button {
    cursor: pointer;
    font-weight: 500;
}

img {
    object-fit: cover;
}

`