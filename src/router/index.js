import { createRouter, createWebHistory } from 'vue-router'
import auth from './auth'
import warehouse from './warehouse'
import director from './director'
import financier from './financier'
import selasmen from './selasmen'
const routes = [
  auth,
  warehouse,
  director,
  financier,
  selasmen
]
const router = createRouter({
  history: createWebHistory(),
  routes
})
router.beforeEach((to,from,next)=>{
  const token = localStorage.getItem("token")
  const role = localStorage.getItem("role")
  const name = to.name === "login"
  if(!token && !name){
    if(role === 'warehouseman'){
      return next({name: 'products'})
    }else if(role === 'salesman'){
      return next({name: 'clients'})
    }else if(role === 'director'){
      return next({name: 'products'})
    }else if(role === 'financier'){
      return next({name: 'income'})
    }
  }else{
    next()
  }
})
export default router
