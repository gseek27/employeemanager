<template>
  <div id="edit-employee">
    <h3>Edit Profile</h3>
    <div class>
      <form @submit.prevent="updateEmployee" class="col s12">
        <!-- <div class="row">
          <div class="input-field col s12">
            <input disabled type="text" v-model="employee_id" required />
          </div>
        </div>-->
        <label for="Name">Name:</label>

        <div class="row">
          <div class="input-field col s4">
            <input type="text" id="Name" v-model="name" required />
          </div>
        </div>
        <label for="Location">Location:</label>

        <div class="row">
          <div class="input-field col s4">
            <input type="text" id="Location" v-model="dept" required />
          </div>
        </div>
        <label for="bio">Bio:</label>
        <div class="row">
          <div class="input-field col s12">
            <input id="bio" type="text" v-model="position" required />
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <input type="file" accept="image/*" @change="onChange" />
  <div id="preview">
    <img v-if="item.imageUrl" :src="item.imageUrl" />
  </div>
          </div>
        </div>
        <button type="submit" class="btn">Submit</button>
        <router-link to="/" class="btn grey">Cancel</router-link>
      </form>
    </div>
  </div>
</template>

<script>
import db from "./firebaseInit";
export default {
  name: "edit-employee",
  data() {
    return {
      employee_id: null,
      name: null,
      dept: null,
      position: null,
      image : null,
      imageUrl: null
    };
  },

  beforeRouteEnter(to, from, next) {
    db.collection("employees")
      .where("employee_id", "==", to.params.employee_id)
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          next(vm => {
            vm.employee_id = doc.data().employee_id;
            vm.name = doc.data().name;
            vm.dept = doc.data().dept;
            vm.position = doc.data().position;
          });
        });
      });
  },
  watch: {
    $route: "fetchData"
  },
  methods: {
    fetchData() {
      db.collection("employees")
        .where("employee_id", "==", this.$route.params.employee_id)
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            this.employee_id = doc.data().employee_id;
            this.name = doc.data().name;
            this.dept = doc.data().dept;
            this.position = doc.data().position;
          });
        });
    },
    updateEmployee() {
      db.collection("employees")
        .where("employee_id", "==", this.$route.params.employee_id)
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            doc.ref
              .update({
                employee_id: this.employee_id,
                name: this.name,
                dept: this.dept,
                position: this.position
              })
              .then(() => {
                this.$router.push({
                  name: "view-employee",
                  params: { employee_id: this.employee_id, name: this.name }
                });
              });
          });
        });
    },
    onChange(e) {
      const file = e.target.files[0]
      this.image = file
      this.item.imageUrl = URL.createObjectURL(file)
    }
  }
};
</script>