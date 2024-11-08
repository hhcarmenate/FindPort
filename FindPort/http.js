const http = require('node:http')

const { findAvailablePort } = require('./FindPort.js')

const server = http.createServer((req, res) => { 
    console.log('request received')
    res.end('Hello Word')
})

findAvailablePort(3000).then(port => { 
    server.listen(port, () => { 
        console.log(`Server is running on port http://localhost:${port}`)
    })
})