<template>
    <div>
      <div class="container-fluid-custom">
        <RecipePreviewList class="text-center" title="My Recipes" :recipes="recipes"></RecipePreviewList>
      </div>
    </div>
  </template>
  
  <script>
import RecipePreviewList from '../components/RecipePreviewList.vue';
import axios from 'axios';
  
  export default {
    components: {
      RecipePreviewList
    },
    props:{
      title: {
        type: String,
        required: false
      }
    },
    data(){
      return {
        recipes: []
      };
    },
    mounted(){
      this.getMyRecipes();
    },
    methods:{
      async getMyRecipes(){
        try{
          const response = await axios.get('http://localhost:3000/users/my-recipes', { withCredentials: true });
          this.recipes = response.data.map(this.transformRecipeData);
          // console.log(response.data);
        } catch (error){
          console.error("Failed to fetch recipes:", error);
      }
      },
      transformRecipeData(dbRecipe) {
        return {
          title: dbRecipe.recipeName,
          id: dbRecipe.RecipeID,
          aggregateLikes: "N/A",
          readyInMinutes: dbRecipe.time_to_make,
          extendedIngredients: dbRecipe.Ingredients.map((ingredient, index) => ({
            id: index + 1, // Create a unique ID for each ingredient
            original: ingredient
          })),
          analyzedInstructions: [
            {
              steps: dbRecipe.Instructions.map((instruction) => ({
                step: instruction
              }))
            }
          ],
          vegan: dbRecipe.vegan === 1, // Convert to boolean
          glutenFree: dbRecipe.glutenFree === 1 // Convert to boolean
        };
}
    }
  };
  </script>
  
  <style lang="scss" scoped>
  .container-fluid-custom {
    padding-left: 2%;
    padding-right: 2%;
    margin-top: 3%;
  }
  .title {
    text-shadow: #fff8f8 1px 0 30px;
    margin-top:5%;
  }
  </style>
  