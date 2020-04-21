<template>
    <div>

        <div v-if="this.$store.state.currentUser">

            <v-app-bar
            color="primary"
            dense
            dark
            app
            >
                <v-icon class="mx-8">people_alt</v-icon>
                <v-toolbar-title>Forum</v-toolbar-title>  
                <v-spacer></v-spacer>


                <div>
                    {{this.$store.state.currentUser}}
                </div>

                <v-menu
                left
                bottom
                >        
                    <template v-slot:activator="{ on }">
                        <v-btn icon v-on="on">
                            <v-icon>mdi-dots-vertical</v-icon>
                        </v-btn>
                    </template>
                    
                    <v-list>
                        <v-list-item to="/forums">
                            <v-list-item-title>Inicio</v-list-item-title>
                        </v-list-item>
                        <v-list-item @click="logout">
                            <v-list-item-title>Cerrar Sesión</v-list-item-title>
                        </v-list-item>
                    </v-list>
                </v-menu>
            </v-app-bar>



        </div>

        <div v-else>
            <v-app-bar
            app
            color="primary"
            dark
            class="nav-bar-style"
            >
                <v-icon class="mx-8">people_alt</v-icon>
                <v-toolbar-title>Forum</v-toolbar-title>  
                <v-spacer></v-spacer>
      
                <div class="mr-10">
                    <v-btn large @click="goPageLogin" color="light-green accent-4" elevation=10 :disabled="disableButtonLogin">
                    Login
                </v-btn>
                </div>
                <div class="mr-10">
                <v-btn large @click="goPageRegister" color="light-green accent-4" elevation=10 :disabled="disableButtonRegister">
                    Register
                </v-btn>
                </div>

            </v-app-bar>

        </div>
        <v-overlay :value="overlay">
            <v-progress-circular indeterminate size="64"></v-progress-circular>
        </v-overlay>
    </div>
</template>

<script>
import db from '../config/firebase';

export default {
    name:'NavBar',
    data() {
        return {
            overlay: false,
            disableButtonLogin: true,
            disableButtonRegister: false
        }
    },
    methods:{
        goPageLogin(){
            this.disableButtonLogin = true;
            this.disableButtonRegister = false;
            this.$router.push('/');
        },
        goPageRegister(){
            this.disableButtonLogin = false;
            this.disableButtonRegister = true;
            this.$router.push('/register');
        },
        async logout(){
            this.overlay = true;
            await db.collection("users").doc(this.$store.state.currentUser).update({
                state: 'No activo'
            });
            this.$store.commit('changeCurrentUser','');
            this.overlay = false;
            this.$router.push('/');
        }
    }
}
</script>

<style>

</style>