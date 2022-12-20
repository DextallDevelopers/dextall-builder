<template>
  <transition name="fade">
    <div
      v-if="isWaiting"
      class="app-loader"
    >
      <Spinner />
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