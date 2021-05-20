import {createStore} from 'vuex'

const store = createStore({
    state: {
        user: {
            userId:null,
            FirstName:"",
            LastName:"",
            pic:"",
        },
        parkingsToDelete:[{parkingId:undefined}],
        parkingsToAdd: [{parkingId:undefined}]
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
        addToParkingsToAdd(state, newVal) {
            state.parkingsToAdd.push(newVal)
        },
        deleteFromParkingsToDelete(state, newVal) {
            state.parkingsToDelete.forEach((element, index) => 
            {
                debugger;
                if(element && element.parkingId) {
                    if(element.parkingId === newVal.parkingId) {
                        state.parkingsToDelete.splice(index, 1);
                        return false;
                    }
                }
            });
            console.log(state.parkingsToDelete)

        }        
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
                        
    },
    modules: {}
})

export default store