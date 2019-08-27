<template>

  <div class="postlist" :key="componentKey">
   
    <div
      class="collection-item"
      v-for="Post of posts"
      v-bind:key="Post.id"
    >

    {{Post.text}} - {{Post.time}}

    </div>
    
  </div>
</template>

<script>
import db from "./firebaseInit";
import firebase from "firebase/app";
export default {
  name: "dashboard",
  components: {},
  data() {
    return {
      text: null,
      id: null,
      posts: [],
      time: null,
      componentKey: 0,
      timestamp: null
    };
  },
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
            timestamp: Date.now()
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
