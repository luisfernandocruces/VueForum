<template>
    <v-container>
        <v-row align="start" justify="end" no-gutters class="mt-10">
            <v-col xs="12" sm="3" md="2" lg="2" xl="2" class="mb-5 mr-5">
                <v-btn large class="primary" to="/createForum">
                    <v-icon left>note_add</v-icon>
                    Crear Foro
                </v-btn>
            </v-col>
            <v-col  xs="12" sm="4" md="3" lg="2" xl="2" class="mb-5 mr-5">
                <v-btn large class="primary" to="/listUsers">
                    <v-icon left>refresh</v-icon>
                    Buscar usuario
                </v-btn>
            </v-col>
            <v-col  xs="12" sm="3" md="1" lg="1" xl="1" class="mb-5">
                <v-btn large class="primary" @click="chargeForums">
                    <v-icon left>refresh</v-icon>
                    Cargar Foros
                </v-btn>
            </v-col>
        </v-row>

        <ForumList/>
        
        <v-overlay :value="overlay">
            <v-progress-circular indeterminate size="64"></v-progress-circular>
        </v-overlay>


    </v-container>
</template>

<script>
import ForumList from '../components/ForumList';
import db from '../config/firebase'

export default {
    name: 'Forums',
    components: {
        ForumList
    },
    data() {
        return {
            overlay: false,
        }
    },
    methods: {
        async chargeForums(){
            this.overlay = true;
            var forums = [];
            await db.collection("forums").get().then(
                querySnapshot => {
                    querySnapshot.forEach(  doc => {
                        const data = {
                            'creator': doc.data().creator,
                            'subject': doc.data().subject,
                            'description': doc.data().description,
                            'creationDate': doc.data().creationDate,
                            'numberMessages': doc.data().numberMessages
                        }
                        forums.push(data)
                    })
                }
            );
            this.$store.commit('loadForums', forums);
            this.overlay = false;
        }

    },
    created() {
        this.chargeForums();
    },


}
</script>

<style>

</style>