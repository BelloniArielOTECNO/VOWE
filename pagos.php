<?php
//Conectamos a la base de datos
require('conexion.php');



$DATOS = json_decode($_POST['datos'],true);


$empPOST = $DATOS['EMP'];
if (isset($DATOS['SUC'])){$sucPOST = $DATOS['SUC'];}else{$sucPOST=" ";}
if (isset($DATOS['NOM'])){$nomPOST = $DATOS['NOM'];}else{$nomPOST=" ";}
if (isset($DATOS['TEL'])){$telPOST= $DATOS['TEL'];}else{$telPOST=" ";}
$fechPOST = $DATOS['FP'];
$impPOST = $DATOS['IMP'];
if ($mpPOST = $DATOS['MP']==1){$mpPOST = "Tranferencia";}else{$mpPOST = "Deposito";};
if ($ctaPOST = $DATOS['CTA']==1){$ctaPOST="Credicoop";}else{$ctaPOST="Galicia";};
if (isset($DATOS['ADJUNTO'])){$filePOST =$DATOS['ADJUNTO'];}else{$filePOST="Sin Imagen";}
if (isset($DATOS['B64'])){$b64POST =$DATOS['B64'];}else{$b64POST="Sin Datos";}

$emailPOST= $DATOS['EMAIL'];



//Escribimos la consulta necesaria

$consulta = "INSERT INTO `pagos` 
(   EMP,        SUC,        NOM,      TEL,        FECH,         IMP,      MP,       CTA,      FILE,       B64, EMAIL) 
VALUES 
('$empPOST', '$sucPOST','$nomPOST' ,'$telPOST', '$fechPOST','$impPOST','$mpPOST','$ctaPOST','$filePOST','$b64POST','$emailPOST')";


//Obtenemos los resultados
try{
    $resultadoConsulta = $conexion->prepare($consulta);
    $resultadoConsulta->execute();
    //$datosConsulta = $consulta->fetchAll();


    $sql = "SELECT ID FROM inst.pagos WHERE id=(SELECT max(ID) FROM inst.pagos);";       //linea que hace la consulta

    $query = $conexion->prepare($sql);  //verifica query contra la conexion.
    $query->execute();					//ejecuta el query
    $result = $query->fetchAll();      //carga toda la query en la variable $result
//$result[0][$i];

    $arrjson = json_encode($result);



    echo $arrjson;

////                0           1       2            3         4        5       6       7         8
//    $items = array($empPOST, $sucPOST,$nomPOST ,$telPOST, $fechPOST,$impPOST,$mpPOST,$ctaPOST,$filePOST);

//    echo json_encode($items);




}catch(PDOException $e) {
    http_response_code(500);//LE FORZAS CODIGO 500
    echo "Error al insertar: " . $e->getMessage() . " QRY: " . $consulta;
}
