<template>
  <div>
    <div class="lottie" :style="{ transform: `translate(0, ${loadingP}%)` }">
      <div class="lds-ellipsis">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
    <div class="register">
      <div class="text-center ma-2">
        <v-snackbar v-model="error" top color="error">{{ errMessages }}</v-snackbar>
      </div>
      <h1>CREAR UNA CUENTA</h1>
      <div>
        <v-stepper v-model="e1">
          <template>
            <v-stepper-header>
              <template>
                <v-stepper-step :complete="e1 > 1" :step="1">Tipo</v-stepper-step>
                <v-divider v-if="1 !== steps"></v-divider>
              </template>
              <template>
                <v-stepper-step :complete="e1 > 2" :step="2">Información de la cuenta</v-stepper-step>
                <v-divider v-if="2 !== steps"></v-divider>
              </template>
              <template>
                <v-stepper-step :complete="e1 > 3" :step="3">Contacto</v-stepper-step>
                <v-divider v-if="3 !== steps"></v-divider>
              </template>
              <template>
                <v-stepper-step :complete="e1 > 4" :step="4">Email</v-stepper-step>
                <v-divider v-if="4 !== steps"></v-divider>
              </template>
            </v-stepper-header>

            <v-stepper-items>
              <v-stepper-content :step="1">
                <div class="mb-12">
                  <v-row class="page">
                    <v-col sm="4">
                      <button
                        class="btn-cus"
                        :class="typeAccount && type=='personal' ? 'active': ''"
                        @click="typeAccountF('personal')"
                      >Personal</button>
                    </v-col>
                    <v-col sm="4">
                      <button
                        class="btn-cus"
                        :class="typeAccount && type=='agent' ? 'active': ''"
                        @click="typeAccountF('agent')"
                      >Agente</button>
                    </v-col>
                    <v-col sm="4">
                      <button
                        class="btn-cus"
                        :class="typeAccount && type=='store' ? 'active': ''"
                        @click="typeAccountF('store')"
                      >Tienda</button>
                    </v-col>
                  </v-row>
                </div>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <button class="btn-custom" @click="nextStep1()" v-if="e1!==4">
                    <v-icon medium>keyboard_arrow_right</v-icon>
                  </button>
                </v-card-actions>
              </v-stepper-content>
              <v-stepper-content :step="2">
                <div class="mb-12">
                  <div v-if="type == 'personal'" class="page">
                    <v-text-field
                      v-model="first"
                      label="Nombre"
                      ref="first"
                      :rules="[() => !!first || 'Campo obligatorio']"
                      required
                    ></v-text-field>
                    <v-text-field
                      v-model="last"
                      ref="last"
                      label="Apellido"
                      :rules="[() => !!last || 'Campo obligatorio']"
                      :error-messages="errorMessages"
                      required
                    ></v-text-field>
                  </div>
                  <div v-if="type == 'agent'" class="page">
                    <v-text-field
                      v-model="first"
                      label="Nombre"
                      ref="first"
                      :rules="[() => !!first || 'Campo obligatorio']"
                    ></v-text-field>
                    <v-text-field
                      v-model="last"
                      ref="last"
                      label="Apellido"
                      :rules="[() => !!last || 'Campo obligatorio']"
                      :error-messages="errorMessages"
                    ></v-text-field>
                    <v-text-field
                      v-model="store"
                      ref="store"
                      label="Nombre de la tienda"
                      :rules="[() => !!store || 'Campo obligatorio']"
                      :error-messages="errorMessages"
                    ></v-text-field>
                    <v-text-field
                      ref="rnc"
                      :rules="[() => !!rnc || 'Campo obligatorio',() => rnc.length === 11 && rnc != 0 || 'RNC number is incorrect' ]"
                      :error-messages="errorMessages"
                      v-model="rnc"
                      type="number"
                      label="RNC"
                    ></v-text-field>
                  </div>
                  <div v-if="type == 'store'" class="page">
                    <v-text-field
                      v-model="nameStore"
                      ref="nameStore"
                      label="Nombre de la tienda"
                      :rules="[() => !!nameStore || 'Campo obligatorio']"
                      :error-messages="errorMessages"
                    ></v-text-field>
                    <v-text-field
                      ref="rnc"
                      :rules="[() => !!rnc || 'Campo obligatorio',() => rnc.length === 11 && rnc != 0 || 'RNC number is incorrect' ]"
                      :error-messages="errorMessages"
                      v-model="rnc"
                      type="number"
                      label="RNC"
                    ></v-text-field>
                    <v-select
                      ref="delivery"
                      :rules="[() => !!delivery || 'Campo obligatorio']"
                      :error-messages="errorMessages"
                      v-model="delivery"
                      :items="itemYN"
                      label="Delivery"
                    ></v-select>
                    <v-select
                      ref="tienda"
                      :rules="[() => !!tienda || 'Campo obligatorio']"
                      :error-messages="errorMessages"
                      v-model="tienda"
                      :items="itemYN"
                      label="Tienda fisica"
                    ></v-select>
                    <v-select
                      ref="acpeta"
                      :rules="[() => !!acpeta || 'Campo obligatorio']"
                      :error-messages="errorMessages"
                      v-model="acpeta"
                      :items="itemYN"
                      label="Acpeta tarjeta"
                    ></v-select>
                    <v-select
                      ref="credito"
                      :rules="[() => !!credito || 'Campo obligatorio']"
                      :error-messages="errorMessages"
                      v-model="credito"
                      :items="itemYN"
                      label="Credito"
                    ></v-select>
                    <v-select
                      ref="garantia"
                      :rules="[() => !!garantia || 'Campo obligatorio']"
                      :error-messages="errorMessages"
                      v-model="garantia"
                      :items="itemYN"
                      label="Garantía"
                    ></v-select>
                    <v-textarea
                      ref="description"
                      v-model="description"
                      label="Comentar sobre la tienda"
                    ></v-textarea>
                  </div>
                </div>
                <v-card-actions>
                  <button class="btn-custom" @click="e1-- && (errFill = false)" v-if="e1!==1">
                    <v-icon medium>keyboard_arrow_left</v-icon>
                  </button>
                  <v-spacer></v-spacer>
                  <button class="btn-custom" @click="nextStep2()" v-if="e1!==4">
                    <v-icon medium>keyboard_arrow_right</v-icon>
                  </button>
                </v-card-actions>
              </v-stepper-content>
              <v-stepper-content :step="3">
                <div class="mb-12">
                  <div class="page">
                    <v-text-field
                      label="Numero de telefono"
                      ref="phone"
                      type="number"
                      :error-messages="errorMessages"
                      v-model="phone"
                      :rules="[() => !!phone || 'Campo obligatorio',() => (phone.length === 10 )&& phone != 0 || 'Número de teléfono incorrecto' ]"
                    ></v-text-field>
                    <v-text-field label="Usuario de instagram" ref="instagram" v-model="instagram"></v-text-field>
                    <v-text-field label="Usuario de Facebook" ref="facebook" v-model="facebook"></v-text-field>
                    <v-checkbox
                      class="pr-4"
                      v-model="whatapp"
                      label="Me pueden contactar por whatsapp"
                      color="blue"
                    ></v-checkbox>
                    <v-checkbox v-model="showEmail" label="Mostrar email en perfil" color="blue"></v-checkbox>
                    <div class="avatar-upload">
                      <div class="avatar-edit">
                        <input
                          @change="onFileChange"
                          type="file"
                          id="imageUpload"
                          accept=".png, .jpg, .jpeg"
                        />
                        <label for="imageUpload">
                          <v-icon>edit</v-icon>
                        </label>
                      </div>
                      <div class="avatar-preview">
                        <div class="defult" v-if="!imgProfile"></div>
                        <div :style="{ backgroundImage: 'url(' + imgProfile + ')' }"></div>
                      </div>
                    </div>
                  </div>
                </div>
                <v-card-actions>
                  <button class="btn-custom" @click="e1-- && (errFill = false)" v-if="e1!==1">
                    <v-icon medium>keyboard_arrow_left</v-icon>
                  </button>
                  <v-spacer></v-spacer>
                  <button class="btn-custom" @click="nextStep3()" v-if="e1!==4">
                    <v-icon medium>keyboard_arrow_right</v-icon>
                  </button>
                </v-card-actions>
              </v-stepper-content>
              <v-stepper-content :step="4">
                <div class="mb-12">
                  <v-row class="page">
                    <v-col sm="12">
                      <v-text-field
                        ref="email"
                        type="email"
                        v-model="email"
                        label="Email"
                        :error-messages="errorMessages"
                        :rules="[() => !!email || 'Campo obligatorio',rulesEmail.required, rulesEmail.email]"
                      ></v-text-field>
                      <v-text-field
                        ref="password"
                        v-model="password"
                        label="Contraseña"
                        :append-icon="show1 ? 'visibility' : 'visibility_off'"
                        :rules="[() => !!password || 'Campo obligatorio',rulesPass.required, rulesPass.min]"
                        :type="show1 ? 'text' : 'password'"
                        hint="At least 8 characters"
                        counter
                        @click:append="show1 = !show1"
                      ></v-text-field>
                      <v-text-field
                        ref="confirmPass"
                        v-model="confirmPass"
                        label="Confirmar contraseña"
                        :append-icon="show1 ? 'visibility' : 'visibility_off'"
                        :rules="[() => !!confirmPass || 'Campo obligatorio',rulesPass.required, rulesPass.min, () => confirmPass === password  || 'Password does not match']"
                        :type="show1 ? 'text' : 'password'"
                        hint="At least 8 characters"
                        counter
                        @click:append="show1 = !show1"
                      ></v-text-field>
                      <!-- <br />
                    <v-divider></v-divider>
                    <small class="overline">OR</small>
                    <v-btn class="mt-2 mb-2" color="blue" block dark @click="google">
                      <img src="../static/icons8-google-48.png" height="20px" />
                      </v-btn>-->
                      <small>
                        Tienes cuenta de gmail?
                        <nuxt-link to="/sign-in">Hacer login</nuxt-link>
                      </small>
                    </v-col>
                  </v-row>
                </div>
                <v-card-actions>
                  <button class="btn-custom" @click="e1-- && (errFill = false)" v-if="e1!==1">
                    <v-icon medium>keyboard_arrow_left</v-icon>
                  </button>
                  <v-spacer></v-spacer>

                  <button class="btn-custom" @click="register()">CREAR</button>
                </v-card-actions>
              </v-stepper-content>
              <v-alert type="error" v-if="errFill" text>Please fill in the fields</v-alert>
            </v-stepper-items>
          </template>
        </v-stepper>
      </div>
      <br />
      <br />
      <v-card>
        <Adsense data-ad-client="ca-pub-3374289978792695" data-ad-slot="9806134228"></Adsense>
      </v-card>
      <v-dialog v-model="loading" hide-overlay persistent width="300">
        <v-card color="primary" dark>
          <v-card-text>
            Creating Account
            <v-progress-linear indeterminate color="white" class="mb-0"></v-progress-linear>
          </v-card-text>
        </v-card>
      </v-dialog>
    </div>
  </div>
