<template>
  <div class="container recipe-search-container">
    <h1 class="title">Search Page</h1>
    <b-form @submit.prevent="searchRecipes">
      <b-form-group label="Search by recipe name:">
        <b-form-input v-model="searchQuery" placeholder="Enter recipe name"></b-form-input>
      </b-form-group>
      <b-form-group label="Filter by cuisine:">
        <b-form-select v-model="selectedCuisine" :options="cuisines"></b-form-select>
      </b-form-group>
      <b-form-group label="Filter by diet:">
        <b-form-select v-model="selectedDiet" :options="diets"></b-form-select>
      </b-form-group>
      <b-form-group label="Filter by intolerance:">
        <b-form-select v-model="selectedIntolerance" :options="intolerances"></b-form-select>
      </b-form-group>
      <b-form-group label="Number of results:">
        <b-form-select v-model="resultsLimit" :options="resultsLimits"></b-form-select>
      </b-form-group>
      <b-button type="submit" variant="primary">Search</b-button>
      <b-button type="button" variant="secondary" @click="clearResults">Clear Results</b-button>
      <b-button type="button" variant="danger" @click="clearFilters">Clear Filters</b-button>
    </b-form>

    <div v-if="searchResults.length" class="search-results">
      <h2>Search Results</h2>
      <b-form-group label="Sort by:">
        <b-form-select v-model="sortOption" :options="sortOptions"></b-form-select>
      </b-form-group>
      <div v-for="recipe in sortedResults" :key="recipe.id" class="recipe-preview">
        <router-link :to="{ name: 'recipe-display', params: { id: recipe.id } }">
          <img :src="recipe.image" :alt="recipe.title" />
          <h3>{{ recipe.title }}</h3>
        </router-link>
        <p>{{ recipe.instructions }}</p>
      </div>
    </div>
    <div v-else-if="searchPerformed" class="no-results">
      <p>No relevant results found.</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "RecipeSearch",
  data() {
    return {
      searchQuery: "",
      selectedCuisine: "",
      selectedDiet: "",
      selectedIntolerance: "",
      resultsLimit: 5,
      searchResults: [],
      searchPerformed: false,
      sortOption: "",
      cuisines: ["No Filter", "Italian", "Chinese", "American", "Mexican"],
      diets: ["No Filter", "Vegetarian", "Vegan", "Gluten Free", "Ketogenic"],
      intolerances: ["No Filter", "Dairy", "Egg", "Gluten", "Peanut"],
      resultsLimits: [5, 10, 15],
      sortOptions: ["None", "Preparation Time", "Popularity"]
    };
  },
  computed: {
    sortedResults() {
      if (this.sortOption === "Preparation Time") {
        return [...this.searchResults].sort((a, b) => a.preparationTime - b.preparationTime);
      } else if (this.sortOption === "Popularity") {
        return [...this.searchResults].sort((a, b) => b.popularity - a.popularity);
      }
      return this.searchResults;
    }
  },
  methods: {
    searchRecipes() {
      // Simulate fetching search results from a server
      // Replace this with actual API call
      this.searchPerformed = true;
      this.searchResults = [
        {
          id: 1,
          title: "Sample Recipe 1",
          image: "path/to/image1.jpg",
          instructions: "Sample preparation instructions.",
          preparationTime: 30,
          popularity: 5
        },
        {
          id: 2,
          title: "Sample Recipe 2",
          image: "path/to/image2.jpg",
          instructions: "Sample preparation instructions.",
          preparationTime: 20,
          popularity: 8
        }
      ];
    },
    clearResults() {
      this.searchResults = [];
      this.searchQuery = "";
      this.searchPerformed = false;
    },
    clearFilters() {
      this.selectedCuisine = "No Filter";
      this.selectedDiet = "No Filter";
      this.selectedIntolerance = "No Filter";
      this.resultsLimit = 5;
    }
  },
  mounted() {
    // Load last search from localStorage if available
    const lastSearch = localStorage.getItem('lastSearch');
    if (lastSearch) {
      const parsedSearch = JSON.parse(lastSearch);
      this.searchQuery = parsedSearch.searchQuery;
      this.selectedCuisine = parsedSearch.selectedCuisine;
      this.selectedDiet = parsedSearch.selectedDiet;
      this.selectedIntolerance = parsedSearch.selectedIntolerance;
      this.resultsLimit = parsedSearch.resultsLimit;
      this.searchResults = parsedSearch.searchResults;
      this.searchPerformed = true;
    }
  },
  watch: {
    searchResults(newResults) {
      // Save current search to localStorage
      localStorage.setItem('lastSearch', JSON.stringify({
        searchQuery: this.searchQuery,
        selectedCuisine: this.selectedCuisine,
        selectedDiet: this.selectedDiet,
        selectedIntolerance: this.selectedIntolerance,
        resultsLimit: this.resultsLimit,
        searchResults: newResults
      }));
    }
  }
};
</script>

<style scoped>
.recipe-search-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.search-results {
  margin-top: 20px;
}

.recipe-preview {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.recipe-preview img {
  width: 100px;
  height: auto;
  margin-right: 20px;
}

.recipe-preview h3 {
  margin: 0;
}

.no-results {
  margin-top: 20px;
  font-size: 1.2em;
  color: #666;
}
</style>
