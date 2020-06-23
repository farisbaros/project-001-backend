const express = require('express')
const bodyParser = require('body-parser')
const dotenv = require('dotenv');
const app = require('./app');
const server = express()

dotenv.config();

const port = process.env.APPPORT || 3000


server.use(bodyParser.json())
server.use(
    bodyParser.urlencoded({
        extended: true,
    })
)

app(server);

server.listen(port, () => {
    console.log(`App running on port ${port}.`)
})

server.get('/', (request, response) => {
    response.json({ info: 'Node.js, Express, and Postgres API', request: request.params, headers: request.headers })
})

server.use((request, response) => {
    response.status(404).send({ url: `${request.originalUrl} not found` })
});