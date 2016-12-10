var app = angular.module('pillarApp', ['angularUtils.directives.dirPagination']);

	app.config(function ($httpProvider) {
    	$httpProvider.defaults.headers.delete = { "Content-Type": "application/json;charset=utf-8" };
	});

	app.controller('dashboardCtrl', function($scope) {

		$scope.patients = [
						    {firstname:"Exbrayat", lastname:"Matthias", age:20, poids:70, taille: 1.85, city:"Châtillon", sexe:"M", question1:"yes", question2:"no",question3:"no",question4:"no",question5:"5"},
						    {firstname:"Dorai", lastname:"Sacha", age:20, poids:75, taille: 1.85, city:"Saint-Denis", sexe:"M", question1:"yes", question2:"no",question3:"yes",question4:"no",question5:"3"},
						    {firstname:"Enaux", lastname:"Florent", age:20, poids:70, taille: 1.75, city:"Nanterre", sexe:"M", question1:"yes", question2:"yes",question3:"no",question4:"no",question5:"2"},
						    {firstname:"Dias Perez", lastname:"Anais", age:20, poids:60, taille: 1.75, city:"Courbevoie", sexe:"F", question1:"yes", question2:"no",question3:"yes",question4:"yes",question5:"4"}
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

//Graphic heart frequency
$("#heartfrequency").length
	{
		var hf = [];

		for (var i = 0; i < 24; i += 1) {
			hf.push([i, 50+(100*Math.random())]);
		}

		var plot = $.plot($("#heartfrequency"),
			   [ { data: hf, label: "Heart Frequency" } ], {
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
				   yaxis: { min: 40, max: 160 },
				   colors: ["#666666",]
				 });
	};

//Graphic blood pressure
$("#bloodPressure").length
	{
		var bp = [140,130,160,90,85,79,127,118,115,140,130,160,90,85,79,127,118,115,127,118,115,140,113,116];

		for (var i = 0; i < 24; i += 1) {
			bp.push([i, bp[i]]);
		}

		var plot = $.plot($("#bloodPressure"),
			   [ { data: bp, label: "Blood pressure"}], {
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
				   yaxis: { min: 70, max: 190 },
				   colors: ["#ff3333"]
				 });
	};

//Graphic temperature
$("#temperature").length
	{
		var tp = [];

		for (var i = 0; i < 24; i += 1) {
			tp.push([i, 36.5+(2*Math.random())]);
		}

		var plot = $.plot($("#temperature"),
			   [ { data: tp, label: "Temperature" } ], {
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
				   yaxis: { min: 36.2, max: 38.7 },
				   colors: ["#00a3cc",]
				 });
	};
