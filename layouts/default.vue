<template>
  <v-app style="background: #212121;">
    <client-only>
      <v-toolbar>
        <v-toolbar-title>
          <nuxt-link to="/">
            <img src="../static/logo.png" style="width: 120px" alt="logo" />
          </nuxt-link>
          <!-- <v-icon @click="darkf" :dark="dark">mdi mdi-invert-colors</v-icon> -->
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <!-- <v-select
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
            <nuxt-link style="display: flex;" :to="'/'+ item.slug + '/' + item.id">
              <v-list-item-avatar
                color="indigo"
                class="headline font-weight-light white--text"
              >{{ item.title.charAt(0) }}</v-list-item-avatar>
              <v-list-item-content @click="reload">
                <v-list-item-title v-text="item.title"></v-list-item-title>
                <v-list-item-subtitle v-text="item.provincia"></v-list-item-subtitle>
              </v-list-item-content>
            </nuxt-link>
          </template>
        </v-autocomplete>-->
        <v-toolbar-items v-if="window.width > 1100">
          <template v-if="user.uid">
            <v-btn text @click="updateProfile">
              Publicar anuncio
              <v-chip x-small class="ma-2" color="orange" text-color="white">Gratis</v-chip>
            </v-btn>
            <v-menu>
              <template v-slot:activator="{ on }">
                <v-btn text>
                  <v-avatar class="mt-2 mr-2 ml-2" dark v-on="on">
                    <img v-if="user.photo" :src="user.photo" :alt="user.displayName" />
                    <img v-else src="../static/user.png" :alt="user.displayName" />
                  </v-avatar>
                </v-btn>
              </template>
              <v-card>
                <v-list>
                  <v-list-item>
                    <v-list-item-avatar>
                      <img v-if="user.photo" :src="user.photo" :alt="user.displayName" />
                      <img v-else src="../static/user.png" :alt="user.displayName" />
                    </v-list-item-avatar>

                    <v-list-item-content>
                      <v-list-item-title>{{user.displayName}}</v-list-item-title>
                      <v-list-item-subtitle>{{user.email}}</v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                </v-list>

                <v-divider></v-divider>

                <v-card-actions>
                  <v-btn color="primary" text to="/profile">Perfil</v-btn>
                  <v-spacer></v-spacer>
                  <v-btn color="primary" text @click="logOut">cerrar sesión</v-btn>
                </v-card-actions>
              </v-card>
            </v-menu>
          </template>
          <template v-else>
            <v-btn text to="/sign-in">Mi cuenta</v-btn>
            <v-btn text to="/register">Publicar anuncio</v-btn>
          </template>
        </v-toolbar-items>
        <span @click.stop="drawer = !drawer" v-if="window.width < 1100">
          <v-app-bar-nav-icon color="blue"></v-app-bar-nav-icon>
        </span>
      </v-toolbar>
    </client-only>
    <v-container v-if="window.width > 1100" style="min-height: 700px;">
      <nuxt />
    </v-container>
    <v-sheet
      height="100%"
      class="overflow-hidden"
      style="position: relative; background: transparent; min-height: 700px; "
      v-if="window.width < 1100"
    >
      <v-container>
        <nuxt />
      </v-container>
      <client-only>
        <v-navigation-drawer v-model="drawer" absolute temporary>
          <v-list-item v-if="user.uid" to="/profile">
            <v-list-item-avatar>
              <img v-if="user.photo" :src="user.photo" :alt="user.displayName" />
              <img v-else src="../static/user.png" :alt="user.displayName" />
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title>{{user.displayName}}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-divider></v-divider>
          <v-list dense>
            <v-list-item-group>
              <template v-if="user.uid">
                <v-list-item class="pa-0">
                  <v-list-item-title>
                    <v-btn text @click="updateProfile">
                      Publicar anuncio
                      <v-chip x-small class="ma-2" color="orange" text-color="white">Gratis</v-chip>
                    </v-btn>
                  </v-list-item-title>
                </v-list-item>
                <v-list-item class="pa-0">
                  <v-list-item-title>
                    <v-btn text block @click="logOut">cerrar sesión</v-btn>
                  </v-list-item-title>
                </v-list-item>
              </template>
              <template v-else>
                <v-list-item class="pa-0">
                  <v-list-item-title>
                    <v-btn text to="/sign-in" block>Mi cuenta</v-btn>
                  </v-list-item-title>
                </v-list-item>
                <v-list-item class="pa-0">
                  <v-list-item-title>
                    <v-btn text to="/register" block>Publicar anuncio</v-btn>
                  </v-list-item-title>
                </v-list-item>
              </template>
            </v-list-item-group>
          </v-list>
        </v-navigation-drawer>
      </client-only>
    </v-sheet>
    <v-row justify="center">
      <v-dialog v-model="dialog" max-width="290">
        <v-card>
          <v-card-title style="font-size:20px">Por favor active la cuenta</v-card-title>
          <v-card-text>Debe activar la cuenta para crear un anuncio.</v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="green darken-1" text @click="dialog = false" to="/profile">Ir al perfil</v-btn>
            <v-btn color="green darken-1" text @click="dialog = false">cancelar</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
    <!-- <v-card height="80">
      <v-footer absolute class="font-weight-medium">
        <v-col class="text-center" cols="12">
          <strong>klkrd.com</strong>
        </v-col>
      </v-footer>
    </v-card>-->
  </v-app>
