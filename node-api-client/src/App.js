import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [userData, setUserData] = useState([])

  useEffect(() => {
    axios
      .get('http://localhost:5000/api/users/')
      .then(res => setUserData(res.data))
      .catch(err => console.log(err))
  }, [])

  const deleteUSer = id => {
    axios
      .delete(`http://localhost:5000/api/users/${id}`)
      .then(res => setUserData(userData.filter(user => user.id !== id)))
      .catch(err => console.log(err))
  }

  return (
    <div className="App">
      <header className="App-header">
        {userData.map(user => {
          return <div className="user-div" key={user.id}>
            <p>{user.name}</p>
            <p>{user.bio}</p>
            <button onClick={() => deleteUSer(user.id)}>Delete</button>
          </div>
        })}
      </header>
    </div>
  );
}

export default App;
