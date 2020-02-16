<template>
  <div id="app">
      <h1>
        {{ message }}
      </h1>
      <span v-hotkey="keymap" v-show="show"> Press `ctrl + esc` to toggle me! Hold `enter` to hide me! </span>
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
      show: true,
    };
  },
  computed: {
    keymap() {
      return {
        "ctrl+del": this.test,
        "ctrl+a": this.test,
        "s": this.test
      };
    }
  },
  methods: {
    test() {
      alert('sheesh')
    }
  }
};
</script>

<style>
#app {
  font-size: 18px;
  font-family: 'Roboto', sans-serif;
  color: blue;
}
</style>
