
use unistore;

-- selects

select * from usuario;
select * from compra_has_uniforme;
select * from instituicao;
select * from uniforme;
select * from usuario_endereco;

SELECT * FROM unistore.usuario left join usuario_endereco on (usuario.id_usu = usuario_endereco.id_usu) where usuario.id_usu = 1;

-- Inserts
-- instituicao
insert into instituicao values ('Fieb');
insert into instituicao values ('Chalupe');
insert into instituicao values ('Red Balloon');
insert into instituicao values ('Mackenzie');
insert into instituicao values ('Objetivo');
insert into instituicao values ('Day Care');

-- usuario
insert into usuario(cpf, email,nome, nome_usu, senha,celular) values ('526.114.628-36','lucas@gmail.com','lucas camilo tymoschneko','LucasTymos','1234','(11)978281477');

-- usu_endereco
insert into usuario_endereco(rua, cep, bairo, cidade, numero, id_usu) values ('Adriano Augusto', '06440-040','Aldeia de Barueri','Barueri','140','1');

-- uniforme
insert into uniforme(tamanho, condicao,titulo,foto,descricao,cor,valor,contato,nome_instituicao,id_usu) values ('M','nova','Camisa do ITB FIEB','','blablalbblalblb,lbmlbfdembdleb', 'Branca','25','(11)97828-1477','Fieb','1');
insert into uniforme(tamanho, condicao,titulo,foto,descricao,cor,valor,contato,nome_instituicao,id_usu) values ('G','Seminova','Calça do ITB FIEB','','blablalbblalblb,lbmlbfdembdleb', 'Verde','25','(11)97828-1477','Fieb','1');
insert into uniforme(tamanho, condicao,titulo,foto,descricao,cor,valor,contato,nome_instituicao,id_usu) values ('P','usada','Camisa do Chalupe','','blablalbblalblb,lbmlbfdembdleb', 'Amarela','45','(11)97828-1477','Chalupe','1');
insert into uniforme(tamanho, condicao,titulo,foto,descricao,cor,valor,contato,nome_instituicao,id_usu) values ('M','nova','Camisa do Mackenzie','','blablalbblalblb,lbmlbfdembdleb', 'Branca','55','(11)97828-1477','Mackenzie','1');
insert into uniforme(tamanho, condicao,titulo,foto,descricao,cor,valor,contato,nome_instituicao,id_usu) values ('M','nova','Jaleco','','blablalbblalblb,lbmlbfdembdleb', 'Branca','25','(11)97828-1477','Fieb','1');










