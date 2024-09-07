<template>
  <div class="container">
    <div v-if="recipe">
      <!-- Render recipe content as before -->
      <div class="recipe-header mt-3 mb-4">
        <h1>{{ recipe.title }}</h1>
        <img :src="recipe.image" class="center" />
      </div>
      <div class="recipe-body">
        <div class="wrapper">
          <div class="wrapped">
            <div class="mb-3">
              <div>Ready in {{ recipe.readyInMinutes }} minutes</div>
              <div>Likes: {{ recipe.aggregateLikes }} likes</div>
            </div>
            <strong id="ingredients">Ingredients:</strong>
            <ul>
              <li v-for="(r, index) in recipe.extendedIngredients" :key="index + '_' + r.id">
                {{ r.original }}
              </li>
            </ul>
          </div>
          <div class="instructions">
            <strong>Instructions:</strong>
            <ol>
              <li v-for="(step, index) in recipe.analyzedInstructions[0]?.steps" :key="index">
        {{ step.step }}
      </li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mockGetRecipeFullDetails } from "../services/recipes.js";
export default {
  props: {
    recipe: {
      type: Object,
      required: true
    }
  },
  // async created() {
  //   // Access the recipe object from route params
  //   this.recipe = this.$route.params.recipe;
  //   console.log("this.recipe", this.recipe);

  //   // If there's no recipe, redirect to a not found page or handle the error
  //   if (!this.recipe) {
  //     this.$router.replace('/NotFound');
  //   }

  //       // response = await this.axios.get(
  //       //   this.$root.store.server_domain + "/recipes/" + this.$route.params.recipeId,
  //       //   {
  //       //     withCredentials: true
  //       //   }
  //       // );

  //       response = mockGetRecipeFullDetails(this.$route.params.recipeId);

  //       // console.log("response.status", response.status);
  //       // if (response.status !== 200) this.$router.replace("/NotFound");
  //     } catch (error) {
  //       console.log("error.response.status", error.response.status);
  //       this.$router.replace("/NotFound");
  //       return;
  //     }

  //     let {
  //       analyzedInstructions,
  //       instructions,
  //       extendedIngredients,
  //       aggregateLikes,
  //       readyInMinutes,
  //       image,
  //       title
  //     } = response.data.recipe;

  //     let _instructions = analyzedInstructions
  //       .map((fstep) => {
  //         fstep.steps[0].step = fstep.steps[0].step;
  //         return fstep.steps;
  //       })
  //       .reduce((a, b) => [...a, ...b], []);

  //     let _recipe = {
  //       instructions,
  //       _instructions,
  //       analyzedInstructions,
  //       extendedIngredients,
  //       aggregateLikes,
  //       readyInMinutes,
  //       image,
  //       title
  //     };

  //     this.recipe = _recipe;
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }
};
</script>

<style scoped>
.recipe-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.recipe-body {
  display: block;
}
.container {
  margin-top: 7%;
  display: block;
}
.instructions{
  display: block;
}
.wrapper {
  display: block;
}
.wrapped {
  width: 50%;
}
.center {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 50%;
}

.wrapped strong {
  display: inline-block;
  margin-bottom: 10px;
  text-align: left; /* Ensures the text is aligned to the left */
}
/* .recipe-header{

} */
</style>
