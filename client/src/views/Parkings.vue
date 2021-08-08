<template>
<section class="container text-center parkings">
        <div class="">
            <div class="row dates-wrapper">
              <div class="col-md-auto date-wrapper">
                <label>Select start date</label>
                <datepicker v-model="startDate"  />
              </div>
              <div class="col-md-auto date-wrapper">
                <label>Select end date</label>
                <datepicker :disabledDates="{dates:[disabledDates]}" v-model="endDate"   />
              </div>
            </div>
            <div class="filter-btns-wrapper">
              <FilterButton :clickedFunc="getAvailableParkings"  :buttonText= "`Free spots`"   :active="isAllActive"></FilterButton>
              <FilterButton :clickedFunc="getAllParkings"  :buttonText= "'All'" :active="!isAllActive"></FilterButton>
            </div>
          <div class="spinner" v-if="IsSpinnerShow">
            <Spinner />
          </div>
          <div class="parking-view-wrapper" v-for="(obj, index) in $store.state.parkingsToShow" v-bind:key="index">
            <div class="date-label-div">
              <label class="date-label">for {{obj.date}}</label>
            </div>
          <div class="grid">
            <ParkingCard v-for="(obj, index) in obj.parkings" :prakingObj="obj" v-bind:key="index"/>
          </div>
          </div>
          <div class="save-delete-oreders">
            <button @click="saveParkings" class="btn btn-primary">Save parkings</button>
          </div>
      </div>
</section>

</template>


<script lang="ts">
// @ is an alias to /src
import Spinner from '../components/spinner.vue'
import FilterButton from '../components/filterButton.vue'
import ParkingCard from '../components/parkingCard.vue'
import Datepicker from 'vue3-datepicker'
import parkingService from '../api/parkingService'
import commonUtils from '../utils/commonUtils'
import { mapMutations } from 'vuex';
import { defineComponent } from 'vue'
import { ParkingsObj } from '../models/parkingsModel'



export default defineComponent({
  components:{Spinner, ParkingCard,Datepicker, FilterButton},
  data(){
      return {
          disabledDates: {
            from: new Date(Date.now() + 12096e5), // Disable all dates after specific date
            days: [6, 5], // Disable Saturday's and Sunday's
          },
          IsSpinnerShow: false as boolean,
          startDate: new Date() as Date,
          endDate: new Date() as Date,
          isAllActive: false as boolean
      }
  },
  created() {
    this.cleanParkingsToAdd();
    this.getAvailableParkings(false);
    //this.setDisabledDays();
  },
  
  methods: {
    ...mapMutations([
      'setToParkingToShow',
      'deleteFromParkingsToAdd',
      'addToParkingsToAdd',
      'cleanParkingsToAdd'
    ]),
    
      async getTodayParkings(isAll: boolean) {
        this.IsSpinnerShow = true;
        let data= [] as ParkingsObj[];
        let date = commonUtils.saveDateFormat(new Date().toString());
            data = await parkingService.getTodayParkings([date], isAll);

        if(data && data.length > 0) {
          let _data=  [] ;
          _data.push(data.shift());

          if(_data && _data.length > 0 && _data[0] && _data[0].date ){
            let tempDate = new Date(_data[0].date );   
            _data[0].date = commonUtils.setDateFormat(tempDate);

            this.IsSpinnerShow = false;

            this.setToParkingToShow(_data)
          }
        }
      },

      async getAvailableParkings(isAll: boolean) {
        
        this.isAllActive = isAll;
        this.cleanParkingsToAdd();
        this.IsSpinnerShow = true;
        let _startDate = commonUtils.saveDateFormat(this.startDate.toString());
        let _endDate = commonUtils.saveDateFormat(this.endDate.toString());
        let range = commonUtils.getRangeDates(_startDate, _endDate);
       if(range && range.length > 0) {
           let newDateFormats = [] as any;
           range.forEach((obj) => {
           newDateFormats.push(commonUtils.saveDateFormat(obj));
        });
        
          
          let data = await parkingService.getAvailableParkings(newDateFormats, isAll);

          if(data && data.length > 0) {
            this.IsSpinnerShow = false;
            this.setToParkingToShow(data)
          }
       }
      },

      getAllParkings() {
        this.getAvailableParkings(true);
      },


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
          .grid > div ::before{
            content: "";
            display: block;
          }
          .dates-wrapper {
            display: flex;
            margin: 20px;
            position: relative;
          }
          .save-delete-oreders {
            margin: 40px;
          }
          .date-wrapper {
            text-align: left;
            font-size: 14px;
            margin-right: 15px;
            border-radius: 4px;
          }
          .v3dp__datepicker > input{
            height: 50px;
            background-color: transparent;
            color: white;
            border: 1px solid #6d6d6d;
            width: 265px;
            border-radius: 4px;
          };
          .filter-btns-wrapper {
            text-align: left;
            margin: 34px;
          }

    }
</style>
