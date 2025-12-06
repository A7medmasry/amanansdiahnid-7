import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _0b642c99 = () => interopDefault(import('..\\pages\\admin.vue' /* webpackChunkName: "pages_admin" */))
const _79e59e26 = () => interopDefault(import('..\\pages\\animales-y-mascotas\\index.vue' /* webpackChunkName: "pages_animales-y-mascotas_index" */))
const _d15533d6 = () => interopDefault(import('..\\pages\\bebes-y-ninos\\index.vue' /* webpackChunkName: "pages_bebes-y-ninos_index" */))
const _18910129 = () => interopDefault(import('..\\pages\\deportes-y-entertenimiento\\index.vue' /* webpackChunkName: "pages_deportes-y-entertenimiento_index" */))
const _56841373 = () => interopDefault(import('..\\pages\\electronica\\index.vue' /* webpackChunkName: "pages_electronica_index" */))
const _4e9ec367 = () => interopDefault(import('..\\pages\\hogar\\index.vue' /* webpackChunkName: "pages_hogar_index" */))
const _3d2f8d61 = () => interopDefault(import('..\\pages\\inmueebles-en-alquiler\\index.vue' /* webpackChunkName: "pages_inmueebles-en-alquiler_index" */))
const _36632fe8 = () => interopDefault(import('..\\pages\\inmueebles-en-venta\\index.vue' /* webpackChunkName: "pages_inmueebles-en-venta_index" */))
const _a33c1756 = () => interopDefault(import('..\\pages\\moda-y-belleza\\index.vue' /* webpackChunkName: "pages_moda-y-belleza_index" */))
const _043d4a17 = () => interopDefault(import('..\\pages\\negocios-y-servicios\\index.vue' /* webpackChunkName: "pages_negocios-y-servicios_index" */))
const _29993173 = () => interopDefault(import('..\\pages\\profile.vue' /* webpackChunkName: "pages_profile" */))
const _df70dce8 = () => interopDefault(import('..\\pages\\publicar-anuncio\\index.vue' /* webpackChunkName: "pages_publicar-anuncio_index" */))
const _5d701c49 = () => interopDefault(import('..\\pages\\register.vue' /* webpackChunkName: "pages_register" */))
const _2c59ad02 = () => interopDefault(import('..\\pages\\reset-password.vue' /* webpackChunkName: "pages_reset-password" */))
const _f7fab602 = () => interopDefault(import('..\\pages\\sign-in.vue' /* webpackChunkName: "pages_sign-in" */))
const _1fbeb10a = () => interopDefault(import('..\\pages\\vehiculos\\index.vue' /* webpackChunkName: "pages_vehiculos_index" */))
const _2270f20e = () => interopDefault(import('..\\pages\\animales-y-mascotas\\_id.vue' /* webpackChunkName: "pages_animales-y-mascotas__id" */))
const _57bfe9bd = () => interopDefault(import('..\\pages\\bebes-y-ninos\\_id.vue' /* webpackChunkName: "pages_bebes-y-ninos__id" */))
const _e0e18c5e = () => interopDefault(import('..\\pages\\deportes-y-entertenimiento\\_id.vue' /* webpackChunkName: "pages_deportes-y-entertenimiento__id" */))
const _fa5352ca = () => interopDefault(import('..\\pages\\electronica\\_id.vue' /* webpackChunkName: "pages_electronica__id" */))
const _e3f718e2 = () => interopDefault(import('..\\pages\\hogar\\_id.vue' /* webpackChunkName: "pages_hogar__id" */))
const _575917ee = () => interopDefault(import('..\\pages\\inmueebles-en-alquiler\\_id.vue' /* webpackChunkName: "pages_inmueebles-en-alquiler__id" */))
const _294c0c50 = () => interopDefault(import('..\\pages\\inmueebles-en-venta\\_id.vue' /* webpackChunkName: "pages_inmueebles-en-venta__id" */))
const _591b07fd = () => interopDefault(import('..\\pages\\moda-y-belleza\\_id.vue' /* webpackChunkName: "pages_moda-y-belleza__id" */))
const _7df4e63f = () => interopDefault(import('..\\pages\\negocios-y-servicios\\_id.vue' /* webpackChunkName: "pages_negocios-y-servicios__id" */))
const _be5a83d0 = () => interopDefault(import('..\\pages\\publicar-anuncio\\_add.vue' /* webpackChunkName: "pages_publicar-anuncio__add" */))
const _3688126e = () => interopDefault(import('..\\pages\\user\\_user.vue' /* webpackChunkName: "pages_user__user" */))
const _28796df2 = () => interopDefault(import('..\\pages\\vehiculos\\_id.vue' /* webpackChunkName: "pages_vehiculos__id" */))
const _4c164ec8 = () => interopDefault(import('..\\pages\\index.vue' /* webpackChunkName: "pages_index" */))

