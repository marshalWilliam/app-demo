// Module
const users = require('./data.js')
const {writeFileSync} = require('fs')

// Find User
const findUser = (id) => {
    const singleUser = users.find( (user) => user.id === Number(id))
    return singleUser
}

// POST
const addUser = (fname,lname) => {
    const user = users.slice(-1)
    const id = user[0].id + 1
    users.push({id,fname,lname})
    storeData()
}

// PUT
const updateUser = (fname,lname,id) => {
    const index = users.findIndex( (user) => user.id === id)
    users[index].fname = fname
    users[index].lname = lname
    storeData()
}

//DELETE
const deleteUser = (id) => {
    const index = users.findIndex( (user) => user.id === id)
    users.splice(index,1)
    storeData()
}

function storeData(){
    writeFileSync('./data.js',`const users = ${JSON.stringify(users,null,2)} \n module.exports = users`)
}

module.exports = {addUser,updateUser,deleteUser,findUser}