const express = require('express')
const path = require('path')
const fs = require('fs')
require('dotenv').config()

const ConnectDB = require('./Config/ConnectDB')
const contactRouter = require('./Routes/Contact')

const app = express()

// Connexion à MongoDB Atlas ou Local
ConnectDB()

// Middlewares
app.use(express.json())

// Routes API
app.use('/api/contact', contactRouter)

// Définition du dossier statique pour le frontend React
const publicPath = fs.existsSync(path.join(__dirname, 'public', 'index.html'))
    ? path.join(__dirname, 'public')
    : path.join(__dirname, 'client', 'build')

if (fs.existsSync(publicPath)) {
    app.use(express.static(publicPath))

    // Rediriger toutes les autres requêtes GET vers index.html pour React Router (Express 5 syntax)
    app.get('{*splat}', (req, res) => {
        res.sendFile(path.join(publicPath, 'index.html'))
    })
} else {
    app.get('/', (req, res) => {
        res.send('API ContactList is running...')
    })
}

// Le port est fourni par Azure via process.env.PORT, ou 5000 par défaut en local
const port = process.env.PORT || 5000

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})