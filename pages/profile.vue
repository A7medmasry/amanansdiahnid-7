<template>
  <div class="profile">
    <v-card class="overflow-hidden" color="lighten-1" :class="dark ? 'black' : 'white'">
      <v-toolbar flat color="blue">
        <v-icon>mdi-account</v-icon>
        <v-toolbar-title class="font-weight-light">Profile</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn v-if="edit" color="blue darken-3" fab small @click="isEditing = !isEditing">
          <v-icon v-if="isEditing">mdi-close</v-icon>
          <v-icon v-else>mdi-pencil</v-icon>
        </v-btn>
      </v-toolbar>
      <v-card-text>
        <v-text-field :disabled="true" color="blue" label="Email" v-model="user.email"></v-text-field>
        <v-text-field :disabled="true" color="blue" label="Name" v-model="user.displayName"></v-text-field>
        <v-row justify="space-around">
          <v-checkbox
            :disabled="!isEditing"
            v-model="whatapp"
            label="WhatApp"
            color="blue"
            class="mr-4"
          ></v-checkbox>
          <v-checkbox
            :disabled="!isEditing"
            v-model="showEmail"
            label="Show email"
            color="blue"
            class="mr-4"
          ></v-checkbox>

          <!-- <v-checkbox :disabled="!isEditing" v-model="darku" label="Site dark" color="blue"></v-checkbox> -->
        </v-row>
        <v-text-field
          :disabled="!isEditing"
          color="blue"
          label="Phone Number"
          ref="phone"
          :rules="[() => !!phone || 'This field is required']"
          :error-messages="errorMessages"
          required
          v-model="phone"
        ></v-text-field>
        <v-text-field
          :disabled="!isEditing"
          color="blue"
          label="Link Instagram"
          v-model="instagram"
        ></v-text-field>
        <v-text-field :disabled="!isEditing" color="blue" label="Link Facebook" v-model="facebook"></v-text-field>
        <v-text-field :disabled="!isEditing" color="blue" label="Link Twitter" v-model="twitter"></v-text-field>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue" :disabled="!isEditing" @click="save">Save</v-btn>
      </v-card-actions>
      <v-snackbar
        v-model="hasSaved"
        :timeout="2000"
        absolute
        bottom
        left
      >Your profile has been updated</v-snackbar>
    </v-card>
  </div>
</template>
<script>
import { db } from "@/plugins/firebase";

export default {
  middleware: "authenticated",
  data() {
    return {
      edit: false,
      whatapp: false,
      showEmail: false,
      hasSaved: false,
      isEditing: null,
      model: null,
      errorMessages: null,
      phone: "",
      instagram: "",
      facebook: "",
      twitter: ""
      // darku: false
    };
  },
  beforeMount() {
    setTimeout(() => {
      if (this.user.uid) {
        db.collection("users")
          .where("id", "==", this.user.uid)
          .get()
          .then(querySnapshot => {
            querySnapshot.forEach(doc => {
              this.phone = doc.data().phone;
              this.instagram = doc.data().instagram;
              this.twitter = doc.data().twitter;
              this.facebook = doc.data().facebook;
              this.whatapp = doc.data().whatapp;
              this.showEmail = doc.data().showEmail;
              // this.darku = doc.data().dark
              this.edit = true;
            });
          });
      }
    }, 3000);
  },
  methods: {
    customFilter(item, queryText) {
      const textOne = item.name.toLowerCase();
      const textTwo = item.abbr.toLowerCase();
      const searchText = queryText.toLowerCase();

      return (
        textOne.indexOf(searchText) > -1 || textTwo.indexOf(searchText) > -1
      );
    },
    save() {
      db.collection("users")
        .where("id", "==", this.user.uid)
        .get()
        .then(querySnapshot => {
          console.log(querySnapshot.docs[0].id);
          if (!querySnapshot.docs[0].id) {
            if (this.form1.phone) {
              const addUser = {
                phone: this.phone,
                whatapp: this.whatapp,
                showEmail: this.showEmail,
                instagram: this.instagram,
                facebook: this.facebook,
                twitter: this.twitter,
                // dark: this.darku,
                name: this.user.displayName,
                email: this.user.email,
                id: this.user.uid,
                photo: this.user.photoURL
              };
              db.collection("users")
                .add(addUser)
                .then(() => {
                  this.isEditing = !this.isEditing;
                  this.hasSaved = true;
                });
            } else {
              this.formHasErrors = false;
              Object.keys(this.form1).forEach(f => {
                if (!this.form1[f]) this.formHasErrors = true;
                this.$refs[f].validate(true);
              });
            }
          } else {
            console.log("yes");
            const addUser = {
              phone: this.phone,
              whatapp: this.whatapp,
              showEmail: this.showEmail,
              instagram: this.instagram,
              facebook: this.facebook,
              twitter: this.twitter,
              // dark: this.darku,
              name: this.user.displayName,
              email: this.user.email,
              id: this.user.uid,
              photo: this.user.photoURL
            };
            db.collection("users")
              .doc(querySnapshot.docs[0].id)
              .update(addUser)
              .then(() => {
                this.isEditing = !this.isEditing;
                this.hasSaved = true;
                // location.reload()
              });
          }
        });
    }
  },
  computed: {
    user() {
      return this.$store.state.user.user;
    },
    dark() {
      return this.$store.state.user.dark;
    },
    form1() {
      return {
        phone: this.phone
      };
    }
  },
  watch: {
    phone() {
      this.errorMessages = "";
    }
  }
};
</script>
<style lang="scss">
.profile {
  max-width: 600px;
  margin: auto;
}
</style>
