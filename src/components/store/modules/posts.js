/* eslint-disable no-console */
/*
    
//fontawesome
//emits up, props down. state mgrs help
// need a get request from the Twitter API for uid =  :

GET https://api.twitter.com/1.1/users/show.json?user_id={the_uid_from_provider_data}

RESPONSE:
{
  "id": {the_uid_from_provider_data},
  "id_str": "{the_uid_from_provider_data}",
  "name": "Snakajime",
  "screen_name": "snakajime", // <--- Here is the screen name you are looking for
  ...
}

firebase.auth().signInWithPopup(new firebase.auth.TwitterAuthProvider())
  .then(function(userCredential) {
    // All additional user info is available here.
    
    console.log(userCredential.additionalUserInfo.username);

    //const handle = userCredential.additionalUserInfo.username;

    window.$handle = userCredential.additionalUserInfo.username;


    console.log(handle + 'success');

    //console.log(handle);
    //this.$emit('handle');
    //alert(handle);
    //this.$router.go({path: this.$router.path});
  })
  .catch(function(error) {
    // Error occurred.
  });

},

*/

import axios from 'axios';


const state = {
    posts: [

    ]
};

const getters = {
    allPosts: (state) => state.posts 
};



const actions = {
    async fetchPosts({ commit }) {
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
        console.log(response.data);
        commit('setPosts', response.data);
    },
    async addPost({ commit }, title) {
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {title,
   
        complete: false
    });
    commit('newPost', response.data);
    },
    async deletePost({ commit }, id) {
        await axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`);
        commit('removePost', id);
    },
    async filterPosts({ commit }, e) {
        console.log(e);
        //get selected number
        const limit = parseInt(e.target.options[e.target.options.seelectedIndex].innerText);
        console.log(limit);
        const response = await axios.get(`https://jsonplaceholder.typicode.com/posts?_limit=${limit}`);
        commit('setPosts', response.data);
    },
    async updatePost({ commit }, updPost) {
        const response = await axios.put(`https://jsonplaceholder.typicode.com/posts/${updPost.id}`,
        updPost
        );
        console.log(response.data);
        commit('updatePost', response.data);
    }
};

const mutations = {

    setPosts: (state, posts) => (state.posts = posts),
    newPost: (state, post) => state.posts.unshift(post),
    removePost:(state, id) => (state.posts = state.posts.filter(post => post.id !== id)),
    updatePost:(state, updPost) => {
        const index = state.posts.findIndex(post => post.id == updPost.id);
    if(index !== -1) {
        state.posts.splice(index, 1, updPost);
    }
    }
};



export default {

state,
getters,
actions,
mutations

}; 