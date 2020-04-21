<template>
    <v-container>

        <div class="display-2 font-weight-black ma-5">
            Foro
        </div>

        <CardDataForum/>

        <div class="mt-10">
            <v-btn rounded large color="primary" dark to="/addCommentForum/0">
                <v-icon left>add_comment</v-icon>
                Añadir comentario
            </v-btn>
        </div>
    
        <div class="mt-10" v-if="messages.length==0">
            <v-row>
                No hay comentarios hasta la fecha.
            </v-row>
        </div>
        <div class="mt-10" v-else>
            <v-row v-for="(item, index) in messages" :key="index" class="my-5 mx-10">
                <CardMessage :messageData="item"></CardMessage>
            </v-row>
        </div>

        <v-overlay :value="overlay">
        <v-progress-circular indeterminate size="64"></v-progress-circular>
        </v-overlay>

    </v-container>
</template>

<script>
import CardDataForum from '../components/CardDataForum';
import CardMessage from '../components/CardMessage';
import db from '../config/firebase';

export default {
    name:'Forum',
    components:{
        CardDataForum,
        CardMessage
    },
    data() {
        return {
            overlay: false,
            messages:[]
        }
    },
    methods:{
        async bringMessages(){
            this.overlay = true;
            this.messages =[];
            await db.collection("messages").where("forumSubject","==",this.$store.state.currentIndexForum.subject).get().then(
                querySnapshot => {
                    querySnapshot.forEach(  doc => {
                        const data = {
                            'message': doc.data().message,
                            'forumSubject': doc.data().forumSubject,
                            'creator': doc.data().creator,
                            'creationDate': doc.data().creationDate,
                            'dad': doc.data().dad,
                            'sons': doc.data().sons
                        }
                        this.messages.push(data)
                    })
                }
            );
            this.overlay = false;
        }
    },
    created() {
        this.bringMessages();
    },
}
</script>

<style>

</style>