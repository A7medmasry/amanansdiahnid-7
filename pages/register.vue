<template>
  <v-form class="register">
    <v-container>
      <v-row>
        <v-col sm="12">
          <v-text-field
            v-model="first"
            label="First Name"
            filled
            shaped
            ref="first"
            :rules="[() => !!first || 'This field is required']"
          ></v-text-field>
          <v-text-field
            v-model="last"
            ref="last"
            label="Last Name"
            filled
            shaped
            :rules="[() => !!last || 'This field is required']"
            :error-messages="errorMessages"
            required
          ></v-text-field>
          <v-text-field
            ref="email"
            type="email"
            v-model="email"
            label="Email"
            filled
            shaped
            :rules="[() => !!email || 'This field is required',rulesEmail.required, rulesEmail.email]"
          ></v-text-field>
          <v-text-field
            ref="password"
            v-model="password"
            label="Password"
            filled
            shaped
            :append-icon="show1 ? 'visibility' : 'visibility_off'"
            :rules="[() => !!password || 'This field is required',rulesPass.required, rulesPass.min]"
            :type="show1 ? 'text' : 'password'"
            hint="At least 8 characters"
            counter
            @click:append="show1 = !show1"
          ></v-text-field>
          <v-btn block color="blue" dark @click="register">Register Now</v-btn>
          <v-btn class="mt-2" color="blue" block dark @click="google">
            <img src="../static/icons8-google-48.png" height="20px" />
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>
<script>
import { auth } from "@/plugins/firebase";
import { mapMutations } from "vuex";

export default {
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
  data: function() {
    return {
      last: "",
      first: "",
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
    form() {
      return {
        last: this.last,
        first: this.first,
        email: this.email,
        password: this.password
      };
    }
  },

  watch: {
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
    }
  },
  methods: {
    ...mapMutations({
      google: "user/google"
    }),
    register: function(e) {
      if (
        this.form.last &&
        this.form.first &&
        this.form.email &&
        this.form.password
      ) {
        auth
          .createUserWithEmailAndPassword(this.email, this.password)
          .then(() => {
            auth.currentUser
              .updateProfile({
                displayName: this.first + " " + this.last
              })
              .then(() => {
                location.reload();
              });
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
.register {
  margin-top: 50px !important;
  max-width: 500px;
  margin: auto;
}
</style>
