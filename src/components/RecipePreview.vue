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
      </ul>
        <div class="icon-container">
          <li v-if="recipe.vegan"><img v-if="recipe.vegan" src="../assets/vegan-friendly-icon.jpg" alt="vegan" class="vegan-icon"></li>
          <li v-if="recipe.glutenFree"><img v-if="recipe.glutenFree" src="../assets/gluten-free.png" alt="vegan" class="vegan-icon"></li>
        </div>
    </div>
  </div>
</template>


<script>
import { mockAddFavorite, mockRemoveFavorite } from "../services/user.js";
import axios from "axios";
export default {
  mounted() {
    this.checkFavoriteStatus();
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
    async checkFavoriteStatus() {
      try {
        const response = await axios.get(`http://localhost:3000/users/favorites/${this.recipe.id}`, {withCredentials: true});
        console.log(response);
        this.isFavorite = response.data.isFavorite;
      } catch (error) {
        console.error("Failed to check if the recipe is in favorites:", error);
      }
    },

    toggleFavorite(event) {
      event.stopPropagation();
      this.isFavorite ? this.removeFromFavorites() : this.addToFavorites();
    },
    async addToFavorites() {
      try {
        const response =  await axios.post('http://localhost:3000/users/favorites', {recipe_id: this.recipe.id}, {withCredentials: true})
        this.isFavorite = true;
        }
      catch (error)
        {
        console.error("Failed to add to favorites:", error);
        }
    },
    async removeFromFavorites() {
      try{
        const response = await axios.delete('http://localhost:3000/users/favorites',{
          data: {recipe_id: this.recipe.id},
          withCredentials: true
          });
          this.isFavorite = false;
      }
      catch (error){
        console.error("Failed to remove from favorites:", error);
      }
    },
    GoToFullRecipePage() {
    // Navigate to the RecipeViewPage and pass the recipe object as a prop
    if (this.$root.store.username){
      axios.post('http://localhost:3000/users/last-viewed', {recipe_id: this.recipe.id}, {withCredentials: true}).then((response) => {
        console.log(response);
      }).catch((error) => {
        console.error("Failed to update last viewed recipes:", error);
      });
    }
    this.$router.push({ name: 'recipe', params: { recipe: this.recipe, recipeId : this.recipe.id } });

  }
}
};
</script>


<style scoped>
.recipe-preview {
  display: block;
  flex-direction: column;
  margin: 2% auto; /* Center the previews */
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: default;
  background-color: whitesmoke;
  padding: 10px;
  width: 50%; /* Allow the preview to take full width of the container */
  max-width: 50px; /* Set a larger max-width to make it wider */
  height: auto; 
  box-sizing: border-box;
  border-radius: 8px;
}

.recipe-preview:hover {
  transform: translateY(-5px); /* Hover effect */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* Subtle shadow */
}

.recipe-preview > .recipe-body {
  width: 100%;
  height: 250px; /* Increase height for larger image */
  position: relative;
}

.recipe-preview .recipe-body .recipe-image {
  width: 100%;
  height: 100%;
  object-fit: cover; /* Ensures the image scales properly */
  border-radius: 8px;
}

.recipe-preview .recipe-footer {
  width: 100%;
  padding: 15px;
  text-align: center;
}

.recipe-preview .recipe-footer .recipe-title {
  font-size: 18pt; /* Larger title */
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.recipe-preview .recipe-footer ul.recipe-overview {
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
  align-items: center;
  list-style: none;
  margin: 0;
}

.recipe-preview .recipe-footer ul.recipe-overview li {
  flex: 1; /* Ensure items take equal space */
  text-align: center;
  display: flex; /* Flexbox for centering content within each li */
  flex-direction: column; /* Stack content vertically inside the li */
  justify-content: center; /* Center vertically */
  align-items: center; /* Center horizontally */
  margin-right: 10px; /* Space between items */

}
/* Remove dots from the li elements */
.recipe-preview .recipe-footer ul.recipe-overview li,
.recipe-preview .recipe-footer .icon-container li {
  list-style: none; /* Remove bullets */
}

/* Container for icons to ensure they appear on their own line */
.recipe-preview .recipe-footer .icon-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%; /* Ensure it takes full width */
  margin-top: 10px;
  flex-wrap: wrap;
}
.vegan-icon {
  width: 30px;
  height: 30px;
  margin-right: 5px;
}

.favorite-button {
  display: block;
  width: 100%; /* Ensure it takes full width of the container */
  max-width: 250px; /* Optionally, set a max width to limit the size */
  margin: 10px auto;
  padding: 7px 7px; /* Add padding for spacing around the text */
  text-align: center;
  white-space: nowrap; /* Ensure text stays on one line */
  font-size: 14px; /* Adjust the font size if needed */
  overflow: hidden; /* Prevent content from overflowing */
}

.favorite-active {
  background-color: orange !important;
  border-color: orange !important;
  color: white !important;
}


</style>

