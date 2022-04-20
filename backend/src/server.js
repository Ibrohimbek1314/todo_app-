const express = require('express')
const cors = require('cors')

const app = new express()
const PORT = process.env.PORT || 9595
const fs = require('fs')

app.use(express.json())
app.use(express.text())
app.use(cors())

app.post('/users', (req, res) => {
    let data = fs.readFileSync('./src/database/users.json')
    data = JSON.parse(data)
    let temp = req.body
    
    let id = data[data.length - 1].userId + 1
    if(temp.username && temp.password && temp.gender) {
        let object = {
            "userId": id
        }
        
        if(!(/[a-z]/).test(temp.username) || temp.username.includes(' ')) {
            return res.json({
                message: "invalit username",
                data: req.body
            }).status(404)
        }
        else if(!(temp.password.length >= 8) ||
        (!(/[A-Z]/).test(temp.password)) ||
        (!(/[0-9]/).test(temp.password)) ||
        (!(/[!@#$%&()><?]/).test(temp.password)) ||
        temp.password.includes(' ')
        ){
            return res.json({
                message: "invalit password",
                data: req.body
            }).status(404)
        }
        else if(temp.gender != 'male' && temp.gender != 'female'){
            return res.json({
                message: "invalit gender",
                data: req.body
            }).status(404)
        }
        
        object.username = temp.username
        object.password = temp.password
        object.gender = temp.gender
        data.push(object)
        fs.writeFileSync('./src/database/users.json', JSON.stringify(data, null, 4))
        return res.json({
            message: "The user is added",
            data: req.body  
        }).status(200)
        
    } else {
        res.json({
            message: "invalit data",
            data: req.body
        }).status(404)
    }
})

app.get('/users', (req, res) => {
    let data = fs.readFileSync('./src/database/users.json')
    console.log(data);
    data = JSON.parse(data)
    res.json(
        data
    )
})

app.get("/todos/:id", (req, res) => {
    let data = fs.readFileSync('./src/database/todos.json')
    data = JSON.parse(data)
    let array = data.filter( todo => todo.userId == req.params.id)
    res.json(array)
})

app.post('/todos/:id', (req, res) => {
    let data = fs.readFileSync('./src/database/todos.json')
    data = JSON.parse(data)
    let temp = req.body
    if(temp.title && temp.text && req.params.id){
        let todoId = new Date()
        todoId = todoId % 1000000
        let object = {
            "userId": req.params.id,
            todoId,
            status: 'todo', 
            title: temp.title,
            text: temp.text
        }

        data.push(object)
        fs.writeFileSync('./src/database/todos.json', JSON.stringify(data, null, 4))
    }
    // else{
    //     res.json({
    //         message: "invalit todo",
    //         data: req.body
    //     }).status(200)
    // }

})

app.get('/todos/:id', (req, res) => {
    let data = fs.readFileSync('./src/database/todos.json')
    data = JSON.parse(data)
    if(!isNaN(req.params.id)){
        let array = data.filter( obj => obj.userId == req.params.id)
        res.json(array)
    } else{
        res.json({
            message: "invalit userId",
            data: req.body
        }).status(404)
    }
})

app.put('/todos/:id', (req, res) => {
    let data = fs.readFileSync('./src/database/todos.json')
    data = JSON.parse(data)
    let temp = req.body
    if((temp.status && temp.todoId)){
        data.map( obj => {
            if(obj.todoId == temp.todoId) {
                obj.status = temp.status
            }
        })
    }
    res.json({
        status: 'Edited'
    })
    fs.writeFileSync('./src/database/todos.json', JSON.stringify(data, null, 4))
})


app.listen(PORT, () => {
    console.log("Server is working http://localhost:" + PORT);
})