<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <div class="container">
      {{parkigns.ParkingId}}
        <ul>
          <li>vdsvfdsv</li>
        </ul>
    </div>
  </div>
</template>

<script lang="ts">
import {ParkingModel} from '../models/parkingsModel';

export default {
  name: "ParkingsComp",
  data() { return {
    parkigns:{} as ParkingModel,
  }},

  //first function
  created() {
    console.log('Component has been created!');
  },

  methods: {
     
  }
};

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
