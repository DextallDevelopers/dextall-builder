<template>
  <transition name="fade">
    <div
      v-if="isWaiting"
      class="app-loader"
    >
      <svg
        class="circular"
        viewBox="25 25 50 50"
      >
        <circle
          class="path"
          cx="50"
          cy="50"
          r="20"
          fill="none"
          stroke-width="2"
          stroke-miterlimit="10"
        />
      </svg>
    </div>
  </transition>
</template>

<script setup lang="ts">
// export default {
//   computed: {
//     isLoading() {
//       return this.$store.state.app.loading
//     },
//   },
// }
const { isWaiting } = useAppState()

</script>