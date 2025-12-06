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
    <div v-if="ads[0]">
      <div class="header">
        <h1>Compra y vende en República Dominicana</h1>
        <p style="font-size: 20px">deportes y entertenimiento</p>
      </div>
      <v-container>
        <v-row>
          <v-dialog v-model="dialog" width="600px">
            <template v-slot:activator="{ on }">
              <div style="position: relative;  width: 100%;">
                <input
                  v-model="search"
                  type="text"
                  placeholder="Buscar en categoría de deportes y entertenimiento"
                  class="search-ads"
                />
                <button v-on="on" class="filter">
                  FILTRO
                  <img src="../../static/icons8-filter-52.png" alt />
                </button>
              </div>
            </template>
            <v-card>
              <v-card-title>
                <span class="headline">Configurar filtor</span>
              </v-card-title>
              <v-card-text>
                <div>
                  <div class="filterTitle">Precio</div>
                  <v-card-text>
                    <v-row>
                      <v-col class="px-4">
                        <v-range-slider
                          v-model="range"
                          :max="max"
                          :min="min"
                          hide-details
                          class="align-center"
                        >
                          <template v-slot:prepend>
                            <v-text-field
                              v-model="range[0]"
                              class="mt-0 pt-0"
                              hide-details
                              single-line
                              type="number"
                              style="width: 60px"
                            ></v-text-field>
                          </template>
                          <template v-slot:append>
                            <v-text-field
                              v-model="range[1]"
                              class="mt-0 pt-0"
                              hide-details
                              single-line
                              type="number"
                              style="width: 60px"
                            ></v-text-field>
                          </template>
                        </v-range-slider>
                      </v-col>
                    </v-row>
                  </v-card-text>
                </div>
                <br />
                <div>
                  <div class="filterTitle">Condición</div>
                  <v-radio-group v-model="condi" :mandatory="false">
                    <v-radio label="Nuevo" value="Nuevo" color="primary"></v-radio>
                    <v-radio label="Usado" value="Usado" color="primary"></v-radio>
                    <v-radio label="Partes y piezas" value="Partes y piezas" color="primary"></v-radio>
                    <v-radio label="all" :value="false" color="primary"></v-radio>
                  </v-radio-group>
                </div>
                <br />
                <div>
                  <div class="filterTitle">Provincia</div>
                  <v-radio-group v-model="provi" :mandatory="false">
                    <v-radio label="Distrito Nacional" value="Distrito Nacional" color="primary"></v-radio>
                    <v-radio label="Interior del país" value="Interior del país" color="primary"></v-radio>
                    <v-radio label="La Romana" value="La Romana" color="primary"></v-radio>
                    <v-radio label="Santiago" value="Santiago" color="primary"></v-radio>
                    <v-radio label="Santo Domingo Este" value="Santo Domingo, Este" color="primary"></v-radio>
                    <v-radio
                      label="Santo Domingo Oeste"
                      value="Santo Domingo, Oeste"
                      color="primary"
                    ></v-radio>
                    <v-radio
                      label="Santo Domingo Norte"
                      value="Santo Domingo, Norte"
                      color="primary"
                    ></v-radio>
                    <v-radio label="all" :value="false" color="primary"></v-radio>
                  </v-radio-group>
                </div>
                <br />
                <div>
                  <div class="filterTitle">Timestame</div>
                  <v-radio-group v-model="time" :mandatory="false">
                    <v-radio label="This week" :value="week" color="primary"></v-radio>
                    <v-radio label="This month" :value="month" color="primary"></v-radio>
                    <v-radio label="This year" :value="year" color="primary"></v-radio>
                    <v-radio label="all" :value="false" color="primary"></v-radio>
                  </v-radio-group>
                </div>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary darken-1" text @click="dialog = false">APLICAR</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-row>
      </v-container>
      <v-container>
        <v-row no-gutters>
          <v-col cols="12" v-for="(ad, index) in filterSearch" :key="ad.id">
            <v-card class="mb-4" raised v-scroll-reveal.reset="{ delay: 800 }">
              <v-row no-gutters>
                <v-col cols="4">
                  <span v-for="adImg in adsImg" :key="adImg.id">
                    <v-img
                      v-if="adImg.id == ad.id"
                      :src="adImg.img"
                      :lazy-src="adImg.img"
                      style="height: 100% !important"
                      aspect-ratio="1.7"
                    >
                      <template v-slot:placeholder>
                        <v-row class="fill-height ma-0" align="center" justify="center">
                          <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                        </v-row>
                      </template>
                    </v-img>
                  </span>
                </v-col>
                <v-col cols="8">
                  <nuxt-link :to="'/deportes-y-entertenimiento/' + ad.id">
                    <div
                      class="titleAd"
                      :class="dark ? 'titleAd--dark' : ''"
                    >{{ad.title.length > 46 ? ad.title.substring(0,45).toLowerCase()+"...": ad.title.toLowerCase()}}</div>
                  </nuxt-link>
                  <div
                    class="priceAd"
                  >{{ad.currency}} {{ad.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}}</div>
                  <div class="totalMeta">
                    <div class="medaAd">
                      <v-icon>local_offer</v-icon>
                      {{ad.sub}}
                    </div>
                    <div class="medaAd">
                      <v-icon>place</v-icon>
                      {{ad.provincia}}
                    </div>
                    <div v-if="ad.history.now" class="medaAd">
                      <v-icon>query_builder</v-icon>
                      {{ new Date(ad.history.now).toLocaleDateString()}} {{new Date(ad.history.now).toLocaleTimeString('en-US', { hour12: true })}}
                    </div>
                  </div>
                </v-col>
              </v-row>
            </v-card>
            <v-card
              class="mb-4"
              raised
              v-if="index % 5 === 4"
              v-scroll-reveal.reset="{ delay: 800 }"
            >
              <Adsense data-ad-client="ca-pub-3374289978792695" data-ad-slot="9806134228"></Adsense>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </div>
    <div v-if="empty" style="margin: 250px 0; text-align:center">
      <h1 class="titleH1">Lo sentimos, actualmente no hay anuncios</h1>
    </div>
  </div>
