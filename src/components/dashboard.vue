<template>
  <div class="container">
    <h1>Latest Posts</h1>

    <form @submit="createPost">
      <!--@submit="createPost"-->
      <div class="create-post">
        <label for="create-post">Wsup?</label>

        <input type="text" id="create-post" v-model="text" placeholder="Type your message here..." />
        <button v-on:click="forceRerender" type="submit">Send</button>
      </div>
    </form>


    <PostComponent v-bind:posts="posts" :key="componentKey" /> 
  
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
      id: null,
      posts: [],
      time: null,
      componentKey: 0,
      timestamp: null,
    };
  },
  firebase: {
   posts: db.collection("posts")
  },
  methods: {
    forceRerender() {
      this.componentKey += 1;
      console.log("ckey  =" + this.componentKey);
    },
    createPost() {

      db.collection("posts")
        .add({
          text: this.text,
          id: this.id,
          time: new Date(new Date().toJSON().toString()).toLocaleString(),
          timestamp: Date.now(),
          componentKey: this.componentKey,
        })
        .then(this.$router.push("/")) 
        .catch(error => console.log(error));
    }
  }
};
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>