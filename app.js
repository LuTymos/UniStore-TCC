const express = require('express');
const app = express();
const port = 3000;

app.use(express.static('app/public'));

app.set('view engine', 'ejs');
app.set('view', './app/views');