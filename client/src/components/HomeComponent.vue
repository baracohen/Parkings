<template>
  <div class="container home-wrapper">
    <h1>Welcome {{ $store.state.user.FirstName }}</h1>
    <div class="home-text-wrapper">
    <div class="spinner" v-if="$store.state.parkingSpot.parkingId">
      <Spinner />
      <label class="is-parking-text">
        You parking spot for today: {{$store.state.parkingSpot.date}}
      </label>
    </div>
      <div class='no-parking-spot' v-else>
        <label>You have no booked parking spots yet. </label>
        <label> Start from booking your first one.</label>
      </div>
    </div>
      <div class="parking-img-wrapper">
        <div class="is-parking-wrapper" v-if="$store.state.parkingSpot.parkingId">
          <label class="floor-label">Floor - {{$store.state.parkingSpot.floor}}</label>
          <label class="parking-spot-label"> {{$store.state.parkingSpot.parkingId}} </label>
        </div>
        <div v-else>
          <img src='../assets/no-parking.svg' />
        </div>
      </div>
    <div class="order-prakings-wrapper">
      <div v-if="$store.state.parkingSpot.parkingId">
        <button  @click="redirectMyOrders" type="button" class="btn btn-primary btn-lg orders-btn">Cancel reservation</button>
      </div>
        <button @click="redirect" type="button" class="btn btn-primary btn-lg orders-btn">Book parking spots</button>
    </div>

  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapMutations } from 'vuex';
import parkingService from '../api/parkingService';
import commonUtils from '../utils/commonUtils';

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
        let _date = commonUtils.saveDateFormat(new Date().toString());
            data = await parkingService.getTodayUserParking(this.$store.state.user.userId, _date);

        if(data != false && data.length > 0 ) {
            this.setParkingSpot(data.shift());
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
.parking-spot-label {
  font-size: 100px;
  font: bold;
}
.floor-label {
  font-size: 18px;
}
.order-prakings-wrapper {
  margin-top: 40px;
}
.orders-btn {
  width: 304px;
  background: linear-gradient(90deg, #ED4036 0%, #EB008A 100%);
  margin: 20px;
  border: none;
}
.no-parking-spot {
  display: grid;
}
.parking-img-wrapper {
  width: 300px;
  height: 300px;
  background-color: #4A4A4A;
  margin: auto;
  padding: 10px;
}
.home-text-wrapper {
  margin-bottom: 20px;
}
.parking-img-wrapper img{
  width: 94px;
  height: 250px;
}
.is-parking-wrapper {
  text-align: center;
  display: grid;
  margin-top: 45px;
}
.is-parking-text {
  font-size: 16px;
  width: 300px;
  font-weight: bold;
}
</style>
