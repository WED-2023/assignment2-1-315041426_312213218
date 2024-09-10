<template>
  <div class="container">
    <h1 class="title mt-5 mb-0 pt-5 pb-0">Search Page</h1>
    <b-form @submit.prevent="searchRecipes" class="pt-0 mt-0">
      <div class="recipe-search-container">
        <b-form-group>
          <div class="container-search">
            <b-form-input v-model="searchQuery" placeholder="Enter recipe to search" class="ml-0 mr-3"></b-form-input>
            <label class="mb-0 mr-2">Results:</label>
            <b-form-select v-model="resultsLimit" :options="resultsLimits" class="results-select"></b-form-select>
            <b-icon :icon="filterIcon" @click="toggleFilters" class="filter-icon mx-2"></b-icon>
            <div class="buttons-container">
              <b-button type="submit" variant="outline-primary" class="ml-2" @click="handleSearchClick">Search</b-button>
              <b-button type="button" variant="outline-secondary" @click="clearResults" class="ml-2 wide-button">Clear Results</b-button>
              <b-button type="button" variant="outline-danger" @click="clearFilters" class="ml-2 wide-button">Clear Filters</b-button>
            </div>
          </div>
        </b-form-group>
      </div>
      <transition name="fade">
        <div v-if="showFilters" class="filters-container">
          <b-form-group label="Filter by cuisine:">
            <b-form-checkbox-group v-model="selectedCuisine" :options="cuisines"></b-form-checkbox-group>
          </b-form-group>
          <b-form-group label="Filter by diet:">
            <b-form-checkbox-group v-model="selectedDiet" :options="diets"></b-form-checkbox-group>
          </b-form-group>
          <b-form-group label="Filter by intolerance:">
            <b-form-checkbox-group v-model="selectedIntolerance" :options="intolerances"></b-form-checkbox-group>
          </b-form-group>
        </div>
      </transition>
    </b-form>

    <div v-if="searchPerformed && displayResults" class="search-results">
        <div class="sort-container">
          <h2 class="mr-2">Search Results:</h2>
            <b-form-group>
              <b-form-select v-model="sortOption" :options="sortOptions" class="ml-2 sort-select"></b-form-select>
            </b-form-group>
        </div>
        <RecipePreviewList :recipes="searchResults"></RecipePreviewList>
    </div>
  </div>
</template>






<script>
import SearchedRecipes from '../components/SearchedRecipes.vue';
import RecipePreviewList from '../components/RecipePreviewList.vue';
import axios from 'axios';

export default {
  name: "SearchPage",
  components: {
    RecipePreviewList
  },
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
      cuisines: ["Asian","American","British"
                ,"Cajun","Caribbean","Chinese"
                ,"EasternEuropean","European","French"
                ,"German","Greek","Indian"
                ,"Irish","Italian","Japanese"
                ,"Jewish","Korean","Latin American"
                ,"Mediterranean","Mexican","Middle Eastern"
                ,"Nordic","Southern","Spanish"
                ,"Thai","Vietnamese"],
      diets: ["Vegetarian", "Vegan", "Gluten Free", "Ketogenic", "Pescetarian","Paleo","Primal","Whole30","Low FODMAP"],
      intolerances: ["Dairy", "Egg", "Gluten", "Peanut", "Grain","Peanut","Seafood","Sesame","Shellfish","Soy","Sulfite","Tree Nut","Wheat"],
      resultsLimits: [5, 10, 15],
      sortOptions: ["None", "Preparation Time", "Popularity"],
      isSearchButtonClicked: false,
      displayResults: false  
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
    },
    filterIcon() {
      return this.selectedCuisine.length > 0 || this.selectedDiet.length > 0 || this.selectedIntolerance.length > 0 ? 'filter-circle-fill' : 'filter-circle';
    }
  },
  methods: {
    handleSearchClick() {
      if (!this.searchQuery) {
        return;
      }
      this.searchPerformed = true;
      this.displayResults = true;
      this.searchRecipes();
    },
    async searchRecipes() {
      // Simulate fetching search results from a server
      // Replace this with actual API call
      const params = {
        searchQuery: this.searchQuery,
        cuisinesArray: this.selectedCuisine,
        dietsArray: this.selectedDiet,
        intolerancesArray: this.selectedIntolerance,
        number: this.resultsLimit
      };
      const response = await axios.get('http://localhost:3000/recipes/search', { params});  
      this.searchResults = response.data;
    },
    clearResults() {
      this.searchResults = [];
      this.searchQuery = "";
      this.searchPerformed = false;
      this.displayResults = false;
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
  },
  watch:{
    selectedCuisine(newVal, oldVal){
      console.log("array of Cuisins is ", this.selectedCuisine);
    },
  }
};
</script>


<style scoped>
.recipe-search-container {
  max-width: 800px;
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
  display: flex;
  flex-direction: column;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
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
  margin-top: 2%;
  align-items: center;
}

.container-search {
  display: flex;
  justify-content: start;
  align-items: center;
}

.results-input {
  width: 80px;
}

.results-select {
  width: 15%;
}

.filter-icon {
  cursor: pointer;
  transition: all 2s ease;
}
.wide-button {
  white-space: nowrap; /* Prevent text wrapping */
}
</style>




