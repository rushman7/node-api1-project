const express = require('express');

const userList = require('./data/db.js');

const server = express();
server.use(express.json());

server.get('/api/users', (req, res) => {
  userList
    .find()
    .then(user => res.send(user))
    .catch(err => res.sendStatus(500).json({ error: "The users information could not be retrieved." }))
});

server.get('/api/users/:id', (req, res) => {
  if (!req.params.id) res.status(400).send({ message: "Your request is missing the user id."});
  if (req.params.id === undefined) res.status(404).send({ message: "The user with the specified ID does not exist." });

  userList
    .findById(req.params.id)
    .then(user => res.status(200).json(user))
    .catch(err => res.status(500).send({ error: "The user information could not be retrieved." }))
})

server.post('/api/users', (req, res) => {
  if (!req.body.bio || !req.body.name) {
    res.status(400).send({ message: "Please provide name and bio for the user." })
  }

  console.log('user data', req.body);

  userList
    .insert(req.body)
    .then(user => {
      console.log(user)
      res.status(201).send({ message: `${req.body.name} has been added.`})
    })
    .catch(err => res.status(500).send({ error: "There was an error while saving the user to the database" }))
});

// server.put('/api/users/:id', (req, res) => {
//   res.status(200).json({ url: '/api/users', operation: 'PUT' });
// })

// server.delete('/api/users/:id', (req, res) => {
//   res.sendStatus(204)
// })

server.listen(5000, () => console.log('Server running on http://localhost:5000'))