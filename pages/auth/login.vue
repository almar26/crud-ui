<template>
  <div class="d-flex align-center justify-center" style="height: 70vh">
    <v-sheet width="400" class="mx-auto">
      <v-card class="elevation-12 mx-auto">
        <v-toolbar dark color="primary">
          <v-toolbar-title>Login form</v-toolbar-title>
        </v-toolbar>
        <v-card-text>
          <v-form
            ref="form"
            v-model="valid"
            @submit.prevent="submit()"
            lazy-validation
          >
            <v-text-field
              outlined
              v-model="email"
              :rules="emailRules"
              label="Email"
              prepend-inner-icon="mdi-account"
            ></v-text-field>
            <v-text-field
              outlined
              v-model="password"
              label="Password"
              :rules="passwordRules"
              prepend-inner-icon="mdi-lock"
              :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
              :type="show ? 'text' : 'password'"
              @click:append="toggleShow"
            >
            </v-text-field>
            <a href="#" class="text-body-2 font-weight-regular"
              >Forgot Password</a
            >
            <v-btn block class="mt-2" color="primary" type="submit"
              >Sign in</v-btn
            >
          </v-form>
        </v-card-text>
      </v-card>
    </v-sheet>

    <!-- SNACKBAR -->
    <v-snackbar v-model="loginSnackbar" :color="snackbarColor" top right>
      {{ snackbarText }}

      <template v-slot:action="{ attrs }">
        <v-btn text v-bind="attrs" @click="loginSnackbar = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script>
export default {
  layout: "auth",
  middleware: "auth",
  name: "IndexPage",
  data() {
    return {
      valid: true,
      show: false,
      email: "",
      password: "",
      passwordRules: [
        (v) => !!v || "Password is required",
        (v) => (v && v.length >= 8) || "Password is required",
      ],
      emailRules: [
        (v) => !!v || "E-mail is required",
        (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
      ],
      loginSnackbar: false,
      snackbarText: "",
      snackbarColor: "",
    };
  },

  methods: {
    toggleShow() {
      this.show = !this.show;
    },

    submit() {
      if (this.$refs.form.validate(true)) {
        this.$auth
          .loginWith("local", {
            data: {
              identifier: this.email,
              password: this.password,
            },
          })
          .catch((error) => {
            if (error.response.data.error.status == 400) {
              console.log(error.response.data.error.message);
              this.snackbarText = error.response.data.error.message;
              this.snackbarColor = "error";
              this.loginSnackbar = true;
            }
          });
      }
    },
  },
};
</script>
