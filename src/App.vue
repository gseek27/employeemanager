<template>
  <div id="app">
    <navbar />
    <div class="container">
    <router-view/>
    </div>
  </div>
</template>

<script>
import navbar from './components/navbar'
export default {
  name: 'App',
  components: {
    navbar
  }
}
</script>

