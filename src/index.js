const app = require('./app')
const models = require('../models')

const { PORT = 3000 } = process.env

app.listen(PORT, () => { console.log(`Listen from port ${PORT}`) })