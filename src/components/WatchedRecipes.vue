<template>
  <b-container class="col-watched">
    <RecipePreviewList :title="title" :recipes="recipes"></RecipePreviewList>
  </b-container>
</template>
  
<script>
import RecipePreviewList from "./RecipePreviewList.vue";
import axios from "axios";
export default {
  name: "WatchedRecipes",
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
          console.log("Fetching last viewed recipes from user:" + this.$root.store.username);
          // API call to your server's /random endpoint using axios
          const response = await axios.get('http://localhost:3000/users/last-viewed', { withCredentials: true });
          this.recipes = response.data;
        } catch (error) {
          console.error("Failed to fetch recipes:", error);
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
  