<template>
    
<div>
    <h3>Add Post</h3>
<div class="add"></div>
<form @submit="onSubmit">
    <input type="text" v-model="title" placeholder="Add Post...">
<input type="submit" value="Submit">
</form>
</div>
</template>

<script> 
import { mapActions } from 'vuex';
export default {
    name: "AddPost",
    data() {
        return{
    title: ''
}
    },
    methods: {
        ...mapActions(['addPost']),
        onSubmit(e) {
            e.preventDefault();
            this.addPost(this.title);
        }
    }
}
</script>

<style>

</style>