<template>
  <div id="app">
      <h1>
        {{ message }}
      </h1>
    <Counter/>
  </div>
</template>

<script>
import Counter from './components/Counter.vue'
export default {
  components: {
   Counter
  },
  data() {
    return {
      message: 'Hello World',
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
