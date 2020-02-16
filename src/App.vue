<template>
  <div id="app">
      <h1>
        {{ message }}
      </h1>
    <Counter/>
    <hr>
    <Register/>
  </div>
</template>

<script>
import Counter from './components/Counter.vue'
import Register from './components/Register.vue'

export default {
  components: {
   Counter,
   Register,
  },
  data() {
    return {
      message: 'Hello World',
      show: true,
    };
  },
};
</script>

<style>
#app {
  font-size: 18px;
  font-family: 'Roboto', sans-serif;
  color: blue;
}
</style>
