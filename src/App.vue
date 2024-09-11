<template>
  <div id="app">
    <div id="nav">
      <b-navbar type="dark" variant="dark" fixed="top">
        <b-navbar-nav>
          <b-nav-item>
            <b-button variant="outline-primary" @click="navigateTo('main')" class="nav-link1">Main</b-button>
          </b-nav-item>
          <b-nav-item>
            <b-button variant="outline-light" @click="navigateTo('search')" class="nav-link1">Search</b-button>
          </b-nav-item>
          <b-nav-item>
            <b-button variant="outline-light" @click="navigateTo('about')" class="nav-link1">About</b-button>
          </b-nav-item>
        </b-navbar-nav>
        <b-navbar-nav class="ml-auto">
          <span v-if="!$root.store.username" class="nav-item nav-link2">
            <span id="hello-text">Hello Guest,</span>
            <router-link :to="{ name: 'login' }" class="nav-link1"> Login</router-link>
            <span> | </span>
            <router-link :to="{ name: 'register' }" class="nav-link1"> Register </router-link>
          </span>
          <span v-else class="nav-item nav-link2 user-menu">
            <b-button variant="outline-success" @click="$bvModal.show('modal-prevent-closing')" class="nav-link2 wide-button">Add Recipe</b-button>
            <b-nav-item-dropdown :text="$root.store.username" id="dropdown-menu">
              <b-dropdown-item class="dropdown-item text-left">
                <router-link class="dropdown-router-link" :to="{ name: 'favorites' }">My favorite recipes</router-link>
              </b-dropdown-item>
              <b-dropdown-item class="dropdown-item text-left">
                <router-link class="dropdown-router-link" :to="{ name: 'my_recipes' }">My recipes</router-link>
              </b-dropdown-item>
              <b-dropdown-item class="dropdown-item text-left">
                <router-link class="dropdown-router-link" :to="{ name: 'my_family_recipes' }">My family recipes</router-link>
              </b-dropdown-item>
            </b-nav-item-dropdown>


            <b-button class="button-4 nav-link2" variant="outline-danger" @click="Logout">Logout</b-button>
          </span>
        </b-navbar-nav>
      </b-navbar>
      <router-view />
    </div>

    <b-modal
      id="modal-prevent-closing"
      ref="modal"
      title="Submit Your Recipe"
      @show="resetModal"
      @hidden="resetModal"
      @ok="handleOk"
    >
      <form ref="form" @submit.stop.prevent="handleSubmit">
        <b-form-group label="Recipe Name" label-for="name-input">
          <b-form-input id="name-input" v-model="recipe.name" required :state="nameState"></b-form-input>
          <b-form-invalid-feedback v-show="!nameState">Name is required</b-form-invalid-feedback>
        </b-form-group>
        <b-form-group label="Time to Prepare (in minutes)" label-for="time-input">
          <b-form-input id="time-input" v-model="recipe.time" type="number" min="1" required :state="timeState"></b-form-input>
          <b-form-invalid-feedback v-show="!timeState">Time is required</b-form-invalid-feedback>
        </b-form-group>

        <b-form-group label="Ingredients" label-for="ingredients-input">
          <div v-for="(ingredient, index) in recipe.ingredients" :key="`ingredient-${index}`" class="mb-2">
            <b-form-input
              id="'ingredient-input-' + index"
              v-model="recipe.ingredients[index]"
              placeholder="Enter ingredient"
              :state="checkIngredientsValidity(ingredient)"
            ></b-form-input>
            <b-form-invalid-feedback v-show="!checkIngredientsValidity(ingredient)">
              Each ingredient is required
            </b-form-invalid-feedback>
          </div>
          <b-button size="sm" variant="success" @click="addIngredient">Add Ingredient</b-button>
          <b-button v-if="recipe.ingredients.length > 1" size = "sm" variant="danger" @click="removeIngredient">Remove Ingredient</b-button>
        </b-form-group>

        <b-form-group label="Instructions" label-for="instructions-input">
          <div v-for="(instruction, index) in recipe.instructions" :key="`instruction-${index}`" class="mb-2">
            <b-form-input
              id="'instruction-input-' + index"
              v-model="recipe.instructions[index]"
              placeholder="Enter instruction"
              :state="checkInstructionsValidity(instruction)"
            ></b-form-input>
            <b-form-invalid-feedback v-show="!checkInstructionsValidity(instruction)">
              Each instruction is required
            </b-form-invalid-feedback>
          </div>
          <b-button size="sm" variant="success" @click="addInstruction">Add Instruction</b-button>
          <b-button v-if="recipe.instructions.length > 1" size = "sm" variant="danger" @click="removeInstruction">Remove Instruction</b-button>
        </b-form-group>


        <b-form-group>
          <b-form-checkbox v-model="recipe.glutenFree">Gluten Free</b-form-checkbox>
          <b-form-checkbox v-model="recipe.vegan">Vegan</b-form-checkbox>
        </b-form-group>
      </form>
    </b-modal>
  </div>
</template>




