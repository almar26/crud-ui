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
              Update Student Details {{ this.$route.params.id}}</v-toolbar-title
            >
          </v-toolbar>
          <v-divider></v-divider>
          <v-card-text class="mb-4">
            <v-row dense>
              <v-col cols="3"><v-subheader>Student Number </v-subheader></v-col>
              <v-col cols="8">
                <v-text-field v-model="student_no" dense></v-text-field
              ></v-col>
            </v-row>
            <v-row dense>
              <v-col cols="3"><v-subheader>Lastname </v-subheader></v-col>
              <v-col cols="8">
                <v-text-field v-model="last_name" dense></v-text-field
              ></v-col>
            </v-row>
            <v-row dense>
              <v-col cols="3"><v-subheader>Firstname </v-subheader></v-col>
              <v-col cols="8">
                <v-text-field v-model="first_name" dense></v-text-field
              ></v-col>
            </v-row>
            <v-row dense>
              <v-col cols="3"><v-subheader>Middlename </v-subheader></v-col>
              <v-col cols="8">
                <v-text-field v-model="middle_name" dense></v-text-field
              ></v-col>
            </v-row>
            <v-row dense>
              <v-col cols="3"><v-subheader>Course </v-subheader></v-col>
              <v-col cols="8">
                <v-text-field v-model="course" dense></v-text-field
              ></v-col>
            </v-row>
            <v-row dense>
              <v-col cols="3"><v-subheader>Section </v-subheader></v-col>
              <v-col cols="8">
                <v-text-field v-model="section" dense></v-text-field
              ></v-col>
            </v-row>
            <v-row dense>
              <v-col cols="3"><v-subheader>Contact Number </v-subheader></v-col>
              <v-col cols="8">
                <v-text-field v-model="contact_no" dense></v-text-field
              ></v-col>
            </v-row>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions class="my-4">
            <v-spacer />
            <v-btn color="success" @click="updateDetails"
              ><v-icon left>mdi-content-save</v-icon> Save
            </v-btn>
            <v-btn color="error" @click="$router.go(-1)"><v-icon left>mdi-cancel</v-icon>Cancel</v-btn>
            <v-spacer />
          </v-card-actions>
        </v-card>
      </v-sheet>
    </div>

    <!-- SNACKBAR -->
    <v-snackbar v-model="updateSnackbar" :color="snackbarColor" top right>
      {{ snackbarText }}

      <template v-slot:action="{ attrs }">
        <v-btn text v-bind="attrs" @click="updateSnackbar = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </v-container>
</template>
<script>
export default {
  data() {
    return {
      student_no: "",
      last_name: "",
      first_name: "",
      middle_name: "",
      course: "",
      section: "",
      contact_no: 0,
      updateSnackbar: false,
      snackbarColor: '',
      snackbarText: ''
    };
  },
  methods: {
    getStudentDetails() {
      this.$axios
        .get(`/api/student-lists/${this.$route.params.id}`)
        .then((response) => {
          console.log(response);
          this.student_no = response.data.data.attributes.student_no;
          this.last_name = response.data.data.attributes.last_name;
          this.first_name = response.data.data.attributes.first_name;
          this.middle_name = response.data.data.attributes.middle_name;
          this.course = response.data.data.attributes.course;
          this.section = response.data.data.attributes.section;
          this.contact_no = response.data.data.attributes.contact_number;
        })
        .catch((error) => {
          console.log(error);
        });
    },

    updateDetails() {
      console.log(this.student_no);
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
      this.$axios
        .put(`/api/student-lists/${this.$route.params.id}`, payload)
        .then((response) => {
          if (response.status == 200) {
            console.log(response);
            this.updateSnackbar = true;
            this.snackbarColor = "success";
            this.snackbarText = "Record Successfully Updated!";
          }
        })
        .catch((error) => {
          
          if(error.response.data.error.details.errors[0].path[0] == 'student_no') {
            console.log(error.response.data.error.details.errors[0].path[0]);
            this.updateSnackbar = true;
            this.snackbarColor = "error";
            this.snackbarText = `Student number ${this.student_no} already exist!`;
          } else {
            console.log(error.response.data.error);
          }
        });
    },
  },
  mounted() {
    this.getStudentDetails();
  },
};
</script>