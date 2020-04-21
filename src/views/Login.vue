<template>
  <v-container class="center" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="4" md="4">
        <v-card class="elevation-12 pa-md-4 mx-lg-auto">
          <v-window>
            <div class="text-center">Login</div>
            <v-col cols="12" md="12">
              <v-card-text class="mt-12">
                <v-form>
                  <v-text-field
                    id="email"
                    label="Email"
                    name="Email"
                    prepend-icon="email"
                    type="text"
                    color="blue"
                    v-model="email"
                    :rules="emailRules"
                  ></v-text-field>

                  <v-text-field
                    id="password"
                    label="Password"
                    name="Password"
                    prepend-icon="lock"
                    type="password"
                    color="blue"
                    v-model="password"
                    :rules="passwordRules"
                  ></v-text-field>
                </v-form>
                <h3 class="text-center mt-3">¿Olvidaste tu contraseña?</h3>
              </v-card-text>
            </v-col>

            <div class="text-center mt-3">
              <v-btn
                class="margin-bottom: 20px"
                rounded
                color="blue"
                dark
                v-on:click="login"
              >Iniciar</v-btn>
            </div>
          </v-window>
          <v-alert v-model="showDismissibleAlert" type="warning">
          {{error}}
           </v-alert>
        </v-card>
      </v-col>
    </v-row>

    <v-overlay :value="overlay">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>

  </v-container>
</template>

<script>

import db from '../config/firebase'
export default {
  name: "Login",

  data() {
    return {
      overlay: false,
      showDismissibleAlert: false,
      error: "",
      email: "",
      emailRules: [
        v => !!v || "E-mail is required",
        v => /.+@.+\..+/.test(v) || "E-mail debe ser válido"
      ],

      password: "",
      passwordRules: [
        v => v.length > 4 || "La contraseña debe tener más de 4 caracteres"
      ],
     
    };
  },
  props: {},

  methods: {

     verify(){
      var users = db.collection("users");

      users.doc("admin@prueba.com").get();



    },
    async login() {
      this.overlay = true;
      var roleAdm='admin';
      //var roleUser='user';
      var { email, password } = {};
      email = this.email;
      password = this.password;
      var md5 = require('md5');
      let pmd5 = md5(password);

      var users = await db.collection("users").doc(email).get();

      if(users.data()){

        // login correct
        if(users.data().password==pmd5){

          if(users.data().state == 'No activo'){

            await db.collection("users").doc(email).update({
            state: 'Activo'
            });

            this.$store.commit('changeCurrentRol', users.data().role);
            this.$store.commit('changeCurrentUser',email);
            if(users.data().role==roleAdm){
              this.overlay = false;
              this.$router.push("/userAdmin");
            }else{
              
              this.overlay = false;
              //ruta del estandar
              this.$router.push("/forums");
            }
          }else{
            this.overlay = false;
            this.error="El usuario ya tiene una cuenta abierta";
            this.showDismissibleAlert = true;
          }
          

        }
        else{
          this.overlay = false;
          this.error="Contraseña incorrecta";
          this.showDismissibleAlert = true;

        }

      }else{
        this.overlay = false;
        this.error="No se encuentra registrado";
        this.showDismissibleAlert = true;

      }
      
    }
  }
};
</script>

<style scoped>
</style>
