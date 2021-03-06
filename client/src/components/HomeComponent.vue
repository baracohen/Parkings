<template>
  <div class="container home-wrapper">
    <h1>Welcome {{ $store.state.user.FirstName }}</h1>
    <div class="home-text-wrapper">
    <div class="spinner" v-if="$store.state.parkingSpot.parkingId">
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
        <button  @click="cancelParking" type="button" class="btn btn-primary btn-lg orders-btn">Cancel reservation</button>
      </div>
        <div class="no-parking-spot-buttons-wrapper" v-else>
          <button @click="generateParking" type="button" class="btn btn-primary btn-lg orders-btn">Generate parking for today</button>
            <span>Or</span>
          <button @click="redirect" type="button" class="btn btn-primary btn-lg orders-btn">Book parking spots</button>
        </div>
    </div>

  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapGetters, mapMutations } from 'vuex';
import parkingService from '../api/parkingService';
import commonUtils from '../utils/commonUtils';
import Swal from 'sweetalert2'


export default defineComponent({
  name: 'HomeComponent',
  props: { },

  created(){
    this.getParkingUserSpot();
  },

  computed:{
    ...mapGetters([
      'getParkingSpot',
      'getUserId'
    ])

  },
  methods:{
    ...mapMutations([
      'setParkingSpot',
      'cleanParkingSpot',
    ]),

    async getParkingUserSpot() {
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
    
      async cancelParking() {
        Swal.fire({
          icon:'warning',
          title: 'Are you sure you want to cancel your parking spot for today?',
          showCancelButton: true,
          confirmButtonText: `I'm sure!`,
        }).then(async (result) => {
          /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                const data = await commonUtils.cancelConnection(this.getParkingSpot) as any;
                if(data && data.deletedCount > 0) {
                    this.cleanParkingSpot();
                    commonUtils.showSucssesModalWithoutTimer('Your parkings spot has been canceled!', true);
                } else {
                    commonUtils.showErrorModal('Someone went wrong, please refresh the page and try again')
            }
          } 
        })
      },
      async generateParking() {
          let _date = commonUtils.saveDateFormat(new Date().toString());
          const data = await parkingService.generateParking(this.getUserId, _date) as any;

          if(data) {
            commonUtils.showSucssesModalWithoutTimer(`Congrats! we found for you a spot, your parking spot is ${data.parkingId}`, true);
            this.setParkingSpot(data);
          } else {
            commonUtils.showErrorModal('Sorry, all the parking spots are unavailable for today')
          }
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
  width: 130px;
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
.no-parking-spot-buttons-wrapper {
  display: inline-grid;
}
</style>
