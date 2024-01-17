<template>
  <v-container fluid>
    <div class="d-flex align-center justify-center" style="height: 90vh">
      <v-sheet width="800" class="mx-auto">
        <v-card class="elevation-0 mx-auto">
          <v-toolbar elevation="0">
            <v-toolbar-title
              ><v-btn icon @click="$router.go(-1)"
                ><v-icon>mdi-chevron-left</v-icon></v-btn
              >
              Create new student</v-toolbar-title
            >
          </v-toolbar>
          <v-divider></v-divider>
          <v-card-text class="mb-4">
            <v-form
              ref="form"
              v-model="valid"
              @submit.prevent="submit()"
              lazy-validation
            >
              <v-row dense>
                <v-col cols="3"
                  ><v-subheader>Student Number </v-subheader></v-col
                >
                <v-col cols="8">
                  <v-text-field
                    v-model="student_no"
                    dense
                    :rules="studentNoRules"
                  ></v-text-field
                ></v-col>
              </v-row>
              <v-row dense>
                <v-col cols="3"><v-subheader>Lastname </v-subheader></v-col>
                <v-col cols="8">
                  <v-text-field
                    v-model="last_name"
                    dense
                    :rules="lastNameRules"
                  ></v-text-field
                ></v-col>
              </v-row>
              <v-row dense>
                <v-col cols="3"><v-subheader>Firstname </v-subheader></v-col>
                <v-col cols="8">
                  <v-text-field
                    v-model="first_name"
                    dense
                    :rules="firstNameRules"
                  ></v-text-field
                ></v-col>
              </v-row>
              <v-row dense>
                <v-col cols="3"><v-subheader>Middlename </v-subheader></v-col>
                <v-col cols="8">
                  <v-text-field
                    v-model="middle_name"
                    dense
                    :rules="middleNameRules"
                  ></v-text-field
                ></v-col>
              </v-row>
              <v-row dense>
                <v-col cols="3"><v-subheader>Course </v-subheader></v-col>
                <v-col cols="8">
                  <v-text-field
                    v-model="course"
                    dense
                    :rules="courseRules"
                  ></v-text-field
                ></v-col>
              </v-row>
              <v-row dense>
                <v-col cols="3"><v-subheader>Section </v-subheader></v-col>
                <v-col cols="8">
                  <v-text-field
                    v-model="section"
                    dense
                    :rules="sectionRules"
                  ></v-text-field
                ></v-col>
              </v-row>
              <v-row dense>
                <v-col cols="3"
                  ><v-subheader>Contact Number </v-subheader></v-col
                >
                <v-col cols="8">
                  <v-text-field
                    v-model="contact_no"
                    type="number"
                    dense
                    :rules="contactNoRules"
                  ></v-text-field
                ></v-col>
              </v-row>
            </v-form>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions class="my-4">
            <v-spacer />
            <v-btn color="success" @click="addRecord"
              ><v-icon left>mdi-content-save</v-icon> Save
            </v-btn>
            <v-btn color="error" @click="$router.go(-1)"
              ><v-icon left>mdi-cancel</v-icon>Cancel</v-btn
            >
            <v-spacer />
          </v-card-actions>
        </v-card>
      </v-sheet>
    </div>

    <!-- SNACKBAR -->
    <v-snackbar v-model="addSnackbar" :color="snackbarColor" top right>
      {{ snackbarText }}

      <template v-slot:action="{ attrs }">
        <v-btn text v-bind="attrs" @click="addSnackbar = false"> Close </v-btn>
      </template>
    </v-snackbar>
  </v-container>
</template>
<script>
export default {
  data() {
    return {
      valid: true,
      student_no: "",
      last_name: "",
      first_name: "",
      middle_name: "",
      course: "",
      section: "",
      contact_no: null,
      addSnackbar: false,
      snackbarColor: "",
      snackbarText: "",
      studentNoRules: [(v) => !!v || "Student No is required"],
      lastNameRules: [(v) => !!v || "Lastname is required"],
      firstNameRules: [(v) => !!v || "Firstname is required"],
      middleNameRules: [(v) => !!v || "Middlename is required"],
      courseRules: [(v) => !!v || "course is required"],
      sectionRules: [(v) => !!v || "Section is required"],
      contactNoRules: [(v) => !!v || "Contact No is required"],
    };
  },
  methods: {
    addRecord() {
      if (this.$refs.form.validate(true)) {
        let payload = {
          data: {
            student_no: this.student_no,
            last_name: this.last_name,
            first_name: this.first_name,
            middle_name: this.middle_name,
            course: this.course,
            section: this.section,
            contact_number: this.contact_no,
          },
        };
        console.log(payload);
        this.$axios
          .post("/api/student-lists", payload)
          .then((response) => {
            console.log(response);
            this.addSnackbar = true;
            this.snackbarColor = "success";
            this.snackbarText = "Successfully created a new record!";
            this.$refs.form.reset();
          })
          .catch((error) => {
            console.log(error);
            if (
              error.response.data.error.details.errors[0].path[0] ==
              "student_no"
            ) {
              console.log(error.response.data.error.details.errors[0].path[0]);
              this.addSnackbar = true;
              this.snackbarColor = "error";
              this.snackbarText = `Student number ${this.student_no} already exist!`;
            } else {
              console.log(error.response.data.error);
            }
          });
      }
    },
  },
};
</script>