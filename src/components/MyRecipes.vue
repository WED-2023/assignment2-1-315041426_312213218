<template>
    <div>
      <b-row>
        <b-col v-for="recipe in recipes" :key="recipe.id" cols="12" md="6" lg="4">
          <b-card
            :title="recipe.title"
            :img-src="recipe.image"
            img-alt="Image"
            img-top
          >
            <b-card-text>
              {{ recipe.description }}
            </b-card-text>
            <b-button @click="viewRecipe(recipe.id)" variant="primary">View Recipe</b-button>
          </b-card>
        </b-col>
      </b-row>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        recipes: [
          {
            id: 1,
            title: "Recipe 1",
            description: "This is a description for recipe 1.",
            image: "https://via.placeholder.com/150"
          },
          {
            id: 2,
            title: "Recipe 2",
            description: "This is a description for recipe 2.",
            image: "https://via.placeholder.com/150"
          },
          {
            id: 3,
            title: "Recipe 3",
            description: "This is a description for recipe 3.",
            image: "https://via.placeholder.com/150"
          }
        ]
      };
    },
    methods: {
      viewRecipe(recipeId) {
        this.$router.push({ name: 'recipe', params: { recipeId } });
      }
    }
  };
  </script>
  
  <style scoped>
  
  </style>
  