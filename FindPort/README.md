# FindAvailablePort Project

This project provides a utility function to find an available port on your local machine and use it to start a local HTTP server. It's useful for cases where you want to ensure that a specific port is available before starting your server.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

## Installation

To get started with this project, you first need to clone the repository to your local machine and install the required Node.js dependencies.

1. Clone the repository:

```sh
git clone https://github.com/your-username/FindAvailablePort.git
```

2. Change to the project directory:

```sh
cd FindAvailablePort
```

3. Install the Node.js dependencies:

```sh
npm install
```

## Usage

To use the `findAvailablePort` function and start an HTTP server, you need to follow these steps:

1. Create a file named `FindPort.js` with the following content:

```javascript
const net = require('node:net');

function findAvailablePort(desiredPort) { 
    return new Promise((resolve, reject) => {
        const server = net.createServer();

        server.listen(desiredPort, () => { 
            const { port } = server.address();
            server.close(() => { 
                resolve(port);
            });
        });

        server.on('error', (err) => { 
            if (err.code === 'EADDRINUSE') {
                findAvailablePort(0).then(port => resolve(port));
            } else { 
                reject(err);
            });
        });
    });
}

module.exports = { findAvailablePort };
```

2. Create a file named `http.js` with the following content:

```javascript
const http = require('node:http');
const { findAvailablePort } = require('./FindPort.js');

const server = http.createServer((req, res) => { 
    console.log('request received');
    res.end('Hello World');
});

findAvailablePort(3000).then(port => { 
    server.listen(port, () => { 
        console.log(`Server is running on port http://localhost:${port}`);
    });
}).catch(err => {
    console.error('Failed to find an available port:', err);
});
```

3. Run the HTTP server:

```sh
node http.js
```

You should see a message indicating the server is running on an available port, e.g., `Server is running on port http://localhost:3000`. or in one available port.
