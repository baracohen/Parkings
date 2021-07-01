<template>
  <div id="app">
    <router-view />
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
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: red;
}
</style>
