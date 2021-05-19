<template>
  <div class="container">
    <h1>Hey {{ $store.state.user.FirstName }}</h1>
    <h5>Welcome back</h5>

    <p>
      Your parking spot is:
    </p>
    <div>
      <button v-on:click="redirect" type="button" class="btn btn-primary btn-lg ">Order parking</button>
      <button v-on:click="redirect" type="button" class="btn btn-primary btn-lg ">My orders</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'HomeComponent',
  props: {
  },

  methods:{
    redirect() {
        this.$router.push({ path: '/parkings' })
    }

  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
