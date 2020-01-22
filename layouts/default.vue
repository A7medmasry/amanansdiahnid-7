<template>
  <v-app>
    <div>
      <v-toolbar>
        <v-toolbar-title>
          <router-link to="/">
            <img src="../static/logo.png" style="width: 120px" alt="logo" />
          </router-link>
          <v-icon @click="darkf" :dark="dark">mdi mdi-invert-colors</v-icon>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-select
          style="width:100px;"
          class="ml-8"
          prepend-inner-icon="place"
          v-model="provincia"
          v-if="window.width > 1100  && this.$route.path == '/'"
          :items="itemProvince"
          label="Location"
          hide-details
          dense
          solo
        ></v-select>
        <v-autocomplete
          v-if="window.width > 1100 && this.$route.path == '/'"
          class="ml-4"
          v-model="model"
          prepend-inner-icon="search"
          :items="filterItem"
          :search-input.sync="search"
          hide-details
          hide-selected
          item-text="title"
          item-value="title"
          label="Search for a ad..."
          dense
          solo
        >
          <template v-slot:no-data>
            <v-list-item>
              <v-list-item-title>
                Search for
                <strong>Ads</strong>
              </v-list-item-title>
            </v-list-item>
          </template>
          <template v-slot:item="{ item }">
            <router-link style="display: flex;" :to="'/'+ item.slug + '/' + item.id">
              <v-list-item-avatar
                color="indigo"
                class="headline font-weight-light white--text"
              >{{ item.title.charAt(0) }}</v-list-item-avatar>
              <v-list-item-content @click="reload">
                <v-list-item-title v-text="item.title"></v-list-item-title>
                <v-list-item-subtitle v-text="item.provincia"></v-list-item-subtitle>
              </v-list-item-content>
            </router-link>
          </template>
        </v-autocomplete>
        <v-toolbar-items v-if="window.width > 1100">
          <v-btn text v-if="user.uid" @click="updateProfile">
            Publicar anuncio
            <v-chip x-small class="ma-2" color="orange" text-color="white">Gratis</v-chip>
          </v-btn>
          <v-btn text v-if="!user.uid" to="/sign-in">Mi cuenta</v-btn>
          <v-btn text v-if="!user.uid" to="/register">Publicar anuncio</v-btn>
          <v-btn text v-if="user.uid" @click="logOut">Logout</v-btn>
          <router-link to="/profile">
            <v-avatar v-if="user.uid" class="mt-2 mr-2 ml-2">
              <img v-if="!user.photoURL" src="../static/user.png" :alt="user.displayName" />
              <img v-if="user.photoURL" :src="user.photoURL" :alt="user.displayName" />
            </v-avatar>
          </router-link>
        </v-toolbar-items>
        <span @click.stop="drawer = !drawer" v-if="window.width < 1100">
          <v-app-bar-nav-icon color="blue"></v-app-bar-nav-icon>
        </span>
      </v-toolbar>
    </div>
    <v-container v-if="window.width > 1100">
      <nuxt />
    </v-container>
    <v-sheet
      height="100%"
      class="overflow-hidden"
      style="position: relative; background: transparent;"
      v-if="window.width < 1100"
    >
      <v-container>
        <router-view />
      </v-container>
      <v-navigation-drawer v-model="drawer" absolute temporary>
        <v-list-item v-if="user.uid" to="/profile">
          <v-list-item-avatar>
            <img v-if="!user.photoURL" src="../static/user.png" :alt="user.displayName" />
            <img v-if="user.photoURL" :src="user.photoURL" :alt="user.displayName" />
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>{{user.displayName}}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-divider></v-divider>
        <v-list dense>
          <v-list-item-group>
            <v-list-item class="pa-0" v-if="user.uid">
              <v-list-item-title>
                <v-btn text @click="updateProfile">
                  Publicar anuncio
                  <v-chip x-small class="ma-2" color="orange" text-color="white">Gratis</v-chip>
                </v-btn>
              </v-list-item-title>
            </v-list-item>
            <v-list-item class="pa-0" v-if="!user.uid">
              <v-list-item-title>
                <v-btn text to="/sign-in" block>Mi cuenta</v-btn>
              </v-list-item-title>
            </v-list-item>
            <v-list-item class="pa-0" v-if="!user.uid">
              <v-list-item-title>
                <v-btn text to="/register" block>Publicar anuncio</v-btn>
              </v-list-item-title>
            </v-list-item>
            <v-list-item class="pa-0" v-if="user.uid">
              <v-list-item-title>
                <v-btn text block @click="logOut">Logout</v-btn>
              </v-list-item-title>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-navigation-drawer>
    </v-sheet>
    <v-row justify="center">
      <v-dialog v-model="dialog" max-width="290">
        <v-card>
          <v-card-title class="headline">Please complete your profile</v-card-title>
          <v-card-text>You must complete the data in order to create an ad</v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="green darken-1" text @click="dialog = false" to="/profile">Go To Profile</v-btn>
            <v-btn color="green darken-1" text @click="dialog = false">cancel</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
    <v-card height="80">
      <v-footer absolute class="font-weight-medium">
        <v-col class="text-center" cols="12">
          <strong>klkrd.com</strong>
        </v-col>
      </v-footer>
    </v-card>
  </v-app>
