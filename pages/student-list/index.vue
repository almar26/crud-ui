<template>
  <v-container fluid>
    <v-row>
      <v-col>
        <h3>
          <v-icon left>mdi-format-list-bulleted-square</v-icon> List of Students
        </h3>
      </v-col>
      <v-col align="right">
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              color="primary"
              right
              to="/student-list/add"
              v-bind="attrs"
              v-on="on"
            >
              <v-icon>mdi-plus</v-icon>
              Add Student
            </v-btn>
          </template>
          <span align-center>Add Student</span>
        </v-tooltip>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-card elevation="0">
          <v-card-title>
            <v-spacer></v-spacer>
            <v-spacer></v-spacer>
            <v-spacer></v-spacer>
            <v-spacer></v-spacer>
            <v-text-field
              v-model="search"
              dense
              append-icon="mdi-magnify"
              label="Search"
              single-line
              hide-details
            ></v-text-field>
          </v-card-title>

          <v-data-table
            :headers="headers"
            :items="studentData"
            :search="search"
          >
            <template slot="item.actions" slot-scope="{ item }">
              <v-btn
                color="primary"
                small
                depressed
                :to="`/student-list/${item.id}`"
              >
                <v-icon small left>mdi-open-in-new</v-icon>
                View
              </v-btn>
              <v-btn
                color="info"
                small
                depressed
                :to="`/student-list/${item.id}/edit`"
              >
                <v-icon small left>mdi-pencil</v-icon>
                Edit
              </v-btn>
              <v-btn color="error" small depressed @click="showDeleteDialog(item.id)">
                <v-icon small left>mdi-delete</v-icon>
                Delete
              </v-btn>
            </template>
          </v-data-table>
        </v-card>
      </v-col>
    </v-row>

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
      search: "",
      headers: [
        {
          text: "Student #",
          align: "start",
          sortable: false,
          value: "attributes.student_no",
        },
        { text: "Lastname", sortable: false, value: "attributes.last_name" },
        { text: "Firstname", sortable: false, value: "attributes.first_name" },
        {
          text: "Middlename",
          sortable: false,
          value: "attributes.middle_name",
        },
        { text: "Course", sortable: false, value: "attributes.course" },
        { text: "Section", sortable: false, value: "attributes.section" },
        { text: "", align: "end", sortable: false, value: "actions" },
      ],
      studentData: [],
      deleteDialog: false,
      stud_id: null,
      loading: false
    };
  },

  methods: {
    getStudentData() {
      this.$axios
        .get("/api/student-lists")
        .then((response) => {
          console.log(response.data.data);
          this.studentData = response.data.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },

    showDeleteDialog(data) {
      console.log(data)
      this.stud_id = data
      this.deleteDialog = true;
    },

    deleteRecord() {
      console.log(this.stud_id)
      this.loading = true;
      this.$axios.delete(`/api/student-lists/${this.stud_id}`)
      .then(response => {
        console.log(response);
        this.deleteDialog = false;
        this.loading = false;
        this.getStudentData()
      })
      .catch(error => {
        console.log(error);
      })
    }
  },

  mounted() {
    this.getStudentData();
  },
};
</script>