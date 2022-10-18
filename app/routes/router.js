var express = require('express');
var router = express.Router();
var fabricaDeConexao = require("../../config/connection-factory");
var conexao = fabricaDeConexao();

// Funções DAO
var funcoesDAO = require("../models/funcoesDAO");
funcoesDAO = new funcoesDAO(conexao);

// Multer
const multer = require('multer');
const path = require('path');





///////////////////////////////////////////////////////
// HOME
router.get("/", async function (req, res) {
    try {
        // Chamando busca
        produtos = await funcoesDAO.buscarUniformes();

        // Estado de Autenticado
        if (req.session.autenticado) {
            autenticado = { autenticado: req.session.id_usu };
        } else {
            autenticado = { autenticado: null };
        }
        // Renderizando com o estado do autenticado e com o resultado da busca
        res.render("pages/index", { autenticado, produtos });

    } catch (e) {
        console.log(e); // console log the error so we can see it in the console
        res.json({ erro: "Falha ao acessar dados" });
    }
});
// /////////////////////////////////////

// LOGIN
router.get('/login', function (req, res) {
    res.render('pages/login')
});

router.post('/login', async function (req, res) {
    // Pegando dados do formulario
    var dadosForm = {
        email: req.body.email,
        senha: req.body.senha
    }
    // fazendo busca dos dados no banco
    login = await funcoesDAO.login(dadosForm);
    // verificando se está certo
    var total = Object.keys(login).length;
    // verificando se o usuario existe
    if (total == 1) {
        req.session.autenticado = true;
        req.session.id_usu = login[0].id_usu
    } else {
        req.session.autenticado = null;

    }
    res.redirect('/');
})

// ////////////////////////////////////

// ITENS
router.get('/itens', async (req, res) => {
    produtos = await funcoesDAO.buscarUniformes();
    res.render('pages/itens', { produtos })
})

// ///////////////////////////////

// CADASTRO
router.get('/cadastro', function (req, res) {
    res.render('pages/cadastro')
});


router.post('/cadastro', async (req, res) => {
    var dadosForm = {
        nome: req.body.nome,
        nome_usu: req.body.nome_usu,
        email: req.body.email,
        celular: req.body.celular,
        cpf: req.body.cpf,
        senha: req.body.senha
    }

    cadastro = await funcoesDAO.cadastro(dadosForm);

    res.redirect('/login')

})

// ////////////////////////////////////
// CARRINHO
router.get('/carrinho', async function (req, res) {
    // salvando o id em uma varivel
    usu = req.session.id_usu
    // buscando as informações usando o id do usuario
    info_usu = await funcoesDAO.buscarUsuEndereco(usu)

    // renderizando com as informações recebidas do usu
    res.render('pages/carrinho', { info_usu })
});

router.get('/adicionarCarrinho/:id', (req, res) => {
    console.log(req.params.id)
    if (req.session.carrinho) {
        if (req.session.carrinho.indexOf(req.params.id) < 0) {
            total = req.session.carrinho.length;
            req.session.carrinho[total] = req.params.id
        }

    } else {
        req.session.carrinho = new Array();
        req.session.carrinho[0] = req.params.id
    }

    console.log(req.session.carrinho)
    res.redirect('/carrinho')
})


// /////////////////////////////
// CADASTRO DE PRODUTO
router.get('/cadastrar_produto', function (req, res) {
    res.render('pages/cadproduto')
});



var storagePasta = multer.diskStorage({
    destination: (req, file, callBack)=>{
    callBack(null, './app/public/img/temp/') // diretório de destino  
    },
    filename: (req, file, callBack) =>{
    callBack(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})
var upload = multer({ storage: storagePasta })
router.post('/cadastroProduto',
upload.single('file'),
async (req, res) => {

    if (!req.file) {
        console.log("Falha no carregamento");
    } else {
       caminhoArquivo = "img/temp/"+req.file.filename;

        var dadosForm = {
            foto: null,
            fotoCaminho: caminhoArquivo,
            titulo: req.body.TituloProduto,
            tamanho: req.body.tamanho,
            cor: req.body.cor,
            condicao: req.body.condicao,
            contato: req.body.contato,
            descricao: req.body.descricao,
            valor: req.body.preco,
            nome_instituicao: req.body.instituicao,
            id_usu: req.session.id_usu,
        }

        cadastrar = await funcoesDAO.cadastroProduto(dadosForm);
        res.redirect('/')
    }
})
// /////////////////////////////

// USUARIO

router.get('/usuario', function (req, res) {

    var dadosUsu = {
        id_usu: req.session.id_usu,

    }

    conexao.query("SELECT * FROM unistore.usuario left join usuario_endereco on (usuario.id_usu = usuario_endereco.id_usu) where usuario.id_usu = ?",
        [dadosUsu.id_usu],
        (error, results, fields) => {


            if (error) {
                res.json({ erro: "Falha ao acessar dados" })
            }
            res.render('pages/usu', { usuario: results })
        })

});

router.get('/editar_informacao', function (req, res) {
    var dadosUsu = {
        id_usu: req.session.id_usu,

    }
    conexao.query("SELECT * FROM unistore.usuario left join usuario_endereco on (usuario.id_usu = usuario_endereco.id_usu) where usuario.id_usu = ?",
        [dadosUsu.id_usu],
        (error, results, fields) => {
            // console.log(results);
            if (error) {
                res.json({ erro: "Falha ao acessar dados" })
            }



            res.render('pages/editinf', { usuario: results })
        })


});

router.post('/editar', (req, res) => {

    var usu = {
        id_usu: req.session.id_usu
    }

    var dadosForm = {
        nome_usu: req.body.nu,
        email: req.body.email,
        celular: req.body.celular,
    }
    var dadosFormEnder = {
        rua: req.body.rua,
        cidade: req.body.cidade,
        cep: req.body.cep,
        numero: req.body.numero,
        bairo: req.body.bairo,
        id_usu: req.session.id_usu
    }
    // console.log(dadosFormEnder)
    // console.log(dadosForm)
    conexao.query("SELECT * FROM unistore.usuario left join usuario_endereco on (usuario.id_usu = usuario_endereco.id_usu) where usuario.id_usu = ?",
        [usu.id_usu],
        (error, results, fields) => {
            // console.log(results);
            if (error) {
                res.json({ erro: "Falha ao acessar dados" })
            }

            conexao.query(
                "update usuario SET ? where id_usu = ?",
                [dadosForm, usu.id_usu],
                function (error, results, fields) {
                    if (error) throw error;
                }
            )

            if (results[0].rua == null) {
                conexao.query(
                    "insert into usuario_endereco SET ?",
                    [dadosFormEnder, usu.id_usu],
                    function (error, results, fields) {
                        if (error) throw error;
                    })
            } else {
                conexao.query(
                    "update usuario_endereco SET ? where id_usu = ?",
                    [dadosFormEnder, usu.id_usu],
                    function (error, results, fields) {
                        if (error) throw error;
                    })
            }
            res.redirect('/usuario')

        })

})
// //////////////////////////////////////


router.get('/vendedor', function (req, res) {
    res.render('pages/vend')
});

router.get('/sair', (req, res) => {
    req.session.destroy();
    res.redirect('/');
})



router.get('/produto/:id', (req, res) => {

    var id_produto = req.params.id;

    conexao.query(
        "SELECT * FROM unistore.uniforme left join usuario on (uniforme.id_usu = usuario.id_usu) where id_produto = ?", [id_produto],
        function (error, results, fields) {



            res.render('pages/produto', { info: results, })

        }
    )

})

















module.exports = router;