<script>
export default {
  name: "App",
  data() {
  return {
    recipe: {
      name: '',
      time: 0,
      ingredients: [''],
      instructions: [''],
      glutenFree: false,
      vegan: false,
    },
    nameValidated: false,
    timeValidated: false,
    ingredientsValidated: false,
    instructionsValidated: false,
  };
}
,
  computed: {
  nameState() {
    // I want to return false if the input field is empty
    console.log("Watcher for input field returns:", this.recipe.name.trim() !== '');
    return this.recipe.name.trim() !== ''; 
  },
  timeState() {
    console.log("Watcher for time field returns:", this.recipe.time > 0);
    return this.recipe.time > 0 
  },
  ingredientsState() {
    return this.recipe.ingredients.some(ingredient => ingredient.trim() !== '') ? true : false;
  },
  instructionsState() {
    return this.recipe.instructions.some(instruction => instruction.trim() !== '') ? true : false;
  }
},
  methods: {
    Logout() {
      this.$root.store.logout();
      this.$root.toast("Logout", "User logged out successfully", "success");
      this.$router.push("/").catch(() => {
        this.$forceUpdate();
      });
    },
    IsUserLoggedIn() {
      return this.$root.store.username !== undefined;
    },
    checkFormValidity() {
      const hasName = this.recipe.name.trim() !== '';
      const hasTime = this.recipe.time > 0;
      const hasIngredients = this.recipe.ingredients.some(ingredient => ingredient.trim() !== '');
      const hasInstructions = this.recipe.instructions.some(instruction => instruction.trim() !== '');

      // Set validated flags to true to show feedback if invalid
      this.nameValidated = !hasName;
      this.timeValidated = !hasTime;
      this.ingredientsValidated = !hasIngredients;
      this.instructionsValidated = !hasInstructions;
      console.log("Form validity:", hasName, hasTime, hasIngredients, hasInstructions);
      return hasName && hasTime && hasIngredients && hasInstructions;
    },
    resetModal() {
      this.recipe = {
        name: '',
        ingredients: [''],
        instructions: [''],
        glutenFree: false,
        vegan: false,
      };
    },
    handleOk(bvModalEvent) {
      // Prevent modal from closing
      if (!this.checkFormValidity()) {
        bvModalEvent.preventDefault();
        console.log("Invalid form submission");
        return; // Prevent form submission if invalid
      }
      // if the form is valid proceed with form submission logic
      this.handleSubmit();
    },
    handleSubmit() {
    if (!this.checkFormValidity()) {
      console.log("Invalid form submission");
      return; // Prevent form submission if invalid
    }
    // Proceed with form submission logic, e.g., sending data to server
    console.log(" form is valid , Recipe submitted:", this.recipe);

    // close modal:
    this.$bvModal.hide('modal-prevent-closing');
    },
    addIngredient() {
      this.recipe.ingredients.push('');
    },
    addInstruction() {
      this.recipe.instructions.push('');
    },
    removeIngredient() {
      this.recipe.ingredients.pop();
    },
    removeInstruction() {
      this.recipe.instructions.pop();
    },
    checkIngredientsValidity(ingredient) {
    return ingredient.trim() !== ''; // Returns false if invalid, true if valid
    },
    checkInstructionsValidity(instruction) {
      // I want to return true if at least one input field is not empty
      return instruction.trim() !== ''; // Returns false if invalid, true if valid

    },
    navigateTo(routeName) {
    if (this.$route.name !== routeName) {
      this.$router.push({ name: routeName });
    }
    }
  }
};
</script>




<style lang="scss">
@import "@/scss/form-style.scss";

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #000000; /* Adjust text color for better readability on dark background */
  min-height: 100vh;
}

.b-navbar {
  display: flex;
  justify-content: center; /* Center the navbar content horizontally */
  width: 100%; /* Ensure the navbar takes full width */
}

.nav-link1 {
  font-weight: bold;
  color: #fff; /* Ensures the text is visible on dark backgrounds */
}

.nav-link2 {
  font-weight: normal;
  color: #fff; /* Ensures the text is visible on dark backgrounds */
}

.nav-link.active {
  color: #f8f9fa; /* Light color for the active tab to stand out */
}

#nav-collapse {
  display: flex;
  justify-content: left; /* Center the navigation items within the collapse */
}

/* Determine the router links in the navbar to be white */
#nav router-link {
  color: white;
}

.user-menu {
  display: flex;
  align-items: center;
}

.user-menu .nav-link1,
.user-menu .nav-link2 {
  margin-right: 10px;
}

#hello-text {
  margin-right: 10px;
}

/* Custom dropdown background color to match the navbar */
.b-nav-item-dropdown .dropdown-menu {
  background-color: #343a40 !important; /* Match this color with your navbar's background color */
  border-color: #343a40 !important; /* Optional: match the border color as well */
  color: white;
  text-align: left; /* Ensure text aligns to the left */
  width: auto; /* Adjust width to fit content */
  margin: 0; /* Remove any default margins */
  padding: 0.5rem 1rem; /* Adjust padding as needed */
}

/* Custom dropdown item styles */
.dropdown-item {
  background-color: #343a40 !important; /* Set the dropdown item background color to black */
  color: white !important; /* Ensure the text is visible on the black background */
  text-align: left; /* Ensure text aligns to the left */
  white-space: nowrap; /* Prevent text from wrapping */
}

.dropdown-item:hover,
.dropdown-item:focus {
  background-color: #1a1a1a !important; /* Set a slightly lighter color for hover/focus */
}

.b-nav-item-dropdown .dropdown-menu .dropdown-divider {
  border-top-color: #6c757d !important; /* Optional: set the color of the divider */
}


/* Adjust dropdown item text alignment */
.dropdown-item.text-left {
  text-align: left;
  padding:0;
}
#dropdown-menu{
  margin-right: 0;
}
.wide-button {
  white-space: nowrap; /* Prevent text wrapping */
}
.dropdown-router-link{
color: white !important; /* Ensure the text is white */
  text-decoration: none;   /* Remove underline */
}

</style>
