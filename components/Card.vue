<script setup lang="ts">
interface iProps {
  name: string
  career: string
  email: string
  phone: string
  text: string
  linkedin: string
}
defineProps<iProps>()
</script>

<template>
  <li class="card">
    <div class="card__img-block">
      <IconsProfile class="card__profile-icon" />
      <div class="card__link-wrapper">
        <a
          class="card__link"
          href="https://www.linkedin.com/"
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
