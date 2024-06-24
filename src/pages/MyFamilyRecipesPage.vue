<template>
  <div>
    <div class="container-fluid-custom">
      <h1 class="title text-center">My Family Recipes</h1>
      <br>
      <SingleFamilyRecipe
        v-for="recipe in familyRecipes"
        :key="recipe.id"
        :recipe="recipe"
        class="text-left"
      />
    </div>
  </div>
</template>

<script>
import SingleFamilyRecipe from '../components/SingleFamilyRecipe.vue';
import familyRecipes from '../assets/mocks/familyRecipes.json';

export default {
  name: 'MyFamilyRecipesPage',
  components: {
    SingleFamilyRecipe
  },
  data() {
    return {
      familyRecipes: familyRecipes
    };
  }
};
</script>

<style lang="scss" scoped>
.container-fluid-custom {
  padding-left: 5%;
  padding-right: 5%;
  margin-top: 7%;
}
.title {
  text-shadow: #fff8f8 1px 0 30px;
}
</style>
