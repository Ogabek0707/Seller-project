export default {
      path: '/director',
      name: 'director',
      component: () => {
            return import("@/views/director/Director.vue")
      },
      children: [
            {
                  path: '/dashboard',
                  name: 'dashboard',
                  component: () => {
                        return import("@/views/director/Dashboard.vue")
                  }, 
            },
            {
                  path: '/dashboard_demo',
                  name: 'dashboardDemo',
                  component: () => {
                        return import("@/views/director/DashboardDemo.vue")
                  }, 
            },
            {
                  path: '/incomeD',
                  name: 'incomeD',
                  component: () => {
                        return import("@/views/financier/Income.vue")
                  }, 
            },
            {
                  path: '/expenceD',
                  name: 'expenceD',
                  component: () => {
                        return import("@/views/financier/Expence.vue")
                  }, 
            },
            {
                  path: '/productsD',
                  name: 'productsD',
                  component: () => {
                        return import("@/views/werehousmen/Products.vue")
                  },
                },
                {
                  path: '/arrivedD',
                  name: 'arrivedD',
                  component: () => {
                        return import("@/views/werehousmen/Arrived.vue")
                  },
                 },
                {
                  path: '/deliveredD',
                  name: 'deliveredD',
                  component: () => {
                        return import("@/views/werehousmen/Delivered.vue")
                  },
                 },
                {
                  path: '/returnedD',
                  name: 'returnedD',
                  component: () => {
                        return import("@/views/werehousmen/Returned.vue")
                  },
                 },
                {
                  path: '/suppliersD',
                  name: 'suppliersD',
                  component: () => {
                        return import("@/views/werehousmen/Suppliers.vue")
                  },
                 },
                 {
                  path: '/salesmanNavbarD',
                  name: 'salesmanNavbarD',
                  component: () => {
                        return import("@/views/selesman/SalesmanNavbar.vue")
                  },
            },
      ]
}