<template>
  <v-container fluid>
    <div class="d-flex align-center justify-center" style="height: 85vh">
      <v-sheet width="900" class="mx-auto">
        <v-card class="elevation-0 mx-auto">
          <v-toolbar elevation="0">
            <v-toolbar-title
              ><v-btn icon @click="$router.go(-1)"
                ><v-icon>mdi-chevron-left</v-icon></v-btn
              >
              Student Details</v-toolbar-title
            >
          </v-toolbar>
          <v-divider></v-divider>
          <v-card-text class="mb-4">
            <v-row>
              <v-col cols="12" md="4">
                <div class="d-flex align-center justify-center">
                  <v-avatar size="200">
                    <img
                      src="https://cdn.vuetifyjs.com/images/john.jpg"
                      alt="John"
                    />
                  </v-avatar>
                </div>
                <v-btn color="warning" block class="my-3" :to="`/student-list/${this.$route.params.id}/edit`"
                  ><v-icon left>mdi-pencil</v-icon> Edit</v-btn
                >
                <v-btn color="error" block @click="deleteDialog = true"
                  ><v-icon left>mdi-delete</v-icon> Delete</v-btn
                >
              </v-col>
              <v-col cols="12" md="8">
                <v-row dense>
                  <v-col cols="3"
                    ><v-subheader>Student Number </v-subheader></v-col
                  >
                  <v-col cols="8">
                    <v-text-field
                      :value="studentDetails.student_no"
                      disabled
                      dense
                    ></v-text-field
                  ></v-col>
                </v-row>
                <v-row dense>
                  <v-col cols="3"><v-subheader>Lastname </v-subheader></v-col>
                  <v-col cols="8">
                    <v-text-field
                      :value="studentDetails.last_name"
                      disabled
                      dense
                    ></v-text-field
                  ></v-col>
                </v-row>
                <v-row dense>
                  <v-col cols="3"><v-subheader>Firstname </v-subheader></v-col>
                  <v-col cols="8">
                    <v-text-field
                      :value="studentDetails.first_name"
                      disabled
                      dense
                    ></v-text-field
                  ></v-col>
                </v-row>
                <v-row dense>
                  <v-col cols="3"><v-subheader>Middlename </v-subheader></v-col>
                  <v-col cols="8">
                    <v-text-field
                      :value="studentDetails.middle_name"
                      disabled
                      dense
                    ></v-text-field
                  ></v-col>
                </v-row>
                <v-row dense>
                  <v-col cols="3"><v-subheader>Course </v-subheader></v-col>
                  <v-col cols="8">
                    <v-text-field
                      :value="studentDetails.course"
                      disabled
                      dense
                    ></v-text-field
                  ></v-col>
                </v-row>
                <v-row dense>
                  <v-col cols="3"><v-subheader>Section </v-subheader></v-col>
                  <v-col cols="8">
                    <v-text-field
                      :value="studentDetails.section"
                      disabled
                      dense
                    ></v-text-field
                  ></v-col>
                </v-row>
                <v-row dense>
                  <v-col cols="3"
                    ><v-subheader>Contact Number </v-subheader></v-col
                  >
                  <v-col cols="8">
                    <v-text-field
                      :value="studentDetails.contact_number"
                      disabled
                      dense
                    ></v-text-field
                  ></v-col>
                </v-row>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-sheet>
    </div>

    <!-- DELETE DIALOG BOX -->
    <v-dialog v-model="deleteDialog" width="300">
      <v-sheet
        class="px-7 pt-7 pb-4 mx-auto text-center d-inline-block"
        color="blue-grey darken-3"
        dark
      >
        <div class="grey--text text--lighten-1 text-body-2 mb-4">
          Are you sure you want to delete this record?
        </div>

        <v-btn  class="ma-1" color="grey" plain @click="deleteDialog = false">
          Cancel
        </v-btn>

        <v-btn
          class="ma-1"
          color="error"
          plain
          :loading="loading"
          @click="deleteRecord"
        >
          Delete
        </v-btn>
      </v-sheet>
    </v-dialog>

  </v-container>
</template>
<script>
export default {
  data() {
    return {
      studentDetails: {},
      deleteDialog: false,
      loading: false
    };
  },
  methods: {
    getStudentDetails() {
      this.$axios
        .get(`/api/student-lists/${this.$route.params.id}`)
        .then((response) => {
          console.log(response.data.data);
          this.studentDetails = response.data.data.attributes;
        })
        .catch((error) => {
          console.log(error);
        });
    },

    deleteRecord() {
      this.loading = true;
      this.$axios.delete(`/api/student-lists/${this.$route.params.id}`)
      .then(response => {
        console.log(response);
        this.deleteDialog = false;
        this.loading = false;
        this.$router.go(-1)
        
      })
      .catch(error => {
        console.log(error);
      })
    }
  },
  mounted() {
    this.getStudentDetails();
  },
};
</script>