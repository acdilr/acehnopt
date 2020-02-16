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
    <hr>
      <span v-for="ff in flipflops">
        <span v-if="ff">▓</span>
        <span v-else>░</span>
      </span>
      <hr>
      <span v-for="bit in output">
        <span v-if="bit">▓</span>
        <span v-else>░</span>
      </span>

  </div>
</template>

<script>
export default {
  data() {
    return {
      count: 0,
      flipflops: [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      taps: [0, 0, 0, 0,
             0, 0, 0, 0,
             0, 0, 1, 0,
             1, 1, 0, 1],
      output: [],
    };
  },
  methods: {
    decrease() {
      this.count -= 1
    },
    increase() {
      this.count += 1
      var x = []
      var val
      for (let i in this.flipflops) {
        if (i == 0) {
          val = 0
          for (let tapIndex in this.taps) {
            if (this.taps[tapIndex]) {
              val ^= this.flipflops[tapIndex]
            }
          }
        } else {
          val = this.flipflops[i - 1]
        }
        x.push(val)
      }
      this.output.push(this.flipflops[this.flipflops.length - 1])
      this.flipflops = x
      console.log(x)
    }
  }
};
</script>

<style>
</style>
