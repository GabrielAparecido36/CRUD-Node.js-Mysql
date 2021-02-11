create database mercado;

use mercado;

create table produtos(
	id int not null auto_increment primary key,
    nomeProduto varchar(255),
    categoria varchar(255),
    codEan varchar(255),
    preco float
);

insert into produtos(nomeProduto, categoria, codEan, preco) values ('Leite condensado', 'Doce', 789100010010, 5.50);

create table usuarios(
	id_usuario int not null auto_increment primary key,
    email varchar(100) not null unique,
    senha varchar(100)
);

ALTER TABLE produtos ADD COLUMN imagem_produto varchar(255);

ALTER TABLE usuarios ADD COLUMN confirmacaoEmail boolean default false;
