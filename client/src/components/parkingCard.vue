<template>
  <div  v-on:click="parkingsClicked"  :class="'parkings-card-wrapper ' + ( prakingObj.isSelected ? ' isSelectedBorder ' : '') ">
    <span :class="prakingObj.isAvalable ? 'green-dot':'red-dot'"></span>
    <label class="number-parking">{{prakingObj.parkingId}}</label>
    <div :v-if="prakingObj.floorNumber">
      <span >floor {{prakingObj.floorNumber}}</span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import swal from 'sweetalert';

  export default defineComponent({
    props:["toDelete", "clickedFunc", "prakingObj"],
    data: () => ({
      isSelected: false
    }),

    methods: {
      parkingsClicked () {
        if(this.$props.prakingObj.isAvalable || this.$props.toDelete) {
          let user = localStorage.getItem("user");
          this.$props.prakingObj.userId = JSON.parse(user as string).userId ;
          this.$props.clickedFunc(this.$props.prakingObj);
        } else {
            swal("This Parking is not available", {
                    icon: "error",
                });
            }
      },
    },
    
  })
</script>

<style lang="scss" scoped>
.parkings-card-wrapper {
  position: relative;
  cursor: pointer;
}
  .green-dot {
  height: 25px;
  width: 25px;
  background-color: rgb(25, 255, 83);
  border-radius: 50%;
  display: inline-block;
   position: absolute;
    top: 10px;
    left: 10px;
  }
  .red-dot {
  height: 25px;
  width: 25px;
  background-color: rgb(255, 40, 2);
  border-radius: 50%;
  display: inline-block;
  position: absolute;
  top: 10px;
  left: 10px;
  }
  .isSelectedBorder {
    border: 2px solid greenyellow;
    opacity: 0.7;
  }
  .number-parking {
    font-size: 40px;
    font-weight: 400;
  }

</style>