<template>
<nav>
    <div class="nav-wrapper teal">
<div class="container">
    <router-link to="/" class="brand-logo">
    It's Lit! 🔥</router-link>
    <ul class="right">
        <li v-if="isLoggedIn">
            <span class="email black-text">
                {{currentUser}}
                {{currentName}}
                {{currentId}}
            </span>
        </li>
        <li v-if="isLoggedIn">
            <router-link to="/employeelist">
                Users
            </router-link>
        </li>
        <li v-if="isLoggedIn">
            <router-link to="/">
                Dashboard
            </router-link>
        </li>
        <li v-if="!isLoggedIn">
            <router-link to="/login">
                Login
            </router-link>
        </li>
        <li v-if="!isLoggedIn">
            <router-link to="/register">
                Register
            </router-link>
        </li>
        <li v-if="isLoggedIn">
            <button class="btn black" v-on:click="logout">
                Logout
            </button>
        </li>
    </ul>
</div>
    </div>
</nav>
</template>

<script>
import firebase from 'firebase/app'
import 'firebase/auth'
export default {
    name: 'navbar',
    data () {
        return {
            isLoggedIn: false,
            currentUser: false,
            currentName: false,
            currentId: ''
        }
    },
    created() {
        if(firebase.auth().currentUser) {
this.isLoggedIn = true;
this.currentUser= firebase.auth().currentUser.email;
this.currentName= firebase.auth().currentUser.displayName;
//this.currentId= firebase.auth().currentUser.providerData;

        }
    },
    methods: {
        logout: function () {
            firebase.auth().signOut().then(() => {
               this.$router.go({path: this.$router.path});
            })
        }
    }
}
</script>

<style scoped>
.email {padding-right: 10px;}
</style>