</template>
<script>
import Adsense from "../../components/Adsense.vue";

export default {
  components: {
    Adsense
  },
  data() {
    return {
      loading: 0,
      dialog: false,
      empty: false,
      page: 1,
      img: "",
      adsImg: [],
      search: "",
      price: "",
      min: 0,
      max: 0,
      slider: 40,
      range: [0, 10000000000000000],
      condi: "",
      provi: "",
      time: "",
      pric: []
    };
  },
  async asyncData({ route, app }) {
    let adsTotal = await app.$fireStore
      .collection("deportes-y-entertenimiento")
      .get();
    var ads = [];
    adsTotal.forEach(async doc => {
      if (Date.now() < doc.data().history.after) {
        const data = {
          id: doc.id,
          title: doc.data().title,
          price: doc.data().price,
          history: doc.data().history,
          sub: doc.data().sub,
          provincia: doc.data().provincia,
          currency: doc.data().currency,
          status: doc.data().status
        };
        ads.push(data);
      }
    });
    return { ads };
  },
  head() {
    return {
      base: process.env.BASE_URL,

      title: "deportes y entertenimiento",
      titleTemplate: "%s ← Klkrd!",
      meta: [
        {
          vmid: "description",
          name: "description",
          content: "Vende artículos de deportes y entretenimiento"
        }
      ]
    };
  },
  mounted() {
    var that = this;
    if (this.ads) {
      setTimeout(() => {
        for (let index = 0; index <= 100; index++) {
          that.loading = index;
        }
      }, 5000);
    }
  },
  beforeMount() {
    this.$fireStore
      .collection("deportes-y-entertenimiento")
      .get()
      .then(querySnapshot => {
        if (!querySnapshot.empty) {
          querySnapshot.forEach(doc => {
            this.$fireStorage
              .ref()
              .child(`ads/${doc.id}`)
              .listAll()
              .then(res => {
                this.$fireStorage
                  .ref()
                  .child(`ads/${doc.id}/${res.items[0].name}`)
                  .getDownloadURL()
                  .then(url => {
                    const data = {
                      id: doc.id,
                      img: url
                    };
                    this.adsImg.push(data);
                  });
              });
          });
        } else {
          this.empty = true;
        }
      });
    var priceMax = [];
    var priceMin = [];
    setTimeout(() => {
      this.ads.forEach(ad => {
        priceMax.push(ad.price.replace(/\D/g, ""));
      });
      this.max = Math.max(...priceMax);

      this.ads.forEach(ad => {
        priceMin.push(ad.price.replace(/\D/g, ""));
      });
      this.min = Math.min(...priceMin);
    }, 2000);
  },
  computed: {
    dark() {
      return this.$store.state.dark;
    },
    week() {
      Date.prototype.addDays = function(days) {
        var date = new Date();
        date.setDate(date.getDate() - days);
        return date;
      };
      var date = new Date();
      return date.addDays(7).getTime();
    },
    month() {
      Date.prototype.addDays = function(days) {
        var date = new Date();
        date.setDate(date.getDate() - days);
        return date;
      };
      var date = new Date();
      return date.addDays(30).getTime();
    },
    year() {
      Date.prototype.addDays = function(days) {
        var date = new Date();
        date.setDate(date.getDate() - days);
        return date;
      };
      var date = new Date();
      return date.addDays(365).getTime();
    },
    filterSearch() {
      return this.ads.filter(query => {
        var search = query.title.match(this.search.toUpperCase());
        var condi = this.condi ? query.status == this.condi : true;
        var provi = this.provi ? query.provincia == this.provi : true;
        var time = this.time
          ? Date.now() > query.history.now && query.history.now > this.time
          : true;
        var price = this.range
          ? this.range[1] >= query.price.replace(/\D/g, "") &&
            query.price.replace(/\D/g, "") >= this.range[0]
          : true;

        return condi && search && provi && time && price;
      });
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
.titleAd {
  color: #000;
  font-family: "Quicksand", sans-serif;
  padding: 15px 0 8px 10px;
  font-size: 23px;
  line-height: 25px;
  text-transform: capitalize;
  letter-spacing: 2px;
}
@media only screen and (max-width: 770px) {
  .titleH1 {
    font-size: 20px !important;
    padding-bottom: 10px;
  }
  .titleAd {
    font-size: 18px !important;
  }
  .priceAd {
    font-size: 16px !important;
    padding: 0 0 0 8px !important;
  }
  .totalMeta {
    padding: 6px !important;
    .medaAd {
      padding: 2px !important;
      font-size: 10px !important;
    }
    .v-icon.v-icon {
      font-size: 12px !important;
    }
  }
  .search-ads {
    padding: 12px 20px !important;
    font-size: 12px !important;
  }
  .filter {
    font-size: 15px !important;
    padding: 10px 22px !important;
    img {
      height: 15px !important;
    }
  }
}
.titleAd--dark {
  color: #fff;
}
.titleAd:hover {
  color: #2196f3;
  -webkit-transition: 1s;
  transition: 1s;
}
.priceAd {
  color: #3498db;
  font-size: 20px;
  font-weight: 800;
  padding: 0 0 0 12px;
  font-family: "Quicksand", sans-serif;
}
.totalMeta {
  padding: 10px;
  font-family: "Quicksand", sans-serif;
  .medaAd {
    padding: 5px 2px;
    font-size: 13px;
  }
  .v-icon.v-icon {
    font-size: 15px;
  }
}
.search-ads {
  width: 100%;
  padding: 12px 20px;
  color: #fff !important;
  background-color: #bdc3c7;
  font-size: 18px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}
input:focus {
  outline: 0;
}
.filter {
  position: absolute;
  right: 0px;
  font-size: 20px;
  padding: 10.2px 25px;
  background-color: #7f8c8d;
  color: #ededed;
  img {
    height: 18px;
    padding-top: 2px;
  }
}
.filterTitle {
  font-family: "Alatsi", sans-serif;
  font-size: 20px;
  margin-bottom: 10px;
}
</style>
