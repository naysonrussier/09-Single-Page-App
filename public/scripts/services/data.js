
(function() {
  'use strict';

	angular.module('app')
	.service("dataService", function($http) {
		
	  this.getRecipes = function(success, error) {
		$http.get('api/recipes')
		.then(success)
		.catch(error)
	  };
	  
	  this.getCategories = function(success, error) {
		$http.get('api/categories')
		.then(success)
		.catch(error)
	  };
	  
	  this.getFoodItems = function(success, error) {
		$http.get('api/fooditems')
		.then(success)
		.catch(error)
	  };
	  
	  this.getRecipesByCategory = function(category, success, error) {
		$http.get('api/recipes?category='+ category)
		.then(success)
		.catch(error)
	  }
	  
	  this.getRecipesById = function(id, success, error) {
		$http.get('api/recipes/'+ id)
		.then(success)
		.catch(error)
	  }
	  
	  this.updateRecipesById = function(id, recipe, success, error) {
		$http.put('api/recipes/'+id, recipe)
		.then(success)
		.catch(error)
	  }
	  
	  this.postRecipe = function(recipe, success, error) {
		$http.post('api/recipes', recipe)
		.then(success)
		.catch(error)
	  }
	  
	  this.delRecipeById = function(id, success, error) {
		$http.delete('api/recipes/'+id)
		.then(success)
		.catch(error)
	  }
	  
	});
})();