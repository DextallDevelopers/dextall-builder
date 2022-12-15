<script lang="ts" setup>
interface iProps {
  videoId: string
}

defineProps<iProps>()
</script>

<template>
  <div class="u-video-wrapper">
    <iframe
      width="1920"
      height="1080"
      :src="`https://www.youtube.com/embed/${videoId}`"
      title="YouTube video player"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
    ></iframe>
  </div>
</template>
