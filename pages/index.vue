<template>
  <div>
    <v-container>
      <div class="header">
        <h1>Compra y vende en República Dominicana</h1>
        <p>
          Vende, compra, alquila y publica tus productos y servicios en el sitio mas rápido y confiable
          de República Dominicana: celulares, inmuebles, vehículos, bicicletas, etc.
        </p>
      </div>
      <v-row>
        <v-col class="colE">
          <router-link to="/inmueebles-en-alquiler">
            <div class="card-ads card-ads--1">
              <div>
                <span>Inmueebles en alquiler</span>
              </div>
            </div>
          </router-link>
        </v-col>
        <v-col class="colE">
          <router-link to="/inmueebles-en-venta">
            <div class="card-ads card-ads--2">
              <div>
                <span>Inmueebles en venta</span>
              </div>
            </div>
          </router-link>
        </v-col>
        <v-col class="colE">
          <router-link to="/vehiculos">
            <div class="card-ads card-ads--3">
              <div>
                <span>Vehiculos</span>
              </div>
            </div>
          </router-link>
        </v-col>
        <v-col class="colE">
          <router-link to="/bebes-y-ninos">
            <div class="card-ads card-ads--4">
              <div>
                <span>Bebes y ninos</span>
              </div>
            </div>
          </router-link>
        </v-col>
        <v-col class="colE">
          <router-link to="/hogar">
            <div class="card-ads card-ads--5">
              <div>
                <span>Hogar</span>
              </div>
            </div>
          </router-link>
        </v-col>
        <v-col class="colE">
          <router-link to="/moda-y-belleza">
            <div class="card-ads card-ads--6">
              <div>
                <span>Moda y Belleza</span>
              </div>
            </div>
          </router-link>
        </v-col>
        <v-col class="colE">
          <router-link to="/deportes-y-entertenimiento">
            <div class="card-ads card-ads--7">
              <div>
                <span>Deportes y entertenimiento</span>
              </div>
            </div>
          </router-link>
        </v-col>
        <v-col class="colE">
          <router-link to="/electronica">
            <div class="card-ads card-ads--8">
              <div>
                <span>Electronica</span>
              </div>
            </div>
          </router-link>
        </v-col>
        <v-col class="colE">
          <router-link to="/negocios-y-servicios">
            <div class="card-ads card-ads--9">
              <div>
                <span>Negocios y servicios</span>
              </div>
            </div>
          </router-link>
        </v-col>
        <v-col class="colE">
          <router-link to="/animales-y-mascotas">
            <div class="card-ads card-ads--10">
              <div>
                <span>Animales y mascotas</span>
              </div>
            </div>
          </router-link>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
export default {
  data() {
    return {
      window: {
        width: 0
      }
    };
  },
  head() {
    return {
      title: "Compra y vende en República Dominicana",
      titleTemplate: "%s ← Klkrd!",
      meta: [
        {
          vmid: "description",
          name: "description",
          content:
            "Vende, compra, alquila y publica tus productos y servicios en el sitio mas rápido y confiable de República Dominicana: celulares, inmuebles, vehículos, bicicletas, etc."
        }
      ]
    };
  },
  mounted() {
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
    font-family: "Alatsi", sans-serif;
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
