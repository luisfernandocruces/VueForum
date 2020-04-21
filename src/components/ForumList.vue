<template>
    <v-list two-line>
        <v-subheader v-if="!forumsList.length">No hay nigún foro creado hasta el momento</v-subheader>
        <div v-else>
            <v-subheader> Foros </v-subheader>
            <v-list-item v-for="(item, index) in forumsList" :key="index" @click="openForum(index)">

                <v-list-item-content>
                    <v-list-item-title>
                        {{item.subject}}
                    </v-list-item-title>
                    <v-list-item-subtitle>
                        Creado el {{item.creationDate}}
                    </v-list-item-subtitle>
                    <v-divider></v-divider>
                    
                </v-list-item-content>

                <v-list-item-action>
                    <v-badge
                    color="green"
                    overlap
                    :content="item.numberMessages.toString()"
                    >
                        <v-btn icon>
                            <v-icon color="primary">chat_bubble</v-icon>
                        </v-btn>
                    </v-badge>
                </v-list-item-action>

            </v-list-item>
        </div>
    </v-list>
</template>

<script>

export default {
    name:'ForumList',
    computed: {
        forumsList(){
            return this.$store.state.forums
        }
    },
    methods:{
        openForum(index){
            this.$store.commit('changeCurrentForum',index);
            this.$router.push('/forum/');
        },
    },
    created() {
        
    },

}
</script>

<style>

</style>