
var myApp = angular.module('myApp', []);

myApp.controller('AppCtrl', ['$scope', '$http',
function ($scope, $http) {
    console.log("This is the first Controller message for Address Book app.");


    //$http.get('/addresslist').success(function(response){
    //console.log("I got the data that I requested");
    //    $scope.addresslist = response;
    //});

    $http.get('/AddressBook').success(function(response){
        console.log("I got the data that I requested");
        $scope.AddressBook = response;
    });

    var refresh = function() {
        $http.get('/AddressBook').success(function(response) {
            console.log("I got the data I requested");
            $scope.AddressBook = response;
            $scope.address = "";
        });
    };

    refresh();

    $scope.addAddress = function() {
        console.log($scope.address);
        $http.post('/AddressBook', $scope.address).success(function(response) {
            console.log(response);
            refresh();
        });
    };
   // $scope.addresslist =addresslist;

}]);