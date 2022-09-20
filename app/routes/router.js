var express = require('express');
var router = express.Router();

var fabricaDeConexao = require("../../config/connection-factory");
var conexao = fabricaDeConexao();

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

router.post('/cadastro', (req, res)=>{
    console.log(req.body)

    var dadosForm ={
        nome: req.body.nomeCompleto,
        nome_usu: req.body.nomeUsuario,
        email:req.body.email,
        telefone: req.body.telefone,
        cpf: req.body.cpf,
        senha: req.body.senha
    }

    conexao.query(
        "INSERT INTO usuario SET ?",
        dadosForm,
        function (error, results, fields){
            if(error) throw error;
            if(results){
                alert('Cadastro Realizado com sucesso')
            }
        }
    )
    res.redirect('/login')
})



module.exports = router;