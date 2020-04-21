<template>
<v-container class="center" fluid>
      <v-row align="center" justify="center">
        <v-col cols="12"  sm="4" md="4" >
          <v-card class="elevation-12 pa-md-4 mx-lg-auto">
            <v-window>
                <v-row justify='center'>
                   <v-card-title>
                       Registro
                   </v-card-title>
                </v-row>
                <v-col cols="12" md="12">
                    <v-card-text class="mt-5">

                        <v-form>

                            <h2 class="ml-5">Introduzca su nombre</h2>
                            <br>
                            <v-text-field
                            v-model="name"
                            label="Nombre"
                            name="Nombre"
                            append-icon="face"
                            type="text"
                            color="blue"
                            outlined
                            :rules="nameRules"
                            >
                            </v-text-field>

                            <h2 class="ml-5">Introduzca su apellido</h2>
                            <br>
                            <v-text-field
                            v-model="lastName"
                            label="Apellido"
                            name="Apellido"
                            append-icon="face"
                            type="text"
                            color="blue"
                            outlined
                            :rules="lastNameRules"
                            >
                            </v-text-field>


                            <h2 class="ml-5">Introduzca email con el qe se quiere registrar</h2>
                            <br>
                            <v-text-field
                            v-model="email"
                            label="Email"
                            name="Email"
                            append-icon="email"
                            type="text"
                            color="blue"
                            outlined
                            :rules="emailRules"
                            >
                            </v-text-field>

                            <h2 class="ml-5">Introduzca contraseña de su sesión</h2>
                            <br>
                            <v-text-field
                            v-model="password1"
                            label="Password"
                            append-icon="lock"
                            type="password"
                            color="blue"
                            outlined
                            :rules="passwordRules1"
                            >
                            </v-text-field>

                            <h2 class="ml-5">Confirmar contraseña</h2>
                            <br>
                            <v-text-field
                            v-model="password2"
                            label="Password"
                            append-icon="lock"
                            type="password"
                            color="blue"
                            outlined
                            :rules="passwordRules2"
                            >
                            </v-text-field>

                        </v-form>

                    </v-card-text>
                </v-col>
              
                <div class="text-center mt-3">
                    <v-btn 
                    :disabled="disabledButton"
                    @click="register" 
                    class="margin-bottom: 30px" 
                    rounded  
                    large 
                    color="blue"
                    > Registrarse</v-btn>
                </div>
             
              
            </v-window> 
          </v-card>


            <v-dialog
            v-model="dialog"
            max-width="290"
            >
                <v-card>
                    <v-card-title class="headline">Error al registrarse</v-card-title>
                    <v-card-text>
                        El usuario con el email {{email}} ya se encuentra registrado.
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn
                        color="primary darken-1"
                        text
                        @click="dialog = false"
                        >
                            Aceptar
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>


        </v-col>
      </v-row>
    </v-container>
</template>

<script>
import db from '../config/firebase'

export default {
    name: 'Register',
    data() {
        return {
            dialog: false,
            name:'',
            nameRules: [
                v => !!v || 'El nombre es requerido',
                v => v.length >2 || 'El nombre debe ser más largo a 3 caracteres',
            ],
            lastName:'',
            lastNameRules: [
                v => !!v || 'El apellido es requerido',
                v => v.length >2 || 'El apellido debe ser más largo a 3 caracteres',
            ],
            email:'',
            emailRules: [
                v => !!v || 'E-mail is required',
                v => /.+@.+\..+/.test(v) || 'E-mail debe ser válido',
            ],
            password1:'',
            passwordRules1: [
                v => (v.length>4) || 'La contraseña debe tener más de 4 caracteres',

            ],
            password2:'',
            passwordRules2: [
                v => (v.length>4) || 'La contraseña debe tener más de 4 caracteres',
                value=> value===this.password1 || "Las contraseñas no coinciden"
            ],
        }
    },
    methods: {
        async register(){

            var snapshot = await db.collection("users").doc(this.email).get();
            if(!snapshot.data()){
                
                var md5 = require('md5');
                let pmd5 = md5(this.password1);

                await db.collection('users').doc(this.email).set({
                    email: this.email,
                    password: pmd5,
                    name: this.name,
                    lastName: this.lastName,
                    role: "user",
                    state: "No activo"
                });

                this.$router.push('/');

            }else{
                this.dialog = true;
            }
            
        },
    },
    computed: {
        disabledButton(){
            return( !this.name || !this.lastName ||!this.email || !this.password1 || !this.password2 || !(this.password1 === this.password2) );
        }
    },

}
</script>

<style>

</style>