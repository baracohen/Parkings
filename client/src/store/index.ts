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
    },
    getters:{
        getParkingToShow(state){
            return state.parkingsToShow
        },
        getSpot(state){
            if(state.parkingsToShow && state.parkingsToShow.length > 0) {
                return state.parkingsToShow[0].parkings[0]

            } else {
                return "Test"
            }
        }
    },
    mutations:{
        saveUser(state, newVal) {
            state.user = newVal
        },
        setParkingSpot(state, newVal) {
            state.parkingSpot = newVal
        },
        setparkingsToShowIndex(state, newVal) {
                state.parkingsToShow.splice(newVal.index, newVal.index, newVal.data);
                const arr = [] as ParkingsObj[];
                state.parkingsToShow = arr.concat(state.parkingsToShow);
        },

        addToParkingsToDelete(state, newVal) {
            state.parkingsToDelete.push(newVal);
            console.log(state.parkingsToDelete)
        },
        addToParkingsToAdd(state, newVal: ParkingModel) {
            state.parkingsToAdd.push(newVal);
            console.log(state.parkingsToAdd);
        },
        deleteFromParkingsToDelete(state, newVal: ParkingModel) {
            state.parkingsToDelete.forEach((element, index) => 
            {
                if(element && element.parkingId) {
                    if(element.parkingId === newVal.parkingId && newVal.date === element.date) {
                        state.parkingsToDelete.splice(index, 1);
                        return false;
                    }
                }
            });

        },
        deleteFromParkingsToAdd(state, newVal: ParkingModel) {
            state.parkingsToAdd.forEach((element, index) => 
            {
                if(element && element.parkingId) {
                    if(element.parkingId === newVal.parkingId && newVal.date ===  element.date) {
                        state.parkingsToAdd.splice(index, 1);
                        return false;
                    }
                }
            });
        } ,
        cleanParkingsToAdd(state) {
            state.parkingsToAdd =[];
        },
        cleanParkingToShow(state) {
            state.parkingsToShow =[];
        },
        cleanParkingSpot(state) {
            state.parkingSpot = {} as ParkingSpotModel;
        },
        cleanParkingsToDelete(state) {
            state.parkingsToDelete =[];
        },
        setToParkingToShow(state, newVal: ParkingsObj[] ) {
            state.parkingsToShow =  JSON.parse(JSON.stringify(newVal));
        },
    },
    actions: {
        saveUser({commit}, user){
            commit('saveUser', user)
        },
        addToParkingsToDelete({commit}, obj){
            commit('addToParkingsToDelete', obj)
        },
        addToParkingsToAdd({commit}, obj){
            commit('addToParkingsToAdd', obj)
        },
        deleteFromParkingsToDelete({commit}, obj){
            commit('deleteFromParkingsToDelete', obj)
        },
        deleteFromParkingsToAdd({commit}, obj){
            commit('deleteFromParkingsToAdd', obj)
        },
        cleanParkingsToAdd({commit}, obj){
            commit('cleanParkingsToAdd')
        },
        cleanParkingsToDelete({commit}, obj){
            commit('cleanParkingsToDelete')
        },
        setToParkingToShow({commit}, obj){
            commit('setToParkingToShow', obj)
        },
        setParkingSpot({commit}, obj){
            commit('setParkingSpot', obj)
        },
        setparkingsToShowIndex({commit}, obj){
            commit('setparkingsToShowIndex', obj)
        },
        
        
                        
    },
    modules: {}
})
export default store