<template>
  <div id="app">
    <div id="nav">
      <b-navbar type="dark" variant="dark" fixed="top">
        <b-navbar-nav>
          <b-nav-item ><router-link :to="{ name: 'main' }" class="nav-link1">Main</router-link></b-nav-item>
          <b-nav-item><router-link :to="{ name: 'search' }" class="nav-link1">Search</router-link></b-nav-item>
          <b-nav-item><router-link :to="{ name: 'about' }" class="nav-link1">About</router-link></b-nav-item>
        </b-navbar-nav>
        <b-navbar-nav class="ml-auto">
          <span v-if="!$root.store.username" class="nav-item nav-link2">
            <span id="hello-text">Hello Guest,</span>     
            <router-link :to="{ name: 'login' }" class="nav-link1"> Login</router-link>
            <span> | </span>
            <router-link :to="{ name: 'register' }" class="nav-link1"> Register </router-link>
          </span>
          <span v-else class="nav-item nav-link2 user-menu">
            <b-button  variant="outline-success" @click="showModal" class="nav-link2">Add Recipe</b-button>
            <b-nav-item-dropdown :text="$root.store.username" id="dropdown-menu">
              <b-dropdown-item href="#"><router-link class="dropdown-item" :to="{ name: 'my_favorite_recipes' }" >My favorite recipes</router-link></b-dropdown-item>
              <b-dropdown-item href="#"><router-link class="dropdown-item" :to="{ name: 'my_recipes' }">My recipes</router-link></b-dropdown-item>
              <b-dropdown-item href="#"><router-link class="dropdown-item" :to="{ name: 'my_family_recipes' }">My family recipes</router-link></b-dropdown-item>
            </b-nav-item-dropdown>
            <b-button class="button-4 nav-link2" variant="outline-success" @click="Logout" >Logout</b-button>
          </span>
        </b-navbar-nav>
      </b-navbar>
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  name: "App",
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
}

/* Custom dropdown item styles */
.dropdown-item {
  background-color: #343a40 !important; /* Set the dropdown item background color to black */
  color: white !important; /* Ensure the text is visible on the black background */
}

.dropdown-item:hover,
.dropdown-item:focus {
  background-color: #1a1a1a !important; /* Set a slightly lighter color for hover/focus */
}

.b-nav-item-dropdown .dropdown-menu .dropdown-divider {
  border-top-color: #6c757d !important; /* Optional: set the color of the divider */
}

</style>
