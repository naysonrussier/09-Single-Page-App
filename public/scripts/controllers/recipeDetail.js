(function() {
  'use strict';
/*
This file provides the necessary controllers for the the recipe-detail.html page to work
*/

	angular.module('app')
	.controller("RecipeDetailController", function($scope, dataService, $location) {

	//Starting with a few variables : 

		$scope.errors = [];
		
		$scope.edited = false;
		
		$scope.recipeId = $location.path().substr(6);
		

	//Basics functions:
		//These functions provide  the structure of the recipe Object
		function recipeDetails_Ingredients(){
			return {"foodItem":"","condition":"","amount":""};
		}
		function recipeDetails_steps() {
			return {"description":""};
		}
		function recipeDetails() {
			return {"name":"","description":"","category":"","prepTime":0,"cookTime":0,"ingredients": [recipeDetails_Ingredients()],"steps": [recipeDetails_steps()]};
		}
		
		//This function will let the user know when there are errors
		function error(message) {
			if(message == "") {
				$scope.errors.push({message: "An error as occured. Please check your internet connection, or try again."});
			} else {
				$scope.errors.push({message : message});
			}
		}
		
		//returning to the home page
		$scope.returnHome = function(message) {
			if(message != null) {
				alert(message);
			}
			$location.path("/");
		};
		
		//This function catch the correct recipe, base on his ID
		//If ths user is just adding a new recipe, it will only provide the structure of a recipe
		$scope.getRecipe = function() {
			if($scope.recipeId != "") {
				dataService.getRecipesById($scope.recipeId, function(res) {
					$scope.recipe = res.data;
				}, function(res) {
					error(res.data);
				});
			} else {
				$scope.recipe = recipeDetails();
			}
		};
		
		//This function will save or add a new recipe
		$scope.saveRecipe = function() {
			function success() {
				$scope.edited = false;
				$scope.returnHome("Your recipe has been successfully saved!!!");
			}
			if($scope.recipeId != "") {
				dataService.updateRecipesById($scope.recipeId,$scope.recipe,success(),function(res) {
					error(res.statusText);
				});
			} else {
				dataService.postRecipe($scope.recipe,success(),function(res) {
					error(res.statusText);
				});
			}
		};
		
	//These functions will let the user delete, and add steps, or ingredients
		$scope.addIngredients = function() {
			$scope.recipe.ingredients.push(recipeDetails_Ingredients());
		};
		
		$scope.deleteIngredient = function(step, $index) {
			$scope.recipe.ingredients.splice($index, 1);
		};
			
		$scope.addSteps = function() {
			$scope.recipe.steps.push(recipeDetails_steps());
		};
		
		$scope.deleteStep = function($index) {
			$scope.recipe.steps.splice($index, 1);
		};
		
	//Get data
		//get the recipe details
		$scope.getRecipe();
			
		//get all of the categories
		dataService.getCategories(function(response) {
		  $scope.categories = response.data;
		});
			
		//get a list of the food Items
		dataService.getFoodItems(function(res) {
			$scope.foodItems = res.data;
		});

	//Event listeners
		//on every change, change "edited" to true
		$("*").on('keydown', function() {
			$scope.edited = true;
		});
		
		//if edited is true, the pop up an alert box when leaving the page
		$scope.$on('$locationChangeStart', function( event ) {
			if($scope.edited) {
				var answer = confirm("Are you sure you want to leave this page? All your modifications won't be saved.");
				if (!answer) {
					event.preventDefault();
				}
			}
		});
		
		//ask confirmation before reloading the page
		window.onbeforeunload = function confirmWinClose() { return "Are you sure you want to reload the page?";};
	});
})();