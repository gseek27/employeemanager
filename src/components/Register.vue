<template>
    <div>
        <div class="container">
            <div class="row">
                
                <div class="col s12 m8 offset-m2">
            
                    <div class="login card-panel grey lighten-4 black-text center">
            
                        <h3>Register</h3>
                        <form>
                            <br>
                            <div class="input-field">
                                <i class="material-icons prefix">account_circle</i>
                                <input type="text" id="screenname" v-model="screenname">
                                <label for="screenname" >Screen Name</label>
                            </div>
                            <div class="input-field">
                                <i class="material-icons prefix">email</i>
                                <input type="text" id="email" v-model="email">
                                <label for="email" >Email</label>

                            </div>
                            <div class="input-field">
                                <i class="material-icons prefix">lock</i>
                                <input type="password" id="password" v-model="password">
                                <label for="password">Password</label>

                            </div>
                            <button v-on:click="register" class="btn btn-large grey lighten-4 black-text">Register</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import db from "./firebaseInit";
import firebase from 'firebase/app';
export default {
    name: 'register',
    data: function() {
        return {
            email: '',
            password: '',
            screenname: ''
        };
    },
    methods: {
        register: function(e) {
            firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
            .then((user) => {
                alert(`Account created for ${user.email}`)
                this.$router.go({path: this.$router.path});
                console.log(user.user.uid);
                db.collection("profiles").doc(user.user.uid).set({
                    screenname: this.screenname
            }).then(function() {
                //this.$router.go({path: this.$router.path});

            })
            },
            err => {
                alert(err.message);
            });
e.preventDefault();
        }
    }
};
</script>