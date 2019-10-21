import React, { useState } from 'react';
import axios from 'axios';

const initialUser = {
  name: '',
  bio: ''
}

function AddPage(props) {
  const [addUser, setAddUser] = useState(initialUser)

  const submitUser = e => {
    e.preventDefault();
    axios
      .post('http://localhost:5000/api/users/', addUser)
      .then(res => {
        console.log(res)
        props.setUserData([...props.userData, addUser])
        props.setIsAdding(false)
      })
      .catch(err => console.log(err))
  }

  const onChange = e => {
    setAddUser({
      ...addUser,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div>
      <form onSubmit={submitUser}>
        <input 
          type="text"
          name="name"
          value={addUser.name}
          placeholder="name..."
          onChange={onChange}
        />
        <input 
          type="text"
          name="bio"
          value={addUser.bio}
          placeholder="bio..."
          onChange={onChange}
        />
        <button>Add User</button>
      </form>
    </div>
  );
}

export default AddPage;
