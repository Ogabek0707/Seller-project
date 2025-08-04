export default {
      path: '/financier',
      name: 'financier',
      component: () => {
            return import("@/views/financier/Financier.vue")
      },
      children: [
            {
                  path: '/income',
                  name: 'income',
                  component: () => {
                        return import("@/views/financier/Income.vue")
                  }, 
            },
            {
                  path: '/expence',
                  name: 'expence',
                  component: () => {
                        return import("@/views/financier/Expence.vue")
                  }, 
            }
      ]
}