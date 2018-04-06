var app = angular.module("appCONS", ['ngDialog']);

app.controller ('Formulario' , function ($scope,$http,ngDialog) {

    function getBase64(file) {
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
          $scope.P.B64=reader.result.replace(/\+/g, "~");
        };
        reader.onerror = function (error) {
            console.log('Error: ', error);
            $scope.P.B64="";
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
                    //$scope.P.ADJUNTO = theFile.name;

                    //console.log(theFile);
                    getBase64(theFile);
                    //todo subir el archivo de imagen al servidor
                };
            })(f);

            reader.readAsDataURL(f);


        }
    }
    document.getElementById('files').addEventListener('change', archivo, false);



    $scope.GUA = function(){

        //todo VALIDACIONES!



        //TODO SI TODO ok gUARDAMOS!

        $scope.P.ACC ="2";

        console.log($scope);

        dd='datos='+JSON.stringify($scope.P);
        $http.post('acciones.php',dd,{"headers":{"Content-Type": "application/x-www-form-urlencoded"}})
            .then(
                function(DATA){
                    //console.log("RES=",DATA.data);
                    //alert("LLEGO LA INFO BIEN (PUEDE ESTAR VACIA PERO PHP NO TIRO ERROR");
                    alert(DATA.data);
                    window.close();
                }, function (reason) {
                    console.log(reason);
                }
            );


    }, function(DATA){
        //ERRROR!!!
        console.log(DATA.data);
    }






});