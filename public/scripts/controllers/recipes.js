
(function() {
  'use strict';

  /*
This file provides the necessary controllers for the the recipe.html page to work
*/

	angular.module('app')
	.controller('RecipesController', function($scope, dataService, $location) {

	//Get data
		//get a list of the recipes
		$scope.getRecipes = function() {
			dataService.getRecipes(function(response) {
			  $scope.recipes = response.data;
			});
		};
		
		//get a list of the categories
		$scope.getCategories = function() {
			dataService.getCategories(function(response) {
			  $scope.categories = response.data;
			});
		};
		
		//refresh the lists 
		$scope.clear = function() {
			$scope.getRecipes();
			$scope.getCategories();
		};
		
		//filter all the recipe by a specific category
		$scope.filterByCategory = function() {
			dataService.getRecipesByCategory($scope.item.name, function(response) {
			  $scope.recipes = response.data;
			});
		};
		 
		//delete a specific recipe, with a confirmation box
		$scope.deleteData = function(id) {
			var answer = confirm("Are you sure you want to delete this recipe?");
			if (answer) {
				dataService.delRecipeById(id);
				$location.path('/').replace();
			}
			$scope.clear();
		};
		
		//navigate to the recipe-detail.html, to add a new recipe
		$scope.addNew = function() {
			$location.path('/add').replace();
		};
		
		//starting the app
		$scope.clear();
	});
})();
