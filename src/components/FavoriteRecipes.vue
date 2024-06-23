<template>
    <b-container class="container">

      <b-row>
        <b-col
          v-for="r in recipes"
          :key="r.id"
          cols="12"
          md="6"
          lg="6"
          xl="6"
        >
          <RecipePreview :recipe="r" />
        </b-col>
      </b-row>
    </b-container>
  </template>
  
  <script>
  import RecipePreview from "./RecipePreview.vue";
  import { mockGetUserFavoriteRecipes } from "../services/recipes.js";
  
  export default {
    name: "FavoriteRecipes",
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
      this.getFavorites();
    },
    methods: {
      async getFavorites() {
        try {
          const amountToFetch = 6; // Fetch more recipes for testing
          const response = mockGetUserFavoriteRecipes(amountToFetch);
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
  .container {
    margin-top: 7%;
  }
  </style>
  