<template>
  <div>
    <div class="container">
      <h1 class="text-center">Favorite Recipes</h1>
      <br>
      <FavoriteRecipes class="text-center" title="Favorite Recipes" />
    </div>
  </div>
</template>

<script>
import FavoriteRecipes from '../components/FavoriteRecipes.vue';

export default {
  components: {
    FavoriteRecipes
  }
};
</script>

<style lang="scss" scoped>
.container {
  margin-top: 7%;
}
.title {
  text-shadow: #fff8f8 1px 0 30px;
}
</style>
