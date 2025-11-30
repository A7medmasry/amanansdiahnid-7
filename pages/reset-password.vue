<template>
  <v-form class="reset">
    <div class="text-center ma-2">
      <v-snackbar v-model="error" top color="error">{{ errMessages }}</v-snackbar>
    </div>
    <v-container>
      <h2 v-if="checkM" style="text-algin: center">
        Consultar su correo electrónico
        <nuxt-link to="/sign-in">mi cuenta</nuxt-link>
      </h2>
      <v-row v-if="!checkM">
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
          <v-btn block color="blue" @click="resetPassword()">Restablecer la contraseña</v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>
<script>
export default {
  data: function() {
    return {
      succes: false,
      error: false,
      errMessages: "",
      email: "",
      errorMessages: "",
      checkM: "",
      show1: false,
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
  computed: {
    user() {
      return this.$store.state.user;
    },
    form() {
      return {
        email: this.email
      };
    }
  },

  watch: {
    email() {
      this.errorMessages = "";
    }
  },
  methods: {
    resetPassword() {
      if (this.form.email) {
        this.$fireAuth
          .sendPasswordResetEmail(this.email)
          .then(() => {
            this.checkM = true;
            this.email = "";
          })
          .catch(err => {
            this.errMessages = err.message;
            this.error = true;
          });
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
.reset {
  margin: 50px auto !important;
  max-width: 500px;
}
</style>
