const express = require('express');

const userList = require('./data/db.js');

const server = express();
server.use(express.json());

server.get('/api/users', (req, res) => {
  userList
    .find()
    .then(user => res.send(user))
    .catch(err => res.send(err))
});

// server.get('/api/users/:id', (req, res) => {
//   res.send('Welcome to Hobbiton');
// })

server.post('/api/users', (req, res) => {
  const userData = req.body;

  console.log('user data', userData);

  userList
    .insert(userData)
    .then(user => res.json(user))
    .catch(err => res.json({ message: 'Unable to add user.' }))
});

// server.put('/api/users/:id', (req, res) => {
//   res.status(200).json({ url: '/api/users', operation: 'PUT' });
// })

// server.delete('/api/users/:id', (req, res) => {
//   res.sendStatus(204)
// })

server.listen(5000, () => console.log('Server running on http://localhost:5000'))