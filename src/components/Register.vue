<template>
    <div>
        <div class="container">
            <div class="row">
                
                <div class="col s12 m8 offset-m2">
            
                    <div class="login card-panel grey lighten-4 black-text center">
            
                        <h3>Register</h3>
                        <form id="registration">
                            <br>
                            <div class="input-field">
                                <i class="material-icons prefix">account_circle</i>
                                <input type="text" id="name" v-model="name">
                                <label for="name" >Screen Name</label>
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
export var name = this.name;
export default {
    name: 'Register',
    data: function() {
        return {
            email: null,
            password: null,
            name: null
        };
    },
    methods: {
        register() {

          //  const registerform = document.querySelector('#registration');
            
           //  registerform.addEventListener('submit'), (e) => {
           //     e.preventDefault();
            

            firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
            .then((user) => {
                
                db.collection("profiles").doc(user.user.uid).set({
            //       name: document.querySelector('#registration')['name'].value,
            name: this.name
                  
                    
                            })
                .then(function() {
                    console.log("Document successfully written!");
                     console.log(document.querySelector('#registration'));
                    this.$emit('send-name', name); 
                     
                 //   this.$router.go({ path: this.$router.path });
                //    alert(`Account created for ${user.email}`);
               // console.log(user.user.uid);
               // console.log(this.name);
              // this.$router.go({path: this.$router.path});
                })
                .catch(function(error) {
                    console.error("Error writing document: ", error);
                });
            
             // this.$router.go({path: this.$router.path});  

              this.$router.replace('/');   // MUST use refresh to push new username into firestore database
              setTimeout(() => 
            this.$router.go(0), 400); // MUST wait and refresh browser after at least ~400 MS to show name in live NavBar contents
              //this.$router.go(this.$router.path);
            }
            //,
          //  err => {
         //       alert(err.message);
           // }
           
           
            )//;
            
//e.preventDefault();
//this.$router.go(0) 

        }
        }

  //  }
};
</script>