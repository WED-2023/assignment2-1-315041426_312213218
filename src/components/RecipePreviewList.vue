<template>
  <b-container class="container">
    <h3 class="text-center">{{ title }}<slot></slot></h3>
    <b-row class="rowRecipe">
      <b-col
        class="colRecipe custom-col-split custom-col-lg custom-col-xl"
        v-for="r in recipes"
        :key="r.id"
        cols="12"
      >
        <RecipePreview class="recipePreview" :recipe="r"  />
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
/* Custom breakpoint at 850px instead of Bootstrap's predefined md breakpoint */
@media (min-width: 1300px) {
  .custom-col-split {
    flex: 0 0 50%;  /* Makes each column take half of the container's width */
    max-width: 50%; /* Ensures the max-width is also limited to half of the container */
  }
}


.recipePreview {
  max-width: 100%; /* Ensure it fits within the col */
  width: 100%; /* Make sure it uses all available width */
}
.custom-col-lg {
    width: 100%; /* Full width on small to large screens */
}

.custom-col-xl {
    width: 50%; /* Half width on extra large screens */
}
</style>
