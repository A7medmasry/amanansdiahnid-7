<template>
  <div>
    <div class="lottie" :style="{ transform: `translate(0, ${loading}%)` }">
      <div class="content">
        <img src="../static/logo.png" alt="logo" />
        <div class="box-logo"></div>
      </div>
      <!-- <div class="lds-ellipsis">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>-->
    </div>
    <v-container>
      <div class="header" v-scroll-reveal.reset>
        <h1>Compra y vende en República Dominicana</h1>
        <p>Publica tus anuncios de productos y servicios en el portal de clasificados más relevante de República Dominicana: celulares, inmuebles, vehículos, bicicletas, etc</p>
      </div>
      <v-row>
        <v-col class="colE" v-scroll-reveal.reset>
          <nuxt-link to="inmueebles-en-alquiler">
            <div class="card-ads card-ads--1">
              <div>
                <span>Inmuebles en alquiler</span>
              </div>
            </div>
          </nuxt-link>
        </v-col>
        <v-col class="colE" v-scroll-reveal.reset="{ delay: 250 }">
          <nuxt-link to="inmueebles-en-venta">
            <div class="card-ads card-ads--2">
              <div>
                <span>Inmuebles en venta</span>
              </div>
            </div>
          </nuxt-link>
        </v-col>
        <v-col class="colE" v-scroll-reveal.reset="{ delay: 500 }">
          <nuxt-link to="vehiculos">
            <div class="card-ads card-ads--3">
              <div>
                <span>Vehiculo</span>
              </div>
            </div>
          </nuxt-link>
        </v-col>
        <v-col class="colE" v-scroll-reveal.reset="{ delay: 750 }">
          <nuxt-link to="bebes-y-ninos">
            <div class="card-ads card-ads--4">
              <div>
                <span>Bebes y niños</span>
              </div>
            </div>
          </nuxt-link>
        </v-col>
        <v-col class="colE" v-scroll-reveal.reset="{ delay: 1000 }">
          <nuxt-link to="hogar">
            <div class="card-ads card-ads--5">
              <div>
                <span>Hogar</span>
              </div>
            </div>
          </nuxt-link>
        </v-col>
        <v-col class="colE" v-scroll-reveal.reset="{ delay: 1250 }">
          <nuxt-link to="moda-y-belleza">
            <div class="card-ads card-ads--6">
              <div>
                <span>Moda y belleza</span>
              </div>
            </div>
          </nuxt-link>
        </v-col>
        <v-col class="colE" v-scroll-reveal.reset>
          <nuxt-link to="deportes-y-entertenimiento">
            <div class="card-ads card-ads--7">
              <div>
                <span>Deportes y entretenimiento</span>
              </div>
            </div>
          </nuxt-link>
        </v-col>
        <v-col class="colE" v-scroll-reveal.reset="{ delay: 250 }">
          <nuxt-link to="electronica">
            <div class="card-ads card-ads--8">
              <div>
                <span>Electrónica</span>
              </div>
            </div>
          </nuxt-link>
        </v-col>
        <v-col class="colE" v-scroll-reveal.reset="{ delay: 500 }">
          <nuxt-link to="negocios-y-servicios">
            <div class="card-ads card-ads--9">
              <div>
                <span>Negocios y servicios</span>
              </div>
            </div>
          </nuxt-link>
        </v-col>
        <v-col class="colE" v-scroll-reveal.reset="{ delay: 750 }">
          <nuxt-link to="animales-y-mascotas">
            <div class="card-ads card-ads--10">
              <div>
                <span>Animales y mascotas</span>
              </div>
            </div>
          </nuxt-link>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
