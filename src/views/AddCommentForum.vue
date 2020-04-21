<template>
    <v-container>

        <CardDataForum/>
        
        <v-row justify="center" >
            <v-col xs="12" sm="10" md="10" lg="10" xl="10">
                Respuesta
                <v-textarea 
                solo
                clearable
                counter
                v-model="message"
                :rules="ruleMessage"
                >
                </v-textarea>
            </v-col>
        </v-row>

        <v-row justify="center">
             <v-col xs="12" sm="4" md="3" lg="2" xl="1">
                <v-btn rounded large color="primary" @click="saveMessage" :disabled="disableButton">
                    <v-icon left>add_comment</v-icon>
                    Añadir
                </v-btn>
            </v-col>
            <v-col xs="12" sm="6" md="7" lg="8" xl="8">
                <v-btn rounded large color="error" to="/forum">
                    <v-icon left>add_comment</v-icon>
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
    name:'AddCommentForum',
    //0 if is comment central, 1 is comment secondary
    components:{
        CardDataForum
    },
    data() {
        return {
            overlay: false,
            message:'',
            ruleMessage:[
                v=>!!v || "Su respuesta no debe estar vacía"
            ],
            typeCommentIndex: this.$route.params.typeComment
        }
    },
    methods: {
        async saveMessage(){   
            this.overlay = true;
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


                if(this.typeCommentIndex==0){

                    //add central comment to forum
                
                    await db.collection('messages').doc().set({
                        forumSubject: this.$store.state.currentIndexForum.subject,
                        creator: this.$store.state.currentUser,
                        message: this.message,
                        creationDate: dt,
                        dad: this.$store.state.currentIndexForum.subject,
                        sons: []
                    });

                } else{
                    var idDoc='';
                    var arrayWithNewItem = [];
                    //change th son to father. Added specific son to son´s array father
                    //give me id of message daddy
                    await db.collection("messages").
                    where("forumSubject","==",this.$store.state.currentIndexForum.subject).
                    where('message','==',this.$store.state.currentMessageToResponse.message).
                    get().then(
                        querySnapshot => {
                            querySnapshot.forEach(  doc => {
                            idDoc=doc.id;
                            arrayWithNewItem = doc.data().sons
                            })
                        }
                    );
                    arrayWithNewItem.push(this.message);

                    await db.collection('messages').doc(idDoc).update({
                        sons: arrayWithNewItem,
                    });
                    
                     //add secondary comment to forum
                
                    await db.collection('messages').doc().set({
                        forumSubject: this.$store.state.currentIndexForum.subject,
                        creator: this.$store.state.currentUser,
                        message: this.message,
                        creationDate: dt,
                        dad: this.$store.state.currentMessageToResponse.message,
                        sons: []
                    });                
                }
            

                var nm=0;
                await db.collection("forums").where("subject","==",this.$store.state.currentIndexForum.subject).get().then(
                querySnapshot => {
                    querySnapshot.forEach(  doc => {
                        console.log(doc.data().numberMessages)
                        nm=doc.data().numberMessages;
                    })
                }
                );

                nm++;
                await db.collection('forums').doc(this.$store.state.currentIndexForum.subject).update({
                    numberMessages: nm
                });
                
                this.overlay = false;
                this.$router.push('/forum');
            } catch (error) {
                console.log(error)
            }  
        }
    },
    computed: {
        disableButton(){
            return !this.message ;
        }
    },

}
</script>

<style>

</style>