import React from 'react';
// import { BrowserRouter } from 'react-router-dom';
import Routes from './routes';
import GlobalStyles from './styles/global';
// import { UserProvider } from './hooks/useUser';

export default function App() {
  return (
    <>
      {/* <UserProvider> */}
        <GlobalStyles />
        <Routes />
        
      {/* </UserProvider> */}
    </>
  );
}

