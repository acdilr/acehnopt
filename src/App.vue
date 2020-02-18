<template>
  <div id="app">
    <Register/>
  </div>
</template>

<script>
import Register from './components/Register.vue'

export default {
  components: {
   Register,
  },
  data() {
    return {
    };
  },
};
</script>

<style>
#app {
  font-size: 18px;
  font-family: 'Roboto', sans-serif;
  color: grey;
}
</style>
