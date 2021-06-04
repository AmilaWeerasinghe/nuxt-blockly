<template>
  <v-data-table :headers="headers" :items="steps" sort-by="name" class="elevation-1">
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>Create Steps For YOur Survey</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">Add A Step</v-btn>
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
                    <v-text-field v-model="editedItem.description" label="Add survey description"></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-radio-group v-model="editedItem.stepType" row>
                    <v-radio label="Page" value="Page"></v-radio>
                    <v-radio label="Survey" value="Survey"></v-radio>
                  </v-radio-group>
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
      <v-btn color="blue darken-1" text @click="navigate(item)" to="/canvas">Open Canvas</v-btn>
    </template>
    <template v-slot:no-data>
      <v-btn color="primary" @click="initialize">Reset</v-btn>
    </template>
  </v-data-table>
</template>

<script>
export default {
  data: () => ({
    dialog: false,
    dialogDelete: false,
    headers: [
      {
        text: "Step Name",
        align: "start",
        sortable: false,
        value: "name"
      },
      { text: "Step Descriptions", value: "description" },
      { text: "Step type", value: "stepType" },
      { text: "Actions", value: "actions", sortable: false }
    ],
    steps: [],
    editedIndex: -1,
    nextPageIndex: 0,
    editedItem: {
      name: "",
      description: "",
      stepType: "",
      fat: 0,
      carbs: 0,
      protein: 0
    },
    defaultItem: {
      name: "",
      description: "",
      stepType: "",
      fat: 0,
      carbs: 0,
      protein: 0
    }
  }),
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Add New Step" : "Edit Step"
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
      this.steps = [
        {
          name: "Step1",
          description: "test step1",
          stepType: "Survey",
          fat: 6.0,
          carbs: 24,
          protein: 4.0
        },
        {
          name: "Step 2",
          description: "test success step",
          stepType: "Page"
        },
        {
          name: "Step 3",
          description: "testing step",
          stepType: "Page"
        },
        {
          name: "Step 4",
          description: "test4 success ",
          stepType: "Survey"
        }
      ]
    },
    editItem(item) {
      this.editedIndex = this.steps.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },
    navigate(item) {
      this.nextPageIndex = this.steps.indexOf(item)
    },
    deleteItem(item) {
      this.editedIndex = this.steps.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },
    deleteItemConfirm() {
      this.steps.splice(this.editedIndex, 1)
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
        Object.assign(this.steps[this.editedIndex], this.editedItem)
      } else {
        this.steps.push(this.editedItem)
      }
      this.close()
    }
  }
}
</script>