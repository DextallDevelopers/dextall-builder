<script setup lang="ts">
interface iProps {
  avatar: string
  name: string
  career: string
  email: string
  phone: string
  text: string
  linkedin: string
  facebook: string
  isContacts?: boolean
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
  <li class="reduced-card">
    <div class="reduced-card__img-block">
      <img
        v-if="avatar"
        class="reduced-card__profile-image"
        :src="getImgSrc(avatar)"
        alt="Avatar"
      />
      <IconsProfile v-else class="reduced-card__profile-icon" />
      <div class="reduced-card__link-wrapper">
        <a
          class="reduced-card__link"
          :href="linkedin"
          target="_blank"
          rel="noreferrer noopener"
        >
          <IconsLinkedin class="reduced-card__link-icon" />
        </a>
        <a
          class="reduced-card__link"
          :href="facebook"
          target="_blank"
          rel="noreferrer noopener"
        >
          <IconsFacebook class="reduced-card__link-icon" />
        </a>
      </div>
    </div>
    <div class="reduced-card__info-block">
      <div class="reduced-card__profile-info">
        <h2 class="reduced-card__profile-name">{{ name }}</h2>
        <p class="reduced-card__profile-career">{{ career }}</p>
      </div>
      <div class="reduced-card__contacts-wrapper">
        <p class="reduced-card__email">
          Email:
          <a :href="`mailto:${email}`" class="reduced-card__contact">
            {{ email }}
          </a>
        </p>
        <p class="reduced-card__phone">
          Phone:
          <a
            :href="`tel:${phone.replace(/\D/gm, '')}`"
            class="reduced-card__contact"
          >
            {{ phone }}
          </a>
        </p>
      </div>
      <p v-if="isContacts" class="reduced-card__about">
        {{ text }}
      </p>
    </div>
  </li>
</template>
