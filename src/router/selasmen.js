export default {
      path: '/salesman',
      name: 'salesman',
      component: () => {
            return import("@/views/selesman/Salesman.vue")
      },
      children:[
            {
                  path: '/salesmanNavbar',
                  name: 'salesmanNavbar',
                  meta: {
                        child: "form"
                  },
                  component: () => {
                        return import("@/views/selesman/SalesmanNavbar.vue")
                  },
            },
      ]
}