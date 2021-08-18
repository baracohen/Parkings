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
              <FilterButton :clickedFunc="allButtonFilter"  :buttonText= "'All'" :active="!isAllActive"></FilterButton>
            </div>
          <div class="spinner" v-if="IsSpinnerShow">
            <Spinner />
          </div>
            <div class="parking-view-wrapper" v-for="(obj, index) in getParkingToShow" :key="index">
              <div class="date-label-div">
                <label class="date-label">{{obj.date}}</label>
              </div>
              <div class="grid">
                <ParkingCard v-for="(obj, index) in obj.parkings" :prakingObj="obj" :key="index"/>
              </div>
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
import { mapGetters, mapMutations } from 'vuex';
import { defineComponent } from 'vue'

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
          isAllActive: false as boolean,
          isTest: true as boolean
          
      }
  },
  created() {
    this.getAvailableParkings(false);
    //this.setDisabledDays();
  },
  watch: {

    endDate: function () {
      this.getAvailableParkings(false);
    }
  }, 
  computed: {
     ...mapGetters([
       'getParkingToShow',
       'getUserId',
       'getAllParkings'
    ]),
  },
  methods: {
    ...mapMutations([
      'setToParkingToShow',
      'cleanParkingToShow',
      'setAllParkings'
    ]),

      async getAvailableParkings(isAll: boolean) {
        this.isAllActive = isAll;
        this.cleanParkingToShow();
        this.IsSpinnerShow = true;
        let range = commonUtils.getRangeDates(this.startDate, this.endDate);
        if(range && range.length > 0) {
            let newDateFormats = [] as any;
            range.forEach((obj) => {
            newDateFormats.push(commonUtils.saveDateFormat(obj));
          });
        
          
          let data = await parkingService.getAvailableParkings(newDateFormats);

          if(data && data.length > 0) {
            this.IsSpinnerShow = false;
            this.setAllParkings(data);

            if(isAll) {
              this.setToParkingToShow(this.getAllParkings);
              
            } else {

                this.setToParkingToShow(commonUtils.setAvailableParkings(data, this.getUserId)); 
            }

          } else {
            this.IsSpinnerShow = false;
          }
       }
      },

      allButtonFilter() {
        this.getAvailableParkings(true);
      },
  },
})

</script>
<style lang="scss">
    .parkings {
          .text-center {
            text-align: center;
            align-items: center;
          }
          .spinner {
            position: relative;
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
        .date-label {
          float: left;
          font-size: 20px;
          font-weight: 600;
        }
        .parking-view-wrapper {
            display: grid;
        }
    }
</style>
