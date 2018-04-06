<?php
//Conectamos a la base de datos
require('conexion.php');

$DATOS = json_decode($_POST['datos'],true);

/*
http_response_code(500);//LE FORZAS CODIGO 500
echo json_encode(array($DATOS['EMP']));
echo json_encode(array($DATOS['NOM']));
echo json_encode(array($DATOS['TEL']));
echo json_encode(array($DATOS['IDPC']));
echo json_encode(array($DATOS['TVUSU']));
echo json_encode(array($DATOS['TVPAS']));
echo json_encode(array($DATOS['OK']));
echo json_encode(array($DATOS['FECH']));
echo json_encode(array($DATOS['HH']));
exit;
*/

// TOMALOS ASI >>>>> $DATOS['EMP']


//$DATOS['PC'];


//Obtenemos los datos del formulario de registro

$empPOST = $DATOS['EMP'];
$nomPOST = $DATOS['NOM'];
$telPOST = $DATOS['TEL'];
$mailPOST=$DATOS['MAIL'];
$idpcPOST = $DATOS['IDPC'];
$tvusuPOST = $DATOS['TVUSU'];
$tvpasPOST = $DATOS['TVPAS'];
$okPOST = isset($DATOS['OK']);
$fechPOST = $DATOS['FECH'];
$horaPOST = $DATOS['HH'];



//Escribimos la consulta necesaria
//$sql = "SELECT usernamelowercase FROM `mmv005`";
$consulta = "INSERT INTO `safinst` 
(EMP, NOM,TEL,MAIL, IDPC, TVUSU, TVPAS,OK,ddmmyyyy,HH) 
VALUES 
('$empPOST', '$nomPOST','$telPOST' ,'$mailPOST', '$idpcPOST','$tvusuPOST','$tvpasPOST','$okPOST','$fechPOST','$horaPOST')";


//Obtenemos los resultados
try{
    $resultadoConsulta = $conexion->prepare($consulta);
    $resultadoConsulta->execute();
    //$datosConsulta = $consulta->fetchAll();

    //$registros=count($datosConsulta);

    //armando el codigo del formulario.
    $anio = substr($fechPOST,0,4);
    $mes = substr($fechPOST, 4, 2);
    $dia = substr($fechPOST, 6, 2);
    $hora = substr($horaPOST, 6, 2);//.substr($horaPOST, 3, 2);
    $codigo=$mes.$dia.$hora;


////                0           1       2            3         4           5         6           7          8       9           10       11    12    13      14
    $items = array( $codigo, $empPOST, $nomPOST, $telPOST, $mailPOST, $idpcPOST, $tvusuPOST, $tvpasPOST, $okPOST, $fechPOST, $horaPOST, $dia, $mes, $anio, $hora);

    echo json_encode($items);

    //mail("belloniariel@gmail.com,belloniariel@yahoo.com.ar","asuntillo","Este es el cuerpo del mensaje");

    //bool mail ( string $a ,
    //        string $asunto ,
    //        string $mensaje
    //[, string $cabeceras adicionales
    //[, string $parametros adicionales ]]
    //      )



}catch(PDOException $e) {
    http_response_code(500);//LE FORZAS CODIGO 500
    echo "Error al insertar: " . $e->getMessage() . " QRY: " . $consulta;
}