</template>

<script>
import { mapMutations } from "vuex";
// import nodemailer from "nodemailer";

export default {
  data() {
    return {
      notification: [],
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
      this.$vuetify.theme.dark = this.$store.state.dark;
    },
    user() {
      return this.$store.state.user;
    }
    // filterItem() {
    //   return this.items.filter(query => {
    //     var provincia = this.provincia
    //       ? query.provincia == this.provincia
    //       : true;

    //     return provincia;
    //   });
    // }
  },
  async created() {
    try {
      await this.$fireAnalytics;
    } catch (e) {
      console.log("e", e);
    }
  },
  // beforeCreate() {
  //   this.$store.dispatch("fetchCreds");
  // },
  created() {
    // notification ad after 90 day
    this.collections.forEach(collection => {
      this.$fireStore
        .collection(collection)
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            if (Date.now() > doc.data().history.after) {
              if (doc.data().notification === undefined) {
                this.$fireStore
                  .collection("users")
                  .where("id", "==", doc.data().uid)
                  .get()
                  .then(res => {
                    res.forEach(docU => {
                      let notifica = {
                        email: docU.data().email,
                        name: docU.data().name,
                        title: doc.data().title,
                        collection: collection,
                        id: doc.id
                      };
                      this.notification.push(notifica);
                    });
                  });
              }
            }
          });
        });
    });
    setTimeout(() => {
      this.notification.forEach(async notif => {
        const callable = this.$fireFunc.httpsCallable(
          "sendEmailNotificationActive"
        );
        await callable({
          email: notif.email,
          name: notif.name,
          title: notif.title,
          collection: notif.collection,
          id: notif.id
        });
        console.log("notification", notif.title);
      });
    }, 20000);
  },
  // watch: {
  //   model(val) {
  //     if (val != null) this.tab = 0;
  //     else this.tab = null;
  //   }
  //   search() {
  //     if (this.items.length > 0) return;
  //     this.collections.forEach(collection => {
  //       this.$fireStore
  //         .collection(collection)
  //         .get()
  //         .then(querySnapshot => {
  //           querySnapshot.forEach(doc => {
  //             const data = {
  //               title: doc.data().title,
  //               provincia: doc.data().provincia,
  //               id: doc.id,
  //               slug: collection
  //             };
  //             this.itemProvince.push(doc.data().provincia);
  //             this.items.push(data);
  //           });
  //           console.log("this.items", this.items);
  //         });
  //     });
  //   }
  // },
  mounted() {
    // this.collections.forEach(collection => {
    //   this.$fireStore
    //     .collection(collection)
    //     .get()
    //     .then(querySnapshot => {
    //       querySnapshot.forEach(doc => {
    //         this.itemP.push(doc.data().provincia);
    //         this.itemProvince = Array.from(new Set(this.itemP));
    //       });
    //     });
    // });
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
      this.$fireStore
        .collection("users")
        .where("id", "==", this.user.uid)
        .get()
        .then(querySnapshot => {
          if (!querySnapshot.empty && this.user.emailVerified) {
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
      logOut: "logOut",
      darkf: "darkf"
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
::-webkit-scrollbar {
  width: 5px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #f1f1f1;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #272727;
  border-radius: 20px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #007bff;
}
// .v-stepper__wrapper {
//   height: 0;
// }
</style>
