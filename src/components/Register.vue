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
    <div class="registers" id="trivium">
      <span v-for="register in registers">
        <span v-for="ff in register">
          <span v-if="ff">▓</span>
          <span v-else>░</span>
        </span>
        <br>
      </span>
    </div>
      <span v-for="ff in flipflops">
        <span v-if="ff">▓</span>
        <span v-else>░</span>
      </span>
      <hr>
    <div class="registers">
      <span v-for="bit in output">
        <span v-if="bit">▓</span>
        <span v-else>░</span>
      </span>
    </div>

  </div>
</template>

<script>
export default {
  data() {
    var registers = [[], [], []]
    registers[0] = Array(93).fill(0)
    registers[1] = Array(84).fill(0)
    registers[2] = Array(111).fill(0)
    registers[0][0] = 1
    return {
      count: 0,
      registers,
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
      // We're going to follow a simple enough plan
      //  One that is Vessel oriented, rather than Passage oriented
            // [Each flipflop, not each bit in the flipflop.]
      //  and One that is Buffered, rather than Deltaed.
            // cf. [this.registers = registers]
            //     [this.registers.update(delta)]
      // Deltas are sparse, Buffers are dense, &c. &c.

      // Anyways, the plan:
      //   Every feedforward fires,
      //   then we handle the Trivium feeds,
      //   and the output
      var registers = []
      var val, sourceRegister, sourceFlipflop
      for (let registerIndex = 0; registerIndex < this.registers.length; registerIndex++) {
        var register = Array()
        for (let ffIndex in this.registers[registerIndex]) {
          if (ffIndex == 0) {
            val = 0
            sourceRegister = Math.abs((registerIndex + this.registers.length - 1) % this.registers.length)
            sourceFlipflop = this.registers[sourceRegister].length - 1
            val ^= this.registers[sourceRegister][sourceFlipflop]
          } else {
            sourceRegister = registerIndex
            sourceFlipflop = ffIndex - 1
            val = this.registers[sourceRegister][sourceFlipflop]
          }
          register.push(val)
        }
        registers.push(register)
      }
      // being careful to use the last state to update the new state
      registers[0][0] ^= this.registers[0][68]
      registers[1][0] ^= this.registers[1][77]
      registers[2][0] ^= this.registers[2][86]
      this.output.push(this.flipflops[this.flipflops.length - 1])

      this.registers = registers

    }
  }
};
</script>

<style>
.registers {
  font-size: 10px;
  word-wrap: anywhere;
  width: 1000px;
}
</style>
