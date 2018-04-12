var app = angular.module("app", ['ngDialog']);

//esta directiva captura un archivos en B64
angular.module("app").directive("filesInput",
    function() {
        return { require: "ngModel", link:
            function postLink(scope,elem,attrs,ngModel) {
                elem.on("change",
                    function(e) {
                        file1=elem[0].files[0];
                        var reader = new FileReader();
                        reader.readAsDataURL(file1);
                        reader.onload = function () {
                            ngModel.$setViewValue(reader.result.replace(/\+/g, "~"));
                        };
                    }
                )
            }
        }
    }
);



app.controller ('Formulario' , function ($scope,$http,ngDialog) {
    //var CARR = [];
    $scope.CARR=[];
    $scope.logID = localStorage.getItem("logID"); //recupera ID del user logueado
    //console.log($scope.logID);

    //llenar Plublicados si hay loguin
    if ($scope.logID > 0) {
        // AJAX CON ANGULAR  DE ALEX buscar productos.

        $scope.ACC = {ACC: "5"}; //5 trae los articulos publicados por el vend logueado
        $scope.ACC.IDVEND = localStorage.getItem("logID");
        //console.log($scope.ACC);
        dd = 'datos=' + JSON.stringify($scope.ACC);
        //console.log($scope.ACC);
        //console.log(dd);
        $http.post('acciones.php', dd, {"headers": {"Content-Type": "application/x-www-form-urlencoded"}})
            .then(
                function (DATA) {
                    //console.log("LLEGO LA INFO BIEN!, PUEDE ESTAR VACIA PERO PHP NO TIRO ERROR");
                    //console.log(DATA.data);
                    //CARR = DATA.data;
                    //$scope.CARR = CARR;
                    $scope.CARR=DATA.data;
                    //console.log($scope.CARR);

                    for (var i = 0; i < $scope.CARR.length; i++) {
                        //console.log($scope.DATA[i].B64.replace(/~/g, "\+"));
                        $scope.CARR[i].B64 = $scope.CARR[i].B64.replace(/~/g, "\+");
                        //$scope.DATA[i].Hip=i; // insertar el hipervinculo para cada renglon
                    }
                },
                function (DATA) {
                    //ERRROR!!!
                    console.log(DATA.data);
                });
    }


    $scope.GUA_VEN = function () {
        if ($scope.C_CAMBIO){
            // AJAX CON ANGULAR  DE ALEX guardar publicaciones

            $scope.ACC ={ACC:"6"}; //6 modifica el campo PUB a 1 que es publicado!
            $scope.ACC.IDVEND = localStorage.getItem("logID");
            //$scope.ACC.CARR=CARR; //envia el array completo del carro de compras como objeto
            $scope.ACC.CARR=$scope.CARR; //envia el array completo del carro de compras como objeto

            dd='datos='+JSON.stringify($scope.ACC);
            //console.log($scope.ACC);
            //console.log(dd);
            $http.post('acciones.php',dd,{"headers":{"Content-Type": "application/x-www-form-urlencoded"}})
                .then(
                    function(DATA){
                        //console.log("LLEGO LA INFO BIEN!, PUEDE ESTAR VACIA PERO PHP NO TIRO ERROR");
                        console.log("-----------");
                        console.log(DATA.data);
                        //CARR=DATA.data;
                        //$scope.CARR = CARR;

                        //console.log($scope.CARR);

                        for (var i=0;i < $scope.CARR.length;i++){
                            //console.log($scope.DATA[i].B64.replace(/~/g, "\+"));
                            $scope.CARR[i].B64=$scope.CARR[i].B64.replace(/~/g, "\+");
                            //$scope.DATA[i].Hip=i; // insertar el hipervinculo para cada renglon
                        }
                    },
                    function(DATA){
                        //ERRROR!!!
                        console.log(DATA.data);
                    });
        }
    };

    //funcon de listado de productos segun user
    $scope.ARTS = function () {

        // AJAX CON ANGULAR  DE ALEX buscar productos.

        $scope.ACC ={ACC:"3"};//
        $scope.ACC.IDVEND = localStorage.getItem("logID");
        //console.log($scope.ACC);
        dd='datos='+JSON.stringify($scope.ACC);
        //console.log($scope.ACC);
        //console.log(dd);
        $http.post('acciones.php',dd,{"headers":{"Content-Type": "application/x-www-form-urlencoded"}})
            .then(
                function(DATA){
                    //console.log("LLEGO LA INFO BIEN!, PUEDE ESTAR VACIA PERO PHP NO TIRO ERROR");
                    //console.log(DATA.data);
                    $scope.DATA = DATA.data;

                    //console.log($scope.DATA);

                    for (var i=0;i < $scope.DATA.length;i++){
                        //console.log($scope.DATA[i].B64.replace(/~/g, "\+"));
                        $scope.DATA[i].B64=$scope.DATA[i].B64.replace(/~/g, "\+");
                        //$scope.DATA[i].Hip=i; // insertar el hipervinculo para cada renglon
                    }
                },
                function(DATA){
                    //ERRROR!!!
                    console.log(DATA.data);
                });
    };

    $scope.ARTS();

    $scope.orderByMe = function(x) {
            $scope.myOrderBy = x;
        };

    $scope.DETALLE = function (x) {
        console.log(x);
        ngDialog.openConfirm({
            template:
            '<t3>Detalle del articulo</t3><br>' +
            '<strong>Articulo: '+ x.DES +'</strong><br>'+
            '<strong>Descripcion: '+ x.DES2 +'</strong><br>'+
            '<strong>Precio: '+ x.PRECIO +'</strong><br>'+

            '<img src='+ x.B64 + ' alt="image" width="200" height="200" border="1" >'+

            '<div class="ngdialog-buttons">' +
            '<button type="button" class="ngdialog-button ngdialog-button-secondary" ng-click="closeThisDialog(0)">Cancelar' +
            '<button type="button" class="ngdialog-button ngdialog-button-primary" ng-click="confirm()">Añadir a la Compra' +
            '</button></div>',
            plain: true,

            closeByDocument: false,
            closeByEscape: false
        }).then(
            function(){
                $scope.C_ADD(x);
                console.log(x);

            },
            function(value){

            });

    };

    //añade el producto seleccionado al carrito array
    $scope.C_ADD = function (x) {
        coincidencia=false;
        $scope.CS=1;
        $scope.C_CAMBIO=x;
        //alert("agregando al carrito");
        //if (CARR.length>0){
        if ($scope.CARR.length > 0){

            //cl=CARR.length;
            cl=$scope.CARR.length;

            for (i=0;i < cl;i++){
                //if (CARR[i].ID == x.ID){
                if ($scope.CARR[i].ID == x.ID){

                        //si hay coincidencia
                    //CARR[i].CANT++;
                    $scope.CARR[i].CANT++;

                    //$scope.CARR=CARR;
                    coincidencia=true;
                    break;
                }
            }

            if (!coincidencia){
                x.CANT=1;
                //CARR.push(x);
                //$scope.CARR=CARR;
                $scope.CARR.push(x);
            }
        }else{
            x.CANT=1;
            //CARR.push(x);
            console.log($scope.CARR);
            $scope.CARR.push(x);

        }


        //$scope.CARR=CARR;
        //console.log($scope.CARR);
        // si se repite el id sumar cant y borrar id

    };

    // suprime del array carrito el producto clickeado
    $scope.C_SUPR =  function (x) {
        $scope.C_CAMBIO=1;

        $scope.CARR.splice(x, 1);
        if($scope.CARR.length==0){
            $scope.CARR=[];
            $scope.CS=null;
        }
    };

    $scope.ENV_MAIL = function () {
        // envia el mail com los items del carro Matriz $scope.CARR
        alert("enviando mail..");
    };

    $scope.LOGIN = function () {
        window.open('LOGIN.html','Loguin','');
        window.close();

    };

    //LOGOUT FUNCION
    $scope.LOGOUT = function () {
        localStorage.removeItem("logID");
        $scope.logID=undefined;
        $scope.CARR="";
        $scope.ARTS();

    };

    // funcion agregar producto.
    $scope.NVOART = function(){

            ngDialog.openConfirm({
                template:'add.html',
                closeByDocument: false,
                closeByEscape: false
            }).then(
                function (DATA) {
                    console.log("OK el ng dialog",DATA);
                    console.log(DATA);

                    //guardar en la BD si hay datos en DATA accion "4"
                    $scope.ADD = {ACC:"4"};
                    $scope.ADD.DES= DATA.DES;
                    $scope.ADD.DES2=DATA.DES2;
                    $scope.ADD.PRECIO=DATA.PRECIO;
                    $scope.ADD.B64=DATA.ARCH;
                    $scope.ADD.IDVEND=$scope.logID;
                    $scope.ADD.RANQ="3";/// todo manipular este dato
                    $scope.ADD.OBS="xx";// todo manipular este dato
                    if (true){
                        dd='datos='+JSON.stringify($scope.ADD);
                        //console.log($scope.ADD);
                        //console.log(dd);
                        $http.post('acciones.php',dd,{"headers":{"Content-Type": "application/x-www-form-urlencoded"}})
                            .then(
                                function(DATA){
                                    //console.log("LLEGO LA INFO BIEN!, PUEDE ESTAR VACIA PERO PHP NO TIRO ERROR");
                                    console.log("Guardado con exito");
                                    $scope.ARTS();

                                },
                                function(DATA){
                                    //ERRROR!!!
                                    console.log(DATA.data);
                                });
                    }
                },
                function (DATA) {
                    //ERRROR!!!
                    console.log("abort o error en la carga del articulo en la BD");
                });

        };


});// fin controlador