</template>

<script>
import { mapMutations } from "vuex";
import { db, storage } from "@/plugins/firebase";

export default {
  data() {
    return {
      allAds: [],
      itemP: [],
      items: [],
      model: null,
      search: null,
      tab: null,
      dialog: false,
      drawer: null,
      footerH: 0,
      window: {
        width: 0,
        height: 0
      },
      itemProvince: [],
      provincia: "",
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
  computed: {
    dark() {
      this.$vuetify.theme.dark = this.$store.state.user.dark;
    },
    user() {
      return this.$store.state.user.user;
    },
    filterItem() {
      return this.items.filter(query => {
        var provincia = this.provincia
          ? query.provincia == this.provincia
          : true;

        return provincia;
      });
    }
  },
  beforeCreate() {
    this.$store.dispatch("user/fetchCreds");
  },
  // created() {
  //   // delete ad after 90 day
  //   this.collections.forEach(collection => {
  //     db.collection(collection)
  //       .get()
  //       .then(querySnapshot => {
  //         querySnapshot.forEach(doc => {
  //           if (Date.now() > doc.data().history.after) {
  //             console.log("yes", Date.now(), doc.data().history.after);
  //             db.collection(collection)
  //               .doc(doc.id)
  //               .delete()
  //               .then(() => {
  //                 storage
  //                   .ref(`ads/${doc.id}`)
  //                   .listAll()
  //                   .then(res => {
  //                     res.items.forEach(function(itemRef) {
  //                       storage.ref(itemRef.fullPath).delete();
  //                     });
  //                   });
  //               });
  //           }
  //         });
  //       });
  //   });
  // },
  watch: {
    model(val) {
      if (val != null) this.tab = 0;
      else this.tab = null;
    },
    search() {
      if (this.items.length > 0) return;
      this.collections.forEach(collection => {
        db.collection(collection)
          .get()
          .then(querySnapshot => {
            querySnapshot.forEach(doc => {
              const data = {
                title: doc.data().title,
                provincia: doc.data().provincia,
                id: doc.id,
                slug: collection
              };
              this.itemProvince.push(doc.data().provincia);
              this.items.push(data);
            });
          });
      });
    }
  },
  mounted() {
    this.collections.forEach(collection => {
      db.collection(collection)
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            this.itemP.push(doc.data().provincia);
            this.itemProvince = Array.from(new Set(this.itemP));
          });
        });
    });
    this.$nextTick(function() {
      window.addEventListener("resize", this.getWindowWidth);
      this.getWindowWidth();
    });
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.getWindowWidth);
  },
  methods: {
    updateProfile() {
      db.collection("users")
        .where("id", "==", this.user.uid)
        .get()
        .then(querySnapshot => {
          if (!querySnapshot.empty) {
            this.$router.push({ name: "publicar-anuncio" });
          } else {
            this.dialog = true;
          }
        });
    },
    getWindowWidth() {
      this.window.width = document.documentElement.clientWidth;
    },
    reload() {
      setTimeout(() => {
        location.reload();
      }, 2000);
    },
    ...mapMutations({
      logOut: "user/logOut",
      darkf: "user/darkf"
    })
  }
};
</script>
<style lang="scss">
body {
  font-family: "Quicksand", sans-serif;
}
a {
  text-decoration: none;
}
</style>
