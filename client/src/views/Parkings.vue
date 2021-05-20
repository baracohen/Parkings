<template>
<section class="container text-center parkings">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/parkings">Parkings</router-link>
    </div>
    <div class="row justify-content-center">
        <div class="box-shadow">
        <div class="">
          <div>
            <h1>Welcome back {{$store.state.user.FirstName}}! </h1>
            <h6> choose date</h6>
            <datepicker v-model="picked"  :v-disabledDates="this.disabledDates" />
          </div>
          <div v-for="(obj, index) in theData" v-bind:key="index">
            for {{obj.date}}
          <div class="grid">
            <ParkingCard v-for="(obj, index) in obj.parkings" v-bind:key="index" :clickedFunc="onParkingClicked" :parkingId="obj.parkingId" :isAvalable="obj.isAvalable"/>
          </div>
          </div>
          <div class="spinner" v-if="IsSpinnerShow">
            <Spinner />
          </div>
      </div>
      </div>
    </div>
</section>
</template>

<script>
// @ is an alias to /src
import Spinner from '../components/spinner.vue'
import ParkingCard from '../components/parkingCard.vue'
import Datepicker from 'vue3-datepicker'
import store from "../store/";

export default {
  components:{Spinner, ParkingCard,Datepicker},
  data(){
      return {
          isLoggedIn: false,
          IsAllertShow: false,
          IsSpinnerShow: false,
          email: "",
          password: "",
          datepicker: '',
          theData:'',
          picked:new Date(),
          disabledDates: {}
      }
  },
  created() {
    this.getParkingsForToday();
    this.setDisabledDays();
  },
  methods: {
      getParkingsForToday() {
        this.theData = [
            {date:"24.05.16",
              parkings:[
                {parkingId:1, isAvalable: true},
                {parkingId:2, isAvalable: true},
                {parkingId:3, isAvalable: true},
                {parkingId:4, isAvalable: true},
                {parkingId:5, isAvalable: false},
              ]
            },
        ]
      },

    onParkingClicked(data, isSelected) {
          if(isSelected) {
            store.dispatch("addToParkingsToAdd", data);
          } else {
            store.dispatch("deleteFromParkingsToAdd", data);
          }
      },

    setDisabledDays() {
      let _newDate = this.picked.getDate() + 7;
      this.disabledDates = {
        from: this.picked,
        to: _newDate,
        daysOfMonth: "05"
      };
    },
  },
}
</script>
<style lang="scss">
    .parkings {
          .box-shadow{
            box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
            width: 100%;
          }
          .text-center {
            text-align: center;
            align-items: center;
          }
          .spinner {
            margin-top: 50px;
          }
          .grid{
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
            grid-gap: 2rem;
            min-height: 10px;
            margin: 40px;
          }
          .grid > div{
            background-color:lightgray;
            padding: 50px;
          }
          .grid > div ::before{
            content: "";
            display: block;
          }
    }

</style>
