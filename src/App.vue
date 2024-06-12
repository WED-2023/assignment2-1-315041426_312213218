<template>
  <div id="app">
    <b-navbar toggleable="lg" variant="dark" type="dark" class="justify-content-center">
      <b-navbar-brand href="#">Grandma's Recipes</b-navbar-brand>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <router-link to="/" class="nav-link" active-class="active" exact>All Recipes</router-link>
        <router-link :to="{name: 'about' }" class="nav-link">About</router-link>
        <router-link :to="{ name: 'search' }" class="nav-link">Search</router-link>|
        <span v-if="!$root.store.username">
        Hello Guest: 
        <router-link :to="{ name: 'register' }">Register</router-link>|
        <router-link :to="{ name: 'login' }">Login</router-link>|
      </span>
      <span v-else>
        {{ $root.store.username }}: <button @click="Logout">Logout</button>|
      </span>



      </b-collapse>
    </b-navbar>

    <router-view />
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

.nav-link {
  font-weight: bold;
  color: #fff; /* Ensures the text is visible on dark backgrounds */
}

.nav-link.active {
  color: #f8f9fa; /* Light color for the active tab to stand out */
}
#nav-collapse {
  display: flex;
  justify-content: left; /* Center the navigation items within the collapse */
}
</style>
