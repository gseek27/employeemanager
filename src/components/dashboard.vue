<template>
  <div class="container">
    <h1>Latest Posts</h1>

    <form @submit="createPost">
      <!--@submit="createPost"-->
      <div>
        <label for="create-post">Wsup?</label>
        <input type="text" id="create-post" v-model="text" placeholder="Type your message here..." />

       <button v-on:click="forceRerender" type="submit">Send</button>
      </div>
    </form>

     <br>
<<<<<<< HEAD

=======
>>>>>>> 242d60ddbd483f1d85265439bb830d0300c89188
    <PostComponent :timestamp="timestamp" :posts="posts" :key="componentKey" /> 
    <!-- props, post list update on render, emit function for deleting -->
  </div>
</template>

 

<script>
import db from "./firebaseInit";
import firebase from "firebase/app";
import PostComponent from "./PostComponent";
export default {
  name: "dashboard",
  components: {
    PostComponent
  },
  data() {
    return {
      text: null,
      id: null, //good null
      posts: [],
      time: null,
      componentKey: 0,
      timestamp: null,
    //  postKey: 0
    };
  },
<<<<<<< HEAD
  firebase: {
    posts: db.collection("posts")
  },
  methods: {
=======

  firebase: {

   // posts: db.collection("posts")

  },

  methods: {

>>>>>>> 242d60ddbd483f1d85265439bb830d0300c89188
    forceRerender() {
      this.componentKey += 1; //updates the list of posts by changing they key on the post component
      console.log("ckey  =" + this.componentKey);
    },
<<<<<<< HEAD
=======

    deletePost () {
      //if(confirm("Do you reeeelly want to delete?"));
      //console.log(Post.id)
      //console.log(this.posts);
      //this.posts.splice(id, 1);
     // ['posts.' + id]: firebase.firestore.FieldValue.delete()
     /* db.collection("posts").doc(this.id).update({
     posts: firebase.firestore.FieldValue.arrayRemove(Post) 
   })
  .catch(function(error) {
      console.error("Error removing document: ", error);
  });
      */
    },
    
>>>>>>> 242d60ddbd483f1d85265439bb830d0300c89188
    createPost() {
      // when posts are created, they get added to the "posts" collection here
      db.collection("posts")
        .add({
          text: this.text, //NEEDED
<<<<<<< HEAD
          time: new Date(new Date().toJSON().toString()).toLocaleString(), // NEEDED. converts the post time into local time
          timestamp: Date.now(), //NEEDED
=======
         // postKey: this.postKey,
          //id: data.doc.id, // db.collection('posts').doc().id, //good
          time: new Date(new Date().toJSON().toString()).toLocaleString(), // NEEDED. converts the post time into local time
          timestamp: Date.now(), //NEEDED
          //componentKey: this.componentKey
>>>>>>> 242d60ddbd483f1d85265439bb830d0300c89188
        })
        .then(this.$router.push("/"))
        .catch(error => console.log(error));

       // console.log(db.collection('posts').doc().id +'firebase');
    }
<<<<<<< HEAD
    
=======
    /*
    },
    created() {  // shows and orders the list of posts. when they are "created, it takes a "snapshot"...
    db.collection("posts")
    .orderBy("timestamp", "desc")
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          const data = {
            id: doc.id, //good NEEDED
            //componentKey: doc.componentKey,
            text: doc.data().text, //NEEDED
         //   postKey:doc.data().postKey,
            time: doc.data(Date.now()).time, //NEEDED. keep this here to show timestamp on the posts: doc.data().time,
            timestamp: Date.now() //not needed? 
          };
          this.posts.push(data);
          console.log(doc.data());
          console.log(doc.data(Date.now()).time);
        });
      });
  }
 */ 
>>>>>>> 242d60ddbd483f1d85265439bb830d0300c89188
  }}
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>