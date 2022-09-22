create database UniStore;

use Unistore;

create table usuario(
id_usu int auto_increment not null primary key,
cpf varchar(14),
email varchar(100),
nome varchar(50),
senha varchar(20),
telefone varchar(15)
);

create table usuario_endereco(
rua varchar(200),
cep varchar(9),
bairo varchar(200),
cidade enum('barueri','osasco','santana de pernaiba','carapicuiba','jandira','itapevi'),
numero int(10),
id_usu int,
PRIMARY KEY (Id_usu),
FOREIGN KEY(id_usu) REFERENCES usuario(id_usu)
);


create table venda(
Id_venda int not null auto_increment, 
valor_total_venda int, 
data_venda date, 
status_venda enum('finalizada', 'em andamento', 'disponivel'), 
id_usu int not null,
PRIMARY KEY (Id_venda),
FOREIGN KEY(id_usu) REFERENCES usuario(id_usu)
);



create table compra(
id_compra int not null primary key auto_increment, 
quantidade int, 
data_pedido date, 
valor_total_compra int, 
status_compra enum('finalizada','em andamento'), 
id_usu int not null,
FOREIGN KEY (id_usu) REFERENCES usuario(id_usu)
);

create table instituicao (
nome_instituicao varchar(150) not null primary key, 
logo longblob, 
localizacao varchar(300)
);



create table uniforme (
id_produto int not null auto_increment,
tamanho varchar(2) not null, 
condição enum('nova', 'seminova', 'usada') not null, 
titulo varchar(20) not null, 
foto longblob, 
descricao varchar(200), 
cor varchar(30), 
valor int, 
nome_instituicao varchar(150) not null, 
id_compra int, 
Id_venda int,
primary key (id_produto),
FOREIGN KEY (nome_instituicao) REFERENCES instituicao(nome_instituicao),
FOREIGN KEY (id_compra) REFERENCES compra(id_compra),
FOREIGN KEY (Id_venda) REFERENCES venda(Id_venda)
);






