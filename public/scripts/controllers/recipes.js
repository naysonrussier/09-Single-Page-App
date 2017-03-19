'use strict';

angular.module('app')
.controller('RecipesController', function($scope, dataService, $location) {


	$scope.getRecipes = function() {
		dataService.getRecipes(function(response) {
		  $scope.recipes = response.data
		});
	}
	
	$scope.getCategories = function() {
		dataService.getCategories(function(response) {
		  $scope.categories = response.data;
		});
	}

	$scope.clear = function() {
		$scope.getRecipes();
		$scope.getCategories();
	}
	
 	$scope.filterByCategory = function() {
		dataService.getRecipesByCategory($scope.item.name, function(response) {
		  $scope.recipes = response.data
		});
	}
	 
	$scope.deleteData = function(id) {
		var answer = confirm("Are you sure you want to delete this recipe?")
		if (answer) {
			dataService.delRecipeById(id);
			$location.path('/').replace();
		}
		$scope.clear();
	}
  
	$scope.addNew = function() {
		$location.path('/add').replace();
	}
	
	$scope.clear();
});
