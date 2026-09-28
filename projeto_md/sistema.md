# Sistema de Cadastro

# Criar uma estrutura do meu sistema

sistema/
index.html
conexao.php
.gitignore
css/
style.css
js/
script.js
image/
*.jpg
*.png
db/
Db_cadastro.SQL

## A pasta image deverá conter todas as imagens da pagina produtos, elas podem ser usadas com a extensão JPEG, JPG, PNG, todas as imagens serão reais ou seja serão imagem de produtos verdadeiros.


# Utlize as linguagens HTML, CSS, Javascript, php

## Utilize a linguagem HTML para criar os Markup (Marcação HTML), por exemplo: <div></div>

## Use também a linguagem HTML para criar os cards

## Utilize a linguagem CSS para criar interface mais estilizada, inclusive para os meus cards, coloque efeitos especiais e transition para todos os cards.

### Todos os cards devem ser clicáveis.

## Utilize a linguagem Javascript para que meu sistema seja interativo, autenticação e validação de usuario e senha.

## Utilize a linguagem PHP para criar conexão entre o meu sistema .html e o meu Banco de Dados.

### O meu Banco de Dados, será no PhpMyAdmin localmente, gere o código SQL do meu Sistema, e coloque o nome e a extensão: conexao.php

### O arquivo de conexao.php terá as quatros informações necessárias para o seu funcionamento que são: $host, $user, $password, $DBname

### DB_cadastro que será gerado o código SLQ para rodar no PhpMyAdmin localmente. 

## Crie os cadastros de Login / Senha para acessar o sistema com autenticação no meu Banco de Dados. Crie também o cadastro de clientes, fornecedores, produtos, vendas, estoque.

### Verifique a opção de criar conexão entre as minhas tabelas, principalmente produtos X estoque X vendas.

### Faça 2 inserts, para cada tabela do meu Banco de Dados, sendo que os dois logins terão dois niveis: Administrador e Convidados, o Administrador poderá fazer TUDO, porém o usuario Convidado poderá visualizar, pode consultar registros e inserir registros, O USUARIO CONVIDADOS NÃO PODE ACESSAR O BANCO DE DADOS E NÃO PODE DELETAR REGISTROS.

## Crie um Design elegante e moderno e intuitivo e também responsivo, faça transition de animation com efeitos especiais, use um Design UX/UI.

### Crie um arquivo style.css externo, gere todos os códigos do CSS, e faça o link deste arquivo nas paginas .html - Faça comentários no código CSS.

## O código Javascript, deverá ser externo, com o nome a extensão: script.js faça o link nas minhas paginas .html

## Nosso sistema deverá usar LGPD(Lei Geral de Proteção de Dados)

## Nosso sistema terá um div principal (HEADER) no topo da tela, contendo todos os links das varias paginas .html - como exemplo pode ser: página clientes, fornecedores, produtos, vendas, estoque.

## Na página de Clientes, eu preciso fazer CRUD, este CRUD deverá ser para todas as páginas.

## Coloque fotos nas paginas produtos e vendas e estoque, todos os fotos precisam estar dentro dos cards e ter o seu tamanho proporcional ao seu card.

## A página de Vendas deverá ser do tipo Dashboard, ou seja Grafico das Vendas, Evolução das Vendas por Vendedor, filtros por período, filtro por vendendor, filtro por data (Dia, Mês, Ano).

### Crie uma tabela de Vendedores com as informações de cada vendedor, como Nome, Quantidade de Produtos vendidos, faça o calculo do total de Vendas em reais. (Quantidade X Preço do Produto).

### A tabela de Estoque vai controlar o saldo do Estoque (Entradas e Saídas de cada produto).

## Aceito a sua sugestão para os campos das tabelas de clientes, fornecedores, produtos, vendas, estoque, vendedores.
