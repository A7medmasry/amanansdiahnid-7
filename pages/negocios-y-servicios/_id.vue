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
    <div class="single">
      <v-row>
        <v-col cols="12" md="6" :class="window.width < 770 ? 'deleteSpace' : ''">
          <v-carousel style="height:unset">
            <v-carousel-item v-for="(item,i) in items" :key="i" :src="item"></v-carousel-item>
          </v-carousel>
        </v-col>
        <v-col cols="12" md="6">
          <h1>{{ad.currency}} {{ad.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}}</h1>
          <div
            class="priceAdsingle"
            v-if="ad.title"
          >{{ad.title.charAt(0).toUpperCase() + ad.title.slice(1).toLowerCase()}}</div>
          <div class="meta">
            <div class="grey--text mb-4 font-weight-bold">
              <v-icon class="grey--text">local_offer</v-icon>
              {{ad.sub}}
            </div>
            <div class="grey--text mb-4 font-weight-bold">
              <v-icon class="grey--text">place</v-icon>
              {{ad.provincia}}
            </div>
            <div class="grey--text mb-4 font-weight-bold" v-if="ad.history">
              <v-icon class="grey--text">query_builder</v-icon>
              {{ new Date(ad.history.now).toLocaleDateString()}} {{new Date(ad.history.now).toLocaleTimeString('en-US', { hour12: true })}}
            </div>
          </div>

          <v-expansion-panels
            style="background-color: transparent !important;"
            class="mb-2"
            v-if="userDB"
          >
            <v-expansion-panel>
              <v-expansion-panel-header>
                <v-row>
                  <v-list-item>
                    <v-list-item-avatar>
                      <img v-if="userDB.photo" :src="userDB.photo" />
                      <img v-if="!userDB.photo" src="../../static/user.png" />
                    </v-list-item-avatar>

                    <v-list-item-content>
                      <v-list-item-title>
                        <nuxt-link :to="`/user/${userDB.id}`">{{userDB.name}}</nuxt-link>
                      </v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </v-row>
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <div class="meta meta-user">
                  <div class="grey--text mb-4 font-weight-bold" v-if="userDB.showEmail">
                    <v-icon class="grey--text">mail</v-icon>
                    {{userDB.email}}
                  </div>
                  <div class="grey--text mb-4 font-weight-bold">
                    <img
                      v-if="userDB.whatapp"
                      src="../../static/icons8-whatsapp-48.png"
                      height="22px"
                    />
                    <v-icon v-if="!userDB.whatapp" class="grey--text">phone_in_talk</v-icon>
                    {{userDB.phone}}
                  </div>
                  <a
                    :href="userDB.instagram"
                    v-if="userDB.instagram.includes('https://')"
                    target="block"
                  >
                    <v-btn style="margin: 10px" fab color="blue">
                      <img src="../../static/icons8-instagram-48.png" height="20px" />
                    </v-btn>
                  </a>
                  <a
                    :href="userDB.facebook"
                    v-if="userDB.facebook.includes('https://')"
                    target="block"
                  >
                    <v-btn style="margin: 10px" fab color="blue">
                      <img src="../../static/icons8-facebook-f-48.png" height="20px" />
                    </v-btn>
                  </a>
                  <a :href="userDB.twitter" v-if="userDB.twitter">
                    <v-btn fab style="margin: 10px" color="blue">
                      <img src="../../static/icons8-twitter-48 (1).png" height="20px" />
                    </v-btn>
                  </a>
                </div>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
          <v-alert
            border="top"
            colored-border
            type="info"
            dark
            elevation="2"
            prominent
            style="font-size: 12px;"
          >Por tu seguridad, no realices pagos por adelantado. Revisa el artículo y realiza la transacción personalmente en un lugar seguro.</v-alert>
        </v-col>
      </v-row>
      <v-simple-table style="max-width:600px">
        <template v-slot:default>
          <tbody>
            <tr v-if="ad.type">
              <td>Tipo</td>
              <td>{{ ad.type }}</td>
            </tr>
            <tr v-if="ad.status">
              <td>Condición</td>
              <td>{{ ad.status }}</td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
      <br />
      <h2 class="mb-4">Descripción</h2>
      <blockquote
        style="max-width:600px; font-size: 16px"
        class="blockquote pa-0 mb-6"
      >{{ad.description}}</blockquote>
      <v-card>
        <Adsense data-ad-client="ca-pub-3374289978792695" data-ad-slot="9806134228"></Adsense>
      </v-card>
    </div>
  </div>
</template>
<script>
import Adsense from "../../components/Adsense.vue";
import firebase from "firebase/app";

