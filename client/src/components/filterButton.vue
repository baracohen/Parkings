<template>
    <label :class="`filter-btn` + ( !active ? ' active' : '')" @click="buttonClicked">{{ buttonText }}</label>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

  export default defineComponent({
    props:["active", "clickedFunc", 'buttonText'],

    methods: {
      buttonClicked () {
        this.$props.clickedFunc();
      },
    },
    
  })
</script>

<style lang="scss" scoped>
    .filter-btn {
      border-radius: 100px;
      padding: 4px 16px;
      height: 38px;
      font-size: 18px;
      font-weight: 700;
      color: white;
      background-color: transparent;
      border: 1px solid white;
      margin-right: 15px;
      cursor: pointer;
    }
    .filter-btn.active{
      background: linear-gradient(90deg, #ED4036 0%, #EB008A 100%);
      border:none;
    }

</style>