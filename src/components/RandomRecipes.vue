<template>
    <b-container>
      <h3>
        {{ title }}
      </h3>
      <RecipePreviewList :recipes="recipes"></RecipePreviewList>
      <b-button class="more" variant="success" @click="updateRecipes">More</b-button>
    </b-container>
  </template>
  
  <script>
  import RecipePreviewList from "./RecipePreviewList.vue";
  import { mockGetRecipesPreview } from "../services/recipes.js";
  
  export default {
    name: "RandomRecipes",
    components: {
      RecipePreviewList
    },
    props: {
      title: {
        type: String,
        required: true
      }
    },
    data() {
      return {
        recipes: []
      };
    },
    mounted() {
      this.updateRecipes();
    },
    methods: {
      async updateRecipes() {
        try {
          const amountToFetch = 3; // Set this to how many recipes you want to fetch
          const response = mockGetRecipesPreview(amountToFetch);
          console.log(response);
          this.recipes = response.data.recipes;
        } catch (error) {
          console.error("Failed to fetch recipes:", error);
        }
      }
    }
  };
  </script>
  
  <style scoped>
  /* Your styles here */
  .more {
    display: block;
    justify-content: center;
    align-items: center;
    margin-top: 2%;
    width: 56%;
    margin-left: 22%;
  }
  </style>
  