export default {
  data() {
    return {
      loading: 0,
      window: {
        width: 0
      }
    };
  },
  head() {
    return {
      base: process.env.BASE_URL,
      title: "Compra y vende en República Dominicana",
      titleTemplate: "%s ← Klkrd!",
      meta: [
        {
          vmid: "description",
          name: "description",
          content:
            "Publica tus anuncios de productos y servicios en el portal de clasificados más relevante de República Dominicana: celulares, inmuebles, vehículos, bicicletas, etc."
        }
      ]
    };
  },
  mounted() {
    var that = this;
    setTimeout(() => {
      for (let index = 0; index <= 100; index++) {
        that.loading = index;
      }
    }, 2000);
    this.$nextTick(function() {
      window.addEventListener("resize", this.getWindowWidth);
      this.getWindowWidth();
    });
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.getWindowWidth);
  },
  methods: {
    getWindowWidth() {
      this.window.width = document.documentElement.clientWidth;
    }
  }
};
</script>
<style lang="scss">
.lottie {
  background: #000;
  position: fixed;
  top: 0px;
  right: 0px;
  left: 0;
  bottom: 0;
  overflow: hidden;
  z-index: 2000;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 360ms ease-in-out;
  .content {
    position: relative;
    .box-logo {
      top: 0;
      position: absolute;
      height: 80px;
      width: 42px;
      background-color: #000;
      animation: logo 1200ms infinite;
    }
    img {
      width: 250px;
    }
    @keyframes logo {
      0% {
        transform: translate(210px);
      }
      50% {
        transform: translate(0);
      }
      100% {
        transform: translate(210px);
      }
    }
  }
}
@media only screen and (max-width: 770px) {
  .header {
    h1 {
      font-size: 15px;
    }
    p {
      max-width: 400px !important;
      font-size: 10px;
      padding: 10px 30px 20px 30px !important;
    }
  }
}
.header {
  font-family: "Quicksand", sans-serif;
  text-align: center;
  p {
    max-width: 600px;
    margin: auto;
    padding: 10px 5px 30px 5px;
  }
}
.colE {
  flex-basis: auto !important;
  width: 380px;
}
.cate {
  font-size: 12px;
  font-style: italic;
  padding: 10px;
  color: #fff;
}
.v-responsive {
  height: 170px;
}
.space {
  padding: 0 100px !important;
}
.card-ads {
  background-size: cover;
  max-width: 380px;
  height: 200px;
  text-align: right;
  margin: auto;
  border-radius: 2px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  opacity: 0.9;
  transition: 1s;
  text-align: center;
  div {
    color: #fff;
    opacity: 1 !important;
    span {
      background-color: rgba(25, 118, 210, 0.5);
      padding: 20px;
      border-radius: 0px 50px;
      transition: 1s;
    }
    padding: 80px 0;
    font-weight: 400;
    font-size: 20px;
    font-family: "Quicksand", sans-serif;
  }
}
.card-ads:hover {
  box-shadow: 0 4px 8px 0 #1976d2, 0 6px 20px 0 #1976d2;
  opacity: 1;
  span {
    background-color: rgba(25, 118, 210, 0.8);
  }
}
.card-ads--1 {
  background-image: url("../static/panoramic-view-of-the-city-2305747-min.jpg");
}
.card-ads--2 {
  background-image: url("../static/stairs-home-loft-lifestyle-2459-min.jpg");
}
.card-ads--3 {
  background-image: url("../static/mercedes-benz-parked-in-a-row-164634-min.jpg");
}
.card-ads--4 {
  background-image: url("../static/close-up-of-woman-working-256468-min.jpg");
}
.card-ads--5 {
  background-image: url("../static/brown-wooden-center-table-584399-min.jpg");
}
.card-ads--6 {
  background-image: url("../static/assorted-cloth-lot-1336873-min.jpg");
}
.card-ads--7 {
  background-image: url("../static/athlete-bike-black-and-white-cycle-260409-min.jpg");
}
.card-ads--8 {
  background-image: url("../static/apple-coffee-computer-desk-356056-min.jpg");
}
.card-ads--9 {
  background-image: url("../static/build-builder-construction-equipment-585419-min.jpg");
}
.card-ads--10 {
  background-image: url("../static/orange-tabby-cat-beside-fawn-short-coated-puppy-46024-min.jpg");
}
</style>
