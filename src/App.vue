<template>
  <div id="app">
    <navbar v-bind:username="username"  />
    <div class="container">
    <router-view/>
    </div>
  </div>
</template>

<script>
import uuid from 'uuid'
import username from './components/Login'
import Login from './components/Login'
import navbar from './components/navbar'
import axios from 'axios';
 export default {
  name: 'App',
  props: {
  },
  components: {
    navbar  
    },
    data() {
      return {
        username: ''
      } 
     
    },
    methods: {
      addUsername() {
        const newName = {
          id: uuid.v4(),
          username: this.username
        }
         //send up to parent
      this.$emit('add-name', newName)

      },
    created() {
        axios.get('https://api.twitter.com/1.1/users/show.json?user_id={dGcpjzT9XTZWdYw9EiciGwH0CiB3}')
        .then(res => this.username = res.data)
        .catch(err => console.log(err));

        }
    }}

</script>

