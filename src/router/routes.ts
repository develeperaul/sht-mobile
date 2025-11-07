import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        name: 'home',
        component: () => import('pages/Home.vue'),
        meta: {
          // auth: true,
        },
      },

      { path: 'ui', component: () => import('pages/UI/IndexPage.vue') },
      {
        path: 'directions/:id',
        name: 'direction',
        component: () => import('pages/DirectionsCard.vue'),
        props: true,
        meta: {
          bg: true,
          // auth: true,
        },
      },
      {
        path: 'directions',
        name: 'directions',
        component: () => import('pages/Directions.vue'),
        meta: {
          // auth: true,
        },
      },
      {
        path: 'booking/:uuid',
        name: 'booking',
        component: () => import('pages/Booking.vue'),
        props: true,
        meta: {
          auth: true,
        },
      },
      {
        path: 'payment',
        name: 'payment',
        component: () => import('pages/Payment.vue'),
        meta: {
          auth: true,
        },
      },
      {
        path: 'profile',
        name: 'profile',
        component: () => import('pages/Profile/Index.vue'),
        meta: {
          auth: true,
        },
      },
      {
        path: 'profile/data',
        name: 'data',
        component: () => import('pages/Profile/Data.vue'),
        meta: {
          auth: true,
        },
      },
      {
        path: 'profile/mytravel',
        name: 'mytravel',
        component: () => import('pages/Profile/Mytravel.vue'),
        meta: {
          auth: true,
        },
      },

      {
        path: 'profile/mytravel/upcoming/:uuid',
        name: 'upcoming',
        component: () => import('pages/Profile/Upcoming.vue'),
        props: true,
        meta: {
          bg: true,
          auth: true,
        },
      },
      {
        path: 'profile/contacts',
        name: 'contacts',
        component: () => import('pages/Profile/Contacts.vue'),
        meta: {
          auth: true,
        },
      },
    ],
  },
  {
    path: '/',
    component: () => import('layouts/OtherLayout.vue'),
    children: [
      {
        path: 'auth',
        name: 'auth',
        component: () => import('pages/Auth/Choose.vue'),
      },
      {
        path: 'auth/reg',
        name: 'reg',
        component: () => import('pages/Auth/Reg.vue'),
      },
      {
        path: 'auth/login',
        name: 'login',
        component: () => import('pages/Auth/Login.vue'),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
]

export default routes
