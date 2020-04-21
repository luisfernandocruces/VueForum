import Vue from 'vue'
import VueRouter from 'vue-router'



Vue.use(VueRouter)


export default new VueRouter({
    routes: [

        {
            path: '/',
            name: 'Login',
            component: () => import(/* webpackChunkName: "about" */ '../views/Login.vue'),
           
        },
        {
            path: '/register',
            name: 'Register',
            component: () => import(/* webpackChunkName: "about" */ '../views/Register.vue')
        },
        {
            path: '/userAdmin',
            name: 'userAdmin',
            component: () => import(/* webpackChunkName: "about" */ '../views/UserAdmin.vue')
        },{
            path: '/forums',
            name: 'Forums',
            component: () => import(/* webpackChunkName: "about" */ '../views/Forums.vue')
        },
        {
            path: '/createForum',
            name: 'CreateForum',
            component: () => import(/* webpackChunkName: "about" */ '../views/CreateForum.vue')
        },
        {
            path: '/forum',
            name: 'Forum',
            component: () => import(/* webpackChunkName: "about" */ '../views/Forum.vue')
        },
        {
            path: '/addCommentForum/:typeComment',
            name: 'AddCommentForum',
            component: () => import(/* webpackChunkName: "about" */ '../views/AddCommentForum.vue')
        },
        {
            path: '/listUsers',
            name: 'ListUsers',
            component: () => import(/* webpackChunkName: "about" */ '../views/ListUsers.vue')
        },
        {
            path: '/editMessage',
            name: 'EditCommentForum',
            component: () => import(/* webpackChunkName: "about" */ '../views/EditCommentForum.vue')
        }
    ]

})

  