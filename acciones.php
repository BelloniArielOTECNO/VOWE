<?php
//Conectamos a la base de datos
require('conexion.php');



$DATOS = json_decode($_POST['datos'],true);


//Obtenemos los datos del formulario de registro


$accion=$DATOS['ACC'];

switch ($accion) {
            //loguin buscar si el user existe y si coincide su pass
    case 1:
        $mailPOST=$DATOS['MAIL'];
        $passPOST=$DATOS['PASS'];

        $sql = "SELECT ID FROM VOWE.pers WHERE MAIL = '".$mailPOST."'";       //linea que hace la consulta
        $query = $conexion->prepare($sql);  //verifica query contra la conexion.
        $query->execute();					//ejecuta el query
        $result = $query->fetchAll();      //carga toda la query en la variable $result
        //echo $result;
        //$result[0][$i];
        $arrjson = json_encode($result);
        //echo $arrjson;
        if (strlen($arrjson)>2){
            //resultado no vacio se encontro el usuario.
            //verificando coincidencia de pass
            $sql = "SELECT ID FROM VOWE.pers WHERE MAIL = '".$mailPOST."' AND PASS = '".$passPOST."'";       //linea que hace la consulta
            $query = $conexion->prepare($sql);  //verifica query contra la conexion.
            $query->execute();					//ejecuta el query
            $result = $query->fetchAll();      //carga toda la query en la variable $result
            //echo $result;
            //$result[0][$i];
            $arrjson1 = json_encode($result);
            if (strlen($arrjson)>2){
                echo $arrjson1;
            }
        }

        break;
            //opc 2 guardar nuevo usuario
    case 2:
        $mailPOST=$DATOS['MAIL'];
        $sql = "SELECT ID FROM VOWE.pers WHERE MAIL = '".$mailPOST."'";       //linea que hace la consulta
        $query = $conexion->prepare($sql);  //verifica query contra la conexion.
        $query->execute();					//ejecuta el query
        $result = $query->fetchAll();      //carga toda la query en la variable $result

        $arrjson = json_encode($result);
        //echo $arrjson;
        if (strlen($arrjson)==2) { //si no encuentra el mail nuevo entra al if
            $nombrePOST = $DATOS['NOM'];
            $passPOST = $DATOS['PASS'];
            $mailPOST = $DATOS['MAIL'];
            $telPOST = $DATOS['TEL'];
            $desPOST = $DATOS['DES'];
            $B64POST = $DATOS['B64'];


            $consulta = "INSERT INTO `pers` 
                        (NOM, MAIL, TEL, BAJA, B64, DES,PASS) 
                        VALUES 
                        ('$nombrePOST', '$mailPOST','$telPOST' ,'0', '$B64POST','$desPOST','$passPOST')";


            //Obtenemos los resultados
            try {
                $resultadoConsulta = $conexion->prepare($consulta);
                $resultadoConsulta->execute();
                //$datosConsulta = $consulta->fetchAll();
                //$registros=count($datosConsulta);

                //              0           1       2            3         4           5         6           7          8       9           10       11    12    13      14
                //$items = array( $codigo, $empPOST, $nomPOST, $telPOST, $mailPOST, $idpcPOST, $tvusuPOST, $tvpasPOST, $okPOST, $fechPOST, $horaPOST, $dia, $mes, $anio, $hora);
                //echo json_encode($items);
                echo "Nuevo Usuario generado con Exito!";


            } catch (PDOException $e) {
                http_response_code(500);//LE FORZAS CODIGO 500
                echo "Error al insertar: " . $e->getMessage() . " QRY: " . $consulta;
            }
        }else{ //el email ya existe
            echo "El usuario/email ya existe!";
        }

        break;

        //opc 3 buscar articulos x ID
    case 3:
        $idPOST=$DATOS['ID'];

        $sql = "SELECT * FROM VOWE.prod WHERE IDVEND = '".$idPOST."'";//linea que hace la consulta
        $query = $conexion->prepare($sql);  //verifica query contra la conexion.
        $query->execute();					//ejecuta el query
        $result = $query->fetchAll();      //carga toda la query en la variable $result

        $arrjson = json_encode($result);
        echo $arrjson;

        break;
}// fin switch





