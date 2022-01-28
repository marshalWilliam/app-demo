/// import modules
const express = require('express');
const app = express();
const users = require('./data.js')
const {addUser,updateUser,deleteUser,findUser} = require('./functions.js')

/// add middleware
app.use(express.urlencoded({extended:false}));
app.use(express.json())

/// create server
// login homepage
app.get('/', (req,res) => {
    res.status(200).send('<h1> Home Page </h1>');
})

// all users
app.get('/users', (req,res) =>{
    res.status(200).json(users);
})

// single user
app.get('/users/:id', (req,res) =>{
    const singleUser = findUser(req.params.id)
    if(!singleUser){
        res.status(404).send('<h1> User not found </h1> <a href="/users"> back to home </a>');
    }else{
        res.status(200).json(singleUser);
    }
})

// user signup 
app.post('/users/login', (req,res) => {
    const {fname,lname} = req.body;
    res.status(200).send(`Hello ${fname} ${lname} \n\n <a href="/users"> back to home </a>`);
    addUser(fname,lname);
})

// update user
app.put('/users/:id', (req,res) => {
    const singleUser = findUser(req.params.id)
    if(!singleUser){
        res.status(404).send('<h1> User not found </h1> <a href="/users"> back to home </a>');
    }else{
        const {fname,lname} = req.body;
        const {id} = singleUser;
        updateUser(fname,lname,id);
        res.status(200).json(singleUser)
    }
    
})

// delete user
app.delete('/users/:id', (req,res) => {
    const singleUser = findUser(req.params.id)
    if(!singleUser){
        res.status(404).send('<h1> User not found </h1> <a href="/"> back to home </a>');
    }else{
        deleteUser(singleUser.id);
        res.status(200).send('<h1> User Deleted </h1> <a href="/users"> back to home </a>');
    }
})


// 404 page
app.all('*', (req,res) => {
    res.status(404).send('<h1> 404 Not Found </h1> <a href="/"> back to home </a>');
})

// open server
const port = process.env.PORT || 5000;
app.listen(port, ()=> {
    console.log(`Server is listening on port ${port}...`);
})