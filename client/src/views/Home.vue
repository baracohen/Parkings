<template>
  <div class="home">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/parkings">Parkings</router-link>
    </div>
    <HomeComponent />
  </div>
</template>

<script>
// @ is an alias to /src
import HomeComponent from '@/components/HomeComponent.vue'

export default {
  name: 'Home',
  components: {
    HomeComponent
  }
}
</script>
