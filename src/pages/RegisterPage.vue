<template>
  <div class="container">
    <h1 class="title">Register</h1>
    <b-form @submit.prevent="onRegister" @reset.prevent="onReset">
      <b-form-group id="input-group-username" label-cols-sm="3" label="Username:" label-for="username">
        <b-form-input
          id="username"
          v-model="$v.form.username.$model"
          type="text"
          :state="usernameAvailable === false ? false : validateUsernameState()"
          @blur="checkUsernameAvailability"
        ></b-form-input>
        <b-form-invalid-feedback v-if="usernameAvailable === false">Username already exists</b-form-invalid-feedback>
        <b-form-invalid-feedback v-else-if="!$v.form.username.required">Username is required</b-form-invalid-feedback>
        <b-form-invalid-feedback v-else-if="!$v.form.username.minLength || !$v.form.username.maxLength">Username length should be between 3-8 characters long</b-form-invalid-feedback>
        <b-form-invalid-feedback v-if="!$v.form.username.alpha">Username must contain only alphabetic characters</b-form-invalid-feedback>
      </b-form-group>

      <b-form-group id="input-group-firstname" label-cols-sm="3" label="First Name:" label-for="firstname">
        <b-form-input id="firstname" v-model="$v.form.firstName.$model" type="text" :state="validateState('firstName')"></b-form-input>
        <b-form-invalid-feedback v-if="!$v.form.firstName.required">First name is required</b-form-invalid-feedback>
      </b-form-group>

      <b-form-group id="input-group-lastname" label-cols-sm="3" label="Last Name:" label-for="lastname">
        <b-form-input id="lastname" v-model="$v.form.lastName.$model" type="text" :state="validateState('lastName')"></b-form-input>
        <b-form-invalid-feedback v-if="!$v.form.lastName.required">Last name is required</b-form-invalid-feedback>
      </b-form-group>

      <b-form-group id="input-group-email" label-cols-sm="3" label="Email:" label-for="email">
        <b-form-input id="email" v-model="$v.form.email.$model" type="email" :state="validateState('email')"></b-form-input>
        <b-form-invalid-feedback v-if="!$v.form.email.required">Email is required</b-form-invalid-feedback>
        <b-form-invalid-feedback v-if="!$v.form.email.email">Invalid email format</b-form-invalid-feedback>
      </b-form-group>

      <b-form-group id="input-group-country" label-cols-sm="3" label="Country:" label-for="country">
        <b-form-select id="country" v-model="$v.form.country.$model" :options="countries" :state="validateState('country')"></b-form-select>
        <b-form-invalid-feedback>Country is required</b-form-invalid-feedback>
      </b-form-group>

      <b-form-group id="input-group-password" label-cols-sm="3" label="Password:" label-for="password">
        <b-form-input id="password" type="password" v-model="$v.form.password.$model" :state="validateState('password')"></b-form-input>
        <b-form-invalid-feedback v-if="!$v.form.password.required">Password is required</b-form-invalid-feedback>
        <b-form-invalid-feedback v-if="!$v.form.password.passwordComplexity">Password must contain at least one number and one special character</b-form-invalid-feedback>
        <b-form-invalid-feedback v-if="!$v.form.password.length">Password must be between 5-10 characters long</b-form-invalid-feedback>
      </b-form-group>

      <b-form-group id="input-group-confirmedPassword" label-cols-sm="3" label="Confirm Password:" label-for="confirmedPassword">
        <b-form-input id="confirmedPassword" type="password" v-model="$v.form.confirmedPassword.$model" :state="validateState('confirmedPassword')"></b-form-input>
        <b-form-invalid-feedback v-if="!$v.form.confirmedPassword.required">Password confirmation is required</b-form-invalid-feedback>
        <b-form-invalid-feedback v-if="!$v.form.confirmedPassword.sameAsPassword">The confirmed password is not equal to the original password</b-form-invalid-feedback>
      </b-form-group>

      <b-button type="reset" variant="danger">Reset</b-button>
      <b-button type="submit" variant="primary" style="width:250px;" class="ml-5 w-75">Register</b-button>
      <div class="mt-2">
        You have an account already?
        <router-link to="login"> Log in here</router-link>
      </div>
    </b-form>
    <b-alert class="mt-2" v-if="form.submitError" variant="warning" dismissible show>Register failed: {{ form.submitError }}</b-alert>
  </div>
</template>

<script>
import axios from "axios";
import { required, minLength, maxLength, email, sameAs, helpers } from "vuelidate/lib/validators";

export default {
  name: "RegisterPage",
  data() {
    return {
      form: {
        username: "",
        firstName: "",
        lastName: "",
        email: "",
        country: "",
        password: "",
        confirmedPassword: "",
        submitError: null,
      },
      countries: ["USA", "Canada", "UK", "Germany", "Australia"],
      usernameAvailable: null, 
    };
  },
  validations: {
    form: {
      username: {
        required,
        alpha: helpers.regex("alpha", /^[a-zA-Z]+$/),
        minLength: minLength(3),
        maxLength: maxLength(8),
      },
      firstName: { required },
      lastName: { required },
      email: { required, email },
      country: { required },
      password: {
        required,
        minLength: minLength(5),
        maxLength: maxLength(10),
        passwordComplexity: helpers.regex(
          "passwordComplexity",
          /^(?=.*[0-9])(?=.*[!@#$%^&*])/
        ),
      },
      confirmedPassword: {
        required,
        sameAsPassword: sameAs("password"),
      },
    },
  },
  methods: {
    validateUsernameState() {
      if (!this.$v.form.username.required) return null;
      if (!this.$v.form.username.$pending && this.usernameAvailable === false) return false;
      return this.$v.form.username.$pending ? null : !this.$v.form.username.$invalid;
    },

    validateState(field) {
      return !this.$v.form[field].$invalid;
    },

    async checkUsernameAvailability() {
      try {
        const response = await axios.get("http://localhost:3000/Register", {
          params: { username: this.form.username },
        });
        this.usernameAvailable = response.data.available;
      } catch (error) {
        this.usernameAvailable = false; 
      }
    },

    async onRegister() {
      this.$v.$touch(); 
      if (this.$v.$invalid || this.usernameAvailable === false) {
        return;
      }
      try {
        const response = await axios.post("http://localhost:3000/Register", {
          username: this.form.username,
          firstname: this.form.firstName,
          lastname: this.form.lastName,
          email: this.form.email,
          country: this.form.country,
          password: this.form.password,
        });
        console.log(response.data);
        this.$router.push("/Login");
        this.$root.toast("Register", "User registered successfully", "success");
      } catch (error) {
        this.form.submitError = error.response.data.message || "Failed to register";
      }
    },

    onReset() {
      this.$v.$reset();
      this.form = {
        username: "",
        firstName: "",
        lastName: "",
        email: "",
        country: "",
        password: "",
        confirmedPassword: "",
        submitError: null,
      };
      this.usernameAvailable = null;
    },
  },

  watch: {
    "form.username": function () {
      this.checkUsernameAvailability();
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  max-width: 500px;
  margin-top: 5%;
  margin-bottom: 5%;
}
</style>
