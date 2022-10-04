var express = require('express');
var router = express.Router();
var fabricaDeConexao = require("../../config/connection-factory");
var conexao = fabricaDeConexao();

router.get("/", function (req, res) {

    conexao.query("SELECT * FROM unistore.uniforme",
    (error, results, fields)=>{
        
        
        if(error){
            res.json({erro: "Falha ao acessar dados"})
        }
    

    if (req.session.autenticado) {
      autenticado = { autenticado: req.session.id_usu };
    } else {
      autenticado = { autenticado: null };
    }
    // console.log(req.session.id_usu)
    console.log(results);
    res.render("pages/index", {autenticado, produtos: results});
})
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
    var dadosUsu ={
        id_usu: req.session.id_usu,
       
    }
    conexao.query("SELECT * FROM unistore.usuario left join usuario_endereco on (usuario.id_usu = usuario_endereco.id_usu) where usuario.id_usu = ?",
    [dadosUsu.id_usu],
     (error, results, fields)=>{
        // console.log(results);
        if(error){
            res.json({erro: "Falha ao acessar dados"})
        }



        res.render('pages/editinf', {usuario: results})
    })
    
    
});

router.get('/usuario', function(req,res){
    
    var dadosUsu ={
        id_usu: req.session.id_usu,
       
    }

    conexao.query("SELECT * FROM unistore.usuario left join usuario_endereco on (usuario.id_usu = usuario_endereco.id_usu) where usuario.id_usu = ?",
    [dadosUsu.id_usu],
     (error, results, fields)=>{
        
        console.log(results);
        if(error){
            res.json({erro: "Falha ao acessar dados"})
        }
        res.render('pages/usu', {usuario: results})
    })
    
});

router.get('/vendedor', function(req,res){
    res.render('pages/vend')
});

router.get('/sair', (req,res)=>{
    req.session.destroy();
    res.redirect('/');
})

router.post('/login', 

    function(req,  res){
        var dadosForm ={
            email: req.body.email,
            senha: req.body.senha
        }
        console.log(dadosForm)

        var result = conexao.query(
            "select * from usuario where email = ? and senha = ?",
            [dadosForm.email, dadosForm.senha],
            function (error, results, fields){
                if(error) throw error;

                var total = Object.keys(results).length;
                console.log(total)
                if(total ==1){
                    console.log("If")
                    req.session.autenticado = true;
                    req.session.id_usu = results[0].id_usu
                }else{
                    req.session.autenticado = null;
                }
                res.render("pages/index", {autenticado: req.session.autenticado});
            }
        )
    }

)


router.post('/editar', (req,res)=>{

    var usu={
        id_usu: req.session.id_usu
    }

    var dadosForm ={
        nome_usu: req.body.nu,
        email:req.body.email,
        celular: req.body.celular,
    }
    var dadosFormEnder = {
        rua: req.body.rua,
        cidade: req.body.cidade,
        cep:req.body.cep,
        numero: req.body.numero,
        bairo:req.body.bairo,
        id_usu: req.session.id_usu
    }
    // console.log(dadosFormEnder)
    // console.log(dadosForm)
    conexao.query("SELECT * FROM unistore.usuario left join usuario_endereco on (usuario.id_usu = usuario_endereco.id_usu) where usuario.id_usu = ?",
    [usu.id_usu],
     (error, results, fields)=>{
        // console.log(results);
        if(error){
            res.json({erro: "Falha ao acessar dados"})
        }

        conexao.query(
            "update usuario SET ? where id_usu = ?",
            [dadosForm, usu.id_usu],
            function (error, results, fields){
                if(error) throw error;
            }
        )
    
        if( results[0].rua == null){
            conexao.query(
                "insert into usuario_endereco SET ?",
                [dadosFormEnder, usu.id_usu],
                function (error, results, fields){
                    if(error) throw error;
            })
        }else{
            conexao.query(
                "update usuario_endereco SET ? where id_usu = ?",
                [dadosFormEnder, usu.id_usu],
                function (error, results, fields){
                    if(error) throw error;
            })
        }
        res.redirect('/usuario')

    })
    
})


router.post('/cadastro', (req, res)=>{
    console.log(req.body)

    var dadosForm ={
        nome: req.body.nome,
        nome_usu: req.body.nome_usu,
        email:req.body.email,
        celular: req.body.celular,
        cpf: req.body.cpf,
        senha: req.body.senha
    }

    conexao.query(
        "INSERT INTO usuario SET ?",
        dadosForm,
        function (error, results, fields){
            if(error) throw error;
        }
    )
    res.redirect('/login')
})

router.post('/cadastroProduto', (req, res)=>{
    console.log(req.body)

    var dadosForm ={
        foto: req.body.file,
        titulo: req.body.TituloProduto,
        tamanho:req.body.tamanho,
        cor: req.body.cor,
        condicao: req.body.condicao,
        contato: req.body.contato,
        descricao: req.body.descricao,
        valor: req.body.preco,
        nome_instituicao: req.body.instituicao
    }

    conexao.query(
        "INSERT INTO uniforme SET ?",
        dadosForm,
        function (error, results, fields){
            if(error) throw error;
        }
    )
    res.redirect('/')
})



module.exports = router;