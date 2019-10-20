const express = require('express');

const userList = require('./data/db.js');

const server = express();
server.use(express.json());
server.use(cors())

server.get('/api/users', (req, res) => {
  userList
    .find()
    .then(users => 
      res
        .status(200)
        .json(users))
    .catch(err => 
      res
        .status(500)
        .json({ error: "The users information could not be retrieved." }))
});

server.get('/api/users/:id', (req, res) => {
  userList
    .findById(req.params.id)
    .then(user => {
      if (user) {
        res.status(200).json(user)
      } else {
        res
          .status(404)
          .json({ message: 'The user with the specified ID does not exist.' })
      }
    })
    .catch(() => 
      res
        .status(500)
        .json({ error: "The user information could not be retrieved." })
    )
})

server.post('/api/users', (req, res) => {
  const { name, bio } = req.body;

  if (!name || !bio) {
    res
      .status(400)
      .json({ errorMessage: 'Please provide name and bio for the user.' });
  } else {
    userList
      .insert(req.body)
      .then(user => {
        res
          .status(201)
          .json({ message: `${name} has been added.`})
      })
    .catch(err => 
      res
      .status(500)
      .json({ error: "There was an error while saving the user to the database" }))
  }
});

server.put('/api/users/:id', (req, res) => {
  const { name, bio } = req.body;

  if (!name || !bio) {
    res
      .status(400)
      .json({ errorMessage: 'Please provide name and bio for the user.' })
  } else {
    userList
      .update(req.params.id, req.body)
      .then(user => {
        if (user) {
          res
            .status(200)
            .json(user)
        } else {
          res
            .status(404)
            .json({ message: 'The user with the specified ID does not exist.' })
        }
      })
      .catch(() => 
        res
          .status(500) 
          .json({ error: "The user information could not be modified." })
      )
  }
})

server.delete('/api/users/:id', (req, res) => {
  userList
    .remove(req.params.id)
    .then(user => {
      if (user && user > 0) {
        res
          .status(202)
          .json({ message: `User with id: ${req.params.id} has been deleted.` })
      } else {
        res
          .status(404)
          .json({ message: `The user with the ID of ${req.params.id} does not exist.` })
      }
    })
    .catch(() => 
      res
        .status(500)
        .json({ error: "There was an error while saving the user to the database" })
    )
})

server.listen(5000, () => console.log('Server running on http://localhost:5000'))