<template>
    <div>
        <div class="container">
            <div class="row">
                
                <div class="col s12 m8 offset-m2">
            
                    <div class="login card-panel teal white-text center">
            
                        <h3>Login</h3>
                        <form>
                            <div class="input-field">
                                <i class="material-icons prefix">email</i>
                                <input type="text" id="email" v-model="email">
                                <label class="white-text" for="email">Email</label>

                            </div>
                            <div class="input-field">
                                <i class="material-icons prefix">lock</i>
                                <input type="password" id="password" v-model="password">
                                <label class="white-text" for="password">Password</label>

                            </div>
                            <button v-on:click="login" class="btn btn-large grey lighten-4 black-text">Login</button>
                            <!--<div id="my-signin2" data-onsuccess="onSignIn" data-theme="dark"></div>-->
                              
                              
                        </form>
                        
                    </div>
                    <div id="my-signin2" @click="googleLogin"><img class="googlelogo" alt="google logo" src="../assets/googlebtn4.png"></div>
                   <!--< <div id="my-signin2" @click="phoneLogin"><img class="logo" alt="google logo" src="../assets/googlebtn4.png"></div>
                    <div id="my-signin2" @click="facebookLogin"><img class="logo" alt="google logo" src="../assets/googlebtn4.png"></div>-->
                    
                    <div id="my-signin2" v-on:click="twitterLogin"><img class="twitterlogo" alt="google logo" src="../assets/twitterbtn.png"></div>
                    <!--<div id="my-signin2" @click="githubLogin"><img class="logo" alt="google logo" src="../assets/googlebtn4.png"></div>
                    <div id="my-signin2" @click="yahooLogin"><img class="logo" alt="google logo" src="../assets/googlebtn4.png"></div>
                    <div id="my-signin2" @click="msoftLogin"><img class="logo" alt="google logo" src="../assets/googlebtn4.png"></div>-->

                </div>
            </div>
        </div>
    </div>
</template>


<script>

import firebase from 'firebase/app'
import AddPost from "./AddPost.vue";
export default {
  state,
getters,
actions,
mutations,
    name: 'login',
    data: function() {
        return {
            displayname: '',
            username: '',
            name: '',
            email: '',
            password: '',
            profile: ''
        };
    },
    methods: {
        login: function(e) {
            firebase
            .auth()
            .signInWithEmailAndPassword(this.email, this.password)
            .then(user => { 
                alert(`You are logged in as ${user.email}`);
                this.$router.go({path: this.$router.path});
            },
            err => {
                alert(err.message);
            }
            );
e.preventDefault();
        },
        googleLogin() {
            const provider = new firebase.auth.GoogleAuthProvider();

            firebase.auth().signInWithRedirect(provider).then((result) => {
                this.$router.go({path: this.$router.path});
            }).catch((err) => {
                alert('Oops. ' + err.message)
            });

        },

        twitterLogin() {
            firebase.auth().signInWithPopup(new firebase.auth.TwitterAuthProvider())
  .then(function(userCredential) {
    // All additional user info is available here.
    
    console.log(userCredential.additionalUserInfo.username);

    //const handle = userCredential.additionalUserInfo.username;

    const handle = userCredential.additionalUserInfo.username;


    console.log(handle + 'success');

    //console.log(handle);
    //this.$emit('handle');
    //alert(handle);
    //this.$router.go({path: this.$router.path});
  })
  .catch(function(error) {
    // Error occurred.
  });

}
    },
    computed: mapGetters(["allPosts"]),
        created() {
            this.fetchPosts();
        },

        /*
        twitterLogin() {
            firebase.auth().signInWithRedirect(new firebase.auth.TwitterAuthProvider())
  .then(function(userCredential) {
    // All additional user info is available here.
    
    console.log(userCredential.additionalUserInfo.username + 'hi');
    alert('hi');
    this.$router.go({path: this.$router.path});
  })
  .catch(function(error) {
    // Error occurred.
  });

},

*/


  /*
firebase.auth().signInWithPopup(new firebase.auth.TwitterAuthProvider())
  .then((userCredential) => {
    // Get the Twitter screen name.
    console.log(userCredential.additionalUserInfo.username);
  })
  .catch((error) => {
    // An error occurred.
  });

  */

        
        mounted() {
    gapi.signin2.render('my-signin2', { // this is the button "id"
      onsuccess: this.onSignIn, // note, no "()" here
  scope: 'email',
  width: 150,
  height: 50,
  longtitle: true,
  theme: 'light'
    })
  }
    }






// <-- itslit
import axios from 'axios';
import { mapGetters, mapActions } from 'vuex';


const state = {
    posts: []
};

const getters = {
    allPosts: (state) => state.posts 
};



const actions = {
    async fetchPosts({ commit }) {
        const response = await axios.get(`https://api.twitter.com/1.1/users/show.json?user_id=${firebase.auth().currentUser.uid}`);
        console.log(response.data);
        commit('setPosts', response.data);
    },
    async addPost({ commit }, screen_name) {
        const response = await axios.get('https://api.twitter.com/1.1/users/show.json', {screen_name,
   
        complete: false
    });
    commit('newPost', response.data);
    }
};

const mutations = {

    setPosts: (state, posts) => (state.posts = posts)
};


/*
export default {

state,
getters,
actions,
mutations

}; 
*/
//itslit -->






</script>







<style scoped>
.googlelogo {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 55%;
}
.twitterlogo {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 54%;
}

</style>