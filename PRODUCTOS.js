var app = angular.module("app", ['ngDialog']);


app.controller ('Formulario' , function ($scope,$http,ngDialog){
    var bl=0;
    $scope.logID = localStorage.getItem("logID"); //recupera ID del user logueado


    // AJAX CON ANGULAR  DE ALEX buscar productos.

    $scope.ACC ={ACC:"3"};
    $scope.ACC.ID= localStorage.getItem("logID");

    dd='datos='+JSON.stringify($scope.ACC);
    //console.log($scope.ACC);
    //console.log(dd);
    $http.post('acciones.php',dd,{"headers":{"Content-Type": "application/x-www-form-urlencoded"}})
     .then(
     function(DATA){
        //console.log("LLEGO LA INFO BIEN!, PUEDE ESTAR VACIA PERO PHP NO TIRO ERROR");
        //console.log(DATA.data);
        $scope.DATA = DATA.data;

        for (var i=0;i < $scope.DATA.length;i++){
            //console.log($scope.DATA[i].B64.replace(/~/g, "\+"));
            $scope.DATA[i].B64=$scope.DATA[i].B64.replace(/~/g, "\+");
        }
     },
     function(DATA){
        //ERRROR!!!
        console.log(DATA.data);
     });




    //esta funcion guarda el formulario
    $scope.GUA = function(){
        //if(!$("#FRM").valid()){ //si no esta validado sale de la funcion
        //    return;
        //}

        //todo VALIDACIONES!

        if((!$scope.INS.FECH | !$scope.INS.HH) && $scope.FRM.$valid) { //si no estan llenas las variables da alerta y sale de la funcion

            //todo Tirale una alerta o lo que queiras
            //alert("Complete el paso numero 4");
            ngDialog.openConfirm({
                template:
                        '<h2>Complete el paso Número 5:</h2>' +
                        '<h3>Elija la fecha de instalación.</h3>' +
                        '<div class="ngdialog-buttons">' +
                        '<button type="button" class="ngdialog-button ngdialog-button-primary" ng-click="confirm()">OK' +
                        '</button>' +
                        '</div>',
                plain: true
            });

            return;
        }
        if((!$scope.INS.FECH || !$scope.INS.HH) && $scope.INS.OK){ //si no estan llenas las variables da alerta y sale de la funcion
            //todo Tirale una alerta o lo que queiras
            //alert("Seleccione una fecha valida!");
            ngDialog.openConfirm({
                template:
                '<h2>Seleccione una fecha valida!</h2>' +
                '<div class="ngdialog-buttons">' +
                '<button type="button" class="ngdialog-button ngdialog-button-primary" ng-click="confirm()">OK' +
                '</button>' +
                '</div>',
                plain: true
            });
            return;
        }

        if (!$scope.FRM.$valid){return;}

        if ($scope.INS.SUC !== undefined){$scope.INS.EMP+= " " + $scope.INS.SUC;}

        //TODO SI TODO ok gUARDAMOS!
        dd='datos='+JSON.stringify($scope.INS);
        $http.post('instalaciones.php',dd,{"headers":{"Content-Type": "application/x-www-form-urlencoded"}})
            .then(
                function(DATA){
                    //LLEGO LA INFO BIEN (PUEDE ESTAR VACIA PERO PHP NO TIRO ERROR)

                    //alert("GUADADO CON EXITO!!!! TU NUMERO DE INSTALACION ES: " + DATA.data);


                    /*ngDialog.openConfirm({
                        template:
                    '<h2>Formulario de instalacion creado con exito!</h2>' +
                    '<h3>Su numero de Guia es :</h3><h2>'+DATA.data+'</h2>',
                        plain:true });
                        */
                    console.log(DATA.data.length);
                    CUERPO='<h2>Formulario de instalacion creado con exito!</h2>' +
                        '<h3>Su numero de Guia es :</h3><h2>'+DATA.data[0]+'</h2>' +
                        '<h2>Datos del Turno tomado:</h2>'+
                        '<h4>Empresa: '+DATA.data[1]+'</h4>'+
                        '<h4>Contacto: '+DATA.data[2]+'</h4>'+
                        '<h4>Telefono: '+DATA.data[3]+'</h4>'+
                        '<h4>Mail: '+DATA.data[4]+'</h4>'+
                        '<h4>Fecha: '+DATA.data[11]+'/'+DATA.data[12]+'/'+DATA.data[13]+'</h4>'+
                        '<h4>Turno: '+DATA.data[14]+'Hs.</h4>';
                    CUERPO1='<P>Se enviarán a su email los datos del formulario. y el día de su turno será contactado por el Personal de OTECNO para realizar la instalación.</br></P>';
                    CUERPO2= '<P>Verifique que: El PC donde se realizará la instalación este encendido, tenga servicio de internet y TeamViewer esté abierto. Muchas Gracias</P>';

                    if (DATA.data.length<50){ //cuando el array de devolucion no viene sano posee mas de 15 registros 615 normalmente. esto es por algun error en la escritura del SQL.
                        ngDialog.openConfirm({template:CUERPO+CUERPO1+CUERPO2+
                        '<div class="ngdialog-buttons">' +
                        '<button type="button" class="ngdialog-button ngdialog-button-primary" ng-click="confirm(1)">OK' +
                        '</button>' +
                        '</div>',
                            plain: true,
                            closeByDocument: false,
                            closeByEscape: false
                        }).then(function (confirm) {
                            //alert("Enviar mail a:"+DATA.data[4]);

                            $scope.MAIL = {PARA:DATA.data[4]};
                            console.log($scope.MAIL.PARA);
                            $scope.MAIL.NPARA = DATA.data[1];
                            console.log($scope.MAIL.NPARA);
                            $scope.MAIL.DE = "soporte@otecno.com";
                            $scope.MAIL.NDE = "Soporte Técnico Otecno";
                            $scope.MAIL.RESP = "soporte@otecno.com";
                            $scope.MAIL.NRESP = "Soporte Otecno";
                            $scope.MAIL.TITULO = 'Turno ' + DATA.data[0] + ' instalación Otecno';
                            $scope.MAIL.TEXTO = "Texto del cuerpo del mensaje";
                            $scope.MAIL.HTML =CUERPO+CUERPO2;
                            //$scope.MAIL.FILE = $scope.PAG.ADJUNTO;
                            //$scope.MAIL.B64 = $scope.PAG.B64;
                            //console.log($scope.PAG.ADJUNTO);
                            //console.log($scope.PAG.B64);

                            dd = 'datos=' + JSON.stringify($scope.MAIL);
                            $http.post('envmail.php', dd, {"headers": {"Content-Type": "application/x-www-form-urlencoded"}})
                                .then(
                                    function (DATA) {
                                        console.log("Envio del E-Mail:"+DATA.statusText);
                                        //if(DATA.statusText!="OK"){alert("falla al enviar el E-mail")}else{alert("mail enviado con exito")}
                                        window.close();
                                    },
                                    function (DATA) {
                                        //ERRROR!!!
                                        console.log(DATA.data);
                                        alert("error : " + DATA.data);
                                    })
                            window.close();

                        }, function(reject) {
                            //alert('El turno ya fue tomado y guardado en la base de datos, desde este punto no puede rechazar el turno. Si desea cancelarlo o realizar alguna otra accion por favor comuniquese con oporte tecnoco al 011 5368 5892 Gracias.')
                            ngDialog.openConfirm({
                                template:
                                '<h2>El turno ya fue tomado y guardado en la base de datos, desde este punto no puede rechazar el turno. Si desea cancelarlo o realizar alguna otra acción por favor comuniquese con soporte tecnico al 011 5368 5892 Gracias.</h2>' +
                                '<div class="ngdialog-buttons">' +
                                '<button type="button" class="ngdialog-button ngdialog-button-primary" ng-click="confirm()">OK' +
                                '</button>' +
                                '</div>',
                                plain: true,
                                closeByDocument: false,
                                closeByEscape: false
                            }).then(function (confirm) {
                                    //alert("el turno fue tomado acept");
                                    window.close();
                                },
                                function(reject) {
                                    //alert("el  turno fue tomado reject");
                                    window.close();
                                }
                            );

                        });
                    }else{
                        //alert('Array de retorno roto')
                        ngDialog.openConfirm({
                            template:
                            '<h2>Error Break Array return!.#'+DATA.data.length+'</h2>' +
                            '<div class="ngdialog-buttons">' +
                            '<button type="button" class="ngdialog-button ngdialog-button-primary" ng-click="confirm()">OK' +
                            '</button>' +
                            '</div>',
                            plain: true,
                            closeByDocument: false,
                            closeByEscape: false
                        }).then(function (confirm) {
                                //alert("el turno fue tomado acept");
                                window.close();
                            },
                            function(reject) {
                                //alert("el  turno fue tomado reject");
                                window.close();
                            }
                        );
                    }



                    //blanqueo del formulario
                    $scope.rowData[xrow[0].data.ID][fechasel]=1;
                    $scope.G.api.setRowData($scope.rowData);

                    $scope.INS={};
                    $scope.F742=false;
                    fant="";
                    cant="";
                    fechasel="";
                    dant="";
                    celldato="";
                    //todo cerrar esta pagina y abrir index.


                },
                function(DATA){
                    //ERRROR!!!
                    console.log(DATA.data);
                });


    }

});// fin controlador




