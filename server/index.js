import app from './app';
import http from 'http';

var io = require('socket.io');

let server = http.createServer(app);
var io = io.listen(server);

const port = process.env.PORT || 8080;

app.listen(port, (err) => {
    if (err) {
        console.log(err.message);
    }
    console.log(`Server running on ${port}`);
});