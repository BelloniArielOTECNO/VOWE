<?php

//Conectamos a la base de datos
require('conexion.php');
require('Mailin.php');

$mailin = new Mailin('https://api.sendinblue.com/v2.0','w08IW2OnYycAXzRH',5000);

$DATOS = json_decode($_POST['datos'],true);


$toPOST = $DATOS['PARA'];
if (isset($DATOS['NPARA'])){$NparaPOST = $DATOS['NPARA'];}else{$NparaPOST=" ";}

$fromPOST = $DATOS['DE'];
if (isset($DATOS['NDE'])){$NdePOST = $DATOS['NDE'];}else{$NdePOST=" ";}

$replytoPOST = $DATOS['RESP'];
if (isset($DATOS['NRESP'])){$NrespPOST = $DATOS['NRESP'];}else{$NrespPOST=" ";}

$tituloPOST = $DATOS['TITULO'];

$textPOST = $DATOS['TEXTO'];

$htmlPOST = $DATOS['HTML'];


if(isset($DATOS['FILE'])){
    $filePOST = $DATOS['FILE'];
    $b64POST = str_replace('~','+',$DATOS['B64']);

    $b64POST= substr($b64POST,strpos($b64POST,","));
}else{
    $filePOST="LOGO.png";
    $b64POST="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";
}

/*
 * This will initiate the API with the endpoint and your access key.
 *
 */
$mailin = new Mailin('https://api.sendinblue.com/v2.0','w08IW2OnYycAXzRH',5000);

/*
 * This will send a transactional email
 *
 */
/** Prepare variables for easy use **/



$data = array( "to" => array($toPOST=>$NparaPOST),
    //"cc" => array("cc@example.net"=>"cc whom!"),
    //"bcc" =>array("bcc@example.net"=>"bcc whom!"),
    "from" => array("soporte@otecno.com","Otecno Soporte Técnico"),
    "replyto" => array("soporte@otecno.com","Otecno Soporte Técnico"),
    "subject" => $tituloPOST,
    "text" => $textPOST,
    "html" => $htmlPOST."<img src='{".$filePOST."}' alt='image' border='0'><br/>",
    "inline_image" => array($filePOST => $b64POST)
);
var_dump($mailin->send_email($data));

