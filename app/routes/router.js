var express = require('express');
var router = express.Router();

router.get('/', function(req,res){
    res.render('pages/index')
});

router.get('/login', function(req,res){
    res.render('pages/login')
});

router.get('/cadastro', function(req,res){
    res.render('pages/cadastro')
});

router.get('/carrinho', function(req,res){
    res.render('pages/carrinho')
});

router.get('/cadastrar_produto', function(req,res){
    res.render('pages/cadproduto')
});

router.get('/editar_informacao', function(req,res){
    res.render('pages/editinf')
});

router.get('/usuario', function(req,res){
    res.render('pages/usu')
});

router.get('/vendedor', function(req,res){
    res.render('pages/vend')
});


module.exports = router;