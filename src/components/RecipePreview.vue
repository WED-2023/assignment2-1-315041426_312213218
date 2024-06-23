<template>
  <router-link
    :to="{ name: 'recipe', params: { recipeId: recipe.id } }"
    class="recipe-preview">
    <div class="recipe-body">
      <img v-if="image_load" :src="recipe.image" class="recipe-image" />
    </div>
    <div class="recipe-footer">
      <div :title="recipe.title" class="recipe-title">
        {{ recipe.title }}
      </div>
      <ul class="recipe-overview">
        <li>{{ recipe.readyInMinutes }} minutes</li>
        <li>{{ recipe.aggregateLikes }} likes</li>
        <li v-if="recipe.vegan"><img v-if="recipe.vegan" src="../assets/vegan-friendly-icon.jpg" alt="vegan" class="vegan-icon"></li>
        <li v-if="recipe.glutenFree"><img v-if="recipe.glutenFree" src="../assets/gluten-free.png" alt="vegan" class="vegan-icon"></li>
      </ul>
    </div>
  </router-link>
</template>

<script>
export default {
  mounted() {
    const img = new Image();
    img.src = this.recipe.image;
    img.onload = () => {
      this.image_load = true;
    };
    img.onerror = () => {
      console.error('Image failed to load');
    };
  },
  data() {
    return {
      image_load: false
    };
  },
  props: {
    recipe: {
      type: Object,
      required: true
    }
  },
  methods: {
    handleRecipeClick() {
      // Check if the recipe is already in the watched list
      const watchedRecipes = this.$root.store.lastWatchedRecipes;
      if (!watchedRecipes.find(r => r.id === this.recipe.id)) {
        this.$root.store.lastWatchedRecipes.push(this.recipe);
        localStorage.setItem("lastWatchedRecipes", JSON.stringify(this.$root.store.lastWatchedRecipes));
      }
    }
  }
};
</script>

<style scoped>
.recipe-preview {
  display: inline-block;
  width: 80%;
  height: 100%;
  position: relative;
  margin: 10px 10px;
  transition: transform 0.3s ease, box-shadow 0.3s ease; /* Add transition for smooth animation */
  cursor: pointer; /* Change cursor to pointer to indicate it's clickable */
}
.recipe-preview:hover {
  transform: translateY(-5px); /* Move up slightly on hover */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.8); /* Add a shadow effect on hover */
}
.recipe-preview > .recipe-body {
  width: 100%;
  height: 200px;
  position: relative;
}

.recipe-preview .recipe-body .recipe-image {
  margin-left: auto;
  margin-right: auto;
  margin-top: auto;
  margin-bottom: auto;
  display: block;
  width: 100%;
  height: 100%;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  background-size: cover;
}

.recipe-preview .recipe-footer {
  width: 100%;
  height: 30%;
  
}

.recipe-preview .recipe-footer .recipe-title {
  padding: 10px 10px;
  width: 100%;
  font-size: 12pt;
  text-align: left;
  white-space: nowrap;
  overflow: hidden;
  -o-text-overflow: ellipsis;
  text-overflow: ellipsis;
}

.recipe-preview .recipe-footer ul.recipe-overview {
  padding: 5px 10px;
  width: 100%;
  display: -webkit-box;
  display: -moz-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-flex: 1;
  -moz-box-flex: 1;
  -o-box-flex: 1;
  box-flex: 1;
  -webkit-flex: 1 auto;
  -ms-flex: 1 auto;
  flex: 1 auto;
  table-layout: fixed;
  margin-bottom: 0px;
}

.recipe-preview .recipe-footer ul.recipe-overview li {
  -webkit-box-flex: 1;
  -moz-box-flex: 1;
  -o-box-flex: 1;
  -ms-box-flex: 1;
  box-flex: 1;
  -webkit-flex-grow: 1;
  flex-grow: 1;
  width: 90px;
  display: table-cell;
  text-align: center;
}

.vegan-icon {
  margin-left: 1px;
  width: 40px;
  height: 40px;
}
</style>
