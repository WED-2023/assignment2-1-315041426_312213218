<template>
    <b-container fluid class="container-fluid-custom">
      <h3>
        {{ title }}
        <slot></slot>
      </h3>
      <b-row>
        <b-col
          v-for="r in recipes"
          :key="r.id"
          cols="12"
          xl="6"
          lg="6"
          md="6"
          sm="12"
        >
          <RecipePreview :recipe="r" />
        </b-col>
      </b-row>
    </b-container>
  </template>
  
  <script>
  import RecipePreview from "./RecipePreview.vue";
  import { mockGetUserMyRecipes } from "../services/recipes.js"; 
  
  export default {
    name: "MyRecipes", 
    components: {
      RecipePreview
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
      this.getMyRecipes();
    },
    methods: {
      async getMyRecipes() {
        try {
          const amountToFetch = 6; // Fetch more recipes for testing
          const response = mockGetUserMyRecipes(amountToFetch);
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
  .container-fluid-custom {
    padding-left: 2%;
    padding-right: 2%;
    margin-top: 2%;
  }
  .mb-3 {
    margin-bottom: 1rem; /* Adjust bottom margin */
  }
  </style>
  