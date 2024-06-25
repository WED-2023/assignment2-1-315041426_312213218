<template>
    <div>
      <div class="container-fluid-custom">
        <h1 class="title text-center">My Recipes</h1>
        <br>
        <MyRecipes class="text-center" title="" />
      </div>
    </div>
  </template>
  
  <script>
  import MyRecipes from '../components/MyRecipes.vue';
  
  export default {
    components: {
      MyRecipes
    }
  };
  </script>
  
  <style lang="scss" scoped>
  .container-fluid-custom {
    padding-left: 2%;
    padding-right: 2%;
    margin-top: 7%;
  }
  .title {
    text-shadow: #fff8f8 1px 0 30px;
  }
  </style>
  