<template>
  <div>
    <div class="lottie" :style="{ transform: `translate(0, ${loading}%)` }">
      <div class="lds-ellipsis">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
    <div class="header">
      <h1>Publica tus anuncios gratis</h1>
      <p style="font-size: 20px">Seleccionar categoria</p>
    </div>

    <v-container>
      <v-row>
        <v-col class="colE">
          <nuxt-link to="/publicar-anuncio/inmueebles-en-alquiler">
            <div class="card-ads-publicar card-ads-publicar--1">
              <div>
                <span>Inmueebles en alquiler</span>
              </div>
            </div>
          </nuxt-link>
        </v-col>

        <v-col class="colE">
          <nuxt-link to="/publicar-anuncio/inmueebles-en-venta">
            <div class="card-ads-publicar card-ads-publicar--2">
              <div>
                <span>Inmueebles en venta</span>
              </div>
            </div>
          </nuxt-link>
        </v-col>

        <v-col class="colE">
          <nuxt-link to="/publicar-anuncio/vehiculos">
            <div class="card-ads-publicar card-ads-publicar--3">
              <div>
                <span>Vehiculos</span>
              </div>
            </div>
          </nuxt-link>
        </v-col>

        <v-col class="colE">
          <nuxt-link to="/publicar-anuncio/bebes-y-ninos">
            <div class="card-ads-publicar card-ads-publicar--4">
              <div>
                <span>Bebes y ninos</span>
              </div>
            </div>
          </nuxt-link>
        </v-col>

        <v-col class="colE">
          <nuxt-link to="/publicar-anuncio/hogar">
            <div class="card-ads-publicar card-ads-publicar--5">
              <div>
                <span>Hogar</span>
              </div>
            </div>
          </nuxt-link>
        </v-col>

        <v-col class="colE">
          <nuxt-link to="/publicar-anuncio/moda-y-belleza">
            <div class="card-ads-publicar card-ads-publicar--6">
              <div>
                <span>Moda y Belleza</span>
              </div>
            </div>
          </nuxt-link>
        </v-col>

        <v-col class="colE">
          <nuxt-link to="/publicar-anuncio/deportes-y-entertenimiento">
            <div class="card-ads-publicar card-ads-publicar--7">
              <div>
                <span>Deportes y entertenimiento</span>
              </div>
            </div>
          </nuxt-link>
        </v-col>

        <v-col class="colE">
          <nuxt-link to="/publicar-anuncio/electronica">
            <div class="card-ads-publicar card-ads-publicar--8">
              <div>
                <span>Electronica</span>
              </div>
            </div>
          </nuxt-link>
        </v-col>

        <v-col class="colE">
          <nuxt-link to="/publicar-anuncio/negocios-y-servicios">
            <div class="card-ads-publicar card-ads-publicar--9">
              <div>
                <span>Negocios y servicios</span>
              </div>
            </div>
          </nuxt-link>
        </v-col>

        <v-col class="colE">
          <nuxt-link to="/publicar-anuncio/animales-y-mascotas">
            <div class="card-ads-publicar card-ads-publicar--10">
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
  head() {
    return {
      base: process.env.BASE_URL,
      title: "Publicar anuncio gratis en kikrd",
      titleTemplate: "%s ← Klkrd!",
      htmlAttrs: {
        lang: "en",
        amp: true
      },
      meta: [
        {
          vmid: "description",
          name: "description",
          content:
            "Vende lo que desea publicando tus anuncios en la plataforma más rápida de ventas de la república Dominicana ¡Gratis! ¡KLK! RD es el sitio de clasificados más eficaz en República Dominicana."
        }
      ]
    };
  },
  data: () => ({
    loading: 0,
    itemCate: [
      "Inmueebles en alquiler",
      "Inmueebles en venta",
      "Vehiculos",
      "Bebes y ninos",
      "Hogar",
      "Moda y Belleza",
      "Deportes y entertenimiento",
      "Electronica",
      "Negocios y servicios",
      "Animales y mascotas"
    ],
    itemSub: ["Nuevo", "Usado", "Partes y piezas"],
    itemStatus: ["Nuevo", "Usado", "Partes y piezas"],
    itemPrice: ["Peso", "Dolar"],
    itemProvince: [
      "Distrito Nacional",
      "Santo Domingo, Esto",
      "Santo Domingo, Oeste",
      "Santo Domingo, Norte",
      "Santiago",
      "La Romana",
      "Interior del pais"
    ],
    itemVia: [
      "Facebook",
      "Instagram",
      "Telefono",
      "Whatsapp",
      "Telegram",
      "Twitter",
      "Email"
    ],
    category: ""
  }),
  created() {
    if (!this.$store.state.auth || !this.$store.state.user.emailVerified) {
      this.$router.push("/");
    }
  },
  mounted() {
    var that = this;
    setTimeout(() => {
      for (let index = 0; index <= 100; index++) {
        that.loading = index;
      }
    }, 2000);
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
}
.lds-ellipsis {
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
}
.lds-ellipsis div {
  position: absolute;
  top: 33px;
  width: 13px;
  height: 13px;
  border-radius: 50%;
  background: #fff;
  animation-timing-function: cubic-bezier(0, 1, 1, 0);
}
.lds-ellipsis div:nth-child(1) {
  left: 8px;
  animation: lds-ellipsis1 0.6s infinite;
}
.lds-ellipsis div:nth-child(2) {
  left: 8px;
  animation: lds-ellipsis2 0.6s infinite;
}
.lds-ellipsis div:nth-child(3) {
  left: 32px;
  animation: lds-ellipsis2 0.6s infinite;
}
.lds-ellipsis div:nth-child(4) {
  left: 56px;
  animation: lds-ellipsis3 0.6s infinite;
}
@keyframes lds-ellipsis1 {
  0% {
    transform: scale(0);
  }
  100% {
    transform: scale(1);
  }
}
@keyframes lds-ellipsis3 {
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(0);
  }
}
@keyframes lds-ellipsis2 {
  0% {
    transform: translate(0, 0);
  }
  100% {
    transform: translate(24px, 0);
  }
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
@media only screen and (max-width: 770px) {
  .titleH1 {
    font-size: 20px !important;
    padding-bottom: 0 !important;
  }
}
.titleH1 {
  font: italic bold 40px Georgia, serif;
  padding-bottom: 20px;
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
.card-ads-publicar {
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
  border-radius: 0px 50px;
  div {
    color: #fff;
    opacity: 1 !important;
    span {
      // background-color: rgba(25, 118, 210, 0.5);
      background-color: #ff9c0a80;
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
.card-ads-publicar:hover {
  box-shadow: 0 4px 8px 0 #ff9c0a80, 0 6px 20px 0 #ff9c0a80;
  opacity: 1;
  span {
    background-color: #ff9c0a;
  }
}
.card-ads-publicar--1 {
  background-image: url("../../static/panoramic-view-of-the-city-2305747-min.jpg");
}
.card-ads-publicar--2 {
  background-image: url("../../static/stairs-home-loft-lifestyle-2459-min.jpg");
}
.card-ads-publicar--3 {
  background-image: url("../../static/mercedes-benz-parked-in-a-row-164634-min.jpg");
}
.card-ads-publicar--4 {
  background-image: url("../../static/close-up-of-woman-working-256468-min.jpg");
}
.card-ads-publicar--5 {
  background-image: url("../../static/brown-wooden-center-table-584399-min.jpg");
}
.card-ads-publicar--6 {
  background-image: url("../../static/assorted-cloth-lot-1336873-min.jpg");
}
.card-ads-publicar--7 {
  background-image: url("../../static/athlete-bike-black-and-white-cycle-260409-min.jpg");
}
.card-ads-publicar--8 {
  background-image: url("../../static/apple-coffee-computer-desk-356056-min.jpg");
}
.card-ads-publicar--9 {
  background-image: url("../../static/build-builder-construction-equipment-585419-min.jpg");
}
.card-ads-publicar--10 {
  background-image: url("../../static/orange-tabby-cat-beside-fawn-short-coated-puppy-46024-min.jpg");
}
</style>
