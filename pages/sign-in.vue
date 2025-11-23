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
    <v-form class="sign">
      <div class="text-center ma-2">
        <v-snackbar v-model="succes" top color="success">Welcome{{ user.displayName }}</v-snackbar>
      </div>
      <div class="text-center ma-2">
        <v-snackbar v-model="error" top color="error">{{ errMessages }}</v-snackbar>
      </div>
      <v-container>
        <v-row>
          <v-col sm="12">
            <v-text-field
              ref="email"
              type="email"
              v-model="email"
              label="Email"
              filled
              shaped
              required
              :rules="[() => !!email || 'Campo obligatorio',rulesEmail.required, rulesEmail.email]"
            ></v-text-field>
            <v-text-field
              ref="password"
              v-model="password"
              label="Password"
              filled
              shaped
              required
              :append-icon="show1 ? 'visibility' : 'visibility_off'"
              :rules="[() => !!password || 'Campo obligatorio',rulesPass.required, rulesPass.min]"
              :type="show1 ? 'text' : 'password'"
              hint="At least 8 characters"
              counter
              @click:append="show1 = !show1"
            ></v-text-field>
            <v-btn block color="blue" dark @click="login">Sign in</v-btn>
            <br />
            <!-- <v-divider></v-divider>
          <p class="overline text-center">OR</p>
          <v-btn class="mt-2" color="blue" block dark @click="google">
            <img src="../static/icons8-google-48.png" height="20px" />
            </v-btn>-->
            <br />
            <p class="overline text-center">
              Aún no tienes cuenta?
              <nuxt-link to="/register">Crear cuenta</nuxt-link>
            </p>
            <p class="overline text-center">
              <nuxt-link to="/reset-password">Olvidaste tu contraseña?</nuxt-link>
            </p>
          </v-col>
        </v-row>
      </v-container>
    </v-form>
  </div>
</template>
<script>
export default {
  head() {
    return {
      title: "login in Klkrd",
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
      loading: 0,
      succes: false,
      error: false,
      errMessages: "",
      email: "",
      password: "",
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
  mounted() {
    var that = this;
    setTimeout(() => {
      for (let index = 0; index <= 100; index++) {
        that.loading = index;
      }
    }, 1000);
  },
  beforeCreate() {
    if (this.$store.state.auth) {
      this.$router.push("/");
    }
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
    form() {
      return {
        email: this.email,
        password: this.password
      };
    }
  },

  watch: {
    email() {
      this.errorMessages = "";
    },
    password() {
      this.errorMessages = "";
    }
  },
  methods: {
    login: function(e) {
      if (this.form.email && this.form.password) {
        this.$fireAuth
          .signInWithEmailAndPassword(this.email, this.password)
          .then(() => {
            setTimeout(() => {
              this.$router.push("/publicar-anuncio");
              this.succes = true;
            }, 1000);
          })
          .catch(err => {
            this.errMessages = err.message;
            this.error = true;
          });
        e.preventDefault();
      } else {
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
.sign {
  margin: 100px auto !important;
  max-width: 500px;
}
</style>
