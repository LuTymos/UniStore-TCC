module.exports = class TarefasDAO {

    constructor(conexao) {
        this.conexao = conexao;
    }

    // BUSCAS

    buscarUsuUniforme = (id_produto) => {
        return new Promise((resolve, reject) => {
            this.conexao.query("SELECT * FROM unistore.uniforme left join usuario on (uniforme.id_usu = usuario.id_usu) where id_produto = ?",
                id_produto,
                (error, elements) => {
                    if (error) {
                        return reject(error);
                    }

                    return resolve(elements);
                })
        })
    }

    buscarUsuEndereco = (usu) => {
        return new Promise((resolve, reject) => {
            this.conexao.query("SELECT * FROM unistore.usuario left join usuario_endereco on (usuario.id_usu = usuario_endereco.id_usu) where usuario.id_usu = ?",
                usu,
                (error, elements) => {
                    if (error) {
                        return reject(error);
                    }

                    return resolve(elements);
                })
        })
    }

    buscarUniformes = () => {
        return new Promise((resolve, reject) => {
            this.conexao.query("SELECT * FROM unistore.uniforme",
                (error, elements) => {
                    if (error) {
                        return reject(error);
                    }

                    return resolve(elements);
                })
        })
    }

    buscarUniformesCarrinho = (id) => {
        return new Promise((resolve, reject) => {
            this.conexao.query("SELECT * FROM unistore.uniforme where id_produto = ?", id,
                (error, elements) => {
                    if (error) {
                        return reject(error);
                    }

                    return resolve(elements);
                })
        })
    }

    login = (dadosForm) => {
        return new Promise((resolve, reject) => {
            this.conexao.query("select * from usuario where email = ? and senha = ?",
                [dadosForm.email, dadosForm.senha],
                (error, elements) => {
                    if (error) {
                        return reject(error);
                    }

                    return resolve(elements);
                })
        })

    }

    // ////////////////////////////////////

    // INSERTS

    cadastro = (dadosForm) => {
        return new Promise((resolve, reject) => {
            this.conexao.query("INSERT INTO usuario SET ?",
                dadosForm,
                function (error, elements) {
                    if (error) {
                        return reject(error)
                    }

                    return resolve(elements);
                }
            )
        })
    }

    cadastrarEndereco = (dadosFormEnder) => {
        return new Promise((resolve, reject) => {
            this.conexao.query("INSERT INTO usuario_endereco SET ?",
                dadosFormEnder,
                function (error, elements) {
                    if (error) {
                        return reject(error)
                    }

                    return resolve(elements);
                }
            )
        })
    }


    cadastroProduto = (dadosForm) => {
        return new Promise((resolve, reject) => {
            this.conexao.query("INSERT INTO uniforme SET ?",
                dadosForm,
                function (error, elements) {
                    if (error) {
                        return reject(error)
                    }

                    return resolve(elements);
                }
            )
        })
    }
    // /////////////////////////

    // UPDATES

    updateInfoUsu = (dadosForm, usu) => {
        return new Promise((resolve, reject) => {
            this.conexao.query("update usuario SET ? where id_usu = ?",
                [dadosForm, usu],
                function (error, elements) {
                    if (error) {
                        return reject(error)
                    }

                    return resolve(elements);
                }
            )
        })
    }

    updateInfoUsuEnder = (dadosFormEnder, usu) => {
        return new Promise((resolve, reject) => {
            this.conexao.query("update usuario_endereco SET ? where id_usu = ?",
                [dadosFormEnder, usu],
                function (error, elements) {
                    if (error) {
                        return reject(error)
                    }

                    return resolve(elements);
                }
            )
        })
    }















}