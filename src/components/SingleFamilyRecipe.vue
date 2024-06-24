<template>
  <div class="family-recipe">
    <div class="recipe-header">
      <span class="recipe-title">{{ recipe.title }}</span>
      <span class="recipe-author">Author: {{ recipe.author }}</span>
      <span class="recipe-occasion">Occasion: {{ recipe.occasion }}</span>
    </div>
    <div class="recipe-body">
      <div class="recipe-left">
        <img :src="recipe.image" :alt="'Image of ' + recipe.title" class="recipe-image">
        <div class="recipe-ingredients">
          <div v-for="(ingredients, category) in categorizedIngredients" :key="category">
            <h3>Ingredients for {{ category }}</h3>
            <ul>
              <li v-for="ingredient in ingredients" :key="ingredient.id">
                {{ ingredient.amount }} {{ ingredient.unit }} of {{ ingredient.name }}
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="recipe-instructions">
        <h2>Instructions</h2>
        <div v-for="(steps, category) in categorizedInstructions" :key="category">
          <h3>{{ category }}</h3>
          <ol>
            <li v-for="step in steps" :key="step.number">
              {{ step.step }}
            </li>
          </ol>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SingleFamilyRecipe",
  props: {
    recipe: {
      type: Object,
      required: true
    }
  },
  computed: {
    categorizedIngredients() {
      return this.recipe.ingredients.reduce((categories, ingredient) => {
        if (!categories[ingredient.category]) {
          categories[ingredient.category] = [];
        }
        categories[ingredient.category].push(ingredient);
        return categories;
      }, {});
    },
    categorizedInstructions() {
      return this.recipe.instructions.reduce((categories, instruction) => {
        if (!categories[instruction.category]) {
          categories[instruction.category] = [];
        }
        categories[instruction.category].push(instruction);
        return categories;
      }, {});
    }
  }
};
</script>

<style scoped>
.family-recipe {
  margin-bottom: 20px;
}
.recipe-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}
.recipe-title {
  font-weight: bold;
}
.recipe-author,
.recipe-occasion {
  text-align: center;
}
.recipe-body {
  display: flex;
}
.recipe-left {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.recipe-image {
  max-width: 400px;
  margin-bottom: 20px;
}
.recipe-ingredients {
  margin-bottom: 20px;
}
.recipe-instructions {
  flex: 1;
  margin-left: 20px;
}
.recipe-ingredients h3{
    font-size: 1.2em;
}
.recipe-instructions h3 {
  font-size: 1.2em;
}
</style>
