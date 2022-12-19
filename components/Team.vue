<script setup lang="ts">
const team = ref([
  {
    name: 'JamesMcGorty',
    career: 'Senior Business Development Executive',
    email: 'james@Dextall.com',
    phone: '917-242-1045',
    text: 'Aurimas Sabulis is a serial entrepreneur in the construction and technology sectors, committed to creating a high-performing, resilient, and sustainable built environment through industrial transformation',
    linkedin: 'https://www.linkedin.com/',
  },
  {
    name: 'Laurynas Skominas',
    career: 'BID manager',
    email: 'laurynas@dextall.com',
    phone: '+370-614-26296',
    text: 'Aurimas Sabulis is a serial entrepreneur in the construction and technology sectors, committed to creating a high-performing, resilient, and sustainable built environment through industrial transformation',
    linkedin: 'https://www.linkedin.com/',
  },
  {
    name: 'JamesMcGorty',
    career: 'Senior Business Development Executive',
    email: 'james@Dextall.com',
    phone: '917-242-1045',
    text: 'Aurimas Sabulis is a serial entrepreneur in the construction and technology sectors, committed to creating a high-performing, resilient, and sustainable built environment through industrial transformation',
    linkedin: 'https://www.linkedin.com/',
  },
  {
    name: 'Laurynas Skominas',
    career: 'BID manager',
    email: 'laurynas@dextall.com',
    phone: '+370-614-26296',
    text: 'Aurimas Sabulis is a serial entrepreneur in the construction and technology sectors, committed to creating a high-performing, resilient, and sustainable built environment through industrial transformation',
    linkedin: 'https://www.linkedin.com/',
  },
])
</script>

<template>
  <section class="section section--pb team">
    <div class="container team__wrapper">
      <h1 class="team__h1">Your Dextall Team Representatives</h1>
      <ul class="team__cards">
        <Card
          v-for="(member, idx) in team"
          :key="idx"
          :name="member.name"
          :career="member.career"
          :email="member.email"
          :phone="member.phone"
          :text="member.text"
          :linkedin="member.linkedin"
          class="team__card"
        />
      </ul>
    </div>
  </section>
</template>
