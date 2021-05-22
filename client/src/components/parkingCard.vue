<template>
  <div  v-on:click="parkingsClicked"  :class="'parkings-card-wrapper ' + ( isSelected ? ' isSelectedBorder ' : '') ">
    <span :class="isAvalable ? 'green-dot':'red-dot'"></span>
    <label class="number-parking">{{parkingId}}</label>
    <div :v-if="floorNumber">
      <span >floor {{floorNumber}}</span>
    </div>
  </div>
</template>

<script>
import swal from 'sweetalert';

  export default {
    props:['parkingId', 'isAvalable', "toDelete", "date", "clickedFunc", "floorNumber"],
    data: () => ({
      isSelected: false
    }),

    methods: {
      parkingsClicked () {
        if(this.$props.isAvalable || this.$props.toDelete) {
          let user = localStorage.getItem('user');
          let _data = {
            parkingId: this.$props.parkingId,
            userId: JSON.parse(user).userId,
            date: this.$props.date
          }
          this.isSelected= !this.isSelected;
          this.$props.clickedFunc(_data, this.isSelected);
        } else {
            swal("This Parking is not available", {
                    icon: "error",
                });
            }
      },
    },
    
  }
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