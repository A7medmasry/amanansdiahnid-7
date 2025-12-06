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
    <v-card>
      <v-list-item>
        <v-list-item-avatar>
          <img v-if="userDB.photo" :src="userDB.photo" :alt="userDB.displayName" />
          <img v-else src="../../static/user.png" :alt="userDB.displayName" />
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title>{{userDB.name}}</v-list-item-title>
          <v-list-item-subtitle>{{userDB.email}}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-card>

    <v-row>
      <v-col cols="12" lg="4" md="6" v-for="ad in ads" :key="ad.id">
        <v-card class="mx-auto" max-width="400">
          <v-img
            class="white--text align-end"
            height="200px !important"
            :src="ad.img[0]"
            gradient="to top right, rgba(100,115,201,.33), rgba(25,32,72,.7)"
          >
            <router-link :to="'/' + ad.category + '/' + ad.id" style="color:white !important">
              <v-card-title>{{ad.title.length > 21 ? ad.title.toUpperCase().substring(0,20)+"...": ad.title.toUpperCase()}}</v-card-title>
            </router-link>
          </v-img>

          <v-card-subtitle class="pb-0">{{ad.price}} {{ad.currency}}</v-card-subtitle>

          <v-card-text class="text--primary">
            <div>{{ad.description.length > 81 ? ad.description.substring(0,80)+"...": ad.description}}</div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-card>
      <Adsense data-ad-client="ca-pub-3374289978792695" data-ad-slot="9806134228"></Adsense>
    </v-card>
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
      ads: [],
      collections: [
        "inmueebles-en-alquiler",
        "inmueebles-en-venta",
        "vehiculos",
        "bebes-y-ninos",
        "hogar",
        "moda-y-belleza",
        "deportes-y-entertenimiento",
        "electronica",
        "negocios-y-servicios",
        "animales-y-mascotas"
      ]
    };
  },
  beforeCreate() {
    if (!this.$route.params.user) {
      this.$router.push("/");
    }
  },
  async asyncData({ route, app }) {
    var userDB = {};
    let user = await app.$fireStore
      .collection("users")
      .where("id", "==", route.params.user)
      .get();
    user.forEach(element => {
      userDB = element.data();
    });
    return {
      userDB
    };
  },
  beforeMount() {
    this.collections.forEach(collection => {
      this.$fireStore
        .collection(collection)
        .where("uid", "==", this.$route.params.user)
        .get()
        .then(res => {
          res.forEach(doc => {
            var urlt = [];
            var that = this;
            this.$fireStorage
              .ref()
              .child(`ads/${doc.id}`)
              .listAll()
              .then(function(res) {
                that.$fireStorage
                  .ref()
                  .child(res.items[0].location.path)
                  .getDownloadURL()
                  .then(function(url) {
                    urlt.push(url);
                  });
              });
            const data = {
              category: collection,
              id: doc.id,
              title: doc.data().title,
              price: doc.data().price,
              history: doc.data().history,
              description: doc.data().description,
              currency: doc.data().currency,
              img: urlt
            };
            this.ads.push(data);
          });
        });
    });
  },
  mounted() {
    var that = this;
    setTimeout(() => {
      for (let index = 0; index <= 100; index++) {
        that.loading = index;
      }
    }, 3000);
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
</style>
