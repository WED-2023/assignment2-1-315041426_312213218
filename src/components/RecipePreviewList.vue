<template>
  <b-container class="container">
    <h3 class="text-center">{{ title }}<slot></slot></h3>
    <b-row class="rowRecipe">
      <b-col
        class="colRecipe"
        v-for="r in recipes"
        :key="r.id"
        cols="12"
        md="6"
        lg="6"
      >
        <RecipePreview class="recipePreview" :recipe="r" />
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import RecipePreview from "./RecipePreview.vue";

export default {
  name: "RecipePreviewList",
  components: {
    RecipePreview
  },
  props: {
    title: {
      type: String,
      required: false
    },
    recipes: {
      type: Array,
      required: true
    }
  }
};
</script>

<style scoped>
.rowRecipe {
  display: flex;
  flex-wrap: wrap; /* Ensure flex items wrap properly */
  justify-content: center; /* Center the items in the row */
  margin-left: 0;
}

.colRecipe {
  margin-bottom: 20px; /* Space between rows */
  display: flex;
  justify-content: center;
}

.recipePreview {
  max-width: 100%; /* Ensure it fits within the col */
  width: 100%; /* Make sure it uses all available width */
}
</style>
