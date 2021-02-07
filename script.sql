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