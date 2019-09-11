<template>

  <div>
   
    <div 
      v-for="Post in posts"
      v-bind:key="Post.id"
    >
     
     <button class="btn-floating btn-small red" :key="Post.id" @click="deletePost(Post)" ><i class="fa fa-times"></i></button>
      &nbsp;

     @{{name}} • {{Post.time}}<br> 
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      {{Post.text}} <br> 
    <!-- &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
     ({{Post.id}} --- {{Post.timestamp}}) -->
 <br><br>
    </div>
    
  </div>
</template>

<script>
import db from "./firebaseInit";
import firebase from "firebase/app";
import { name } from "./navbar"
export default {
  name: "postcomponent",
  data() {
    return {
     // text: null,
      id: null,
      posts: [],
     // time: null,
      postKey: 0,
      timestamp: null,//,
      name
    //  name: null,
   // profile: {
   //   name: false
  //  }
    };
  },
  props: {
   // timestamp: {
   //   type: Number
   // }
  },
  methods: {

      deletePost(Post) {
        
      //console.log(db.collection("posts").doc(Post.id).id);
     //console.log(Post.timestamp)
     var idx = this.posts.indexOf(Post)
      //this.postKey += 1;
      //console.log(this.postKey)
      this.posts.splice(idx, 1)
      if(confirm("Are you sure that you want to delete this post?"))
      //this.postKey += 1;
       //     console.log(this.postKey)

     
      //this.reversedList.splice(id, 1);
      //this.$emit('del-post', Post.id)
      //let docId = `${this.currentUser.uid}`

     /* db.collection("posts").doc(Post.id).update({
     posts: firebase.firestore.FieldValue.arrayRemove(Post)  */


      db.collection("posts")
      .where("time", "==", Post.time)
      .where("text", "==", Post.text)
      .where("timestamp", "==", Post.timestamp)
      .limit(1)
      .get()
     .then( querySnapshot => {
       querySnapshot.forEach(doc => {
         this.time = doc.ref.delete()
         this.$router.push("/")
       })
     }
     );

    // this.postKey += 1;
      }
   },
   /*
  .catch(function(error) {
      console.error("Error removing document: ", error);
  });
  */

      //posts.filter(post => post.id !== deleteId)
    
    
  
  created() {  // shows and orders the list of posts. when they are "created, it takrs a "snapshot"...
    db.collection("posts")
      .orderBy("timestamp", "desc")
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          const data = {
            id: doc.id,
            text: doc.data().text,
            time: doc.data(Date.now()).time, //keep to show timestamp doc.data().time,
          timestamp: doc.data().timestamp
          //  postKey: doc.data().postKey
          };
          this.posts.push(data);
          //console.log(doc.data());
          //console.log(doc.data(Date.now()).time);
          console.log(doc.data())
          
        });
      });

//if (firebase.auth().currentUser) {
db.collection('profiles').doc(firebase.auth().currentUser.uid).get().then(doc => {
        this.name = doc.data().name
    })
//}
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
