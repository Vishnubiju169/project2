
const express = require("express");
require("dotenv").config();
require('./configs/db')();
const bodyParser = require("body-parser");
var path = require('path');

const app = express();

app.use(express.json()); //json format

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');



app.use("",require('./api/category/index'))

let port = process.env.PORT;
let host = process.env.HOST;
app.listen(port, host, () => {
    console.log(`Server is listening ${host}:${port}`);
  });