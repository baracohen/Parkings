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
            <div>
              <img class="avatarImg" :src="$store.state.user.pic">
              <h1>Welcome {{$store.state.user.FirstName}}! </h1>
            </div>
            <h6> This is your Bookings</h6>
          </div>
          <div class="parking-view-wrapper" v-for="(obj, index) in $store.state.parkingsToShow" v-bind:key="index">
            <div class="date-label-div">
              <label class="date-label">for {{obj.date}}</label>
            </div>
            <div class="grid">
              <ParkingCard v-for="(obj, index) in obj.parkings" :prakingObj="obj" v-bind:key="index" :clickedFunc="onParkingClicked" :toDelete="true" />
            </div>
          </div>
          <div class="spinner" v-if="IsSpinnerShow">
            <Spinner />
          </div>
          <div class="save-delete-oreders">
            <button @click="showModal" class="btn btn-primary">Cancel parkings</button>
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
import swal from 'sweetalert';
import parkingService from '../api/parkingService'
import { ParkingModel, ParkingsObj } from '../models/parkingsModel';
import { mapMutations } from 'vuex';
import commonUtils from '../utils/commonUtils';
import { defineComponent } from 'vue'

export default defineComponent({
  components:{Spinner, ParkingCard},
  data(){
      return {
          theData:'',
          deleteMsg:'Are you sure you want to delete this bookings?',
          deleteTitle:'Are you sure',
          deleteIcon:'warning',
          IsSpinnerShow: false

      }
  },
  created() {
    this.cleanParkingsToDelete();
    this.getUserParkings();
  },
  methods: {
    ...mapMutations([
      'setToParkingToShow',
      'deleteFromParkingsToDelete',
      'addToParkingsToDelete',
      'cleanParkingsToDelete'
    ]),
      async getUserParkings() {

        let data = await parkingService.getUserParkings() as ParkingsObj[];
      debugger
       if(data && data.length > 0) {
            this.IsSpinnerShow = false;
            commonUtils.setIsSelectedFalse(data);
            this.setToParkingToShow(data)
          }
      },

       deleteItems() {

      },

      showModal() {
          swal({
          title: this.deleteTitle,
          text: this.deleteMsg,
          icon: "warning",
          buttons: ["Cancel", "Ok"],
          dangerMode: true,
            })
            .then((willDelete) => {
              if (willDelete) {
                  swal("Poof! Your booked parkings has been deleted!", {
                    icon: "success",
                });
              } else {
                swal("Ok, we didn't delete this items!");
              }
            });

      },
      onParkingClicked(data: ParkingModel) {

          if(!data.isSelected) {
          this.addToParkingsToDelete(data);

          } else {
            this.deleteFromParkingsToDelete(data)
          }
            data.isSelected = !data.isSelected;

      }
}
})
</script>
<style lang="scss">
    .avatarImg {
      width: 200px;
    }

    .date-label {
      float: left;
      font-size: 20px;
      font-weight: 600;
    }
    .date-label-div {
      margin-left: 40px;
      margin-top: 60px;
    }
    .parking-view-wrapper {
      display: grid;
    }

</style>
