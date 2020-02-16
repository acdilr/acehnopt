<template>
  <div>
    <button v-shortkey="['a']" @shortkey='count--' v-on:click='count--'>-</button>
    {{ count }}
    <button v-shortkey="['d']" @shortkey='count++' v-on:click="count++">+</button> </div>
</template>

<script>
export default {
  data() {
    return {
      count: 0
    };
  },
  computed: {
    keymap() {
      return {
        "left": this.decrease,
        "a": this.decrease,
        "d": this.increase,
        "right": this.increase,
      }
    }
  },
  methods: {
    decrease() {
      this.count -= 1
    },
    increase() {
      this.count += 1
    }
  }
};
</script>

<style>
</style>
