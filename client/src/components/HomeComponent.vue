<template>
  <div class="container">
    <h1>Hey {{ $store.state.user.FirstName }} {{ $store.state.user.LastName }}</h1>
    <h5>Welcome back</h5>
    <p>
      Your parking spot is:
    </p>
      <label class="parkingSpot">{{parkingSpot}}</label>
    <div>
      <button @click="redirect" type="button" class="btn btn-primary btn-lg ">Order parking</button>
      <button @click="redirectMyOrders" type="button" class="btn btn-primary btn-lg ">My orders</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'HomeComponent',
  props: {
  },
  data(){
      return {
          parkingSpot: "1" 
      }
  },

  methods:{
    getParkingSpot() {


    },

    redirect() {
        this.$router.push({ path: '/parkings' })
    },
    redirectMyOrders() {
        this.$router.push({ path: '/userOrders' })
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
.parkingSpot {
  align-items: center;
  background-color: darkgrey;
  width: 200px;
  height: 200px;
  border-radius: 50%;
  font-size: 75px;
  margin: 40px;
}

</style>
