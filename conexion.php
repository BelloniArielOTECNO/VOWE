<?php


$srv="localhost";
$srv_usu="root";
$srv_pas="141425";
$srv_dbs="VOWE";
$srv_puerto="3306";   //variables que completan la conexion PDO
try {
    $conexion = new PDO('mysql:host='.$srv.';port='.$srv_puerto.';dbname='.$srv_dbs,$srv_usu,$srv_pas, array(PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION, PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8"));  //generando la conexion PDO sobre la variable/objeto $con_pdo

    //$sql = "INSERT INTO safinst (NOMBRE,Pass) VALUES ('Alex','1234')";  		//sentencia mysql insert
    //$query = $conexion->prepare($sql);											//validacion de seguridad
    //$query->execute();															//ejecutar query

    //crear BD
    //$conexion = new PDO("mysql:host=$srv;dbname=mmv", $srv_usu, $srv_pas);
    //$sql = "CREATE DATABASE VOWE";  		//sentencia mysql create
    //$query = $conexion->prepare($sql);		//validacion de seguridad
    //$query->execute();

    //crear Tabla pers
    //$conexion = new PDO("mysql:host=$srv;dbname=$srv_dbs", $srv_usu, $srv_pas);

    //$sql = "CREATE TABLE pers (
    //ID INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    //NOM VARCHAR(30) NOT NULL,
    //MAIL VARCHAR(30) NOT NULL,
    //TEL VARCHAR(50),
    //BAJA INT(6),
    //B64 MEDIUMTEXT,
    //DES TEXT,
    //RANQ VARCHAR(50),
    //REGISTRADO TIMESTAMP
    //)";
    //$query = $conexion->prepare($sql);		//validacion de seguridad
    //$query->execute();

    //crear Tabla prod
    //$conexion = new PDO("mysql:host=$srv;dbname=$srv_dbs", $srv_usu, $srv_pas);
    //$sql = "CREATE TABLE prod (
    //ID INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    //DES VARCHAR(50),
    //DES2 TEXT,
    //PRECIO VARCHAR(10),
    //BAJA INT(6),
    //B64 MEDIUMTEXT,
    //RANQ VARCHAR(50),
    //OBS TEXT,
    //REGISTRADO TIMESTAMP
    //)";
    //$query = $conexion->prepare($sql);		//validacion de seguridad
    //$query->execute();

    //$sql = "SELECT * FROM ".$srv_dbs;  //sting mysql orden o query en mysql
    //$query = $conexion->prepare($sql);  //verifica query contra la conexion.
    //$query->execute();					//ejecuta el query
    //var_dump($query);

    //echo "OK " . $sql;
}
catch(PDOException $e)
{
    echo $sql . "<br>" . $e->getMessage();
}