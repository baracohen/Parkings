<template>
  <div class="container">
    <h1>Hey {{ $store.state.user.FirstName }} {{ $store.state.user.LastName }}</h1>
    <h5>Welcome back</h5>
    <div class="spinner" v-if="$store.state.parkingSpot.parkingId">
      <Spinner />
      <p>
        Your parking spot is:
      </p>
        <label class="parkingSpot">{{$store.state.parkingSpot.parkingId}}</label>
    </div>
      <div v-else>
        <label>It seenms that you dont have parking for today, go get one now </label>
      </div>
      <div>
      <button @click="redirectMyOrders" type="button" class="btn btn-primary btn-lg orders-btn">My orders</button>
    </div>
    <div class="order-prakings-wrapper">
      <button @click="redirect" type="button" class="btn btn-primary btn-lg orders-btn">Order parking</button>
    </div>

  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapMutations } from 'vuex';
import parkingService from '../api/parkingService'
import commonUtils from '../utils/commonUtils'

export default defineComponent({
  name: 'HomeComponent',
  props: { },

  created(){
    this.getParkingSpot()
  },

  methods:{
    ...mapMutations([
      'setParkingSpot',
    ]),

    async getParkingSpot() {
        let data: any;
        let _date = commonUtils.setDateFormat(new Date())
            data = await parkingService.getTodayUserParking(this.$store.state.user.userId, _date);

        if(data != false && data.length > 0 ) {
            this.setParkingSpot(data.shift())
        }
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
.order-prakings-wrapper {
  margin: 20px;
}
.orders-btn {
  width: 200px;
}

</style>
