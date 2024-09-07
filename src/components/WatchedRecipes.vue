<template>
  <b-container class="col-watched">
    <h3>
      {{ title }}
    </h3>
<<<<<<< HEAD
    <RecipePreviewList :recipes="recipes"></RecipePreviewList>
=======
    <b-row>
      <b-col class="col-watched" v-for="r in recipes" :key="r.id">
        <RecipePreview class="recipePreview" :recipe="r" />
      </b-col>
    </b-row>
>>>>>>> tmp
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
 .col-watched{
  display: flex;
  justify-content: center;
  align-items: center;
}
  </style>
  