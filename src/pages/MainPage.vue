<template>
  <div>
    <div class="container-fluid">
      <h1 class="title text-center">Main Page</h1>
      <br>
      <b-row>
        <b-col cols="6">
          <RandomRecipes class="text-center" title="Random Recipes" style="text-shadow: #fff8f8 1px 0 30px"/>
        </b-col>
        <b-col v-if="!$root.store.username" class="login-container">
          <LoginPage/>
        </b-col>
        <b-col cols="6" v-else>
          <WatchedRecipes class="text-center" title="Last Viewed Recipes" style="text-shadow: #fff8f8 1px 0 30px"></WatchedRecipes>
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
import RandomRecipes from "../components/RandomRecipes";
import WatchedRecipes from "../components/WatchedRecipes";
import LoginPage from "../pages/LoginPage";

export default {
  components: {
    RandomRecipes,
    WatchedRecipes,
    LoginPage
  }
};
</script>

<style lang="scss" scoped>
.RandomRecipes {
  margin: 10px 0 5px;
}
.blur {
  -webkit-filter: blur(5px); /* Safari 6.0 - 9.0 */
  filter: blur(2px);
}
::v-deep .blur .recipe-preview {
  pointer-events: none;
  cursor: default;
}
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 70vh;
}
</style>
