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
 v-on:click="deletePost(Post.id)"  
 
 .slice().reverse()
 -->
<hr>


            <div v-for="Post in posts" v-bind:key="Post.id" class="collection-item">
              {{Post.text}}         

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


/*

if(posts.data[i].hasOwnProperty('timestamp')){
let time = new Date(posts.data[i].timeAdded + "T00:00:00");
let fTimestamp = new firebase.firestore.Timestamp.fromDate(time);
post.createdAt = posts.data[i].timeAdded;

console.log( time, fTimestamp, posts.data[i])

}



*/


/*
import PostService from '../PostService';*/
export default {
  name: 'dashboard',
  data() {
    return {
      text: null,
      posts: []
    }
  },
  methods: {
        createPost () {
            db.collection('posts').add({
                text: this.text
            })
            .then(docRef => this.$router.push('/'))
            .catch(error => console.log(error))
        }},

  created () {
db.collection('posts').get().then(querySnapshot => {
    querySnapshot.forEach(doc => {
        console.log(doc.data());
        const data = {
            'id':  doc.id,
            'text': doc.data().text
        }
        this.posts.unshift(data)
    })
  })
 }   
}
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>