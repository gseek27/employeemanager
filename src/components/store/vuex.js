// itslit -- index.js ==> vuex.js

import Vuex from 'vuex';
import Vue from 'vue';
import posts from './modules/posts'

//Load Vuex
Vue.use(Vuex);

//create store
export default new Vuex.Store({
modules: {

    posts
}


}
);