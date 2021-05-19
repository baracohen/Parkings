<template>

<section class="container-fluid">
    <img class="login-img" src="../assets/semperis.png">
    <div class="row justify-content-center">
        <div class="col-sm col-lg-4">
            <div class="login-panel bg-white text-left">
                <div class="box-shadow login">
                    <div v-if="isAlertShow" class="alert alert-primary" role="alert">
                        Login succsessfully. <small> wait for redirect...</small>
                    </div>
                    <div class="title-wrapper">
                        <h1 class="display-3 font-weight-bold">Login</h1>
                        <p class="font-weight-bold">Welcome back</p>
                        <div v-if="IsSpinnerShow">
                            <Spinner />
                        </div>
                    </div>
                    <br>
                    <form actions="">
                        <div class="form-group">
                            <label class="input-label">Email</label>
                            <input v-model="email" type="email" class="form-control" placeholder="Email">
                        </div>
                        <div class="form-group">
                            <label class="input-label">Password</label>
                            <input v-model="password" type="password" class="form-control" placeholder="Password">
                        </div>
                        <br>
                        <div class="form-group d-flex justify-content-center">
                            <button class="btn btn-primary w-25" @click="login">Login</button>
                        </div>                                
                    </form>
                </div>
            </div>
        </div>
    </div>
</section>
</template>

<script>
// @ is an alias to /src
import Spinner from '../components/spinner.vue'
import store from "../store";
import parkingService from '../api/parkingService'
export default {
   components:{Spinner},
  data(){

      return {
  
          user:{
            isLoggedIn: false,
            IsAllertShow: false,
            IsSpinnerShow: false,
            email: "",
            password: "",
          }
      }
  },
    watch: {
        user(user) {
        localStorage.user = user;
        }
  },
  methods: {
     async login(event) {
        event.preventDefault()
        this.IsSpinnerShow = true

        let _user = await parkingService.login(this.email, this.password);
        if(_user != undefined) {
            let user= {
            userId:null,
            FirstName:"Barak",
            LastName:"",
            pic:"",
        }
            localStorage.user = user;
            store.dispatch("saveUser", user)

            this.redirect();
        }

      },

      redirect() {
          //this.$router.push({name:"/parkings"});
            this.IsSpinnerShow = false;
            this.$router.push({ path: '/' })
      }
  }

}
</script>

<style lang="scss" scoped>
    .login-panel{
        padding: 70px 0;
        position: relative;
        .box-shadow.login{
            box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
            width: 100%;
            padding: 40px;
        }
        .title-wrapper {
            align-items: center;
            text-align: center;
        }
        .alert{
            position: absolute;
            top:0;
            width: 100%;
            &.alert-primary{
                background-color: #007bff; 
                color: white;
                border:none;
                font-size: 18px;
            }
            
        }
        .error {
            background-color: red;
            color: white;
        }
    }
    .login-img {
        width: 150px;
        margin-top: 50px;
    }

</style>