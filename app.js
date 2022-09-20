const express = require('express');
const app = express();
const port = 3000;

app.use(express.static('app/public'));
app.use(express.urlencoded({extended:true}));
app.use(express.json);
var rotas = require('./app/routes/router')
app.use('/', rotas)

app.set('view engine', 'ejs');
app.set('views', './app/views');

app.listen(port, ()=>{
    console.log(`servidor ouvindo na porta: ${port}`)
})