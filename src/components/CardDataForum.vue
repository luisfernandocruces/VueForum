<template>

        <v-card>
                <v-card-title class="headline font-weight-bold">{{currentIndexForum.subject}}</v-card-title>

                <v-card-subtitle> Creado por <b>{{currentIndexForum.creator}}</b> - {{currentIndexForum.creationDate}}</v-card-subtitle>

                <v-card-text>Descripción: <br> 
                    <b class="subtitle-1 font-weight-bold">{{currentIndexForum.description}} </b>    
                </v-card-text>
        </v-card>

</template>

<script>
import  { mapState } from 'vuex';

export default {
    name:'CardDataForum',
    computed: {
        ...mapState(['favorites','currentIndexForum']),
    },

}
</script>

<style>

</style>