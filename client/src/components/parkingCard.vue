<template>
  <div v-on:click="parkingsClicked" class="parkings-card-wrapper">
    <span :class="isAvalable ? 'green-dot':'red-dot'"></span>
    <label>{{parkingId}}</label>
  </div>
</template>

<script>

  export default {
    props:['parkingId', 'isAvalable'],
    data: () => ({
    }),

    methods: {
      parkingsClicked () {
        this.$router.push({  path: `/parkingView/${this.$props.parkingId}` })
      },
    },
    
  }
</script>

<style lang="scss" scoped>
.parkings-card-wrapper {
  position: relative;
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

</style>