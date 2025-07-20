import React from 'react';
import XeroData from '../components/XeroData';
const backendURL = import.meta.env.VITE_BACKEND_URL;


const App = () => {
  return (
    <div>
      <h1>Xero Invoice Data</h1>
      <a href={`${backendURL}/auth`}>
  <button>Connect to Xero</button>
</a>

      <XeroData />
    </div>
  );
};

export default App;
