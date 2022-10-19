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

    itensCarrinho = new Array()
    
    

    for(i = 0; i < req.session.carrinho.length ; i++){

        var id = req.session.carrinho[i]

        console.log(id)

        uniformesCarrinho = await funcoesDAO.buscarUniformesCarrinho(id)

        itensCarrinho[i] = uniformesCarrinho

    }

    console.log(itensCarrinho)

    // renderizando com as informações recebidas do usu
    res.render('pages/carrinho', { info_usu})
});

router.get('/adicionarCarrinho/:id', (req, res) => {
    // console.log(req.params.id)
    if (req.session.carrinho) {
        if (req.session.carrinho.indexOf(req.params.id) < 0) {
            total = req.session.carrinho.length;
            req.session.carrinho[total] = req.params.id
        }

    } else {
        req.session.carrinho = new Array();
        req.session.carrinho[0] = req.params.id
    }


    res.redirect('/carrinho')
})


// /////////////////////////////
// CADASTRO DE PRODUTO
router.get('/cadastrar_produto', function (req, res) {
    res.render('pages/cadproduto')
});


// Multer
var storagePasta = multer.diskStorage({
    destination: (req, file, callBack) => {
        callBack(null, './app/public/img/temp/') // diretório de destino  
    },
    filename: (req, file, callBack) => {
        callBack(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})
var upload = multer({ storage: storagePasta })
// /////////
router.post('/cadastroProduto',
    upload.single('file'),
    async (req, res) => {

        if (!req.file) {
            console.log("Falha no carregamento");
        } else {
            caminhoArquivo = "img/temp/" + req.file.filename;

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

router.get('/usuario', async function (req, res) {

    var usu = req.session.id_usu,

        usuario = await funcoesDAO.buscarUsuEndereco(usu)

    res.render('pages/usu', { usuario })

});

router.get('/editar_informacao', async function (req, res) {
    var usu = req.session.id_usu,

        usuario = await funcoesDAO.buscarUsuEndereco(usu)

    res.render('pages/editinf', { usuario })

});

router.post('/editar', async (req, res) => {

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

    var usu = req.session.id_usu,

        usuario = await funcoesDAO.buscarUsuEndereco(usu)

    updateInfoUsu = await funcoesDAO.updateInfoUsu(dadosForm, usu)

    if (usuario[0].rua == null) {
        cadastrarEndereco = await funcoesDAO.cadastrarEndereco(dadosFormEnder)
    } else {
        updateInfoUsuEnder = await funcoesDAO.updateInfoUsuEnder(dadosFormEnder, usu)
    }
    res.redirect('/usuario')

})



// //////////////////////////////////////


router.get('/vendedor', function (req, res) {
    res.render('pages/vend')
});

router.get('/sair', (req, res) => {
    req.session.destroy();
    res.redirect('/');
})



router.get('/produto/:id', async (req, res) => {

    var id_produto = req.params.id;

    info = await funcoesDAO.buscarUsuUniforme(id_produto)


    res.render('pages/produto', { info })



})


module.exports = router;