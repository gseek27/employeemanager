<template>

  <div>
   
    <div
      
      v-for="Post in posts"
      v-bind:key="Post.id"
    >
     
     <button class="btn-floating btn-small red" :key="Post.id" @click="deletePost(Post)" ><i class="fa fa-times"></i></button>
      &nbsp;

     {{Post.text}} - {{Post.time}} ({{Post.id}}) {{Post.timestamp}}
 <br><br>
    </div>
    
  </div>
</template>

<script>
import db from "./firebaseInit";
import firebase from "firebase/app";
export default {
  name: "dashboard",
  data() {
    return {
     // text: null,
      id: null,
      posts: [],
     // time: null,
     // postKey: 0,
      //timestamp: null
    };
  },
  props: {
  //  componentKey: {
  //    type: Number
   // }
  },
  methods: {

      deletePost(Post) {
      
     //console.log(this.postKey)
      //Post.postKey += 1;
      console.log(Post.id)
      //if(confirm("Do you really want to delete?"))
     //this.posts.splice(id, 1)
      //this.reversedList.splice(id, 1);
      //this.$emit('del-post', Post.id)
      //let docId = `${this.currentUser.uid}`

     /* db.collection("posts").doc(Post.id).update({
     posts: firebase.firestore.FieldValue.arrayRemove(Post)  */

      db.collection("posts")
      .where("time", "==", Post.time)
      .where("text", "==", Post.text)
      .where("timestamp", "==", Post.timestamp)
      .get()
     .then( querySnapshot => {
       querySnapshot.forEach(doc => {
         this.time = doc.ref.delete()
         this.$router.push("/")
       })
     }
     )
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
            timestamp: Date.now(),
          //  postKey: doc.data().postKey
          };
          this.posts.push(data);
          console.log(doc.data());
          console.log(doc.data(Date.now()).time);
        });
      });
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
