<template>
    <b-container fluid class="container-fluid-custom">
    <RecipePreviewList :title="title" :recipes="recipes"></RecipePreviewList>
    </b-container>
  </template>
  
  <script>
  import RecipePreviewList from "./RecipePreviewList.vue";
  import axios from "axios";
  export default {
    name: "FavoriteRecipes",
    components: {
      RecipePreviewList
    },
    props: {
      title: {
        type: String,
        required: false
      }
    },
    data() {
      return {
        recipes: []
      };
    },
    mounted() {
      this.getFavorites();
    },
    methods: {
      async getFavorites() {
        try {
          const amountToFetch = 6; // Fetch more recipes for testing
          const response = await axios.get('http://localhost:3000/users/favorites', { withCredentials: true }); //response already contains data only
          this.recipes = response
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
    margin-top: 2%; /* Remove top margin */
  }
  
  .mb-3 {
    margin-bottom: 1rem; /* Adjust bottom margin */
  }
  </style>
  