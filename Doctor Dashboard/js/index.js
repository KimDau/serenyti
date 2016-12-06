var app = angular.module('pillarApp', ['angularUtils.directives.dirPagination']);

	app.config(function ($httpProvider) {
    	$httpProvider.defaults.headers.delete = { "Content-Type": "application/json;charset=utf-8" };
	});

	app.controller('indexCtrl', function($scope) {

		$scope.patients = [
						    {firstname:"Exbrayat", lastname:"Matthias", age:20, poids:70, taille: 1.85, city:"Châtillon", sexe:"M"},
						    {firstname:"Dorai", lastname:"Sacha", age:20, poids:75, taille: 1.85, city:"Saint-Denis", sexe:"M"},
						    {firstname:"Enaux", lastname:"Florent", age:20, poids:70, taille: 1.75, city:"Nanterre", sexe:"M"},
						    {firstname:"Dias Perez", lastname:"Anais", age:20, poids:60, taille: 1.75, city:"Courbevoie", sexe:"F"}
						  ];

		//Fonction de tri du tableau de patients
		$scope.sort = function(keyname){
			$scope.sortKey = keyname;
			$scope.reverse = !$scope.reverse;
		}

		//Fonction d'identification du patient choisi
		$scope.identifierPatient = function(id){
			$scope.patientSelect = $scope.patients[id-1];
			$scope.infoPatient = !$scope.infoPatient;
		}

}); //end of controlleur

<<<<<<< HEAD
$("#bloodPressure").length
	{
		var sin = [140,130,160,90,85,79,127,118,115,140,130,160,90,85,79,127,118,115,127,118,115,140];

		for (var i = 0; i < 24; i += 1) {
			sin.push([i, sin[i]]);
		}

		var plot = $.plot($("#bloodPressure"),
			   [ { data: sin, label: "Blood pressure"}], {
=======
//Graphic temperature

$("#temperature").length
	{
		var cos = [];

		for (var i = 0; i < 24; i += 0.5) {
			cos.push([i, 36.5+(2*Math.random())]);
		}

		var plot = $.plot($("#temperature"),
			   [ { data: cos, label: "Temperature" } ], {
>>>>>>> de10428d5e23826b360d2b9e0559a8980869203d
				   series: {
					   lines: { show: true,
								lineWidth: 5,
							 },
					   points: { show: true },
					   shadowSize: 5
				   },
				   grid: { hoverable: true, 
						   clickable: true, 
						   tickColor: "#dddddd",
						   borderWidth: 0 
						 },
<<<<<<< HEAD
				   yaxis: { min: 70, max: 190 },
				   colors: ["#FA5833", "#2FABE9"]
=======
				   yaxis: { min: 36.2, max: 38.7 },
				   colors: ["#FA5833",]
>>>>>>> de10428d5e23826b360d2b9e0559a8980869203d
				 });
	};
