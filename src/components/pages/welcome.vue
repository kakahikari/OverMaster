<template lang="pug">
  section
    .card.card-inverse
      h3.card-title Welcome To Money-Agent
</template>

<script>
export default {
  name: 'welcome'
}
</script>

<style lang="scss" scoped>
  section {
    height: 100%;
    padding: 1em 0;
  }
  .card {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    font-size: 3.5em;
    background: url("../../../static/images/welcome.jpg");
    background-size: cover;
    background-repeat: no-repeat;
  }
</style>
