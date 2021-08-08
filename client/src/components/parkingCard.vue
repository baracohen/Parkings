<template>
  <div  v-on:click="parkingsClicked"  :class="'parkings-card-wrapper' + ( prakingObj.isAvalable ? ' green' : 'red') ">
    <div class="card-data-wrapper">
      <span class="floor-number">{{prakingObj.floor}}d floor </span>
      <label class="number-parking">Spot {{prakingObj.parkingId}}</label>
    </div>

    <button class="book-btn">Book</button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import commonUtils from '../utils/commonUtils';


  export default defineComponent({
    props:["toDelete", "clickedFunc", "prakingObj"],

    methods: {
      parkingsClicked () {
        commonUtils.saveConnection(this.$props.prakingObj)
      },
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

</style>