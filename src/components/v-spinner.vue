<template lang="pug">
  .progress-wrapper(v-if="inProgress")
    .progress-svg
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
          <rect x="0" y="0" width="100" height="100" fill="none" class="bk"></rect>
          <g>
              <animate attributeName="opacity" dur="2s" repeatCount="indefinite" begin="0s" keyTimes="0;0.33;1" values="1;1;0"></animate>
              <circle cx="50" cy="50" r="40" class="circle1">
                  <animate attributeName="r" dur="2s" repeatCount="indefinite" begin="0s" keyTimes="0;0.33;1" values="0;22;44"></animate>
              </circle>
          </g>
          <g>
              <animate attributeName="opacity" dur="2s" repeatCount="indefinite" begin="1s" keyTimes="0;0.33;1" values="1;1;0"></animate>
              <circle cx="50" cy="50" r="40" class="circle2">
                  <animate attributeName="r" dur="2s" repeatCount="indefinite" begin="1s" keyTimes="0;0.33;1" values="0;22;44"></animate>
              </circle>
          </g>
      </svg>
</template>

<script>
  export default {
    name: 'v-spinner',

    data () {
      return {
        inProgress: false
      }
    },

    props: {
      iconClass: String
    },

    methods: {
      onRequest () {
        this.inProgress = true
      },
      onResponse () {
        this.inProgress = false
      },
      submit () {
        if (this.inProgress) return
        this.$emit('submit', '')
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "~src/assets/scss/share";

  .progress-wrapper {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: rgba($bgc, .3);
    @include move(spinnerWrapper, $transit, 1);
  }

  .progress-svg {
    width: 2.5em;
    height: 2.5em;
    svg {
      width: 100%;
      height: 100%;
    }
    .circle1,
    .circle2 {
      stroke-width: 3;
      stroke-linecap: round;
      fill: none;
    }
    .circle1 {
      stroke: mix($color1, $bgc, 80);
    }
    .circle2 {
      stroke: mix($color0, $bgc, 80);
    }
  }
</style>
