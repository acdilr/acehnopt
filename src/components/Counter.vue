<template>
  <div>
    <span v-hotkey="keymap">
      a and d to control
    </span>
  <button v-on:click="count++">
    You clicked me {{ count }} times.
  </button> </div>
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
font-size: 99px;
</style>
