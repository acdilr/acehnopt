<template>
  <div>
    <div>
      <button v-shortkey="['a']" @shortkey='decrease()' v-on:click='decrease()'>-</button>
      {{ count }}
      <button v-shortkey="['d']" @shortkey='increase()' v-on:click="increase()">+</button>
    </div>
    <span>▓</span>
    <span>░</span>
    <span>░</span>
    <span>░</span>
  </div>
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
