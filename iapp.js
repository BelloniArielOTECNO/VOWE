var iapp = angular.module("iapp", []);

var aa=0;


iapp.controller ('Index' , function ($scope){

    $scope.PRODUCTOSopen = function() {
        window.open('PRODUCTOS.html', 'Productos', '');
    };

    $scope.VENDEDORESopen = function() {
        window.open('VENDEDORES.html', 'Vendedores', '');
    };

    $scope.NEWCTAopen = function() {
        window.open('NEWCTA.html', 'Nueva Cuenta', '');
    };

    $scope.LOGUINopen = function() {
        window.open('LOGIN.html', 'Loguin', '');
    };

});// fin controlador