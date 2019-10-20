const express = require('express');

const userList = require('./data/db.js');

const server = express();
server.use(express.json());

server.get('/api/users', (req, res) => {
  console.log(req.body)
  userList
    .find()
    .then(user => res.send(user))
    .catch(err => res.sendStatus(500).json({ error: "The users information could not be retrieved." }))
});

server.get('/api/users/:id', (req, res) => {
  console.log(req.params)
  if (!req.params.id) res.status(400).send({ message: "Your request is missing the user id."});
  if (req.params.id === undefined) res.status(404).send({ message: "The user with the specified ID does not exist." });

  userList = userList.map(user => {
    if (`${user.id}` === req.params.id) {
      return req.body;
    }
    return user;
  });
  res.status(200).send(req.body);
})

server.post('/api/users', (req, res) => {
  if (!req.body.bio || !req.body.name) {
    res.status(400).send({ errorMessage: "Please provide name and bio for the user." })
  }

  console.log('user data', req.body.bio);

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