</template>
<script>
import firebase from "firebase/app";
import { mapMutations } from "vuex";
import Adsense from "../components/Adsense.vue";

export default {
  components: {
    Adsense
  },
  head() {
    return {
      title: "Register in Klkrd",
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
  data() {
    return {
      loadingP: 0,
      error: false,
      errMessages: "",
      loading: false,
      errFill: false,
      e1: 1,
      steps: 4,
      type: "",
      last: "",
      first: "",
      email: "",
      password: "",
      confirmPass: "",
      store: "",
      rnc: "",
      nameStore: "",
      delivery: "",
      tienda: "",
      acpeta: "",
      credito: "",
      garantia: "",
      description: "",
      phone: "",
      instagram: "",
      facebook: "",
      whatapp: "",
      showEmail: "",
      imgProfile: "",
      imgFileProfile: "",
      itemYN: ["Sí", "No"],
      typeAccount: false,
      errorMessages: "",
      show1: false,
      rulesPass: {
        required: value => !!value || "Required.",
        min: v => v.length >= 8 || "Min 8 characters",
        emailMatch: () => "The email and password you entered don't match"
      },
      rulesEmail: {
        required: value => !!value || "Required.",
        counter: value => value.length <= 20 || "Max 20 characters",
        email: value => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return pattern.test(value) || "Invalid e-mail.";
        }
      }
    };
  },
  beforeCreate() {
    if (this.$store.state.auth) {
      this.$router.push("/");
    }
  },
  mounted() {
    var that = this;
    setTimeout(() => {
      for (let index = 0; index <= 100; index++) {
        that.loadingP = index;
      }
    }, 1000);
  },
  computed: {
    form() {
      return {
        type: this.type,
        last: this.last,
        first: this.first,
        email: this.email,
        password: this.password,
        confirmPass: this.confirmPass,
        store: this.store,
        rnc: this.rnc,
        nameStore: this.nameStore,
        delivery: this.delivery,
        tienda: this.tienda,
        acpeta: this.acpeta,
        credito: this.credito,
        garantia: this.garantia,
        description: this.description,
        phone: this.phone,
        instagram: this.instagram,
        facebook: this.facebook
      };
    }
  },
  watch: {
    steps(val) {
      if (this.e1 > val) {
        this.e1 = val;
      }
    },
    type() {
      this.errorMessages = "";
    },
    last() {
      this.errorMessages = "";
    },
    first() {
      this.errorMessages = "";
    },
    email() {
      this.errorMessages = "";
    },
    password() {
      this.errorMessages = "";
    },
    confirmPass() {
      this.errorMessages = "";
    },
    store() {
      this.errorMessages = "";
    },
    rnc() {
      this.errorMessages = "";
    },
    nameStore() {
      this.errorMessages = "";
    },
    delivery() {
      this.errorMessages = "";
    },
    tienda() {
      this.errorMessages = "";
    },
    acpeta() {
      this.errorMessages = "";
    },
    credito() {
      this.errorMessages = "";
    },
    garantia() {
      this.errorMessages = "";
    },
    phone() {
      this.errorMessages = "";
    }
    // instagram() {
    //   this.errorMessages = "";
    // },
    // facebook() {
    //   this.errorMessages = "";
    // }
  },
  methods: {
    nextStep1() {
      if (this.form.type) {
        this.errFill = false;
        this.e1++;
      } else {
        this.errFill = true;
      }
    },
    nextStep2() {
      if (this.form.type == "personal") {
        if (this.form.last && this.form.first) {
          this.errFill = false;
          this.e1++;
        } else {
          this.errFill = true;
        }
      } else if (this.form.type == "agent") {
        if (
          this.form.last &&
          this.form.first &&
          this.form.store &&
          this.form.rnc
        ) {
          this.errFill = false;
          this.e1++;
        } else {
          this.errFill = true;
        }
      } else if (this.form.type == "store") {
        if (
          this.form.nameStore &&
          this.form.rnc.length === 11 &&
          this.form.delivery &&
          this.form.tienda &&
          this.form.acpeta &&
          this.form.credito &&
          this.form.garantia
        ) {
          this.errFill = false;
          this.e1++;
        } else {
          this.errFill = true;
        }
      }
    },
    nextStep3() {
      if (
        this.form.phone.length === 10
        // &&
        // this.form.instagram &&
        // this.form.facebook
      ) {
        this.errFill = false;
        this.e1++;
      } else {
        this.errFill = true;
      }
    },
    typeAccountF(type) {
      this.type = type;
      this.typeAccount = true;
    },

    onFileChange(e) {
      var files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      this.createImage(files[0]);
      this.imgFileProfile = files[0];
    },
    createImage(file) {
      var imgProfile = new Image();
      var reader = new FileReader();
      var vm = this;

      reader.onload = e => {
        vm.imgProfile = e.target.result;
      };
      reader.readAsDataURL(file);
    },
    // google() {
    //   this.$fireAuth
    //     .signInWithPopup(new firebase.auth.GoogleAuthProvider())
    //     .then(res => {
    //       this.loading = true;
    //       if (this.imgFileProfile) {
    //         let ref = this.$fireStorage.ref(
    //           "users/" + this.imgFileProfile.name
    //         );
    //         ref.put(this.imgFileProfile).then(() => {
    //           ref.getDownloadURL().then(img => {
    //             auth.currentUser.updateProfile({
    //               photoURL: img
    //             });
    //             var user = {
    //               type: this.type,
    //               last: this.last,
    //               first: this.first,
    //               email: res.user.email,
    //               password: this.password,
    //               store: this.store,
    //               rnc: this.rnc,
    //               nameStore: this.nameStore,
    //               delivery: this.delivery,
    //               tienda: this.tienda,
    //               acpeta: this.acpeta,
    //               credito: this.credito,
    //               garantia: this.garantia,
    //               description: this.description,
    //               phone: this.phone,
    //               instagram: this.instagram,
    //               facebook: this.facebook,
    //               whatapp: this.whatapp,
    //               showEmail: this.showEmail,
    //               name: this.first + " " + this.last,
    //               id: res.user.uid,
    //               photo: img
    //             };
    //             this.$fireStore
    //               .collection("users")
    //               .add(user)
    //               .then(() => {
    //                 setTimeout(() => {
    //                   location.reload();
    //                   this.loading = false;
    //                 }, 2000);
    //               });
    //           });
    //         });
    //       } else {
    //         var user = {
    //           type: this.type,
    //           last: this.last,
    //           first: this.first,
    //           email: res.user.email,
    //           password: this.password,
    //           store: this.store,
    //           rnc: this.rnc,
    //           nameStore: this.nameStore,
    //           delivery: this.delivery,
    //           tienda: this.tienda,
    //           acpeta: this.acpeta,
    //           credito: this.credito,
    //           garantia: this.garantia,
    //           description: this.description,
    //           phone: this.phone,
    //           instagram: this.instagram,
    //           facebook: this.facebook,
    //           whatapp: this.whatapp,
    //           showEmail: this.showEmail,
    //           name: this.first + " " + this.last,
    //           id: res.user.uid,
    //           photo: res.user.photoURL
    //         };
    //         this.$fireStore
    //           .collection("users")
    //           .add(user)
    //           .then(() => {
    //             setTimeout(() => {
    //               location.reload();
    //               this.loading = false;
    //             }, 2000);
    //           });
    //       }
    //     });
    // },
    register() {
      if (
        this.form.email &&
        this.form.password &&
        this.form.password === this.form.confirmPass
      ) {
        this.loading = true;
        this.errFill = false;
        this.$fireAuth
          .createUserWithEmailAndPassword(this.email, this.password)
          .then(res => {
            this.$fireAuth.currentUser
              .updateProfile({
                displayName: this.first + " " + this.last
              })
              .then(() => {
                if (this.imgFileProfile) {
                  let ref = this.$fireStorage.ref(
                    "users/" + this.imgFileProfile.name
                  );
                  ref.put(this.imgFileProfile).then(() => {
                    ref.getDownloadURL().then(img => {
                      var user = {
                        type: this.type,
                        last: this.last,
                        first: this.first,
                        email: this.email,
                        password: this.password,
                        store: this.store,
                        rnc: this.rnc,
                        nameStore: this.nameStore,
                        delivery: this.delivery,
                        tienda: this.tienda,
                        acpeta: this.acpeta,
                        credito: this.credito,
                        garantia: this.garantia,
                        description: this.description,
                        phone: this.phone,
                        instagram: this.instagram,
                        facebook: this.facebook,
                        whatapp: this.whatapp,
                        showEmail: this.showEmail,
                        name: this.first + " " + this.last,
                        id: res.user.uid,
                        photo: img
                      };
                      this.$fireStore
                        .collection("users")
                        .add(user)
                        .then(() => {
                          location.reload();
                          this.loading = false;
                        })
                        .catch(err => {
                          this.errMessages = err.message;
                          this.error = true;
                          this.loading = false;
                        });
                    });
                  });
                } else {
                  var user = {
                    type: this.type,
                    last: this.last,
                    first: this.first,
                    email: this.email,
                    password: this.password,
                    store: this.store,
                    rnc: this.rnc,
                    nameStore: this.nameStore,
                    delivery: this.delivery,
                    tienda: this.tienda,
                    acpeta: this.acpeta,
                    credito: this.credito,
                    garantia: this.garantia,
                    description: this.description,
                    phone: this.phone,
                    instagram: this.instagram,
                    facebook: this.facebook,
                    whatapp: this.whatapp,
                    showEmail: this.showEmail,
                    name: this.first + " " + this.last,
                    id: res.user.uid,
                    photo: ""
                  };
                  this.$fireStore
                    .collection("users")
                    .add(user)
                    .then(() => {
                      location.reload();
                      this.loading = false;
                    })
                    .catch(err => {
                      this.errMessages = err.message;
                      this.error = true;
                      this.loading = false;
                    });
                }
              })
              .catch(err => {
                this.errMessages = err.message;
                this.error = true;
                this.loading = false;
              });
          })
          .catch(err => {
            this.errMessages = err.message;
            this.error = true;
            this.loading = false;
          });
      } else {
        this.errFill = true;
        this.formHasErrors = false;
        Object.keys(this.form).forEach(f => {
          if (!this.form[f]) this.formHasErrors = true;
          this.$refs[f].validate(true);
        });
      }
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
.register {
  h1 {
    font-family: "Quicksand", sans-serif;
    text-align: center;
  }
  .page {
    // margin-top: 50px !important;
    text-align: center;
    max-width: 500px;
    margin: auto;
  }
  .btn-cus {
    border: 1px solid #1a69be;
    outline: none;
    padding: 10px 16px;
    background-color: transparent;
    cursor: pointer;
    font-size: 18px;
    width: 150px;
    color: #989898;
    transition: 1s;
  }

  /* Style the active class, and buttons on mouse-over */
  .active,
  .btn-cus:hover {
    background-color: #0079ea;
    color: white;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  }
  .btn-custom {
    width: 120px;
    height: 40px;
    background: none;
    border: 4px solid;
    color: #0079ea;
    font-weight: 700;
    text-transform: uppercase;
    cursor: pointer;
    font-size: 16px;
    position: relative;
    float: right;
  }

  .btn-custom::before,
  .btn-custom::after {
    content: "";
    position: absolute;
    width: 14px;
    height: 4px;
    background: #303030;
    transform: skewX(50deg);
    transition: 0.4s linear;
  }

  .btn-custom::before {
    top: -4px;
    left: 10%;
  }

  .btn-custom::after {
    bottom: -4px;
    right: 10%;
  }

  .btn-custom:hover::before {
    left: 80%;
  }

  .btn-custom:hover::after {
    right: 80%;
  }

  .avatar-upload {
    position: relative;
    max-width: 205px;
    margin: 50px auto;
    .avatar-edit {
      position: absolute;
      right: 12px;
      z-index: 1;
      top: 10px;
      input {
        display: none;
        + label {
          display: inline-block;
          width: 34px;
          height: 34px;
          margin-bottom: 0;
          border-radius: 100%;
          background: #989898;
          border: 1px solid transparent;
          box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.12);
          cursor: pointer;
          font-weight: normal;
          transition: all 0.2s ease-in-out;
          padding: 3px;
          &:hover {
            background: #0079ea;
            border-color: #989898;
          }
        }
      }
    }
    .avatar-preview {
      width: 192px;
      height: 192px;
      position: relative;
      border-radius: 100%;
      border: 6px solid #f8f8f8;
      box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.1);
      > div {
        width: 100%;
        height: 100%;
        border-radius: 100%;
        background-size: cover;
        background-repeat: no-repeat;
        background-position: center;
      }
      .defult {
        background-image: url("../static/user.png");
      }
    }
  }
}
</style>
