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
import { mockLogin } from "../services/auth.js";

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
    validateState(param) {
      const { $dirty, $error } = this.$v.form[param];
      return $dirty ? !$error : null;
    },
    async Login() {
      try {
        const response = mockLogin(this.form.username, this.form.password);

        // Assuming mockLogin returns a success status
        if (response.response.data.success) {
          this.$root.store.login(this.form.username);
            // Ensure not navigating to the same route
            if (this.$router.currentRoute.path !== '/') {
            this.$router.push("/");
        } 
        else {
          throw new Error(response.message || "Login failed");
        }
      }
      } catch (err) {
        console.log(err.message);
        this.form.submitError = err.message;
      }
    },
    onLogin() {
      this.form.submitError = undefined;
      this.$v.form.$touch();
      this.$root.toast("Login", "User logged in successfully", "success");
      if (this.$v.form.$anyError) {
        return;
      }
      this.Login();
    }
  }
};
</script>

<!-- <template>
  <div class="container">
    <h1 class="title">Login</h1>
    <b-form @submit.prevent="onLogin">
      <b-form-group
        id="input-group-Username"
        label-cols-sm="3"
        label="Username:"
        label-for="Username"
      >
        <b-form-input
          id="Username"
          v-model="$v.form.username.$model"
          type="text"
          :state="validateState('username')"
        ></b-form-input>
        <b-form-invalid-feedback>
          Username is required
        </b-form-invalid-feedback>
      </b-form-group>

      <b-form-group
        id="input-group-Password"
        label-cols-sm="3"
        label="Password:"
        label-for="Password"
      >
        <b-form-input
          id="Password"
          type="password"
          v-model="$v.form.password.$model"
          :state="validateState('password')"
        ></b-form-input>
        <b-form-invalid-feedback>
          Password is required
        </b-form-invalid-feedback>
      </b-form-group>

      <b-button
        type="submit"
        variant="primary"
        style="width:100px;display:block;"
        class="mx-auto w-100"
        >Login</b-button
      >
      <div class="mt-2">
        Do not have an account yet?
        <router-link to="register"> Register in here</router-link>
      </div>
    </b-form>
    <b-alert
      class="mt-2"
      v-if="form.submitError"
      variant="warning"
      dismissible
      show
    >
      Login failed: {{ form.submitError }}
    </b-alert>
    <b-card class="mt-3" header="Form Data Result">
      <pre class="m-0">{{ form }}</pre>
    </b-card> 
  </div> -->
<style lang="scss" scoped>
.container {
  max-width: 400px;
  margin: 0 auto; /* Center horizontally */
  display: flex;
  flex-direction: column;
  justify-content: center; /* Center vertically */
  height: 100vh; /* Full viewport height */
}
</style>
