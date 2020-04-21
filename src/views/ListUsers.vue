<template>
  <v-data-table :headers="headers" :items="desserts" :search="search" class="elevation-1">
    <template v-slot:top>
      <v-toolbar flat color="white">
        <v-toolbar-title>Usuarios</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer>
        </v-spacer>
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ }">
            <v-spacer></v-spacer>
            <v-text-field
              v-model="search"
              color="blue"
              append-icon="mdi-magnify"
              label="Search"
              single-line
              hide-details
            ></v-text-field>
          </template>
        </v-dialog>
      </v-toolbar>
    </template>
  </v-data-table>
</template>

<style scoped>
</style>

<script>
import db from "../config/firebase";
export default {
  data: () => ({
    dialog: false,
    search: "",
    headers: [
      { text: "Nombre", value: "name" },
      { text: "Apellido", value: "lastName" },
      { text: "Email", value: "email" },
      { text: "Password", value: "password" },
      { text: "Rol", value: "role" },
      { text: "# Mensajes", value: "number" },
      { text: "Estado", value: "state" },
    ],
    

    desserts: [],
  
    editedItem: {
      name: "",
      lastName: "",
      email: "",
      password: "",
      role:"",
      state:"",
      
    },
    defaultItem: {
      name: "",
      lastName: "",
      email: "",
      password: "",
      role:"",
      state:"",
    },
    idItem:null,
    number:0,
  }),


  methods: {


     async numberMessage(){
        this.number=0;
        for(var i=0;i<this.desserts.length;i++){
            let n =0;
            await db.collection("messages")
            .get()
            .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
              
          if(doc.data().creator==this.desserts[i].email){
            n ++;
          }
          });
        });

        this.desserts[i].number = n
        }
    },
   async initialize() {
        this.desserts=[];
     await db.collection("users")
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            const data={
                'name':doc.data().name,
                'email':doc.data().email,
                'lastName':doc.data().lastName,
                'password':doc.data().password,
                'role':doc.data().role,
                'id':doc.id,
                'number':0,
                'state':doc.data().state,

            }
      
             console.log(this.number);
            this.desserts.push(data);
          });
        });
        this.numberMessage();
    },
  },
   created() {
     this.initialize();
  },
};
</script>