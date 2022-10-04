create database UniStore;

use Unistore;

create table venda(
Id_venda int auto_increment, 
valor_total_venda double, 
data_venda date,
status_venda enum('finalizada', 'em andamento', 'disponivel'),
id_usu int not null,
PRIMARY KEY (Id_venda),
FOREIGN KEY(id_usu) REFERENCES usuario(id_usu)
);




create table compra(
id_compra int primary key auto_increment, 
quantidade int, 
data_pedido date, 
valor_total_compra double, 
status_compra enum('finalizada','em andamento'), 
id_usu int not null,
FOREIGN KEY (id_usu) REFERENCES usuario(id_usu)
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

update usuario SET cpf = '123.123.123-12' where id_usu = 2;




create table instituicao (
nome_instituicao varchar(150) not null primary key, 
logo longblob, 
localizacao varchar(300)
);

insert into instituicao values ('fieb belval','','Belval');
select * from instituicao;

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




create table uniforme (
id_produto int not null auto_increment,
tamanho enum('P', 'M', 'G','infantil') not null, 
condicao enum('nova', 'seminova', 'usada') not null, 
titulo varchar(20) not null, 
foto longblob, 
descricao varchar(200), 
cor varchar(30), 
valor double, 
contato varchar(15),
nome_instituicao varchar(150) not null, 
id_compra int,
Id_venda int,
primary key (id_produto),
FOREIGN KEY (nome_instituicao) REFERENCES instituicao(nome_instituicao),
FOREIGN KEY (id_compra) REFERENCES compra(id_compra),
FOREIGN KEY (Id_venda) REFERENCES venda(Id_venda)
);
select * from uniforme;

SELECT * FROM unistore.usuario inner join usuario_endereco on (usuario.id_usu = usuario_endereco.id_usu) where usuario.id_usu = 1;
insert into usuario values ('','168.391.360-43', 'lucas1234@gmail.com', 'lucas', 'lucas2', '1234','(11)978281477');
select * from usuario;
insert into usuario_endereco values ('', 'aaaa aaaaaaa', '06440-467', 'bla bla bla', 'barueri', '145', '1');
select * from usuario_endereco;

drop database unistore;















