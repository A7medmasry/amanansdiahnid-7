<template>
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
            :rules="[() => !!email || 'This field is required',rulesEmail.required, rulesEmail.email]"
          ></v-text-field>
          <v-text-field
            ref="password"
            v-model="password"
            label="Password"
            filled
            shaped
            required
            :append-icon="show1 ? 'visibility' : 'visibility_off'"
            :rules="[() => !!password || 'This field is required',rulesPass.required, rulesPass.min]"
            :type="show1 ? 'text' : 'password'"
            hint="At least 8 characters"
            counter
            @click:append="show1 = !show1"
          ></v-text-field>
          <v-btn block color="blue" dark @click="login">Sign in</v-btn>
          <v-btn class="mt-2" color="blue" block dark @click="google">
            <img src="../static/icons8-google-48.png" height="20px" />
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>
<script>
import { mapMutations } from "vuex";
import { auth } from "@/plugins/firebase";
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
  data: function() {
    return {
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
  beforeCreate() {
    auth.onAuthStateChanged(user => {
      if (user) {
        this.$router.push("/");
      }
    });
  },
  computed: {
    user() {
      return this.$store.state.user.user;
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
    ...mapMutations({
      google: "user/google"
    }),
    login: function(e) {
      if (this.form.email && this.form.password) {
        auth
          .signInWithEmailAndPassword(this.email, this.password)
          .then(() => {
            this.$router.push("/publicar-anuncio");
            this.succes = true;
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
.sign {
  margin: 50px auto !important;
  max-width: 500px;
}
</style>
