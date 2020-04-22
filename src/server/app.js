const express = require('express')
const app = express()
const PORT = 3000

const api = require('./routes/api');

app.use('/', express.static('build'))

app.use('/api', api);

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`))
