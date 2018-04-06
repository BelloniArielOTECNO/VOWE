<?php

$servername = "localhost";
$username = "root";
$password = "141425";

try {

    // sql database create
    $conn = new PDO("mysql:host=$servername;dbname=inst", $username, $password);
    // set the PDO error mode to exception
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $sql = "CREATE DATABASE inst";
    // use exec() because no results are returned
    $conn->exec($sql);
    echo "Database creada correctamente<br>";


    // sql to create table
    $sql = "CREATE TABLE safinst (
    ID INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY, 
    EMP VARCHAR(30) NOT NULL,
    NOM VARCHAR(30),
    TEL VARCHAR(50),
    IDPC VARCHAR(30) NOT NULL,
    TVUSU VARCHAR(30) NOT NULL,
    TVPAS VARCHAR(30) NOT NULL,
    OK VARCHAR(30) NOT NULL,
    ddmmyyyy VARCHAR(30) NOT NULL,
    HH VARCHAR(30) NOT NULL,
    GEN TIMESTAMP,
    MAIL VARCHAR(30) NOT NULL
    )";

    // use exec() because no results are returned
    $conn->exec($sql);
    echo "Table Tabla1 creada satisfactoriamente!";

    // sql to create table
    $sql = "CREATE TABLE pagos (
    ID INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY, 
    EMP VARCHAR(30) NOT NULL,
    SUC VARCHAR(30),
    NOM VARCHAR(30),
    TEL VARCHAR(30),
    FECH VARCHAR(30) NOT NULL,
    IMP VARCHAR(30) NOT NULL,
    MP VARCHAR(30) NOT NULL,
    CTA VARCHAR(30) NOT NULL,
    FILE VARCHAR(30),
    REGISTRADO TIMESTAMP
    )";

    // use exec() because no results are returned
    $conn->exec($sql);
    echo "Table Tabla1 creada satisfactoriamente!";




}
catch(PDOException $e)
{
    echo $sql . "<br>" . $e->getMessage();
}

$conn = null; //cierra la conexion
?>