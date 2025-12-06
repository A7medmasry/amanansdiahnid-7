// In main.js
import Vue from 'vue'
import VueScrollReveal from 'vue-scroll-reveal';

// Using ScrollReveal's default configuration
Vue.use(VueScrollReveal);

// OR specifying custom default options for all uses of the directive
Vue.use(VueScrollReveal, {
  class: 'v-scroll-reveal',
  origin: "bottom",
  duration: 1200,
  distance: "5rem",
});
