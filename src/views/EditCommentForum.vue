<template>
    <v-container>
        <CardDataForum/>
        <br>
        <v-row class="display-1">
            <v-col>
                Edite el mensaje
            </v-col>
        </v-row>

        <v-row justify="center" >
            
            <v-col xs="12" sm="10" md="10" lg="10" xl="10">
                
                <v-textarea 
                solo
                clearable
                counter
                v-model="messageEdited"
                :rules="ruleMessage"
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
                @click="editAndSave"
                :disabled="disableButtonEdit"
                >
                    <v-icon left>save</v-icon>
                    Guardar
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

        <v-overlay :value="overlay">
            <v-progress-circular indeterminate size="64"></v-progress-circular>
        </v-overlay>

    </v-container>
</template>

<script>
import CardDataForum from '../components/CardDataForum';
import db from '../config/firebase';

export default {
    name: 'EditCommentForum',
    components:{
        CardDataForum
    },
    data() {
        return {
            overlay: false,
            ruleMessage:[
                v=>!!v || "Su respuesta no debe estar vacía"
            ],
            messageToEdit:  this.$store.state.currentMessageToEdit,
            messageEdited:  this.$store.state.currentMessageToEdit.message
        }
    },
    computed: {

        disableButtonEdit(){
            return !this.messageEdited;
        }
    },
    methods:{
        async editAndSave(){
            this.overlay = true;
            //Upddate message
            var idDoc='';
            await db.collection("messages").
            where("forumSubject","==",this.$store.state.currentIndexForum.subject).
            where('message','==',this.$store.state.currentMessageToEdit.message).
            get().then(
                querySnapshot => {
                    querySnapshot.forEach(  doc => {
                    idDoc=doc.id;
                    
                    })
                }
            );

            await db.collection('messages').doc(idDoc).update({
                        message: this.messageEdited,
            });

            //update message in father
            if(this.messageToEdit.dad != this.$store.state.currentIndexForum.subject){
                
                var idDocDad='';
                var arrayWithNewItem = [];
                await db.collection("messages").
                where("forumSubject","==",this.$store.state.currentIndexForum.subject).
                where('message','==',this.$store.state.currentMessageToResponse.message).
                get().then(
                    querySnapshot => {
                        querySnapshot.forEach(  doc => {
                        idDocDad=doc.id;
                        arrayWithNewItem = doc.data().sons
                        })
                    }
                );
                var itemToUpdate = arrayWithNewItem.indexOf( this.messageToEdit.message );
                arrayWithNewItem.splice( itemToUpdate, 1 );
                arrayWithNewItem.push(this.messageEdited);


                await db.collection('messages').doc(idDocDad).update({
                        sons: arrayWithNewItem,
                });
            }
            

            this.$store.commit('changeCurrentMessageToEdit',{});
            this.overlay = false;
            this.$router.push('/forum');
        }
    }
}
</script>

<style>

</style>    