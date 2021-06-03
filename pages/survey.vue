<template>
  <div>
    <v-row justify="center">
      <v-dialog v-model="dialog" persistent max-width="600px">
        <template v-slot:activator="{ on, attrs }">
          <v-btn color="primary" dark v-bind="attrs" v-on="on">Create a survey</v-btn>
        </template>
        <v-card>
          <v-card-title>
            <span class="text-h5">User Profile</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field label="Survey Name" required v-model="surveylist.name"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field
                    label="Survey description"
                    hint="Small description of the survey"
                    v-model="surveylist.description"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
            <v-btn color="blue darken-1" text @click="addUser">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>

    <v-simple-table>
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">Survey Name</th>
            <th class="text-left">Survey description</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="food in surveylist" :key="food.name">
            <td>{{ food.name }}</td>
            <td>{{ food.description }}</td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>

    <v-data-table :headers="headers" :items="surveylist" :items-per-page="5" class="elevation-1"></v-data-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialog: false,
      headers: [
        {
          text: "Survey Title",
          align: "start",
          sortable: false,
          value: "name"
        },
        { text: "Survey Description", value: "description" },
        { text: "Survey control panel" }
      ],
      surveylist: [
        {
          name: "Test Survey",
          description: "create a testing survey for visa"
        },
        {
          name: "TEst for survey",
          description: "new survey test"
        },
        {
          name: "New survey",
          description: "survey new"
        }
      ]
    }
  },
  methods: {
    addUser() {
      this.surveylist.push({ name: "", description: "" })
      this.dialog = false
      console.log(this.surveylist)
    }
  }
}
</script>

<style>
</style>