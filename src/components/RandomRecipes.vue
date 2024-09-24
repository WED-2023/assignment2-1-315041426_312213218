<template>
    <b-container>
      <RecipePreviewList :title="title" :recipes="recipes"></RecipePreviewList>
      <b-button class="more" variant="success" @click="updateRecipes">More</b-button>
    </b-container>
  </template>
  
  <script>
  import RecipePreviewList from "./RecipePreviewList.vue";
  import { mockGetRecipesPreview } from "../services/recipes.js";
  import axios from "axios";
  
  export default { 
    name: "RandomRecipes",
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
      this.updateRecipes();
    },
    methods: {
      async updateRecipes() {
        try {
          const amountToFetch = 3; 
              // API call to your server's /random endpoint using axios
            const response = await axios.get('http://localhost:3000/recipes/random',{
            params: { number: amountToFetch },
           });

          // const response = mockGetRecipesPreview(amountToFetch);
          console.log(response);
          this.recipes = response.data.recipes;
          console.log(this.recipes);
        } catch (error) {
          console.error("Failed to fetch recipes:", error);
        }
      }
    }
  };
  </script>
  
  <style scoped>
  /* Your styles here */
  .discover-more{
    display: table-cell;
    margin: 10px 200px;
    vertical-align: middle;
  }
  .more {
      display: block;
      justify-content: center;
      align-items: center;
      margin-top: 5%;
      width: 56%;
      margin-left: 22%;
  }
  </style>