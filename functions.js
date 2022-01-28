// Modules
const users = require('./data.js')
const {writeFileSync} = require('fs')

// POST
const addUser = (fname,lname) => {
    const user = users.slice(-1)
    const id = user[0].id + 1
    users.push({id,fname,lname})
    writeFileSync('./data.js',`const users = ${JSON.stringify(users,null,2)} \n module.exports = users`)
}

// PUT
const updateUser = (fname,lname,id) => {
    const index = users.findIndex( (user) => user.id === id)
    users[index].fname = fname
    users[index].lname = lname
    writeFileSync('./data.js',`const users = ${JSON.stringify(users,null,2)} \n module.exports = users`)
}

// DEL
const deleteUser = (id) => {
    const index = users.findIndex( (user) => user.id === id)
    users.splice(index,1)
    writeFileSync('./data.js',`const users = ${JSON.stringify(users,null,2)} \n module.exports = users`)
}

module.exports = {addUser,updateUser,deleteUser}
