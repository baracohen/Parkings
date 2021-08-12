<template>
  <div :disabled="isdisabled"  :class="'parkings-card-wrapper ' + ( prakingObj.isAvalable ? 'green' : 'red') ">
    <div class="card-data-wrapper">
      <span class="floor-number">{{prakingObj.floor}}d floor </span>
      <label class="number-parking">Spot {{prakingObj.parkingId}}</label>
    </div>
      <button  :disabled="isdisabled" v-on:click="functionClick" :class="'book-btn ' +  buttonClass ">{{buttonText}}</button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import commonUtils from '../utils/commonUtils';
import swal from "sweetalert";


  export default defineComponent({
    props:["toDelete", "clickedFunc", "prakingObj"],
    data(){
      return {
          isdisabled: false as boolean,
          buttonText: '' as string,
          isUserBooked: false as boolean,
          functionClick: false as any,
          buttonClass: '' as string
      }

    },
    created() {
        this.functionClick = this.saveConnection;

        if(!this.$props.prakingObj.isAvalable) {
          if(this.$props.prakingObj && (this.$props.prakingObj.userId == this.$store.state.user.userId)) {
            this.buttonText =  'Cancel';
            this.buttonClass =  'cancelBg';
            this.functionClick = this.cancelParking;
          }else {
            this.isdisabled = true
            this.buttonClass =  'disabled';
            this.buttonText =  'Book';
          }
        } else {
          this.buttonText =  'Book';
          this.isdisabled = commonUtils.checkIfUserBookedInThisDay(this.$store.state.parkingsToShow, this.$props.prakingObj.date, this.$store.state.user.userId) ;

          this.buttonClass = this.isdisabled ? 'disabled' : '';
        }
      

    },
    methods: {
      saveConnection () {
        commonUtils.saveConnection(this.$props.prakingObj);

      },
      async cancelParking() {
        const data = await commonUtils.cancelConnection(this.$props.prakingObj) as any;
        if(data && data.deletedCount != 0) {
         swal("Congrats! This parking spot was cancel, you can check another one", {
              icon: "success",
         })
        } else {
          swal("Someone went wrong, please refresh the page and try again", {
                icon: "error",
            });
          }

      }
    },
  })
</script>

<style lang="scss" scoped>
.parkings-card-wrapper {
  position: relative;
  cursor: pointer;
  background-color: #4A4A4A;
  padding: 10px;
  border-radius: 6px;
  display: inline-block;
  height: 120px;
}
  .green {
    border-left: 4px solid #68B82A;
  }
  .red {
    border-left: 4px solid #FF2020;
  }
  .number-parking {
    font-size: 32px;
    font-weight: 600;
  }
  .floor-label {
    font-size: 14px;
  }
  .card-data-wrapper {
    display: grid;
    float: left;
    text-align: left;
    margin-top: 10px;
  }
  .book-btn {
    padding: 5px 16px;
    background: #FBFCFF;
    float: right;
    color: #333333;
    border-radius: 6px;
    font-weight: 600;
    margin-top: 30px;
  }
  .disabled {
    background-color: #E2E8F0;
    color: #94A3B8;
  }

  .cancelBg {
    background-color: #FF2020;
    color: white;
  }

</style>