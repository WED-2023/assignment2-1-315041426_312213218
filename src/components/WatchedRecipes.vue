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
import RecipePreview from "./RecipePreview.vue";
import { getLastWatchedRecipes} from "../services/recipes.js";
export default {
  name: "RecipePreviewList",
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
    this.updateRecipes();
  },
  methods: {
    async updateRecipes() {
      try {
        
        // const response = await this.axios.get(
        //   this.$root.store.server_domain + "/recipes/random",
        // );

        const amountToFetch = 1; // Set this to how many recipes you want to fetch
        const response = getLastWatchedRecipes(amountToFetch);


        console.log(response);
        const recipes = response.data.recipes;
        console.log(recipes);
        this.recipes = [];
        this.recipes.push(...recipes);
      } catch (error) {
        console.log(error);
      }
    }
  }
};
</script>
  
  <style scoped>
  /* Your styles here */
  </style>
  