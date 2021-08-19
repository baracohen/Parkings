<template>
  <div :disabled="isdisabled"  :class="'parkings-card-wrapper ' + ( prakingObj.isAvailable ? 'green' : 'red') ">
    <div class="card-data-wrapper">
      <span class="floor-number">{{prakingObj.floor}}d floor </span>
      <label class="number-parking">Spot {{prakingObj.parkingId}}</label>
    </div>
      <button  :disabled="spotState.isdisabled" v-on:click="functionClick" :class="'book-btn ' +  spotState.buttonClass ">{{spotState.buttonText}}</button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import commonUtils from '../utils/commonUtils';

import { mapMutations } from 'vuex';


  export default defineComponent({
    props:["toDelete", "clickedFunc", "prakingObj"],
    data(){
      return {
          isdisabled: false as boolean,
          buttonText: '' as string,
          isUserBooked: false as boolean,
          buttonClass: '' as string,
          index: -1 as number
      }

    },
    created() {

     // this.init()

    },
    computed: {

      spotState() {
        let book = false;
        let buttonText = "Book";
        let buttonClass = "";
        let isdisabled = false;
        if(!this.$props.prakingObj.isAvailable) {
          if(this.$props.prakingObj && (this.$props.prakingObj.userId == this.$store.state.user.userId)) {
            buttonText =  'Cancel';
            buttonClass =  'cancelBg';
            book = true;
//            this.functionClick = this.cancelParking;
          }else {
            isdisabled = true
            buttonClass =  'disabled';
            buttonText =  'Book';
          }
        } else {
          buttonText =  'Book';
          isdisabled = commonUtils.checkIfUserBookedInThisDay(this.$store.state.parkingsToShow, this.$props.prakingObj.date, this.$store.state.user.userId) ;

          buttonClass = isdisabled ? 'disabled' : '';
        }
        return {
          isdisabled,
          buttonText,
          buttonClass,
          book,

        }
      }
    },
    methods: {

      ...mapMutations([
        'cleanParkingSpot',
        'setParkingsToShowIndex',
      ]),

      functionClick() {
        this.spotState.book ?  this.cancelParking() : this.saveConnection();
      },

      async saveConnection () {
        const data = await commonUtils.saveConnection(this.$props.prakingObj) as any;
        if(data && data.userId != undefined) {
            this.reRender(false);
            commonUtils.showSucssesModal('Congrats! Your parkings spot has been saved !', false)
          } else {
            commonUtils.showErrorModal('Someone went wrong, please refresh the page and try again')
          }
      },

      reRender (Available: boolean) {

        this.$store.state.parkingsToShow.forEach((element, i) => {

          if(element.date == this.$props.prakingObj.date) {
            this.index = i

             element.parkings.forEach(obj => {if(obj.parkingId == this.$props.prakingObj.parkingId) {
                obj.userId = Available ? undefined : this.$store.state.user.userId;
                obj.isAvailable = Available;

             }});

             let obj = {
                index: this.index,
                data: element
             }
            this.setParkingsToShowIndex(obj)
            
          }
          
        });
      },

      async cancelParking() {
        const data = await commonUtils.cancelConnection(this.$props.prakingObj) as any;
        if(data && data.deletedCount > 0) {
          this.cleanParkingSpot();
          this.reRender(true);
          commonUtils.showSucssesModalWithoutTimer('Your parkings spot has been canceled !', true)
        } else {
          commonUtils.showErrorModal('Someone went wrong, please refresh the page and try again')
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