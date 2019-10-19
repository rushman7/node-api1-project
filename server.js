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

// server.post('/api/users', (req, res) => {
//   res.status(201).json({ url: '/api/users', operation: 'POST' });
// })

// server.put('/api/users/:id', (req, res) => {
//   res.status(200).json({ url: '/api/users', operation: 'PUT' });
// })

// server.delete('/api/users/:id', (req, res) => {
//   res.sendStatus(204)
// })

server.listen(5000, () => console.log('Server running on http://localhost:5000'))

// {
//   name: "Jane Doe", // String, required
//   bio: "Not Tarzan's Wife, another Jane",  // String
//   created_at: Mon Aug 14 2017 12:50:16 GMT-0700 (PDT) // Date, defaults to current date
//   updated_at: Mon Aug 14 2017 12:50:16 GMT-0700 (PDT) // Date, defaults to current date
// }