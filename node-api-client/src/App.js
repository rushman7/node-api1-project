import React, { useState, useEffect } from 'react';
import AddPage from './components/AddPage';
import axios from 'axios';
import './App.css';

function App() {
  const [userData, setUserData] = useState([])
  const [isAdding, setIsAdding] = useState(false)

  useEffect(() => {
    axios
      .get('http://localhost:5000/api/users/')
      .then(res => {
        console.log(res)
        setUserData(res.data)
      })
      .catch(err => console.log(err))
  }, [])

  const deleteUser = id => {
    axios
      .delete(`http://localhost:5000/api/users/${id}`)
      .then(() => setUserData(userData.filter(user => user.id !== id)))
      .catch(err => console.log(err))
  }

  const addUser = () => {
    setIsAdding(true)
  }

  return (
    <div className="App">
      <header className="App-header">
        {!isAdding && <button onClick={addUser}>Add User</button>}
        {isAdding && <AddPage 
          userData={userData} 
          setUserData={setUserData} 
          setIsAdding={setIsAdding}
        />}
        {userData.map(user => {
          return <div className="user-div" key={user.id}>
            <p>{user.name}</p>
            <p>{user.bio}</p>
            <button onClick={() => deleteUser(user.id)}>Delete</button>
          </div>
        })}
      </header>
    </div>
  );
}

export default App;