// TODO: remove in Nuxt 3
const emptyFn = () => {}
const originalPush = Router.prototype.push
Router.prototype.push = function push (location, onComplete = emptyFn, onAbort) {
  return originalPush.call(this, location, onComplete, onAbort)
}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: decodeURI('/'),
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/admin",
    component: _0b642c99,
    name: "admin"
  }, {
    path: "/animales-y-mascotas",
    component: _79e59e26,
    name: "animales-y-mascotas"
  }, {
    path: "/bebes-y-ninos",
    component: _d15533d6,
    name: "bebes-y-ninos"
  }, {
    path: "/deportes-y-entertenimiento",
    component: _18910129,
    name: "deportes-y-entertenimiento"
  }, {
    path: "/electronica",
    component: _56841373,
    name: "electronica"
  }, {
    path: "/hogar",
    component: _4e9ec367,
    name: "hogar"
  }, {
    path: "/inmueebles-en-alquiler",
    component: _3d2f8d61,
    name: "inmueebles-en-alquiler"
  }, {
    path: "/inmueebles-en-venta",
    component: _36632fe8,
    name: "inmueebles-en-venta"
  }, {
    path: "/moda-y-belleza",
    component: _a33c1756,
    name: "moda-y-belleza"
  }, {
    path: "/negocios-y-servicios",
    component: _043d4a17,
    name: "negocios-y-servicios"
  }, {
    path: "/profile",
    component: _29993173,
    name: "profile"
  }, {
    path: "/publicar-anuncio",
    component: _df70dce8,
    name: "publicar-anuncio"
  }, {
    path: "/register",
    component: _5d701c49,
    name: "register"
  }, {
    path: "/reset-password",
    component: _2c59ad02,
    name: "reset-password"
  }, {
    path: "/sign-in",
    component: _f7fab602,
    name: "sign-in"
  }, {
    path: "/vehiculos",
    component: _1fbeb10a,
    name: "vehiculos"
  }, {
    path: "/animales-y-mascotas/:id?",
    component: _2270f20e,
    name: "animales-y-mascotas-id"
  }, {
    path: "/bebes-y-ninos/:id?",
    component: _57bfe9bd,
    name: "bebes-y-ninos-id"
  }, {
    path: "/deportes-y-entertenimiento/:id?",
    component: _e0e18c5e,
    name: "deportes-y-entertenimiento-id"
  }, {
    path: "/electronica/:id",
    component: _fa5352ca,
    name: "electronica-id"
  }, {
    path: "/hogar/:id",
    component: _e3f718e2,
    name: "hogar-id"
  }, {
    path: "/inmueebles-en-alquiler/:id?",
    component: _575917ee,
    name: "inmueebles-en-alquiler-id"
  }, {
    path: "/inmueebles-en-venta/:id?",
    component: _294c0c50,
    name: "inmueebles-en-venta-id"
  }, {
    path: "/moda-y-belleza/:id?",
    component: _591b07fd,
    name: "moda-y-belleza-id"
  }, {
    path: "/negocios-y-servicios/:id?",
    component: _7df4e63f,
    name: "negocios-y-servicios-id"
  }, {
    path: "/publicar-anuncio/:add?",
    component: _be5a83d0,
    name: "publicar-anuncio-add"
  }, {
    path: "/user/:user?",
    component: _3688126e,
    name: "user-user"
  }, {
    path: "/vehiculos/:id",
    component: _28796df2,
    name: "vehiculos-id"
  }, {
    path: "/",
    component: _4c164ec8,
    name: "index"
  }],

  fallback: false
}

export function createRouter () {
  return new Router(routerOptions)
}
