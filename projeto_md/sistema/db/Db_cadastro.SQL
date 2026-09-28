-- Banco de Dados : Db_cadastro
CREATE DATABASE IF NOT EXISTS db_cadastro;
USE db_cadastro;

CREATE TABLE IF NOT EXISTS usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(150) NOT NULL,
    usuario VARCHAR(80) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL,
    nivel ENUM('Administrador', 'Convidado') NOT NULL DEFAULT 'Convidado',
    email VARCHAR(150) NOT NULL,
    cpf VARCHAR(14),
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS clientes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(150) NOT NULL,
    email VARCHAR(150) NOT NULL,
    telefone VARCHAR(20),
    cidade VARCHAR(120),
    status ENUM('Ativo', 'Inativo') DEFAULT 'Ativo',
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS fornecedores (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(150) NOT NULL,
    contato VARCHAR(150),
    email VARCHAR(150),
    telefone VARCHAR(20),
    cnpj VARCHAR(18),
    cidade VARCHAR(120),
    status ENUM('Ativo', 'Inativo') DEFAULT 'Ativo',
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS produtos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(150) NOT NULL,
    categoria VARCHAR(100),
    marca VARCHAR(100),
    preco DECIMAL(10,2) NOT NULL,
    estoque_minimo INT DEFAULT 0,
    descricao TEXT,
    imagem VARCHAR(255),
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS vendedores (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(150) NOT NULL,
    email VARCHAR(150),
    telefone VARCHAR(20),
    comissao DECIMAL(5,2) DEFAULT 0.00,
    meta_mensal DECIMAL(10,2) DEFAULT 0.00,
    status ENUM('Ativo', 'Inativo') DEFAULT 'Ativo',
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS estoque (
    id INT AUTO_INCREMENT PRIMARY KEY,
    produto_id INT NOT NULL,
    quantidade_entrada INT DEFAULT 0,
    quantidade_saida INT DEFAULT 0,
    saldo INT DEFAULT 0,
    data_movimento DATE NOT NULL,
    observacao TEXT,
    FOREIGN KEY (produto_id) REFERENCES produtos(id),
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS vendas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    cliente_id INT NOT NULL,
    vendedor_id INT NOT NULL,
    produto_id INT NOT NULL,
    quantidade INT NOT NULL,
    valor_unitario DECIMAL(10,2) NOT NULL,
    valor_total DECIMAL(10,2) NOT NULL,
    data_venda DATE NOT NULL,
    status ENUM('Concluída', 'Cancelada', 'Pendente') DEFAULT 'Concluída',
    FOREIGN KEY (cliente_id) REFERENCES clientes(id),
    FOREIGN KEY (vendedor_id) REFERENCES vendedores(id),
    FOREIGN KEY (produto_id) REFERENCES produtos(id),
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO usuarios (nome, usuario, senha, nivel, email, cpf) VALUES
('Administrador Master', 'admin', 'admin123', 'Administrador', 'admin@empresa.com', '123.456.789-00'),
('Convidado Visual', 'convidado', 'convidado123', 'Convidado', 'convidado@empresa.com', '987.654.321-00');

INSERT INTO clientes (nome, email, telefone, cidade, status) VALUES
('Maria Souza', 'maria@exemplo.com', '(11) 98888-1111', 'São Paulo', 'Ativo'),
('João Pereira', 'joao@exemplo.com', '(21) 97777-2222', 'Rio de Janeiro', 'Ativo');

INSERT INTO fornecedores (nome, contato, email, telefone, cnpj, cidade, status) VALUES
('Distribuidora Norte', 'Carlos Franco', 'contato@distribuidoranorte.com', '(11) 3333-4444', '12.345.678/0001-99', 'São Paulo', 'Ativo'),
('Fornecimento Vale', 'Ana Ribeiro', 'vendas@fornecimentovale.com', '(31) 2999-1122', '98.765.432/0001-88', 'Belo Horizonte', 'Ativo');

INSERT INTO produtos (nome, categoria, marca, preco, estoque_minimo, descricao, imagem) VALUES
('Notebook Pro 15', 'Tecnologia', 'AlphaTech', 4599.90, 10, 'Notebook profissional com SSD e 16GB RAM.', 'image/notebook.png'),
('Cafeteira Premium', 'Casa', 'BrewMaster', 899.00, 15, 'Cafeteira com controle digital e espuma perfeita.', 'image/cafeteira.png');

INSERT INTO vendedores (nome, email, telefone, comissao, meta_mensal, status) VALUES
('Pedro Lima', 'pedro@empresa.com', '(11) 95555-1010', 8.50, 15000.00, 'Ativo'),
('Renata Costa', 'renata@empresa.com', '(11) 95555-2020', 9.00, 18000.00, 'Ativo');

INSERT INTO estoque (produto_id, quantidade_entrada, quantidade_saida, saldo, data_movimento, observacao) VALUES
(1, 50, 12, 38, '2026-08-01', 'Entrada de lote e vendas do mês.'),
(2, 30, 8, 22, '2026-08-05', 'Reposição de estoque da loja.');

INSERT INTO vendas (cliente_id, vendedor_id, produto_id, quantidade, valor_unitario, valor_total, data_venda, status) VALUES
(1, 1, 1, 2, 4599.90, 9199.80, '2026-08-10', 'Concluída'),
(2, 2, 2, 3, 899.00, 2697.00, '2026-08-12', 'Concluída');

-- Relacionamentos e consultas sugeridas:
-- SELECT p.nome, e.saldo FROM produtos p JOIN estoque e ON e.produto_id = p.id;
-- SELECT v.nome, SUM(vd.valor_total) AS total_vendas FROM vendedores v JOIN vendas vd ON vd.vendedor_id = v.id GROUP BY v.nome;
-- SELECT c.nome, COUNT(v.id) AS qtd_vendas FROM clientes c LEFT JOIN vendas v ON v.cliente_id = c.id GROUP BY c.nome;
