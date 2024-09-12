// BUILD YOUR SERVER HERE
//imports at top
const express = require('express');
const User = require('./users/model.js');

//instance of express app
const server = express();

//global middleware
server.use(express.json());

//endpoints
//get /api/users 
server.get('/api/users', (req, res) => {
    User.find()
        .then(users => {
            // console.log(users)
            res.status(200).json(users)
        })
        .catch(err => {
            res.status(500).json({message: "The users information could not be retrieved"})
        })
})

//get /api/users/:id
server.get('/api/users/:id', (req, res) => {
    const {id} = req.params
    User.findById(id)
        .then(user => {
            if(!user){
                res.status(404).json({message: "The user with the specified ID does not exist"})
            } else {
                res.status(200).json(user)
            }
        })
        .catch(err => {
            res.status(500).json({message: "The user information could not be retrieved"})
        })
})

//post /api/users    
server.post('/api/users', (req, res) => {
    const newUser = req.body
    if(!newUser.name || !newUser.bio){
        res.status(400).json({message: 'Please provide name and bio for the user'})
    } else {
        User.insert(newUser)
        .then(users => {
            res.status(201).json(users)
        })
        .catch(err => {
            res.status(500).json({message: "There was an error while saving the user to the database"})
        })
    }
}) 

//delete /api/users/:id
server.delete('/api/users/:id', async (req, res) => {
    try{
        const {id} = req.params
        const deletedUser = await User.remove(id)
        if(!deletedUser){
            res.status(404).json({message: 'The user with the specified ID does not exist'})
        } else {
            res.status(201).json(deletedUser)
        }
    }
    catch(err){
        res.status(500).json({message: "The user could not be removed"})
    }
})
//put /api/users/:id
server.put('/api/users/:id', async (req, res) => {
    const {id} = req.params
    const changes = req.body

    try{
        if(!changes.name || !changes.bio){
            res.status(400).json({message: 'Please provide name and bio for the use'})
        } else {
            const updatedUser = await User.update(id, changes)
            if(!updatedUser){
                res.status(404).json({message: 'The user with the specified ID does not exist'})
            } else {
                res.status(200).json(updatedUser)
            }
        }
    }
    catch(err){
        res.status(500).json({message: "The user information could not be modified"})
    }
})

//catch all
server.use("*", (req, res) => {
    res.status(404).json({message: "User not working properly"})
})
module.exports = server; 