export default {
  components: {
    Adsense
  },
  data() {
    return {
      loading: 0,
      date: null,
      trip: {
        name: "",
        location: null,
        start: null,
        end: null
      },
      locations: [
        "Australia",
        "Barbados",
        "Chile",
        "Denmark",
        "Equador",
        "France"
      ],
      items: [],
      loadSingle: true,
      window: {
        width: 0,
        height: 0
      }
    };
  },
  mounted() {
    var that = this;
    if (this.ad) {
      setTimeout(() => {
        for (let index = 0; index <= 100; index++) {
          that.loading = index;
        }
      }, 2000);
    }
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
  },
  async asyncData({ route, app }) {
    let ad = await app.$fireStore
      .collection("negocios-y-servicios")
      .doc(route.params.id)
      .get();
    var userDB = {};
    let user = await app.$fireStore
      .collection("users")
      .where("id", "==", ad.data().uid)
      .get();
    user.forEach(element => {
      userDB = element.data();
    });
    return {
      ad: ad.data(),
      userDB
    };
  },
  head() {
    let data = this.ad;
    return {
      base: process.env.BASE_URL,

      title: data ? data.title : "Compra y vende en República Dominicana",
      titleTemplate: "%s ← Klkrd!",
      meta: [
        {
          vmid: "description",
          name: "description",
          content: data
            ? data.description
            : "¡KLK! RD - Compra y vende en República Dominicana"
        }
      ]
    };
  },
  beforeMount() {
    var urlt = [];
    firebase
      .storage()
      .ref()
      .child(`ads/${this.$route.params.id}`)
      .listAll()
      .then(function(res) {
        res.items.forEach(function(i) {
          firebase
            .storage()
            .ref()
            .child(i.location.path)
            .getDownloadURL()
            .then(function(url) {
              urlt.push(url);
            });
        });
      })
      .catch(function(error) {
        console.log("Error getting document:", error);
      });
    this.items = urlt;
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
.v-expansion-panel::before {
  box-shadow: none !important;
}
.theme--light.v-expansion-panels .v-expansion-panel {
  background-color: transparent !important;
}
.v-responsive {
  height: unset !important;
}
.v-carousel {
  overflow: unset !important;
}
h1 {
  font: bold 40px !important;
  padding-bottom: 10px;
}
.priceAdsingle {
  font-size: 25px;
  font-weight: 600;
  padding: 0;
}
@media only screen and (max-width: 770px) {
  h1 {
    font-size: 20px !important;
    padding-bottom: 0px !important;
  }
  .priceAdsingle {
    font-size: 18px !important;
  }
}
.meta {
  padding: 10px 0;
  margin-top: 20px;
  border-top: 1px solid rgba(128, 128, 128, 0.4);
  border-bottom: 1px solid rgba(128, 128, 128, 0.4);
}
.meta-user {
  padding: 10px !important;
  border: 0 !important;
  margin: 0 !important;
  a {
    padding: 0 0 5px 5px;
  }
}
.deleteSpace {
  padding: 0 !important;
  margin-top: -11px;
}
.slider-image {
  position: relative;
  .slider-controls {
    width: 100%;
    top: 500px;
    position: absolute;
    z-index: 5;
    .indicators {
      width: 60%;
      ul {
        text-align: center;
        margin: 0;
        padding: 0;
        li {
          background-color: #f6f6f6;
          color: #ccc;
          border-radius: 5px;
          -webkit-border-radius: 5px;
          -moz-border-radius: 5px;
          -ms-border-radius: 5px;
          -o-border-radius: 5px;
          margin: 0 4px;
          display: inline-block;
          font-weight: bold;
          width: 35px;
          line-height: 28px;
          cursor: pointer;
          line-height: 3px;
        }
        li.active {
          background-color: #000;
          color: #fff;
        }
      }
    }
  }
  .slider-container {
    margin: 10px auto;
    position: relative;
    top: -15px;
    .slider-number {
      background-color: #777;
      border-radius: 5px;
      -webkit-border-radius: 5px;
      -moz-border-radius: 5px;
      -ms-border-radius: 5px;
      -o-border-radius: 5px;
      padding: 5px;
      margin: 10px;
      position: absolute;
      color: #fff;
      z-index: 2;
    }
    .img {
      position: absolute;
      opacity: 0;
      height: 100%;
      width: 100%;
      transition: opacity 1s;
      -webkit-transition: opacity 1s;
      -moz-transition: opacity 1s;
      -ms-transition: opacity 1s;
      -o-transition: opacity 1s;
      z-index: 1;
      background-size: cover;
      .content {
        padding-left: 60px;
        color: #f5f5f5;
        top: 120px;
        position: relative;
        h1 {
          font-size: 50px;
          font-family: system-ui;
        }
        span {
          color: #2a6bd8;
        }
        p {
          margin-bottom: 40px;
          font-size: 20px;
          font-family: cursive;
        }
        button {
          background-color: #448aff;
          color: #f5f5f5;
        }
      }
    }

    .img.active {
      opacity: 1;
    }
  }
  .prev,
  .next {
    color: #000;
    padding: 10px;
    text-align: center;
    cursor: pointer;
    position: absolute;
    z-index: 6;
    i {
      font-size: 50px;
      line-height: 53px;
    }
  }
  .next {
    top: 40%;
    right: 0;
  }
  .prev {
    top: 40%;
  }
  .disable {
    opacity: 0.5;
    cursor: no-drop;
  }
}
</style>
