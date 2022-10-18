module.exports = class TarefasDAO {

    constructor(conexao) {
        this.conexao = conexao;
    }

    buscarUsuEndereco = (usu)=>{
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







}