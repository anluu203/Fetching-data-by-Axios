import React from 'react';
import './App.css';
import UserList from './Components/UserList';

const App: React.FC = () => {
  return (
    <div className="App">
        <h1>Fetching data with Axios + Tailwindcss</h1>
        <UserList/>
    </div>
  );
}

export default App;
