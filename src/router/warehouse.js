export default {
      path: '/warehouseman',
      name: 'warehouseman',
      component: () => {
            return import("@/views/werehousmen/Werehousmen.vue")
      },
      children:[
          {
            path: '/products',
            name: 'products',
            component: () => {
                  return import("@/views/werehousmen/Products.vue")
            },
          },
          {
            path: '/profile',
            name: 'profile',
            component: () => {
                  return import("@/views/global/Profile.vue")
            },
           },
          {
            path: '/single_product/:id',
            name: 'single_product',
            meta:{
                  child: 'product_lists'
            },
            component: () => {
                  return import("@/views/werehousmen/SingleProduct.vue")
            },
           },
          {
            path: '/arrived',
            name: 'arrived',
            component: () => {
                  return import("@/views/werehousmen/Arrived.vue")
            },
           },
          {
            path: '/delivered',
            name: 'delivered',
            component: () => {
                  return import("@/views/werehousmen/Delivered.vue")
            },
           },
          {
            path: '/returned',
            name: 'returned',
            component: () => {
                  return import("@/views/werehousmen/Returned.vue")
            },
           },
          {
            path: '/suppliers',
            name: 'suppliers',
            component: () => {
                  return import("@/views/werehousmen/Suppliers.vue")
            },
           },
          {
            path: '/invoiceItem/:id',
            name: 'invoiceItem',
            component: () => {
                  return import("@/views/werehousmen/InvoiceItem.vue")
            },
           },
          {
            path: '/group-brand',
            name: 'group-brand',
            component: () => {
                  return import("@/views/werehousmen/GroupBrands.vue")
            },
           },
           {
            path: '/outputItem/:id',
            name: 'outputItem',
            component: () => {
                  return import("@/views/werehousmen/OutputInvoice.vue")
            },
           },
           {
            path: '/returnedItem/:id',
            name: 'returnedItem',
            component: () => {
                  return import("@/views/werehousmen/ReturnedInvoice.vue")
            },
           },
      ]
}