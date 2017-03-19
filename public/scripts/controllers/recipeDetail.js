'use strict';

angular.module('app')
.controller("RecipeDetailController", function($scope, dataService, $location) {

	
	function recipeDetails_Ingredients(){
		return {"foodItem":"","condition":"","amount":""};
	}
	function recipeDetails_steps() {
		return {"description":""};
	}
	function recipeDetails() {
		return {"name":"","description":"","category":"","prepTime":0,"cookTime":0,"ingredients": [recipeDetails_Ingredients()],"steps": [recipeDetails_steps()]};
	}
	
	function error(message) {
		if(message == "") {
			$scope.errors.push({message: "An error as occured. Please check your internet connection, or try again."})
		} else {
			$scope.errors.push({message : message})
		}
	}
	
	$scope.returnHome = function(message) {
		if(message != null) {
			alert(message);
		}
		$location.path("/")
	}
	
	
	$scope.errors = [];
	
	$scope.edited = false;
	
	$scope.recipeId = $location.path().substr(6);
	
	$scope.getRecipe = function() {
		if($scope.recipeId != "") {
			dataService.getRecipesById($scope.recipeId, function(res) {
				$scope.recipe = res.data;
			}, function(res) {
				error(res.data)
			});
		} else {
			$scope.recipe = recipeDetails();
		}
	}
	
	$scope.saveRecipe = function() {
		function success() {
			$scope.edited = false;
			$scope.returnHome("Your recipe has been successfully saved!!!")
		}
		if($scope.recipeId != "") {
			dataService.updateRecipesById($scope.recipeId,$scope.recipe,success(),function(res) {
				error(res.statusText);
			});
		} else {
			dataService.postRecipe($scope.recipe,success(),function(res) {
				error(res.statusText)
			});
		}
	};
	
	
	$scope.addIngredients = function() {
		$scope.recipe.ingredients.push(recipeDetails_Ingredients());
	};
	
	$scope.deleteIngredient = function(step, $index) {
		$scope.recipe.ingredients.splice($index, 1)
	}
		
	$scope.addSteps = function() {
		$scope.recipe.steps.push(recipeDetails_steps());
	};
	
	$scope.deleteStep = function($index) {
		$scope.recipe.steps.splice($index, 1)
	}
	
	$scope.getRecipe();
		
	dataService.getCategories(function(response) {
	  $scope.categories = response.data;
    });
		
	dataService.getFoodItems(function(res) {
		$scope.foodItems = res.data;
	});

	$("*").on('keydown', function() {
		$scope.edited = true;
	});
	
	$scope.$on('$locationChangeStart', function( event ) {
		if($scope.edited) {
			var answer = confirm("Are you sure you want to leave this page? All your modifications won't be saved.")
			if (!answer) {
				event.preventDefault();
			}
		}
	});
	
	window.onbeforeunload = function confirmWinClose() { return "Are you sure?";}
});
