import { ParkingModel, ParkingsObj, ParkingSpotModel } from '@/models/parkingsModel';
import UserModel from '@/models/userModel';
import state from 'sweetalert/typings/modules/state';
import { createStore, Store } from 'vuex'




export interface State {
    user: UserModel,
    ParkingSpot: ParkingSpotModel,
    parkingsToDelete: Array<ParkingModel> ,
    parkingsToAdd: Array<ParkingModel>,
    parkingsToShow: Array<ParkingsObj>,
    allParkings: Array<ParkingsObj>,
    parkings: Array<ParkingModel>
}

declare module "@vue/runtime-core" {
 // declare your own store states
 interface ComponentCustomProperties {
 $store: Store<State>;
 }
}


const store = createStore({
    state: {
        user: {} as UserModel,
        parkingsToDelete:[] as Array<ParkingModel> ,
        parkingsToAdd: [] as Array<ParkingModel>,
        parkingsToShow: [] as Array<ParkingsObj>,
        parkings: [] as Array<ParkingModel>,
        parkingSpot: {} as ParkingSpotModel,
        allParkings: [] as Array<ParkingsObj>,


    },
    getters:{
        getParkingToShow(state){
            return state.parkingsToShow
        },
        getUserId(state){
            return state.user.userId
        },
        getAllParkings(state){
            return state.allParkings
        },
        getParkingSpot(state){
            return state.parkingSpot
        },
        
    },
    mutations:{
        saveUser(state, newVal) {
            state.user = newVal
        },
        setParkingSpot(state, newVal) {
            state.parkingSpot = newVal
        },
        setAllParkings(state, newVal: ParkingsObj[] ) {
            state.allParkings = JSON.parse(JSON.stringify(newVal));
            
        },
        setToParkingToShow(state, newVal: ParkingsObj[] ) {
            state.parkingsToShow =  JSON.parse(JSON.stringify(newVal));
        },
        setParkingsToShowIndex(state, newVal) {
            if(newVal.index === 0) {
               state.parkingsToShow[newVal.index] =  newVal.data;
            } else {
                state.parkingsToShow.splice(newVal.index, newVal.index, newVal.data);
                const arr = [] as ParkingsObj[];
                state.parkingsToShow = arr.concat(state.parkingsToShow);
            }
            
        },

        cleanParkingToShow(state) {
            state.parkingsToShow = [];
        },
        cleanAllParkings(state) {
            state.allParkings = [];
        },
        cleanParkingSpot(state) {
            state.parkingSpot = {} as ParkingSpotModel;
        },

    },
    actions: {
        saveUser({commit}, user){
            commit('saveUser', user)
        },

        setToParkingToShow({commit}, obj){
            commit('setToParkingToShow', obj)
        },
        setParkingSpot({commit}, obj){
            commit('setParkingSpot', obj)
        },
        setParkingsToShowIndex({commit}, obj){
            commit('setParkingsToShowIndex', obj)
        },
        setAllParkings({commit}, obj){
            commit('setAllParkings', obj)
        },
        
    },
    modules: {}
})
export default store