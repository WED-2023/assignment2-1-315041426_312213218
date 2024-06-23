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
          xl="4"
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
  .container-fluid-custom {
    padding-left: 2%;
    padding-right: 2%;
    margin-top: 7%;
  }
  </style>
  