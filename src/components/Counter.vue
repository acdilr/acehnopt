<template>
  <div>
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
};
</script>

<style>
font-size: 99px;
</style>
