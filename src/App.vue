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
            Hello Guest,     
            <router-link :to="{ name: 'login' }" class="nav-link2"> Login</router-link>
            <span> | </span>
            <router-link :to="{ name: 'register' }" class="nav-link2"> Register </router-link>
          </span>
          <span v-else class="nav-item">
            <b-button  variant="outline-success" @click="showModal">Add Recipe</b-button>
            <b-nav-item-dropdown :text="$root.store.username" left style="font-size: 100%">
              <b-dropdown-item href="#"><router-link :to="{ name: 'my_favorite_recipes' }" class="nav-link2">My favorite recipes</router-link></b-dropdown-item>
              <b-dropdown-item href="#"><router-link :to="{ name: 'my_recipes' }" class="nav-link2">My recipes</router-link></b-dropdown-item>
              <b-dropdown-item href="#"><router-link :to="{ name: 'my_family_recipes' }" class="nav-link2">My family recipes</router-link></b-dropdown-item>
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
  /* determine the router links in the navbar to be white */
  #nav router-link {
    color: white;
  }

</style>
