<template>
  <div>
    <v-img class="mx-2" src="../assets/logo.png" max-height="40" max-width="40" contain></v-img>
    <v-data-table :headers="headers" :items="Surveys" sort-by="calories" class="elevation-1">
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Survey Page For VISA</v-toolbar-title>

          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">Create A New Survey</v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="text-h5">{{ formTitle }}</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.name" label="Survey name"></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12" sm="6" md="10">
                      <v-textarea v-model="editedItem.calories" label="Add survey description"></v-textarea>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
                <v-btn color="blue darken-1" text @click="save">Save</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>
              <v-card-title class="text-h5">Are you sure you want to delete this item?</v-card-title>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
                <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-icon small class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
        <v-icon small @click="deleteItem(item)">mdi-delete</v-icon>
        <v-btn color="blue darken-1" text @click="navigate(item)" to="/steps">Open Steps</v-btn>
      </template>
      <template v-slot:no-data>
        <v-btn color="primary" @click="initialize">Reset</v-btn>
      </template>
    </v-data-table>
  </div>
</template>

<script>
export default {
  data: () => ({
    dialog: false,
    dialogDelete: false,
    headers: [
      {
        text: "Survey Name",
        align: "start",
        sortable: false,
        value: "name"
      },
      { text: "Descriptions", value: "calories" },
      { text: "Actions", value: "actions", sortable: false }
    ],
    Surveys: [],
    editedIndex: -1,
    nextPageIndex: 0,
    editedItem: {
      name: "",
      calories: "",
      fat: 0,
      carbs: 0,
      protein: 0
    },
    defaultItem: {
      name: "",
      calories: "",
      fat: 0,
      carbs: 0,
      protein: 0
    }
  }),
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Survey" : "Edit Survey"
    }
  },
  watch: {
    dialog(val) {
      val || this.close()
    },
    dialogDelete(val) {
      val || this.closeDelete()
    }
  },
  created() {
    this.initialize()
  },
  methods: {
    initialize() {
      this.Surveys = [
        {
          name: "New Survey",
          calories: "test survey"
        },
        {
          name: "Test new survey",
          calories: "test success survey"
        },
        {
          name: " Survey 3",
          calories: "testing survey"
        },
        {
          name: "Test Survey 4",
          calories: "test survey"
        }
      ]
    },
    editItem(item) {
      this.editedIndex = this.Surveys.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },
    navigate(item) {
      this.nextPageIndex = this.Surveys.indexOf(item)
    },
    deleteItem(item) {
      this.editedIndex = this.Surveys.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },
    deleteItemConfirm() {
      this.Surveys.splice(this.editedIndex, 1)
      this.closeDelete()
    },
    close() {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },
    closeDelete() {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },
    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.Surveys[this.editedIndex], this.editedItem)
      } else {
        this.Surveys.push(this.editedItem)
      }
      this.close()
    }
  }
}
</script>