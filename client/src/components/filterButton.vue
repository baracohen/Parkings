<template>
    <label :class="`filter-btn` + ( !active ? ' active' : '')" @click="buttonClicked">{{ buttonText }}</label>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

  export default defineComponent({
    props:["active", "clickedFunc", 'buttonText'],

    methods: {
      buttonClicked () {
        debugger;
        this.$props.clickedFunc();
      },
    },
    
  })
</script>

<style lang="scss" scoped>
    .filter-btn {
      border-radius: 100px;
      padding: 4px 16px;
      height: 32px;
      font-size: 14px;
      font-weight: 700;
      color: white;
      background-color: transparent;
      border: 1px solid white;
      margin-right: 10px;
      cursor: pointer;
    }
    .filter-btn.active{
      background: linear-gradient(90deg, #ED4036 0%, #EB008A 100%);
      border:none;
    }

</style>