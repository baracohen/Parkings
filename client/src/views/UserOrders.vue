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
                <datepicker v-model="endDate"   />
              </div>
            </div>
            <div class="filter-btns-wrapper">
              <FilterButton :clickedFunc="filterFunc"  :buttonText= "`This week`" :active="isNextWeekActive"></FilterButton>
              <FilterButton :clickedFunc="filterFunc"  :buttonText= "`Next week`" :active="!isNextWeekActive"></FilterButton>
            </div>
          <div class="user-bookings-wrapper" v-for="(obj, index) in $store.state.parkingsToShow" v-bind:key="index">
            <div class="date-label-div">
              <label class="date-label">{{obj.date}}</label>
            </div>
            <div class="grid">
              <ParkingCard v-for="(obj, index) in obj.parkings" :prakingObj="obj" :key="index"/>
            </div>
          </div>
          <div class="spinner" v-if="IsSpinnerShow">
            <Spinner />
          </div>
      </div>
</section>
</template>

<script lang="ts">
// @ is an alias to /src
import Spinner from '../components/spinner.vue'
import ParkingCard from '../components/parkingCard.vue'
import parkingService from '../api/parkingService'
import { ParkingsObj } from '../models/parkingsModel';
import { mapMutations } from 'vuex';
import { defineComponent } from 'vue'
import Datepicker from 'vue3-datepicker'
import commonUtils from '../utils/commonUtils';
import FilterButton from '../components/filterButton.vue'

export default defineComponent({
  components:{Spinner, ParkingCard, Datepicker, FilterButton},
  data(){
      return {
          theData:'',
          deleteMsg:'Are you sure you want to delete this bookings?',
          deleteTitle:'Are you sure',
          deleteIcon:'warning',
          IsSpinnerShow: false,
          startDate: new Date() as Date,
          endDate: new Date() as Date,
          isNextWeekActive: false as boolean,
      }
  },
  created() {
    this.endDate.setDate(this.endDate.getDate() + 7);
    this.getUserParkings();
  },
  watch: {
    endDate: function () {
      this.getUserParkings();
    }
  }, 
  methods: {
    ...mapMutations([
      'setToParkingToShow',
      'cleanParkingToShow',

    ]),
      async getUserParkings() {
        this.cleanParkingToShow();
        this.IsSpinnerShow = true
        let range = commonUtils.getRangeDates(this.startDate, this.endDate);
        if(range && range.length > 0) {
            let newDateFormats = [] as any;
            range.forEach((obj) => {
            newDateFormats.push(commonUtils.saveDateFormat(obj));
          });
          
          let data = await parkingService.getUserParkings(newDateFormats) as ParkingsObj[];
          if(data && data.length > 0) {
                this.IsSpinnerShow = false;
                this.setToParkingToShow(data)
            }
        }
      },

      filterFunc() {
        this.isNextWeekActive = !this.isNextWeekActive;
        this.endDate = new Date();
        if(this.isNextWeekActive) {
          this.endDate.setDate(this.endDate.getDate() + 14);

        } else {
          this.endDate.setDate(this.endDate.getDate() + 7);

        }
      },

}
})
</script>
<style lang="scss">

    .user-bookings-wrapper {
      display: inline-grid;
      float: left;

        .date-label {
          float: left;
          font-size: 16px;
        }
      .grid{
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
        grid-gap: 2rem;
        min-height: 10px;
        margin: 40px;
        width: 450px;
      }
    }

    .date-label-div {
      margin-left: 40px;
      margin-top: 60px;
    }


</style>
