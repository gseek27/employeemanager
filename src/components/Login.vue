<template>
    <div>
        <div class="container">
            <div class="row">
                
                <div class="col s12 m8 offset-m2">
            
                    <div class="login card-panel green white-text center">
            
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
                            <button @click="socialLogin" class="social-button">Sign in with Google</button>
                        </form>
                    </div>
                </div>
                <div class="g-signin2" data-onsuccess="onSignIn" data-theme="dark"></div>
            </div>
        </div>
    </div>
    <div class="g-signin2" data-onsuccess="onSignIn" data-theme="dark"></div>
</template>


<script>
import firebase from 'firebase';
export default {
    name: 'login',
    data: function() {
        return {
            email: '',
            password: ''
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
        socialLogin() {
            const provider = new firebase.auth.GoogleAuthProvider();

            firebase.auth().signInWithPopup(provider).then((result) => {
                this.$router.replace('home');
            }).catch((err) => {
                alert.('Oops. ' + err.message)
            });

        }
    }
}

    
    
    
</script>