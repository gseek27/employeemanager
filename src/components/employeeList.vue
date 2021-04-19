<template>
  <div id="dashboard">
    <ul class="collection with-header">
      <li class="collection-header">
        <h4>Profile</h4>
      </li>

      <li v-for="employee in employees" v-bind:key="employee.id" class="collection-item">
        <div class="chip">{{employee.dept}}</div>
        {{employee.name}} - "{{employee.position}}"
        <router-link
          class="secondary-content"
          v-bind:to="{name: 'view-employee', params: {employee_id: employee.employee_id}}"
        >See Options
          <!--<i class="fa fa-eye"></i>-->
        </router-link>
      </li>
<<<<<<< HEAD
      <div>
        Hello...
      </div>
=======

      <div id="app">
    <template v-repeat="number in numbers">
        <span v-show="!number.edit"
              v-on="click: toggleEdit(this, number)">{{number.val}}</span>
        
        <input type="text"
               v-el="input"
               v-model="number.val"
               v-show="number.edit"
               v-on="blur: saveEdit(ev, number)"> <br>
    </template>
</div>
>>>>>>> 242d60ddbd483f1d85265439bb830d0300c89188
    </ul>

<!--
    <div class="fixed-action-btn">
      <router-link to="/new" class="btn-floating btn-large red">
        <i class="fa fa-plus"></i>
      </router-link>
    </div>
    -->
  </div>
</template>

<script>
import db from "./firebaseInit";
export default {
  name: "employeelist",
  data() {
    return {
      employees: [],
    };
  },
   /*methods: {
    enableEditing: function(){
      this.tempValue = this.value;
      this.editing = true;
    },
    disableEditing: function(){
      this.tempValue = null;
      this.editing = false;
    },
    saveEdit: function(){
      // However we want to save it to the database
      this.value = this.tempValue;
      this.disableEditing();
    }
  },*/
  //methods: {
   /* getProfile () {
      this.$http.post(this.$store.state.api_url + 'user/getprofile', {
        auth_token: localStorage.getItem('jewt')
      }).then(({ data }) => {
        this.display_name = data.details.display_name;
        this.posts = data.details.posts;
      })
    } */
  //},
  beforeMount () {
   // this.getProfile();//
  }
  ,
  created() {
    db.collection("employees")
      .orderBy("dept")
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          console.log(doc.data());
          const data = {
            id: doc.id,
            employee_id: doc.data().employee_id,
            name: doc.data().name,
            dept: doc.data().dept,
            position: doc.data().position
          };
          this.employees.push(data);
        });
      });
  }
};

new Vue({
  el: '#app',
  data: {
    numbers: [
        {
            val: 'one',
            edit: false
        },
        {	val: 'two',
         	edit: false
        },
        {
            val: 'three',
            edit: false
        }
    ]
  },
  
  methods: {
  	toggleEdit: function(ev, number){
    	number.$set('edit', !number.edit);
        
        // Focus input field
        if(number.edit){
            Vue.nextTick(function() {
    			ev.$$.input.focus();
	  		})   
        }
    },
      
    saveEdit: function(ev, number){
     	//save your changes
      	this.toggleEdit(ev, number);
    }
  }
})
</script>