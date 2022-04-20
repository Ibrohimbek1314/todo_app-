const PORT = process.env.PORT || 9596
const Express = require('./lib/router.js')
const path = require('path')
const res = require('express/lib/response')
const app = new Express()

app.views( path.join(__dirname, 'views' ) )  
app.public( path.join(__dirname, 'public' ) )

app.get('/', (req, res) => {
    res.render('index.html')
} )

app.get('/login', (req, res) => {
    res.render('login.html')
} )

app.get('/registration', (req, res) => {
    res.render('registration.html')
} )

app.get('/todo', (req, res) => {
    res.render('todo.html')
})



app.listen( PORT, () => console.log('Client server is running on http://localhost:' + PORT) )