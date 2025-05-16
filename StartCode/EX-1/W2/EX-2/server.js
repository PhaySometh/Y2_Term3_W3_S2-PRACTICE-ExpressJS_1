// ----- native http module -----
// import http from 'http';
// const server = http.createServer((req, res) => {
//     const url = req.url;
//     const method = req.method;

//     console.log(`Received ${method} request for ${url}`);

// if (method === 'GET') {
//         switch (url) {
//             case '/':
//                 res.writeHead(200, { 'Content-Type': 'text/html' });
//                 res.end('<h1>Welcome to the Home Page</h1>');
//                 break;
//             case '/about':
//                 res.writeHead(200, { 'Content-Type': 'text/plain' });
//                 res.end('About us: at CADT, we love node.js!');
//                 break;
//             case '/contact-us':
//                 res.writeHead(200, { 'Content-Type': 'text/plain' });
//                 res.end('You can reach us via email...');
//                 break;
//             case '/products':
//                 res.writeHead(200, { 'Content-Type': 'text/plain' });
//                 res.end('Buy one get one free...');
//                 break;
//             case '/projects':
//                 res.writeHead(200, { 'Content-Type': 'text/plain' });
//                 res.end('Here are our awesome projects');
//                 break;
//             default:
//                 res.writeHead(200, { 'Content-Type': 'text/plain' });
//                 res.end('404 Not Found');
//                 break;
//         }
//     }
// });

// server.listen(3000, () => {
//     console.log('Server is running at http://localhost:3000');
// });

// ----- Express.js -----
import express from 'express';
const app = express();

app.get('/', (req, res) => {
    res.send('Welcome to the Home Page');
});

app.get('/about', (req, res) => {
    res.send('About us: at CADT, we love node.js!');
});

app.get('/contact-us', (req, res) => {
    res.send('You can reach us via email...');
});

app.get('/products', (req, res) => {
    res.send('Buy one get one free...');
});

app.get('/projects', (req, res) => {
    res.send('Here are our awesome projects');
});

app.listen(3000, () =>
    console.log('Server is running at http://localhost:3000')
);
