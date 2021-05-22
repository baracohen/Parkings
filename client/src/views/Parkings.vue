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
            <div class="row dates-wrapper">
              <div class="col-md-3 "></div>
              <div class="col-md-3 col-sm-12 start-date-wrapper">
                <span>Start date</span>
                <datepicker v-model="startDate"  />
              </div>
              <div class="col-md-3 col-sm-12 end-date-wrapper">
                <span>End date</span>
                <datepicker v-model="endDate"   />
              </div>
              <div class="col-md-3 "></div>
            </div>
          </div>
          <button class="btn btn-primary w-25" @click="getAvailableParkings">Go!</button>
          <div class="spinner" v-if="IsSpinnerShow">
            <Spinner />
          </div>
          <div class="parking-view-wrapper" v-for="(obj, index) in theData" v-bind:key="index">
            <div class="date-label-div">
              <label class="date-label">for {{obj.date}}</label>
            </div>
          <div class="grid">
            <ParkingCard v-for="(obj, index) in obj.parkings" :floorNumber="obj.floor" v-bind:key="index" :clickedFunc="onParkingClicked" :parkingId="obj.parkingId" :isAvalable="obj.isAvalable"/>
          </div>
          </div>
          <div class="save-delete-oreders">
            <button @click="saveParkings" class="btn btn-primary">Save parkings</button>
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
import parkingService from '../api/parkingService'
import commonUtils from '../utils/commonUtils'
import swal from 'sweetalert';

export default {
  components:{Spinner, ParkingCard,Datepicker},
  data(){
      return {
          IsSpinnerShow: false,
          theData:'',
          startDate:new Date(),
          endDate:new Date(),
          disabledDates: {}
      }
  },
  created() {
    store.dispatch("cleanParkingsToAdd");
    this.getTodayParkings();
    //this.setDisabledDays();

  },
  methods: {
      async getTodayParkings() {
        this.IsSpinnerShow = true;
        let data = await parkingService.getTodayParkings();

        if(data && data.length > 0) {
          let _data =[];
          _data.push(data.shift());
          let tempDate = new Date(_data[0].date);   
          _data[0].date = commonUtils.setDateFormat(tempDate);

          this.IsSpinnerShow = false;
          this.theData = _data;
        }
      },

      async getAvailableParkings() {
        this.IsSpinnerShow = true;
        let range = commonUtils.getRangeDates(this.startDate, this.endDate);

        if(range && range.length > 0) {
          let newDateFormats = [];
          range.forEach((obj) => {
            newDateFormats.push(commonUtils.setDateFormat(obj));
          });
          
          let data = await parkingService.getAvailableParkings(newDateFormats);

          if(data && data.length > 0) {
            this.IsSpinnerShow = false;
            this.theData = data;
          }
        }
      },

      saveParkings() {
           swal("Congrats! all the parkings are saved for you!", {
                    icon: "success",
            });
      },

    onParkingClicked(data, isSelected) {

          if(isSelected) {
            let isExist = this.$store.state.parkingsToAdd.filter((obj) => {return obj.userId == data.userId && obj.date == data.date});
            if(isExist && isExist.length > 0) {
              store.dispatch("deleteFromParkingsToAdd", isExist.shift());
            }
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
          .dates-wrapper {
            display: flex;
            margin: 50px;
            position: relative;
          }
          .parking-view-wrapper {
            border-bottom: 1px solid grey;
          }
    }
    .save-delete-oreders {
      margin: 40px;
    }

</style>
