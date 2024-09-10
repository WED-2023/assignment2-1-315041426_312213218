<template>
  <div class="container">
    <h1 class="title">Login</h1>
    <b-form @submit.prevent="onLogin">
      <b-form-group id="input-group-username" label-cols-sm="3" label="Username:" label-for="username">
        <b-form-input id="username" v-model="$v.form.username.$model" type="text" :state="validateState('username')"></b-form-input>
        <b-form-invalid-feedback v-if="!$v.form.username.required">Username is required</b-form-invalid-feedback>
      </b-form-group>

      <b-form-group id="input-group-password" label-cols-sm="3" label="Password:" label-for="password">
        <b-form-input id="password" type="password" v-model="$v.form.password.$model" :state="validateState('password')"></b-form-input>
        <b-form-invalid-feedback v-if="!$v.form.password.required">Password is required</b-form-invalid-feedback>
      </b-form-group>

      <b-button type="submit" variant="primary" class="w-100">Login</b-button>
      <div class="mt-2">
        Do not have an account yet?
        <router-link to="register">Register here</router-link>
      </div>
    </b-form>
    <b-alert class="mt-2" v-if="form.submitError" variant="warning" dismissible show>
      Login failed: {{ form.submitError }}
    </b-alert>
  </div>
</template>

<script>
import { required } from "vuelidate/lib/validators";
import axios from "axios";

export default {
  name: "Login",
  data() {
    return {
      form: {
        username: "",
        password: "",
        submitError: undefined
      }
    };
  },
  validations: {
    form: {
      username: { required },
      password: { required }
    }
  },
  methods: {
  async Login() {
    try {
      const response = await axios.post("http://localhost:3000/Login", {
        username: this.form.username,
        password: this.form.password
      },
      { withCredentials: true });

      if (response.data.success) {
        this.$root.store.login(this.form.username); // This should update $root.store.username

        // Show toast message for successful login
        this.$root.toast("Login", "User logged in successfully", "success");

        // Redirect to main page
        if (this.$router.currentRoute.path !== '/') {
          this.$router.push("/");
        }
      } else {
        throw new Error(response.data.message || "Login failed");
      }
    } catch (err) {
      this.form.submitError = err.message || "Login failed";
    }
  },
  onLogin() {
      this.form.submitError = undefined;
      this.$v.form.$touch();
      if (this.$v.form.$anyError) {
        return;
      }
      this.Login();
    },
  validateState(field) {
      const { $dirty, $error } = this.$v.form[field];
      return $dirty ? !$error : null;
    },
}



};
</script>

<style lang="scss" scoped>
.container {
  max-width: 400px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100vh;
}
</style>
