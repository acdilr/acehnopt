<template>
  <div>
    <div>
      <button v-shortkey="['a']" @shortkey='decrease()' v-on:click='decrease()'>-</button>
      {{ count }}
      <button v-shortkey="['d']" @shortkey='increase()' v-on:click="increase()">+</button>
      <button v-on:click="init()">Init</button>
    </div>
    <div class="registers" id="trivium">
      <span :class="test[index]" v-for="(register, index) in registers">
        <span v-bind:id="test[index] + '-' + ffIndex" v-for="(ff, ffIndex) in register">
          <span  v-if="ff">▓</span>
          <span v-else>░</span>
        </span>
        <br>
      </span>

      <span id="abc" class="output" v-for="(output, index) in registerOutputs">
        <div v-bind:id="test[index] + '-output'">
          <span :id="output" v-if="output">▓</span>
          <span v-else>░</span>
        </div>
      </span>
      </span>
        <br>
        <p><p>
<hr>
    </div>
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
    registers[0][1] = 1
    registers[0][2] = 1
    registers[0][64] = 1
    for (let i = 3; i < 20; i++) {
      registers[1][i] = 1
    }

    return {
      count: 0,
      registers,
      output: [],
      registerOutputs: [],
      test: ["register-a", "register-b", "register-c", "trivium"]
    };
  },
  created: function() {
    this.getOutputs()
  },
  methods: {
    decrease() {
      this.count -= 1
    },
    init() {
      this.increase(1152 - this.count)
      this.output = []
    },
    getOutputs() {
      // Sanity checks for this gnarly bit:
      //  Each output is fed by its own register
      //  Each register input is fed by
      //     - the preceding output, and
      //     - one of its flipflops
      var outputs = [0, 0, 0]
      outputs[2] ^= (this.registers[2][108] & this.registers[2][109])
      outputs[2] ^= this.registers[2][110]
      outputs[2] ^= this.registers[2][65]
      // The first (as in 1) flipflop on Register B takes:
      //   - the 78th (remember the 1-index) flipflop in B
      //   - the output of Register A, which is as follows:
      //      = the 66th (remember the 1-index) flipflop of A
      //      = antepenultimate & penultimate flipflop of A (yes, a bit and)
      //      = the ultimate flipflop of A. # 93 in a 1-index.
      outputs[0] ^= (this.registers[0][90] & this.registers[0][91])
      outputs[0] ^= this.registers[0][92]
      outputs[0] ^= this.registers[0][65]

      outputs[1] ^= (this.registers[1][81] & this.registers[1][82])
      outputs[1] ^= this.registers[1][83]
      outputs[1] ^= this.registers[1][68]

      outputs.push(outputs.reduce((acc, val) => acc ^ val, 0)) // sorry

      this.registerOutputs = outputs
    },
    increase(count=1) {
      for (let n=0; n < count; n++) {
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
        // shrug. let's get the three register outputs first.
        var outputs = [0, 0, 0]
        for (let registerIndex = 0; registerIndex < this.registers.length; registerIndex++) {
          var register = Array()
          for (let ffIndex in this.registers[registerIndex]) {
            if (ffIndex == 0) {
              val = 0 // we're getting back to this!
              // this is a little awkward because we're allocating the array
              // and initializing its values simultaneously.
              // and it's easier to write this than it is to refactor this.
              // but you! why aren't you refactoring it?
            } else {
              sourceRegister = registerIndex
              sourceFlipflop = ffIndex - 1
              val = this.registers[sourceRegister][sourceFlipflop]
            }
            register.push(val)
          }
          registers.push(register)
        }
        // this is when we got back to it.
        registers[0][0] = this.registerOutputs[2] ^ this.registers[0][68]
        registers[1][0] = this.registerOutputs[0] ^ this.registers[1][77]
        registers[2][0] = this.registerOutputs[1] ^ this.registers[2][86] // let's go with coincidence. sure.
        // xor the register outputs for the net.
        this.output.push(this.registerOutputs[3]) // still sorry

        this.registers = registers

        this.getOutputs()
      }
    }
  }
};
</script>

<style>
#register-a-output, #register-a-65, #register-a-90, #register-a-91, #register-a-92 {
  color: red;
  /* float: right; */
}
#register-a-68 {
  color: coral;
}
#register-a-0 {
  /* c-output + a-68 =~ blue + red ? */
  color: purple
}
#register-b-77 {
  color: chartreuse;
}
#register-b-0 {
  /* a-output + b-77 =~ red + green ? */
  color: yellow
}
#register-c-86 {
  color: darkcyan;
}
#register-c-0 {
  /* b-output + c-86 =~ blue + green ? */
  color: cyan;
}

#trivium-output {
  color: darkgrey;
}
.registers {
  font-size: 10px;
  word-wrap: anywhere;
  width: 1000px;
  float: left;
}
</style>
