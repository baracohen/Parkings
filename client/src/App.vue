<template>
  <div id="app">
    <div class="container">

    <div class="app-top-bar-wrapper row">
      <div class="col-md-3 col-sm-12 logo-wrapper">
        <img class="logo-img" src="./assets/appLogo.svg">
      </div>
        <div class="col-md-6 col-sm-12" id="nav">
          <router-link to="/">Home</router-link> |
          <router-link to="/parkings">Parkings</router-link>
        </div>
        <div class="avatar-wrapper col-md-3 col-sm-12">
          <img class="avatar-img" src="./assets/avatar.svg">
          <label>{{ $store.state.user.FirstName + ' ' +  $store.state.user.LastName}}</label>
        </div>
    </div>
      <router-view />


    </div>

  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { mapMutations } from 'vuex';

export default defineComponent({
  
created() {
  this.checkUserLogin()

},
methods: {
  ...mapMutations([
    'saveUser',
  ]),

  checkUserLogin() {
    const _user = localStorage.getItem('user');
      if(_user ) {
        this.saveUser(JSON.parse(_user))
      } else {
          this.$router.push({ path: '/Login' })
      }
    }
  }
})
</script>


<style>
body{
  background-color: #333333;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: white;
}

#nav {
  text-align: center;
  padding: 10px;
}

#nav a {
  font-weight: bold;
  color: white;
}

.router-link-active {
  display:inline-block;
  padding-bottom:3px;
  background: 
   linear-gradient(to left,  #ED4036, #EB008A);
  background-size:100% 2px;
  background-position:bottom 0 left 0,bottom 5px left 0;
  background-repeat:no-repeat;
}
.app-top-bar-wrapper {
  text-align: left;
  margin: 20px;
  display: flex;
  margin-bottom: 150px;
}
.logo-img {
  height: 30px;
  text-align: left;
}
.avatar-img {
  height: 30px;
  margin-right: 5px;
}
.avatar-wrapper {
  text-align: right;
}
.logo-wrapper {
  text-align: left;
}
</style>

