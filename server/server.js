const path = require('path')
const express = require('express')
const helmet = require('helmet')
const compression = require('compression')
const cors = require('cors')

const PORT = 4000
const ROOT = process.cwd()

const app = express()
app.use(helmet())
app.use(compression())

const corsOptions = {
    origin: ['http://localhost:8080']
}
app.use(cors(corsOptions))

app.use(express.static(path.join(ROOT, 'dist'), {maxAge: '30d'}))

app.use('/api', require('./api/list'))

app.listen(PORT, () => {
    console.log(`Server started. Listening on port ${PORT}`)
})
