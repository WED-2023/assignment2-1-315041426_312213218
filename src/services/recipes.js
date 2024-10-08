// src/services/recipes.js
import recipe_full_view from "../assets/mocks/recipe_full_view.json";
import recipe_preview from "../assets/mocks/recipe_preview.json";


export function mockGetRecipesPreview(amount = 1) {
  let recipes = [];

  // Don't use for please!!
  // use Map or forEach. 
  // also, recepies can be a const .
  for(let i = 0; i < amount; i++){
    recipes.push(recipe_preview);
  }

  return { data: { recipes: recipes } };
}

export function mockGetRecipeFullDetails(recipeId) {
    return { data: { recipe: recipe_full_view } } ;
  }
  
  // please use some generic method, so it'll be used both in mockGetRecipesPreview and in getLastWatchedRecipes
  export function getLastWatchedRecipes(amount = 3) {
    let recipes = [];
    for(let i = 0; i < amount; i++){
      recipes.push(recipe_preview);
    }
  
    return { data: { recipes: recipes } };
  }

  export function mockGetUserFavoriteRecipes(amount){
    let recipes = [];
    for (let index = 0; index < amount; index++) {
      recipes.push(recipe_preview);
      
    }
    return { data: { recipes: recipes } };
  }
  export function mockGetUserMyRecipes(amount){
    let recipes = [];
    for (let index = 0; index < amount; index++) {
      recipes.push(recipe_preview);
      
    }
    return { data: { recipes: recipes } };
  }