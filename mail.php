<?php

//function mail_otc_sendgrid($deNombre,$deMail,$paraNombre,$paraMail,$asunto,$msj,$detalle){
$deNombre="Otecno Soporte Técnico";
$deMail="soporte@otecno.com";
$paraNombre="belloniariel@yahoo.com.ar";
$paraMail="Ari Belloni1";
$asunto="Prueba desde sendgrid";
$msj="Mensaje de prueba desde sendgrid";
$detalle="detalle del mensaje desde sendgrid";



    require_once 'sendgrid/lib/helpers/mail/Mail.php';
    require_once 'sendgrid/lib/Client.php';
    require_once 'sendgrid/lib/Response.php';
    require_once 'sendgrid/lib/SendGrid.php';


    $from = new SendGrid\Email($deNombre, $deMail);
    $to = new SendGrid\Email($paraNombre, $paraMail);
    $content = new SendGrid\Content("text/html", $msj);
    $mail = new SendGrid\Mail($from, $asunto, $to, $content);

    $apiKey = "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";

    $sg = new \SendGrid($apiKey);

    $response = $sg->client->mail()->send()->post($mail);

    return $response->statusCode();

    /*if($detalle == '1') {

        $detalle = "CODIGO: " . $response->statusCode() . "<br>";

        for($i = 0;$i<= sizeof($response->headers())-1;$i++){
            $detalle .=$response->headers()[$i]."<br>";
        }

        $detalle .= "\r\n ".$response->body();

        return $detalle;
    }else{
        return $response->statusCode();
    }*/
//}