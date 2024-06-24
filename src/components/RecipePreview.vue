<template>
  <div class="recipe-preview" >
    <div class="recipe-body">
      <img v-if="image_load" :src="recipe.image" class="recipe-image"  @click="GoToFullRecipePage(recipe.id)">
      <div class="overlay" @click="GoToFullRecipePage(recipe.id)">
        <div class="overlay-text">View Full Recipe</div>
      </div>
    </div>
    <div class="recipe-footer">
      <div :title="recipe.title" class="recipe-title">
        {{ recipe.title }}
      </div>
      <ul class="recipe-overview">
        <li>{{ recipe.readyInMinutes }} minutes</li>
        <li>{{ recipe.aggregateLikes }}<br>likes</li>
        <li><b-button :class="{'favorite-button': true, 'favorite-active': isFavorite}" variant="outline-warning" @click="toggleFavorite">
              {{ isFavorite ? "Remove from Favorites" : "Add to Favorites" }}
            </b-button>
        </li>
        <li v-if="recipe.vegan"><img v-if="recipe.vegan" src="../assets/vegan-friendly-icon.jpg" alt="vegan" class="vegan-icon"></li>
        <li v-if="recipe.glutenFree"><img v-if="recipe.glutenFree" src="../assets/gluten-free.png" alt="vegan" class="vegan-icon"></li>
      </ul>
    </div>
  </div>
</template>


<script>
import { mockAddFavorite, mockRemoveFavorite } from "../services/user.js";
export default {
  mounted() {
    const img = new Image();
    img.src = this.recipe.image;
    img.onload = () => {
      this.image_load = true;
    };
    img.onerror = () => {
      console.error("Image failed to load");
    };
  },
  data() {
    return {
      image_load: false,
      isFavorite: false
    };
  },
  props: {
    recipe: {
      type: Object,
      required: true
    }
  },
  methods: {
    toggleFavorite(event) {
      event.stopPropagation();
      this.isFavorite ? this.removeFromFavorites() : this.addToFavorites();
    },
    addToFavorites() {
      this.isFavorite = true;
     const response =  mockAddFavorite(this.recipe.id); // Simulate adding to backend
     console.log(response.response.data.message);
     
    },
    removeFromFavorites() {
      this.isFavorite = false;
      const response = mockRemoveFavorite(this.recipe.id); // Simulate removing from backend
      console.log(response.response.data.message);
    },
    GoToFullRecipePage(recipeId) {
      this.$router.push({ name: 'recipe', params: { recipeId } });
    }
  }
};
</script>


<style scoped>
.recipe-preview {
  display: block;
  width:80%;
  position: relative;
  margin-top:2%;
  transition: transform 0.3s ease, box-shadow 0.3s ease; /* Add transition for smooth animation */
  cursor: default; /* Default cursor for the whole preview */
  background-color: whitesmoke;
  padding: 5px;
}
.recipe-preview:hover {
  transform: translateY(-5px); /* Move up slightly on hover */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.8); /* Add a shadow effect on hover */
}
.recipe-preview > .recipe-body {
  width: 100%;
  height: 8%;
  position: relative;
}
.recipe-preview .recipe-body .recipe-image {
  display: block;
  width: 100%;
  height: 100%;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  background-size: cover;
  cursor: pointer; /* Change cursor to pointer to indicate it's clickable */
  transition: opacity 0.3s ease; /* Smooth transition for opacity */
}
.recipe-preview:hover .recipe-body .recipe-image {
  opacity: 0.7; /* Make image darker on hover */
}
.recipe-preview .recipe-body .overlay {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  height: 100%;
  width: 100%;
  opacity: 0;
  transition: opacity 0.3s ease;
  background-color: rgba(0, 0, 0, 0.5); /* Dark overlay */
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer; /* Change cursor to pointer to indicate it's clickable */
}
.recipe-preview:hover .recipe-body .overlay {
  opacity: 1;
}
.recipe-preview .recipe-body .overlay-text {
  color: white;
  font-size: 20px;
  text-align: center;
}
.recipe-preview .recipe-footer {
  width: 100%;
  height: 100%;
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
.favorite-button {
  display: block;
  margin: 10px auto;
}
.favorite-active {
  background-color: orange !important;
  border-color: orange !important;
  color: white !important;
}
</style>

