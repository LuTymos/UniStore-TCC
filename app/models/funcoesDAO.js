module.exports = class TarefasDAO {

    constructor(conexao) {
        this.conexao = conexao;
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


}