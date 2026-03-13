import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        name: 'home',
        component: () => import('pages/Index.vue'),
      },

      {
        path: '/search',
        component: () => import('pages/Search/Index.vue'),
        children: [
          {
            path: '',
            name: 'search.index',
            component: () => import('pages/Search/Directions.vue'),
            meta: { type: 'directions' },
            props(to) {
              return {
                focusInput: to.query.focusInput === '1',
                showCalendar: to.query.showCalendar === '1',
              }
            },
          },
          {
            path: 'directions/:id',
            name: 'search.show-direction',
            component: () => import('pages/Search/ShowDirection.vue'),
            meta: { type: 'directions-children' },
          },
        ],
      },

      {
        path: '/promotions/:id',
        component: () => import('pages/Promotions/Show.vue'),
        name: 'promotions.show',
        props: true,
      },

      { path: 'ui', component: () => import('pages/UI/IndexPage.vue') },
      {
        path: 'directions-new/:id',
        name: 'directions.show',
        component: () => import('pages/Directions/Show.vue'),
        props: true,
      },
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
      {
        path: 'profile/docs',
        name: 'docs',
        component: () => import('pages/Profile/Docs/Index.vue'),
        meta: {
          auth: true,
        },
      },
      {
        path: 'profile/docs/policy',
        name: 'policy',
        component: () => import('pages/Profile/Docs/Policy.vue'),
        meta: {
          // auth: true,
        },
      },
      {
        path: 'profile/docs/sogl',
        name: 'sogl',
        component: () => import('pages/Profile/Docs/Sogl.vue'),
        meta: {
          // auth: true,
        },
      },
    ],
  },
  {
    path: '/',
    component: () => import('layouts/OtherLayout.vue'),
    meta: {
      guest: true,
    },
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
        path: 'auth/reg2',
        name: 'reg2',
        component: () => import('pages/Auth/Reg2.vue'),
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
