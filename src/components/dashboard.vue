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

    <PostComponent :posts="posts" :key="componentKey" @del-post="deletePost" /> 
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
      timestamp: null
    };
  },

  firebase: {

    posts: db.collection("posts")

  },

  methods: {

    forceRerender() {
      this.componentKey += 1; //updates the list of posts by changing they key on the post component
      console.log("ckey  =" + this.componentKey);
    },

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
    
    createPost() {
      // when posts are created, they get added to the "posts" collection here
      db.collection("posts")
        .add({
          text: this.text, //NEEDED
          //id: data.doc.id, // db.collection('posts').doc().id, //good
          time: new Date(new Date().toJSON().toString()).toLocaleString(), // NEEDED. converts the post time into local time
          timestamp: Date.now(), //NEEDED
          //componentKey: this.componentKey
        })
        .then(this.$router.push("/"))
        .catch(error => console.log(error));

        console.log(db.collection('posts').doc().id +'firebase');
    }
    
    },
    created() {  // shows and orders the list of posts. when they are "created, it takes a "snapshot"...
    db.collection("posts")
    .orderBy("timestamp", "desc")
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          const data = {
            id: doc.id, //good NEEDED
            text: doc.data().text, //NEEDED
            time: doc.data(Date.now()).time, //NEEDED. keep this here to show timestamp on the posts: doc.data().time,
            //timestamp: Date.now() //not needed? 
          };
          this.posts.push(data);
          console.log(doc.data());
          console.log(doc.data(Date.now()).time);
        });
      });
  }
  
  }
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>