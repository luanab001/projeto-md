<?php
$host = 'localhost';
$user = 'root';
$password = '';
$DBname = 'db_cadastro';

$conn = new mysqli($host, $user, $password, $DBname);

if ($conn->connect_error) {
    die('Erro na conexão com o banco de dados: ' . $conn->connect_error);
}

$conn->set_charset('utf8');
?>
