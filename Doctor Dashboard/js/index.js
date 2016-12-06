var app = angular.module('pillarApp', ['angularUtils.directives.dirPagination']);

	app.config(function ($httpProvider) {
    	$httpProvider.defaults.headers.delete = { "Content-Type": "application/json;charset=utf-8" };
	});

	app.controller('indexCtrl', function($scope) {

		$scope.patients = [
						    {firstname:"Exbrayat", lastname:"Matthias", age:20, city:"Châtillon", sexe:"M"},
						    {firstname:"Dorai", lastname:"Sacha", age:20, city:"Saint-Denis", sexe:"M"},
						    {firstname:"Enaux", lastname:"Florent", age:20, city:"Nanterre", sexe:"M"},
						    {firstname:"Dias Perez", lastname:"Anais", age:20, city:"Courbevoie", sexe:"F"}
						  ];

		//Fonction de tri du tableau de patients
		$scope.sort = function(keyname){
			$scope.sortKey = keyname;
			$scope.reverse = !$scope.reverse;
		}

}); //fin controlleur