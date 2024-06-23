<template>
  <div class="container">
    <h1 class="title mt-5 mb-0 pt-5 pb-0">Search Page</h1>
    <b-form @submit.prevent="searchRecipes" class="pt-0 mt-0">
      <div class="recipe-search-container">
        <b-form-group>
          <div class="container-search">
            <b-form-input v-model="searchQuery" placeholder="Enter recipe to search" class="ml-0 mr-3"></b-form-input>
                <label class="mb-0 mr-2">Results:</label>
                <b-form-input
                  v-model="resultsLimit"
                  type="number"
                  min="1"
                  max="50"
                  placeholder="Results"
                  class="results-input"
                ></b-form-input>
              
                <b-icon icon="filter-circle" @click="toggleFilters" class="filter-icon mx-2"></b-icon>
                <div class="buttons-container">
                  <b-button type="submit" variant="primary" class="ml-2">Search</b-button>
                  <b-button type="button" variant="secondary" @click="clearResults" class="ml-2">Clear Results</b-button>
                  <b-button type="button" variant="danger" @click="clearFilters" class="ml-2">Clear Filters</b-button>
                </div>
          </div>
        </b-form-group>
      </div>
      <transition name="fade">
        <div v-if="showFilters" class="filters-container">
          <b-form-group label="Filter by cuisine:">
            <b-form-checkbox-group v-model="selectedCuisine" :options="cuisineOptions" stacked></b-form-checkbox-group>
          </b-form-group>
          <b-form-group label="Filter by diet:">
            <b-form-checkbox-group v-model="selectedDiet" :options="dietOptions" stacked></b-form-checkbox-group>
          </b-form-group>
          <b-form-group label="Filter by intolerance:">
            <b-form-checkbox-group v-model="selectedIntolerance" :options="intoleranceOptions" stacked></b-form-checkbox-group>
          </b-form-group>
        </div>
      </transition>
    </b-form>

    <div v-if="searchResults.length" class="search-results">
      <div class="sort-container">
      <h2 class="mr-2">Search Results</h2>
      <b-form-group>
        <b-form-select v-model="sortOption" :options="sortOptions" class="ml-2"></b-form-select>
      </b-form-group>
    </div>
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
      selectedCuisine: [],
      selectedDiet: [],
      selectedIntolerance: [],
      resultsLimit: 5,
      searchResults: [],
      searchPerformed: false,
      sortOption: "",
      showFilters: false,
      cuisines: ["Italian", "Chinese", "American", "Mexican"],
      diets: ["Vegetarian", "Vegan", "Gluten Free", "Ketogenic"],
      intolerances: ["Dairy", "Egg", "Gluten", "Peanut"],
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
      this.selectedCuisine = [];
      this.selectedDiet = [];
      this.selectedIntolerance = [];
      this.resultsLimit = 5;
    },
    toggleFilters() {
      this.showFilters = !this.showFilters;
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
  min-width: 800px;
  margin: 0 auto;
  padding: 0px;
  margin-top: 10px;
  display:flex;
  justify-content: start;
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

.filters-container {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  margin-bottom: 10px;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}

.filters-container label {
  display: block;
  margin-top: 10px;
  font-weight: bold;
}

.filters-container .b-form-checkbox-group {
  margin-left: 20px;
}

.results-input {
  width: 80px;
}

.form-container{
  display: flex;
  flex-direction: column;
}

.form-container .d-flex {
  flex-wrap: wrap;
}

.form-container .d-flex > .d-flex {
  margin-bottom: 10px;
}

.form-container .d-flex > .ml-2 {
  margin-top: 10px;
}
.buttons-container {
  display: flex;
  margin-top: 10px;
  max-height: 50px;
  max-width: 100%;
}
.sort-container {
  display: flex;
  justify-content:start;
  align-items: center;
  margin-top: 20px;
}
.container-search {
  display: flex;
  justify-content: start;
  align-items: center;
}
</style>



