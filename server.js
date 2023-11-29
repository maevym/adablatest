const express = require('express');
const app = express();
const port = process.env.PORT || 7756;
const bodyParser = require('body-parser');
const http = require('http').createServer(app);
const cors = require('cors');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

const routes = require('./routes');
routes(app);

http.listen(port);
console.log('Learn Node JS With Kiddy, RESTful API server started on: ' + port);

require('./socket')(http);
