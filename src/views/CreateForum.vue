<template>
  <v-container>
        <v-row>
            <h1>Crear Foro</h1>
        </v-row>
        <br>
        <h3>Intrduzca asunto del foro</h3>
        <v-row>
            <v-col xs="12" sm="12" md="10" lg="9" xl="7">
                <v-text-field 
                solo 
                clearable 
                counter="100"
                maxlength="100"
                label="Asunto del foro"
                v-model="subject"
                :rules="ruleSubject"
                >

                </v-text-field>
            </v-col>
        </v-row>
        <br>
        <h3>Intrduzca una descripción para el foro</h3>
        <v-row>
             <v-col xs="12" sm="12" md="10" lg="9" xl="7">
                <v-textarea 
                solo
                clearable
                counter="500"
                maxlength="500"
                v-model="description"
                :rules="ruleDescription"
                >

                </v-textarea>
            </v-col>
        </v-row>

        <v-row justify="center" no-gutters>
            <v-col xs="12" sm="4" md="2" lg="2" xl="1" class="mb-5">
                <v-btn 
                rounded 
                color="primary" 
                large
                @click="createForum"
                :disabled="dasableButtonCreate"
                >
                    <v-icon left>add</v-icon>
                    Crear
                </v-btn>
            </v-col>

            <v-col xs="12" sm="4" md="2" lg="1" xl="1" class="mb-5">
                <v-btn 
                rounded 
                color="error" 
                dark
                large
                to="/forums"
                >
                    <v-icon left>close</v-icon>
                    Cancelar
                </v-btn>
            </v-col>
        </v-row>

        <v-dialog
            v-model="dialog"
            max-width="290"
            >
                <v-card>
                    <v-card-title class="headline">Foro creado con éxito</v-card-title>
                    <v-card-text>
                        El foro con el asunto "{{subject}}" se ha creado correctamente.
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn
                        color="primary darken-1"
                        text
                        @click="dialog = false"
                        to="/forums"
                        >
                            Aceptar
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>

    <v-overlay :value="overlay">
        <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
      
  </v-container>
</template>

<script>
import db from '../config/firebase'

export default {
    name:"CreateForum",
    data() {
        return {
            overlay: false,
            dialog: false,
            disableButton: true,
            subject:'',
            ruleSubject: [
                v=> v.length<100 || "El asunto debe ser menor a 100 carácteres"
            ],
            description:'',
            ruleDescription: [
                v=> v.length<500 || "La dscripción debe ser menor a 300 carácteres"
            ]
        }
    },
    methods: {
        async createForum(){
            this.overlay = true;
            //var dt = new Date().toString();
            var dt = new Date().toLocaleDateString('es-CO',{
                weekday: "long",
                year: "numeric", 
                month: "long", 
                day: "numeric",
                hour: "numeric",
                minute: "numeric",
                second: "numeric"
            }).toString();

            try {
                await db.collection('forums').doc(this.subject).set({
                    creator: this.$store.state.currentUser,
                    subject: this.subject,
                    description: this.description,
                    creationDate: dt,
                    numberMessages: 0
                });
                this.overlay = true;
                this.dialog =true;
            } catch (error) {
                console.log(error)
            }  
        },
    },
    computed: {
        dasableButtonCreate(){
            return( !this.subject || !this.description);
        }
    },

}
</script>

<style>

</style>