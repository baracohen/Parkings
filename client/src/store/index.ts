import { ParkingModel, ParkingsObj } from '@/models/parkingsModel';
import UserModel from '@/models/userModel';
import { createStore, Store } from 'vuex'




export interface State {
    user: UserModel,
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
        parkingsToShow: [] as Array<ParkingModel>,
        parkings: [] as Array<ParkingModel>

    },
    getters:{},
    mutations:{
        saveUser(state, newVal) {
            state.user = newVal
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
        cleanParkingsToDelete(state) {
            state.parkingsToDelete =[];
        },
        setToParkingToShow(state, newVal: ParkingModel[] ) {
            state.parkingsToShow = newVal;
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
                        
    },
    modules: {}
})
export default store