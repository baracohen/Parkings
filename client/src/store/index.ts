import {createStore} from 'vuex'

const store = createStore({
    state: {
        user: {
            userId:null,
            FirstName:"",
            LastName:"",
            pic:"",
        }
    },
    getters:{},
    mutations:{
        saveUser(state, newVal) {
            state.user = newVal
        }
    },
    actions: {
        saveUser({commit}, user){
            commit('saveUser', user)
        }
    },
    modules: {}
})

export default store