import http from '@/plagens/Axios'
import { createStore } from 'vuex'
export default createStore({
  state: {
   me:{},
   supplier:[],
   client:[],
   group:[]
  },
  getters: {
    
  },
  mutations: {
    getMe(state, data){
    state.me = data
  },
   getSupplier(state, data){
    state.supplier = data
  },
  getClient(state, data){
    state.client = data
   },
   getGroup(state, data){
    state.group = data
   }
  },
  actions: {
   getMe({commit}){
    http.get('user/me').then(res=>{
      commit("getMe", res.data)
    })
   },
   getSupplier({commit}){
    http.get('warehouse/supplier/').then(res=>{
      commit("getSupplier", res.data.results)
    })
   },
   getClient({commit}){
    http.get('sales/client/').then(res => {
      commit("getClient", res.data.results)
    })
   },
  //  getGroup({commit}){
  //   http.get('warehouse/group/').then(res => {
  //     // commit("getGroup", res.data)
  //     console.log(res.data);
  //   })
  //  }
  },
  modules: {
   
  }
})
