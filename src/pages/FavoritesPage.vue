<template>
  <div>
    <div class="container-fluid-custom">
      <RecipePreviewList class="text-center" title="Favorite Recipes" :recipes="recipes"></RecipePreviewList>
    </div>
  </div>
</template>

<script>
import RecipePreviewList from '../components/RecipePreviewList.vue';
import FavoriteRecipes from '../components/FavoriteRecipes.vue';
import axios from 'axios';
export default {
  name: 'FavoritesPage',
  components: {
    RecipePreviewList
  },
  props:{
    title: {
      type: String,
      required: false
    }
  },
  data(){
    return {
      recipes: []
    };
  },
  mounted(){
    this.getFavorites();
  },
  methods:{
    async getFavorites(){
      try{
        const response = await axios.get('http://localhost:3000/users/favorites', { withCredentials: true });
        this.recipes = response.data;
      } catch (error){
        console.error("Failed to fetch recipes:", error);
  }
  }
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
  margin-top:5%;

}
</style>
