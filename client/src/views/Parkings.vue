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
          <div class="parking-view-wrapper" v-for="(obj, index) in $store.state.parkingsToShow" v-bind:key="index">
            <div class="date-label-div">
              <label class="date-label">for {{obj.date}}</label>
            </div>
          <div class="grid">
            <ParkingCard v-for="(obj, index) in obj.parkings" :prakingObj="obj" v-bind:key="index" :clickedFunc="onParkingClicked" />
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

<script lang="ts">
// @ is an alias to /src
import Spinner from '../components/spinner.vue'
import ParkingCard from '../components/parkingCard.vue'
import Datepicker from 'vue3-datepicker'
import parkingService from '../api/parkingService'
import commonUtils from '../utils/commonUtils'
import swal from 'sweetalert';
import { mapMutations } from 'vuex';
import { defineComponent } from 'vue'
import { ParkingModel, ParkingsObj, ParkingSpotModel } from '../models/parkingsModel'



export default defineComponent({
  components:{Spinner, ParkingCard,Datepicker},
  data(){
      return {
          IsSpinnerShow: false as boolean,
          startDate: new Date() as Date,
          endDate: new Date() as Date,
          disabledDates: {},
          
      }
  },
  created() {
    this.cleanParkingsToAdd();
    this.getTodayParkings();
    //this.setDisabledDays();
  },
  
  methods: {
    ...mapMutations([
      'setToParkingToShow',
      'deleteFromParkingsToAdd',
      'addToParkingsToAdd',
      'cleanParkingsToAdd'
    ]),
    
      async getTodayParkings() {
        this.IsSpinnerShow = true;
        let data= [] as ParkingsObj[];
            data = await parkingService.getTodayParkings();

        if(data && data.length > 0) {
          let _data=  [] ;
          _data.push(data.shift());

          if(_data && _data.length > 0 && _data[0] && _data[0].date ){
            let tempDate = new Date(_data[0].date );   
            _data[0].date = commonUtils.setDateFormat(tempDate);

            this.IsSpinnerShow = false;
            commonUtils.setIsSelectedFalse(_data[0]);

            this.setToParkingToShow(_data)
          }
        }
      },

      async getAvailableParkings() {
        this.cleanParkingsToAdd();
        this.IsSpinnerShow = true;
        let range = commonUtils.getRangeDates(this.startDate, this.endDate);

        if(range && range.length > 0) {
          let newDateFormats = [] as any;
          range.forEach((obj) => {
            newDateFormats.push(commonUtils.setDateFormat(obj));
          });
          
          let data = await parkingService.getAvailableParkings(newDateFormats);

          if(data && data.length > 0) {
            this.IsSpinnerShow = false;
            commonUtils.setIsSelectedFalse(data);
            this.setToParkingToShow(data)
          }
        }
      },

      async saveParkings() {
        let newArr = [] as Array<ParkingSpotModel>;

        this.$store.state.parkingsToAdd.forEach(element => {
          let obj= {} as ParkingSpotModel

          obj.parkingId = element.parkingId,
          obj.date = element.date,
          obj.floor = element.floor,
          obj.userId = this.$store.state.user.userId
          newArr.push(obj);
        });
          let data = await parkingService.saveParkings(newArr)
          if(data) {

           swal("Congrats! all the parkings are saved for you!", {
                icon: "success",
            });
          } else {
              swal("Someone has ordered some of the parkings, please refresh the page and try again", {
                icon: "error",
            });
          }

      },

    onParkingClicked(data: ParkingModel) {

          let isExist = this.$store.state.parkingsToAdd.filter((obj: ParkingModel) => {return obj.userId == data.userId && obj.date == data.date});
          let obj = this.$store.state.parkingsToShow.filter((obj: ParkingsObj) => {return obj.date === data.date});
          if(!data.isSelected) {
            if(isExist && isExist.length > 0 && obj && obj.length > 0) {
              obj[0].parkings.forEach( (obj: ParkingModel) => { 
                if(obj.isSelected) {
                   obj.isSelected = false; 
                }
              });
              this.deleteFromParkingsToAdd(isExist.shift())
            }
              data.isSelected = true;
              this.addToParkingsToAdd(data)
          } else {
              obj[0].parkings.forEach( (obj: ParkingModel) => { 
                if(obj.parkingId === isExist[0].parkingId) {
                   obj.isSelected = false; 
                }
              });
            this.deleteFromParkingsToAdd(data)
          }
      },

    // setDisabledDays() {
    //   let _newDate = this.picked.getDate() + 7;
    //   this.disabledDates = {
    //     from: this.picked,
    //     to: _newDate,
    //     daysOfMonth: "05"
    //   };
    // },
  },
})

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
