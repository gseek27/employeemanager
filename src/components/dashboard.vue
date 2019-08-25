<template>


 <div class="container"> 
  <h1>Latest Posts</h1>
  
  <form @submit.prevent="createPost">
  <div class="create-post">
    <label for="create-post">Say Something...</label>
    
    <input type="text" id="create-post" v-model="text" placeholder="Create a post">
    <button type="submit" >Post</button>
  </div>
  </form>



 <!--
     v-on:click="createPost"

     create post here
 v-on:click="deletePost(Post.id)"  -->
<hr>


            <div v-for="Post in posts.slice().reverse()" v-bind:key="Post.id" class="collection-item">
              {{Post.text}} {{Post.id}} {{Post.time}}

            </div>


<!--


<div class="post"
  v-for="(post, index) in posts"
  v-bind:item="post"
  v-bind:key="post._id"
  >

   v-on:dblclick="deletePost(post._id)"
     v-bind:index="index"
   -->
  </div>
 
</template>

<script>

import db from './firebaseInit'
import firebase from 'firebase/app'

/*
import PostService from '../PostService';*/
export default {
  name: 'dashboard',
  data() {
    return {
      text: null,
      id: null,
      posts: [],
      time: null
    }
  },
  computed: {
    timestamp() {
      '1566716400'
      }
    },
  methods: {
        createPost () {
            db.collection('posts').add({
              
                text: this.text,
                id: this.id,
                time: Date.now()
            })
            .then(docRef => this.$router.push('/'))
            .catch(error => console.log(error));

        }
        },
  created () {
db.collection('posts').orderBy("time", "asc").get().then(querySnapshot => {
    querySnapshot.forEach(doc => {
        
        const data = {
            'id':  doc.id,
            'text': doc.data().text,
            'time': doc.data().time //keep to show timestamp
        }
        this.posts.push(data);
        console.log(doc.data());
    })
  })
 }
}
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>