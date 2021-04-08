require('dotenv').config()
const path = require('path')
const express = require('express')

const server = express()

server.use(express.json())
server.use(express.static(path.join(__dirname, 'client/build')))

//on Heroku machine, an env variable is called NODE_ENV => production
if (process.env.NODE_ENV === 'development'){
    const cors = require('cors')
    server.use(cors())
}
//our API comes earlier in the pipeline
server.get('/api/hello', (req, res) => {
    res.json({message: 'hello'})
})

//catch-all that just sends back index.html
server.get('*', (req, res) => {
    res.sendFile(path.json(__dirname, 'client/build', 'index.html'))
})

const PORT = process.env.PORT || 4000

server.listen(PORT, () => {
    console.log(`listening on ${PORT}`)
})