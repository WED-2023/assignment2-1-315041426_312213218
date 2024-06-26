<template>
  <div class="container">
    <h1 class="title">Register</h1>
    <b-form @submit.prevent="onRegister" @reset.prevent="onReset">
      <b-form-group id="input-group-username" label-cols-sm="3" label="Username:" label-for="username">
        <b-form-input id="username" v-model="$v.form.username.$model" type="text" :state="validateState('username')"></b-form-input>
        <b-form-invalid-feedback v-if="!$v.form.username.required">Username is required</b-form-invalid-feedback>
        <b-form-invalid-feedback v-else-if="!$v.form.username.length">Username length should be between 3-8 characters long</b-form-invalid-feedback>
        <b-form-invalid-feedback v-if="!$v.form.username.alpha">Username must contain only alphabetic characters</b-form-invalid-feedback>
        <b-form-invalid-feedback v-if="usernameExists">Username already exists</b-form-invalid-feedback>
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
import { required, minLength, maxLength, alpha, sameAs, email } from "vuelidate/lib/validators";
import { mockRegister, mockCheckUsernameExists } from "../services/auth.js";

export default {
  name: "Register",
  data() {
    return {
      form: {
        username: "",
        firstName: "",
        lastName: "",
        email: "",
        country: null,
        password: "",
        confirmedPassword: "",
        submitError: undefined
      },
      countries: [{ value: null, text: "", disabled: true }],
      usernameExists: false
    };
  },
  validations: {
    form: {
      username: {
        required,
        length: (u) => minLength(3)(u) && maxLength(8)(u),
        alpha
      },
      firstName: { required },
      lastName: { required },
      email: { required, email },
      country: { required },
      password: {
        required,
        length: (p) => minLength(5)(p) && maxLength(10)(p),
        passwordComplexity: (p) => /[0-9]/.test(p) && /[!@#$%^&*]/.test(p)
      },
      confirmedPassword: {
        required,
        sameAsPassword: sameAs("password")
      }
    }
  },
  mounted() {
    this.fetchCountries();
  },
  methods: {
    async fetchCountries() {
      try {
        const response = await axios.get("https://restcountries.com/v3.1/all");
        this.countries = response.data.map((country) => ({
          value: country.cca2,
          text: country.name.common
        }));
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    },
    validateState(param) {
      const { $dirty, $error } = this.$v.form[param];
      return $dirty ? !$error : null;
    },
    async Register() {
      try {
        this.usernameExists = false;
        const userDetails = {
          username: this.form.username,
          firstName: this.form.firstName,
          lastName: this.form.lastName,
          email: this.form.email,
          country: this.form.country,
          password: this.form.password
        };

        // Mock check if username exists
        const usernameExists = mockCheckUsernameExists(this.form.username);
        if (usernameExists) {
          this.usernameExists = true;
          return;
        }

        const response = mockRegister(userDetails);
        this.$router.push("/login");
      } catch (err) {
        console.log(err.response);
        this.form.submitError = err.response.data.message;
      }
    },
    onRegister() {
      this.$v.form.$touch();
      if (this.$v.form.$anyError) {
        return;
      }
      this.Register();
    },
    onReset() {
      this.form = {
        username: "",
        firstName: "",
        lastName: "",
        email: "",
        country: null,
        password: "",
        confirmedPassword: ""
      };
      this.$nextTick(() => {
        this.$v.$reset();
      });
    }
  }
};
</script>


<style lang="scss" scoped>
.container {
  max-width: 500px;
  margin-top: 5%;
  margin-bottom:5%;
}
</style>