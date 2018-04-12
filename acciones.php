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

        $sql = "SELECT PASS FROM VOWE.pers WHERE MAIL = '".$mailPOST."'";       //linea que hace la consulta
        $query = $conexion->prepare($sql);  //verifica query contra la conexion.
        $query->execute();					//ejecuta el query
        $result = $query->fetchAll();      //carga toda la query en la variable $result

        //echo "user OK";
        if ($result[0]['PASS']){
            //resultado no vacio se encontro el usuario.
            //verificando coincidencia de pass
            $sql = "SELECT ID FROM VOWE.pers WHERE MAIL = '".$mailPOST."' AND PASS = '".$passPOST."'";       //linea que hace la consulta
            $query = $conexion->prepare($sql);  //verifica query contra la conexion.
            $query->execute();					//ejecuta el query
            $result = $query->fetchAll();      //carga toda la query en la variable $result
            $arrjson1 = json_encode($result);
            if ($result[0]['ID']){
                //echo "Pass OK";
                echo $arrjson1;
            }
        }else{echo "La clave es incorrecta";}

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

        $idPOST=$DATOS['IDVEND'];

        $sql = "SELECT * FROM VOWE.prod WHERE IDVEND = '".$idPOST."';";//linea que hace la consulta

        if ($idPOST==null){
            $sql = "SELECT * FROM VOWE.prod;";
        }


        $query = $conexion->prepare($sql);  //verifica query contra la conexion.
        $query->execute();					//ejecuta el query
        $result = $query->fetchAll();      //carga toda la query en la variable $result

        $arrjson = json_encode($result);
        echo $arrjson;

        break;

        //guardar articulo nuevo
    case 4:
        $desPOST=$DATOS['DES'];
        $des2POST=$DATOS['DES2'];
        $precioPOST=$DATOS['PRECIO'];
        $B64POST=$DATOS['B64'];
        $ranqPOST=$DATOS['RANQ'];
        $obsPOST=$DATOS['OBS'];
        $usuPOST=$DATOS['IDVEND'];

        $sql = "INSERT INTO `prod`
                        (DES, DES2, PRECIO, BAJA, B64, RANQ,OBS,IDVEND)
                        VALUES
                        ('$desPOST', '$des2POST','$precioPOST' ,'0','$B64POST','$ranqPOST','$obsPOST','$usuPOST')";
        //$sql = "SELECT * FROM VOWE.prod WHERE IDVEND = '".$idPOST."'";//linea que hace la consulta
        $query = $conexion->prepare($sql);  //verifica query contra la conexion.
        $query->execute();					//ejecuta el query
        $result = $query->fetchAll();      //carga toda la query en la variable $result

        //$arrjson = json_encode($result);
        //echo $arrjson;
        echo "guardado con exito";

        break;

        //buscar articulos publicados
    case 5:
        $idPOST=$DATOS['IDVEND'];

        $sql = "SELECT * FROM VOWE.prod WHERE IDVEND = '".$idPOST."' AND PUB = '1';";//linea que hace la consulta

        if ($idPOST==null){
            $sql = "SELECT * FROM VOWE.prod;";
        }


        $query = $conexion->prepare($sql);  //verifica query contra la conexion.
        $query->execute();					//ejecuta el query
        $result = $query->fetchAll();      //carga toda la query en la variable $result

        $arrjson = json_encode($result);
        echo $arrjson;
        break;

        //guardar articulos publicados
    case 6:
        $idPOST=$DATOS['IDVEND'];
        $CARR_POST = $DATOS['CARR'];

        $sql = "UPDATE VOWE.prod SET PUB = '0' WHERE IDVEND = '".$idPOST."' ;";//linea que saca todo de publicacion

        $query = $conexion->prepare($sql);  //verifica query contra la conexion.
        $query->execute();					//ejecuta el query
        //$result = $query->fetchAll();      //carga toda la query en la variable $result


        $sql = "UPDATE VOWE.prod SET PUB = '1' WHERE ";//construccion de linea que publica los articulos seleccionados.
        $inicio=true;
        for ($i=0;$i < count($CARR_POST);$i++){
            if ($inicio){
                $sql = $sql." ID=".$CARR_POST[$i]['ID'] ;//cinstruccion articulos seleccionados.
                $inicio=false;
            }else{
                $sql = $sql." OR ID=".$CARR_POST[$i]['ID'] ;//cinstruccion articulos seleccionados.
            }

        }
        $sql = $sql.";";

        $query = $conexion->prepare($sql);  //verifica query contra la conexion.
        $query->execute();					//ejecuta el query
        //$result = $query->fetchAll();      //carga toda la query en la variable $result


        //$arrjson = json_encode($result);
        echo $sql;
        break;
}// fin switch





