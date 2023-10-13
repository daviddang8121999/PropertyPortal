import React, { useEffect} from 'react';
import { Routes } from './Components/Routes'


const App = () => {
  return (
    <Routes isAuthorized={true} />
  );
}

export default App