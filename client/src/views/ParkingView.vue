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
            <h1>Parking number {{parkingId}}! </h1>
          </div>
          <Date />
          <div class="spinner" v-if="IsSpinnerShow">
              <Spinner />
          </div>
      </div>
      </div>
    </div>
</section>
</template>

<script>
// @ is an alias to /src
import Date from "../components/date.vue";
import Spinner from '../components/spinner.vue'

export default {
  components:{Date,Spinner},
  props:[""],
  data(){
      return {
          parkingId: this.$route.params.parkingId
      }
  },
  methods: {
      getParkingData() {
        this.IsSpinnerShow = true;
      }

  },
}
</script>
<style lang="scss">
    .parkings {
        min-height: 100px !important;
          .box-shadow{
            box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
            width: 100%;
            padding-top: 100px;
          }
          .text-center {
            text-align: center;
            align-items: center;
          }
          .spinner {
            margin-top: 50px;
          }
          .grid{
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
            grid-gap: 2rem;
            min-height: 10px;
          }
          .grid > div{
            background-color:lightgray;
            padding: 50px;
          }
          .grid > div ::before{
            content: "";
            display: block;
          }
          .grid > div > label{
            align-items: center;
          }           
    }

</style>
