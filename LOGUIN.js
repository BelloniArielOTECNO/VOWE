var app = angular.module("appPag", ['ngDialog']);

app.controller ('Formulario' , function ($scope,$http,ngDialog) {



    function getBase64(file) {
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            //console.log(reader.result.match(/\+/g));
            //console.log(" reemplazado");

            //console.log(reader.result.replace(/\+/g, "~"));

            $scope.PAG.B64=reader.result.replace(/\+/g, "~");
        };
        reader.onerror = function (error) {
            console.log('Error: ', error);
            $scope.PAG.B64="";
        };

    }

    function archivo(evt) {
        var files = evt.target.files; // FileList object

        // Obtenemos la imagen del campo "file".
        for (var i = 0, f; f = files[i]; i++) {
            //Solo admitimos imágenes.
            if (!f.type.match('image.*')) {
                continue;
            }

            var reader = new FileReader();

            reader.onload = (function(theFile) {
                return function(e) {
                    // Insertamos la imagen
                    document.getElementById("list").innerHTML = ['<img class="thumb" src="', e.target.result,'" title="', escape(theFile.name), '"/>'].join('');

                    //envio el nombre de la imagen a la base de datos.
                    $scope.PAG.ADJUNTO = theFile.name;

                    //console.log(theFile);
                    getBase64(theFile);
                    //todo subir el archivo de imagen al servidor
                };
            })(f);

            reader.readAsDataURL(f);


        }
    }




    //document.getElementById('files').addEventListener('change', archivo, false);





    $scope.GUA = function() {
        //verificar que el user existe
        // AJAX CON ANGULAR  DE ALEX .
        $scope.ACC.ACC="1";
        //console.log($scope.ACC);

        dd='datos='+JSON.stringify($scope.ACC);
        //console.log(dd);
        $http.post('acciones.php',dd,{"headers":{"Content-Type": "application/x-www-form-urlencoded"}})
            .then(
                function(DATA){
                    //LLEGO LA INFO BIEN (PUEDE ESTAR VACIA PERO PHP NO TIRO ERROR)
                    localStorage.setItem("logID", DATA.data['0'].ID); //guarda el ID del user logueado en el navegador

                    //console.log(DATA.data);
                    //console.log("Logueado ID #=",DATA.data);
                    console.log("Logueado ID #=",DATA.data['0'].ID);
                    if ((DATA.data['0'].ID)!=undefined){ //si no es indefinido entra al ABM de productos
                        window.open('PRODUCTOS.html', 'Productos', '');
                    }else{
                        //alert("Loguin fallido");
                        ngDialog.openConfirm({
                            template:
                            '<h2>No se enceuntra la combinacion</h2>' +
                            '<h3>Desea crear una nueva cuenta?</h3>' +
                            '<div class="ngdialog-buttons">' +
                            '<button type="button" class="ngdialog-button ngdialog-button-primary" ng-click="confirm()">Nueva cuenta</button>' +
                            '<button type="button" class="ngdialog-button ngdialog-button-primary" ng-click="closeThisDialog(0)">Reintentar</button>' +

                            '</div>',
                            plain: true
                        }).then(function (value) {
                            window.open('NEWCTA.html','Nueva Cuenta','');

                            window.close();
                            },
                            function(reject) {

                                //window.close();
                            }
                        );
                    }

                },
                function(DATA){
                    //ERRROR!!!
                    console.log(DATA.data);
                    window.close();

                });
        //verificar qe coincide su pass
        //habilitar loguin con nro ID base

    }

    //logueado ok!!
    //ABM productos


});// fin controlador