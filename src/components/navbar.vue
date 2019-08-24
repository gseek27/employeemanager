<template>
<nav>
    <div class="nav-wrapper teal">
<div class="container">
    <router-link to="/" class="brand-logo">
    It's Lit! 🔥</router-link>

         <h3>
      
        </h3>
        </div>
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
</nav>
</template>

<script>
import Login from './Login'
import axios from 'axios';
import firebase from 'firebase/app'
import 'firebase/auth'
export default {
    name: 'navbar',
    props: ["info"],
    components: {
        Login
    },
 
    data () {
        return {
            isLoggedIn: false,
            currentUser: false,
            currentName: false,
            currentId: ''
        }
    },
    created() {
        
    axios.get('https://api.twitter.com/1.1/users/show.json?user_id={dGcpjzT9XTZWdYw9EiciGwH0CiB3}')
        .then(res => this.currentId = res.data)
        .catch(err => console.log(err));
        console.log(this.currentId + 'YES');

        if(firebase.auth().currentUser) {
this.isLoggedIn = true;
this.currentUser= firebase.auth().currentUser.email;
this.currentName= firebase.auth().currentUser.displayName;
//this.currentId = username;
//console.log(username);}
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