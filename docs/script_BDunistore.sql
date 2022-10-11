create database UniStore;

use Unistore;

CREATE TABLE compra (
  id_compra INT NOT NULL AUTO_INCREMENT,
  data_pedido DATE NULL DEFAULT NULL,
  valor_total_compra DOUBLE NULL DEFAULT NULL,
  status_compra ENUM('finalizada', 'em andamento') NULL DEFAULT NULL,
  id_usu INT NOT NULL,
  PRIMARY KEY (id_compra),
    FOREIGN KEY (id_usu) REFERENCES usuario (id_usu)
);

create table usuario(
id_usu int auto_increment not null primary key,
cpf varchar(14),
email varchar(100),
nome varchar(50),
nome_usu varchar(50),
senha varchar(20),
celular varchar(15)
);


create table usuario_endereco(
id_endereco int auto_increment not null primary key,
rua varchar(200),
cep varchar(9),
bairo varchar(200),
cidade enum('barueri','osasco','santana de parnaiba','carapicuiba','jandira','itapevi'),
numero int(10),
id_usu int,
FOREIGN KEY(id_usu) REFERENCES usuario(id_usu)
);

create table instituicao (
nome_instituicao varchar(150) not null primary key
);

create table uniforme (
id_produto int not null auto_increment,
tamanho enum('P', 'M', 'G','infantil') not null, 
condicao enum('nova', 'seminova', 'usada') not null, 
titulo varchar(50) not null, 
foto longblob, 
descricao varchar(200), 
cor varchar(30), 
valor double, 
contato varchar(15),
nome_instituicao varchar(150) not null, 
id_usu int,
primary key (id_produto),
FOREIGN KEY (nome_instituicao) REFERENCES instituicao(nome_instituicao),
FOREIGN KEY (id_usu) REFERENCES usuario(id_usu)
);


CREATE TABLE compra_has_uniforme (
  compra_id_compra INT NOT NULL,
  uniforme_id_produto INT NOT NULL,
  quantidade INT NULL,
  subtotal DECIMAL(10,2) NULL,
  PRIMARY KEY (compra_id_compra, uniforme_id_produto),
FOREIGN KEY (compra_id_compra) REFERENCES compra (id_compra),
FOREIGN KEY (uniforme_id_produto) REFERENCES uniforme (id_produto)
    );















