<template>
    <b-container>
      <h3>
        {{ title }}
      </h3>
      <RecipePreviewList :recipes="recipes"></RecipePreviewList>
    </b-container>
  </template>
  
  <script>
  import RecipePreviewList from "./RecipePreviewList.vue";
  
  export default {
    name: "WatchedRecipes",
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
        recipes: this.$root.store.lastWatchedRecipes || []
      };
    },
    mounted() {
      // Add more logic if needed
    }
  };
  </script>
  
  <style scoped>
  /* Your styles here */
  </style>
  