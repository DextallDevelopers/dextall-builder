<script setup lang="ts">
interface iProps {
  avatar: string
  name: string
  career: string
  email: string
  phone: string
  text: string
  linkedin: string
}
defineProps<iProps>()

const getImgSrc = (img: string) => {
  if (!img) {
    return null
  }
  return useStoryblokImage(img, { size: '60x60' })
}
</script>

<template>
  <li class="card">
    <div class="card__img-block">
      <img
        v-if="avatar"
        class="card__profile-image"
        :src="getImgSrc(avatar)"
        alt="Avatar"
      />
      <IconsProfile v-else class="card__profile-icon" />
      <div class="card__link-wrapper">
        <a
          class="card__link"
          :href="linkedin"
          target="_blank"
          rel="noreferrer noopener"
        >
          <IconsLinkedin class="card__link-icon" />
        </a>
      </div>
    </div>
    <div class="card__info-block">
      <h2 class="card__profile-name">{{ name }}</h2>
      <p class="card__profile-career">{{ career }}</p>
      <div class="card__contacts-wrapper">
        <p class="card__email">
          Email:
          <a :href="`mailto:${email}`" class="card__contact">
            {{ email }}
          </a>
        </p>
        <p class="card__phone">
          Phone:
          <a :href="`tel:${phone.replace(/\D/gm, '')}`" class="card__contact">
            {{ phone }}
          </a>
        </p>
      </div>
      <p class="card__about">
        {{ text }}
      </p>
    </div>
  </li>
</template>
