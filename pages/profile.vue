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
    <v-container>
      <div class="profile">
        <v-snackbar v-model="error" bottom="bottom" color="error">adsense deleted</v-snackbar>
        <v-snackbar v-model="update" bottom="bottom" color="info">adsense updated</v-snackbar>
        <v-snackbar v-model="updateProfile" bottom="bottom" color="info">profile updated</v-snackbar>
        <h1>Información del perfil</h1>
        <v-row>
          <v-col cols="12" lg="7">
            <v-sheet elevation="12" class="pa-10 pb-12" style="max-width:700px">
              <div class="avatar-upload">
                <div class="avatar-edit">
                  <input @change="onFileChange" type="file" id="imageUpload" />
                  <label for="imageUpload">
                    <v-icon>edit</v-icon>
                  </label>
                </div>
                <div class="avatar-preview">
                  <div :style="{ backgroundImage: 'url(' + imgProfile + ')' }" v-if="imgProfile"></div>
                  <div
                    :style="{ backgroundImage: 'url(' + photo + ')' }"
                    v-if="photo && !imgProfile"
                  ></div>
                  <div class="defult" v-if="!photo && !imgProfile"></div>
                </div>
              </div>
              <v-text-field
                v-model="phone"
                label="Numero de telefono"
                ref="phone"
                type="number"
                :rules="[() => !!phone || 'Campo obligatorio',() => phone.length === 10 && phone != 0 || 'Número de teléfono incorrecto' ]"
                :error-messages="errorMessages"
                required
              ></v-text-field>
              <v-text-field label="Usuario de instagram" v-model="instagram"></v-text-field>
              <v-text-field label="Usuario de Facebook" v-model="facebook"></v-text-field>
              <v-select
                :items="items"
                label="account type"
                v-model="type"
                ref="type"
                :rules="[() => !!type || 'Campo obligatorio']"
                :error-messages="errorMessages"
                required
              ></v-select>
              <v-text-field
                v-if="type == 'store'"
                v-model="nameStore"
                ref="nameStore"
                label="Name"
                :rules="[() => !!nameStore || 'Campo obligatorio']"
                :error-messages="errorMessages"
              ></v-text-field>
              <v-text-field
                v-if="type == 'store' || type == 'agent'"
                ref="rnc"
                :rules="[() => !!rnc || 'Campo obligatorio',() => rnc.length === 11 && rnc != 0 || 'RNC number is incorrect' ]"
                :error-messages="errorMessages"
                v-model="rnc"
                type="number"
                label="RNC"
              ></v-text-field>
              <v-select
                v-if="type == 'store'"
                ref="delivery"
                :rules="[() => !!delivery || 'Campo obligatorio']"
                :error-messages="errorMessages"
                v-model="delivery"
                :items="itemYN"
                label="Delivery"
              ></v-select>
              <v-select
                v-if="type == 'store'"
                ref="tienda"
                :rules="[() => !!tienda || 'Campo obligatorio']"
                :error-messages="errorMessages"
                v-model="tienda"
                :items="itemYN"
                label="Tienda fisica"
              ></v-select>
              <v-select
                v-if="type == 'store'"
                ref="acpeta"
                :rules="[() => !!acpeta || 'Campo obligatorio']"
                :error-messages="errorMessages"
                v-model="acpeta"
                :items="itemYN"
                label="Acpeta tarjeta"
              ></v-select>
              <v-select
                v-if="type == 'store'"
                ref="credito"
                :rules="[() => !!credito || 'Campo obligatorio']"
                :error-messages="errorMessages"
                v-model="credito"
                :items="itemYN"
                label="Credito"
              ></v-select>
              <v-select
                v-if="type == 'store'"
                ref="garantia"
                :rules="[() => !!garantia || 'Campo obligatorio']"
                :error-messages="errorMessages"
                v-model="garantia"
                :items="itemYN"
                label="Garantía"
              ></v-select>
              <v-text-field
                v-if="type == 'agent'"
                v-model="store"
                ref="store"
                label="Name store"
                :rules="[() => !!store || 'Campo obligatorio']"
                :error-messages="errorMessages"
              ></v-text-field>
              <v-textarea
                v-if="type == 'store'"
                ref="description"
                :rules="[() => !!description || 'Campo obligatorio']"
                :error-messages="errorMessages"
                v-model="description"
                label="De mediouso con algunos rasgunos, funciona bein, lo vendo por motive de viaje."
              ></v-textarea>
              <div style="display:flex;">
                <v-checkbox class="pr-4" v-model="whatapp" label="WhatApp" color="blue"></v-checkbox>
                <v-checkbox v-model="showEmail" label="Show email" color="blue"></v-checkbox>
              </div>
              <v-btn class="ma-2" tile outlined color="success" v-if="this.user.emailVerified">
                <v-icon left>done</v-icon>Correo verificado
              </v-btn>
              <v-btn
                color="error"
                tile
                outlined
                v-if="!this.user.emailVerified"
                @click="emailVerified()"
              >Verificar correo electrónico</v-btn>
              <br />
              <small v-if="checkM || !this.user.emailVerified">Consultar su correo electrónico</small>
              <v-alert type="error" v-if="errFillPro" text>Por favor complete los campos</v-alert>

              <button class="btn-custom" @click="save()">salvar</button>
              <br />
            </v-sheet>
          </v-col>
          <v-col cols="12" lg="5">
            <v-card>
              <Adsense data-ad-client="ca-pub-3374289978792695" data-ad-slot="9806134228"></Adsense>
            </v-card>
          </v-col>
        </v-row>
        <br />
        <br />
        <h1 v-if="ads[0]">Mis anuncios</h1>
        <v-dialog v-if="adEdit" v-model="sheetEdit" max-width="600">
          <template v-slot:activator="{ on }">
            <v-row>
              <v-col cols="12" lg="6" v-for="ad in ads" :key="ad.id">
                <v-card>
                  <v-carousel
                    :continuous="false"
                    :show-arrows="false"
                    hide-delimiter-background
                    delimiter-icon="mdi-minus"
                    height="300"
                  >
                    <v-carousel-item v-for="(slide, i) in ad.imgs" :key="i" :src="slide">
                      <template v-slot:placeholder>
                        <v-row class="fill-height ma-0" align="center" justify="center">
                          <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                        </v-row>
                      </template>
                    </v-carousel-item>
                  </v-carousel>
                  <v-list two-line>
                    <v-expand-transition>
                      <div v-show="showAd && ad.id == showAdId">
                        <v-card-title>
                          <nuxt-link
                            :to=" '/' + ad.category + '/' + ad.id"
                          >{{ad.title.toUpperCase()}}</nuxt-link>
                        </v-card-title>
                        <v-card-subtitle>
                          <v-icon>query_builder</v-icon>
                          {{ new Date(ad.history.now).toLocaleDateString()}} {{new Date(ad.history.now).toLocaleTimeString('en-US', { hour12: true })}}
                          <span
                            class="ml-4"
                          >{{ad.currency}} {{ad.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}}</span>
                        </v-card-subtitle>
                        <v-card-text>{{ad.description}}</v-card-text>
                        <v-divider></v-divider>
                      </div>
                    </v-expand-transition>
                    <v-list-item>
                      <v-card-title v-show="!showAd || !(ad.id == showAdId)">
                        <nuxt-link
                          :to="'/' + ad.category + '/' + ad.id"
                        >{{ad.title.length > 21 ? ad.title.toUpperCase().substring(0,20)+"...": ad.title.toUpperCase()}}</nuxt-link>
                      </v-card-title>
                      <v-btn icon>
                        <v-icon
                          :large="!(!showAd || !(ad.id == showAdId))"
                          color="blue darken-2"
                          v-on="on"
                          @click="adsEdit(ad.id, ad.category)"
                        >edit</v-icon>
                      </v-btn>
                      <v-btn icon>
                        <v-icon
                          :large="!(!showAd || !(ad.id == showAdId))"
                          color="red darken-2"
                          @click="deletedAds(ad.category, ad.id, ad.imgs)"
                        >delete</v-icon>
                      </v-btn>
                      <v-btn
                        v-if="Date.now() > ad.history.after"
                        @click="active(ad.category, ad.id)"
                      >active</v-btn>
                      <v-spacer></v-spacer>
                      <v-btn icon @click="showAds(ad.id)">
                        <v-icon>{{ showAd ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
                      </v-btn>
                    </v-list-item>
                  </v-list>
                </v-card>
              </v-col>
            </v-row>
          </template>
          <v-card>
            <div class="pa-6">
              <v-text-field
                ref="title"
                label="title"
                :rules="[() => !!adEdit.title || 'Campo obligatorio']"
                v-model="adEdit.title"
                :error-messages="errorMessages"
                required
              ></v-text-field>
              <v-text-field
                ref="price"
                label="price"
                :rules="[() => !!adEdit.price || 'Campo obligatorio']"
                v-model="adEdit.price"
                :error-messages="errorMessages"
                required
              ></v-text-field>
              <v-select
                ref="currency"
                label="currency"
                :items="itemCurrency"
                :rules="[() => !!adEdit.currency || 'Campo obligatorio']"
                v-model="adEdit.currency"
                :error-messages="errorMessages"
                required
              ></v-select>
              <v-select
                ref="provincia"
                label="provincia"
                :items="itemProvince"
                :rules="[() => !!adEdit.provincia || 'Campo obligatorio']"
                v-model="adEdit.provincia"
                :error-messages="errorMessages"
                required
              ></v-select>
              <!-- inmueebles en venta and alquiler -->
              <span
                v-if="adEdit.category == 'inmueebles-en-alquiler' ||
              adEdit.category == 'inmueebles-en-venta'"
              >
                <v-select
                  ref="bathroom"
                  label="bathroom"
                  :items="itemN"
                  :rules="[() => !!adEdit.bathroom || 'Campo obligatorio']"
                  v-model="adEdit.bathroom"
                  :error-messages="errorMessages"
                  required
                ></v-select>
                <v-select
                  ref="room"
                  label="room"
                  :items="itemN"
                  :rules="[() => !!adEdit.room || 'Campo obligatorio']"
                  v-model="adEdit.room"
                  :error-messages="errorMessages"
                  required
                ></v-select>
                <v-select
                  ref="round"
                  label="round"
                  :items="itemN"
                  :rules="[() => !!adEdit.round || 'Campo obligatorio']"
                  v-model="adEdit.round"
                  :error-messages="errorMessages"
                  required
                ></v-select>
                <v-text-field
                  ref="space"
                  label="space"
                  :rules="[() => !!adEdit.space || 'Campo obligatorio']"
                  v-model="adEdit.space"
                  :error-messages="errorMessages"
                  required
                ></v-text-field>
                <v-select
                  ref="type"
                  label="type"
                  :items="itemType"
                  :rules="[() => !!adEdit.type || 'Campo obligatorio']"
                  v-model="adEdit.type"
                  :error-messages="errorMessages"
                  required
                ></v-select>
              </span>
              <!-- vehiculos -->
              <span v-if="adEdit.category == 'vehiculos'">
                <v-text-field
                  ref="year"
                  :rules="[() => !!adEdit.year || 'Campo obligatorio']"
                  :error-messages="errorMessages"
                  v-model="adEdit.year"
                  label="Año"
                ></v-text-field>
                <v-text-field
                  ref="kilos"
                  :rules="[() => !!adEdit.kilos || 'Campo obligatorio']"
                  :error-messages="errorMessages"
                  v-model="adEdit.kilos"
                  label="Kilometraje"
                ></v-text-field>
                <v-select
                  ref="fuel"
                  :rules="[() => !!adEdit.fuel || 'Campo obligatorio']"
                  :error-messages="errorMessages"
                  v-model="adEdit.fuel"
                  :items="itemFuel"
                  label="Fuel"
                ></v-select>
                <v-select
                  ref="transmi"
                  :rules="[() => !!adEdit.transmi || 'Campo obligatorio']"
                  :error-messages="errorMessages"
                  v-model="adEdit.transmi"
                  :items="itemTransmi"
                  label="Transmisión"
                ></v-select>
                <v-select
                  ref="trac"
                  :rules="[() => !!adEdit.trac || 'Campo obligatorio']"
                  :error-messages="errorMessages"
                  v-model="adEdit.trac"
                  :items="itemTrac"
                  label="Tracción"
                ></v-select>
                <v-text-field
                  ref="exterior"
                  :rules="[() => !!adEdit.exterior || 'Campo obligatorio']"
                  :error-messages="errorMessages"
                  v-model="adEdit.exterior"
                  label="Color exterior"
                ></v-text-field>
                <v-text-field
                  ref="interior"
                  :rules="[() => !!adEdit.interior || 'Campo obligatorio']"
                  :error-messages="errorMessages"
                  v-model="adEdit.interior"
                  label="Color interior"
                ></v-text-field>
                <v-text-field
                  ref="faros"
                  :rules="[() => !!adEdit.faros || 'Campo obligatorio']"
                  :error-messages="errorMessages"
                  v-model="adEdit.faros"
                  label="Faros"
                ></v-text-field>
                <v-select
                  ref="tipo"
                  :rules="[() => !!adEdit.tipo || 'Campo obligatorio']"
                  :error-messages="errorMessages"
                  v-model="adEdit.tipo"
                  :items="itemTpio"
                  label="Tipo"
                ></v-select>
                <v-text-field
                  ref="marca"
                  :rules="[() => !!adEdit.marca || 'Campo obligatorio']"
                  :error-messages="errorMessages"
                  v-model="adEdit.marca"
                  label="Marca"
                ></v-text-field>
                <v-text-field
                  ref="modelo"
                  :rules="[() => !!adEdit.modelo || 'Campo obligatorio']"
                  :error-messages="errorMessages"
                  v-model="adEdit.modelo"
                  label="Modelo"
                ></v-text-field>
                <v-select
                  ref="aire"
                  :rules="[() => !!adEdit.aire || 'Campo obligatorio']"
                  :error-messages="errorMessages"
                  v-model="adEdit.aire"
                  :items="itemYN"
                  label="Aire acondicionado"
                ></v-select>
                <v-select
                  ref="limpia"
                  :rules="[() => !!adEdit.limpia || 'Campo obligatorio']"
                  :error-messages="errorMessages"
                  v-model="adEdit.limpia"
                  :items="itemYN"
                  label="Limpia vidrios trasero"
                ></v-select>
                <v-select
                  ref="pintura"
                  :rules="[() => !!adEdit.pintura || 'Campo obligatorio']"
                  :error-messages="errorMessages"
                  v-model="adEdit.pintura"
                  :items="itemYN"
                  label="Pintura de fábrica"
                ></v-select>
                <v-select
                  ref="vidrios"
                  :rules="[() => !!adEdit.vidrios || 'Campo obligatorio']"
                  :error-messages="errorMessages"
                  v-model="adEdit.vidrios"
                  :items="itemYN"
                  label="Vidrios eléctricos"
                ></v-select>
                <v-select
                  ref="aros"
                  :rules="[() => !!adEdit.aros || 'Campo obligatorio']"
                  :error-messages="errorMessages"
                  v-model="adEdit.aros"
                  :items="itemYN"
                  label="Aros de fábrica"
                ></v-select>
                <v-select
                  ref="bolsa"
                  :rules="[() => !!adEdit.bolsa || 'Campo obligatorio']"
                  :error-messages="errorMessages"
                  v-model="adEdit.bolsa"
                  :items="itemYN"
                  label="Bolsa de Aire"
                ></v-select>
                <v-select
                  ref="asientos"
                  :rules="[() => !!adEdit.asientos || 'Campo obligatorio']"
                  :error-messages="errorMessages"
                  v-model="adEdit.asientos"
                  :items="itemYN"
                  label="Asientos en piel"
                ></v-select>
                <v-select
                  ref="radio"
                  :rules="[() => !!adEdit.radio || 'Campo obligatorio']"
                  :error-messages="errorMessages"
                  v-model="adEdit.radio"
                  :items="itemYN"
                  label="Radio AM/FM"
                ></v-select>
                <v-select
                  ref="cd"
                  :rules="[() => !!adEdit.cd || 'Campo obligatorio']"
                  :error-messages="errorMessages"
                  v-model="adEdit.cd"
                  :items="itemYN"
                  label="CD player"
                ></v-select>
                <v-select
                  ref="cantidad"
                  :rules="[() => !!adEdit.cantidad || 'Campo obligatorio']"
                  :error-messages="errorMessages"
                  v-model="adEdit.cantidad"
                  :items="itemN"
                  label="Cantidad de puertas"
                ></v-select>
                <v-select
                  ref="motor"
                  :rules="[() => !!adEdit.motor || 'Campo obligatorio']"
                  :error-messages="errorMessages"
                  v-model="adEdit.motor"
                  :items="itemN"
                  label="Motor/CC"
                ></v-select>
              </span>
              <span
                v-if="adEdit.category == 'bebes-y-ninos' ||
                    adEdit.category == 'hogar' ||
                    adEdit.category == 'moda-y-belleza' ||
                    adEdit.category == 'deportes-y-entertenimiento' ||
                    adEdit.category == 'electronica' ||
                    adEdit.category == 'negocios-y-servicios'"
              >
                <v-select
                  ref="status"
                  :rules="[() => !!adEdit.status || 'Campo obligatorio']"
                  :error-messages="errorMessages"
                  v-model="adEdit.status"
                  :items="itemStatus"
                  label="Condición"
                ></v-select>
              </span>
              <span v-if="adEdit.category == 'animales-y-mascotas'">
                <v-text-field
                  v-model="adEdit.age"
                  label="age"
                  ref="age"
                  :rules="[() => !!adEdit.age || 'Campo obligatorio']"
                  :error-messages="errorMessages"
                ></v-text-field>
              </span>
              <v-textarea
                ref="description"
                label="description"
                :rules="[() => !!adEdit.description || 'Campo obligatorio']"
                v-model="adEdit.description"
                :error-messages="errorMessages"
                required
              ></v-textarea>
              <v-row>
                <v-col v-for="img in adEdit.imgs" :key="img.url" style="height:100%">
                  <v-hover v-slot:default="{ hover }">
                    <v-img
                      :src="img.url"
                      aspect-ratio="1"
                      class="grey lighten-2"
                      width="100%"
                      max-height="150"
                    >
                      <template v-slot:placeholder>
                        <v-row class="fill-height ma-0" align="center" justify="center">
                          <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                        </v-row>
                      </template>
                      <v-row
                        class="fill-height ma-0"
                        align="center"
                        justify="center"
                        v-if="hover && !img.deleted"
                      >
                        <v-btn icon @click="removeImg(img.url)">
                          <v-icon color="red darken-2" large>delete</v-icon>
                        </v-btn>
                      </v-row>
                      <v-row
                        class="fill-height ma-0"
                        align="center"
                        justify="center"
                        v-if="hover && img.deleted"
                      >
                        <v-btn icon @click="restoreImg(img.url)">
                          <v-icon color="blue darken-2" large>mdi-close</v-icon>
                        </v-btn>
                      </v-row>
                    </v-img>
                  </v-hover>
                </v-col>
              </v-row>
              <v-file-input
                small-chips
                multiple="true"
                label="add images"
                accept="image/*"
                v-model="newImg"
              ></v-file-input>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-alert type="error" v-if="errFill" text>Por favor complete los campos</v-alert>
                <v-btn
                  color="green darken-1"
                  text
                  @click="updateAd(adEdit.title, adEdit.price, adEdit.currency, adEdit.provincia,
                                adEdit.bathroom, adEdit.room, adEdit.round, adEdit.space, adEdit.type,
                                adEdit.year, adEdit.kilos, adEdit.fuel, adEdit.transmi, adEdit.trac,
                                adEdit.exterior, adEdit.interior, adEdit.faros, adEdit.tipo, adEdit.marca,
                                adEdit.modelo, adEdit.aire, adEdit.limpia, adEdit.pintura, adEdit.vidrios,
                                adEdit.aros, adEdit.bolsa, adEdit.asientos, adEdit.radio, adEdit.cd,
                                adEdit.cantidad, adEdit.motor, adEdit.status, adEdit.description, adEdit.id, adEdit.category, adEdit.age)"
                >update</v-btn>
                <v-btn color="error darken-1" text @click="sheetEdit = !sheetEdit">close</v-btn>
              </v-card-actions>
              <v-progress-linear
                :active="upload"
                :indeterminate="upload"
                absolute
                bottom
                color="blue accent-4"
              ></v-progress-linear>
            </div>
          </v-card>
        </v-dialog>
        <v-card>
          <Adsense data-ad-client="ca-pub-3374289978792695" data-ad-slot="9806134228"></Adsense>
        </v-card>
      </div>
    </v-container>
  </div>
</template>
<script>
import Adsense from "../components/Adsense.vue";
import firebase from "firebase/app";

export default {
  components: {
    Adsense
  },
  data() {
    return {
      loadingP: 0,
      certain: false,
      errFill: false,
      errFillPro: false,
      error: false,
      update: false,
      updateProfile: false,
      window: {
        width: 0,
        height: 0
      },
      ads: [],
      adEdit: [],
      remImg: [],
      newImg: [],
      edit: false,
      whatapp: false,
      showEmail: false,
      model: null,
      errorMessages: null,
      phone: "",
      type: "",
      instagram: "",
      facebook: "",
      twitter: "",
      store: "",
      rnc: "",
      nameStore: "",
      delivery: "",
      tienda: "",
      acpeta: "",
      credito: "",
      garantia: "",
      description: "",
      photo: "",
      imgProfile: "",
      imgFileProfile: "",
      itemYN: ["Sí", "No"],
      items: ["store", "agent", "personal"],
      itemFuel: [
        "Gasolina",
        "Diesel",
        "Propano",
        "Gas natural",
        "Electrico",
        "Híbrido"
      ],
      itemTransmi: ["Mecánica", "Automática", "Triptónica"],
      itemTrac: ["FWD", "RWD", "AWD", "4WD", "4X4"],
      itemTpio: [
        "Carro",
        "Jeepeta",
        "Camioneta",
        "Autobús",
        "Minibus",
        "Pasola",
        "Motocicleta",
        "Camión",
        "Construcción",
        "Montacargas",
        "Industrial"
      ],
      itemStatus: ["Nuevo", "Usado", "Partes y piezas"],
      itemStatusB: ["Nuevo", "Usado"],
      itemProvince: [
        "Distrito Nacional",
        "Santo Domingo, Este",
        "Santo Domingo, Oeste",
        "Santo Domingo, Norte",
        "Santiago",
        "Santiago Rodríguez",
        "La Romana",
        "La Altagracia",
        "Puerto Plata",
        "La Vega",
        "Monseñor Nouel",
        "Sánchez Ramírez",
        "Duarte",
        "Hermanas Mirabal",
        "María Trinidad Sánchez",
        "Samaná",
        "Dajabón",
        "Monte Cristi",
        "Valverde",
        "Peravia",
        "Azua",
        "San José de Ocoa",
        "San Cristóbal",
        "Elías Piña",
        "San Juan",
        "Barahona",
        "Bahoruco",
        "Independencia",
        "Pedernales",
        "El Seibo",
        "Hato Mayor",
        "Monte Plata",
        "San Pedro de Macorís",
        "Interior del pais"
      ],
      itemCurrency: ["US$", "RD$"],
      itemN: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
      itemType: ["Sin Amueblar", "Amueblar"],
      itemYN: ["Sí", "No"],
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
      ],
      cycle: false,
      showAd: false,
      showAdId: "",
      sheetEdit: false,
      placeholder: "",
      loading: false,
      upload: false,
      checkM: false
    };
  },
  beforeCreate() {
    if (!this.$store.state.auth) {
      this.$router.push("/");
    }
  },
  mounted() {
    var that = this;
    if (this.user) {
      setTimeout(() => {
        for (let index = 0; index <= 100; index++) {
          that.loadingP = index;
        }
      }, 3000);
    }

    this.$nextTick(function() {
      window.addEventListener("resize", this.getWindowWidth);
      this.getWindowWidth();
    });
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.getWindowWidth);
  },
  beforeMount() {
    setTimeout(() => {
      if (this.user.uid) {
        this.$fireStore
          .collection("users")
          .where("id", "==", this.user.uid)
          .get()
          .then(querySnapshot => {
            querySnapshot.forEach(doc => {
              this.phone = doc.data().phone;
              this.type = doc.data().type;
              this.instagram = doc.data().instagram;
              this.facebook = doc.data().facebook;
              this.whatapp = doc.data().whatapp;
              this.showEmail = doc.data().showEmail;
              this.store = doc.data().store;
              this.rnc = doc.data().rnc;
              this.nameStore = doc.data().nameStore;
              this.delivery = doc.data().delivery;
              this.tienda = doc.data().tienda;
              this.acpeta = doc.data().acpeta;
              this.credito = doc.data().credito;
              this.garantia = doc.data().garantia;
              this.description = doc.data().description;
              this.photo = doc.data().photo;
              this.edit = true;
            });
          });
        this.collections.forEach(collection => {
          this.$fireStore
            .collection(collection)
            .where("uid", "==", this.user.uid)
            .get()
            .then(res => {
              res.forEach(doc => {
                var urlt = [];
                firebase
                  .storage()
                  .ref()
                  .child(`ads/${doc.id}`)
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
                  });
                const data = {
                  category: collection,
                  id: doc.id,
                  title: doc.data().title,
                  price: doc.data().price,
                  history: doc.data().history,
                  description: doc.data().description,
                  currency: doc.data().currency,
                  imgs: urlt
                };
                this.ads.push(data);
              });
            });
        });
      }
    }, 3000);
  },
  methods: {
    active(category, id) {
      const activeAd = {
        history: {
          now: Date.now(),
          after: Date.now() + 7776000000
        }
      };
      this.$fireStore
        .collection(category)
        .doc(id)
        .update(activeAd)
        .then(() => {
          location.reload();
        });
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
    getWindowWidth() {
      this.window.width = document.documentElement.clientWidth;
    },
    customFilter(item, queryText) {
      const textOne = item.name.toLowerCase();
      const textTwo = item.abbr.toLowerCase();
      const searchText = queryText.toLowerCase();

      return (
        textOne.indexOf(searchText) > -1 || textTwo.indexOf(searchText) > -1
      );
    },
    save() {
      if (this.form1.phone.length === 10 && this.form1.type) {
        this.errFillPro = false;
        this.$fireStore
          .collection("users")
          .where("id", "==", this.user.uid)
          .get()
          .then(querySnapshot => {
            if (querySnapshot.docs.length === 0) {
              if (this.imgFileProfile) {
                let ref = firebase
                  .storage()
                  .ref("users/" + this.imgFileProfile.name);
                ref.put(this.imgFileProfile).then(() => {
                  ref.getDownloadURL().then(img => {
                    const addUser = {
                      phone: this.phone,
                      type: this.type,
                      whatapp: this.whatapp,
                      showEmail: this.showEmail,
                      instagram: this.instagram,
                      facebook: this.facebook,
                      name: this.user.displayName,
                      email: this.user.email,
                      id: this.user.uid,
                      store: this.store,
                      rnc: this.rnc,
                      nameStore: this.nameStore,
                      delivery: this.delivery,
                      tienda: this.tienda,
                      acpeta: this.acpeta,
                      credito: this.credito,
                      garantia: this.garantia,
                      description: this.description,
                      photo: img
                    };
                    this.$fireStore
                      .collection("users")
                      .add(addUser)
                      .then(() => {
                        this.updateProfile = true;
                        setTimeout(() => {
                          this.updateProfile = false;
                        }, 2000);
                      });
                  });
                });
              } else {
                const addUser = {
                  phone: this.phone,
                  type: this.type,
                  whatapp: this.whatapp,
                  showEmail: this.showEmail,
                  instagram: this.instagram,
                  facebook: this.facebook,
                  name: this.user.displayName,
                  email: this.user.email,
                  id: this.user.uid,
                  photo: this.user.photoURL,
                  store: this.store,
                  rnc: this.rnc,
                  nameStore: this.nameStore,
                  delivery: this.delivery,
                  tienda: this.tienda,
                  acpeta: this.acpeta,
                  credito: this.credito,
                  garantia: this.garantia,
                  description: this.description
                };
                this.$fireStore
                  .collection("users")
                  .add(addUser)
                  .then(() => {
                    this.updateProfile = true;
                    setTimeout(() => {
                      this.updateProfile = false;
                    }, 2000);
                  });
              }
            } else {
              if (this.imgFileProfile) {
                let ref = firebase
                  .storage()
                  .ref("users/" + this.imgFileProfile.name);
                ref.put(this.imgFileProfile).then(() => {
                  ref.getDownloadURL().then(img => {
                    const updateUser = {
                      phone: this.phone,
                      type: this.type,
                      whatapp: this.whatapp,
                      showEmail: this.showEmail,
                      instagram: this.instagram,
                      facebook: this.facebook,
                      name: this.user.displayName,
                      email: this.user.email,
                      store: this.store,
                      rnc: this.rnc,
                      nameStore: this.nameStore,
                      delivery: this.delivery,
                      tienda: this.tienda,
                      acpeta: this.acpeta,
                      credito: this.credito,
                      garantia: this.garantia,
                      description: this.description,
                      photo: img
                    };
                    this.$fireStore
                      .collection("users")
                      .doc(querySnapshot.docs[0].id)
                      .update(updateUser)
                      .then(() => {
                        this.updateProfile = true;
                        setTimeout(() => {
                          this.updateProfile = false;
                        }, 2000);
                        firebase
                          .storage()
                          .refFromURL(this.photo)
                          .delete();
                      });
                  });
                });
              } else {
                const updateUser = {
                  phone: this.phone,
                  type: this.type,
                  whatapp: this.whatapp,
                  showEmail: this.showEmail,
                  instagram: this.instagram,
                  facebook: this.facebook,
                  name: this.user.displayName,
                  email: this.user.email,
                  photo: this.photo,
                  store: this.store,
                  rnc: this.rnc,
                  nameStore: this.nameStore,
                  delivery: this.delivery,
                  tienda: this.tienda,
                  acpeta: this.acpeta,
                  credito: this.credito,
                  garantia: this.garantia,
                  description: this.description
                };
                this.$fireStore
                  .collection("users")
                  .doc(querySnapshot.docs[0].id)
                  .update(updateUser)
                  .then(() => {
                    this.updateProfile = true;
                    setTimeout(() => {
                      this.updateProfile = false;
                    }, 2000);
                  });
              }
            }
          });
      } else {
        this.errFillPro = true;
      }
    },
    emailVerified() {
      // emailVerified
      this.checkM = true;
      if (!this.user.emailVerified) {
        var user = this.$fireAuth.currentUser;
        user.sendEmailVerification();
      }
    },
    showAds(id) {
      this.showAd = !this.showAd;
      this.showAdId = id;
    },
    adsEdit(id, category) {
      this.adEdit = [];
      this.$fireStore
        .collection(category)
        .doc(id)
        .get()
        .then(res => {
          var urlt = [];
          firebase
            .storage()
            .ref()
            .child(`ads/${res.id}`)
            .listAll()
            .then(function(res) {
              res.items.forEach(i => {
                firebase
                  .storage()
                  .ref()
                  .child(i.location.path)
                  .getDownloadURL()
                  .then(url => {
                    urlt.push({ url, deleted: false });
                  });
              });
            });
          const data = {
            ...res.data(),
            category: category,
            id: res.id,
            imgs: urlt
          };
          this.adEdit = data;
        });
    },
    updateAd(
      title,
      price,
      currency,
      provincia,
      bathroom,
      room,
      round,
      space,
      type,
      year,
      kilos,
      fuel,
      transmi,
      trac,
      exterior,
      interior,
      faros,
      tipo,
      marca,
      modelo,
      aire,
      limpia,
      pintura,
      vidrios,
      aros,
      bolsa,
      asientos,
      radio,
      cd,
      cantidad,
      motor,
      status,
      description,
      id,
      category,
      age
    ) {
      // dont finish
      if (
        this.adEdit.imgs.length > this.remImg.length ||
        this.newImg.length > 0
      ) {
        this.errFill = true;
        if (
          this.adEdit.category == "inmueebles-en-alquiler" ||
          this.adEdit.category == "inmueebles-en-venta"
        ) {
          if (
            this.formUpdate.title &&
            this.formUpdate.price &&
            this.formUpdate.currency &&
            this.formUpdate.provincia &&
            this.formUpdate.bathroom &&
            this.formUpdate.room &&
            this.formUpdate.round &&
            this.formUpdate.space &&
            this.formUpdate.type &&
            this.formUpdate.status &&
            this.formUpdate.description
          ) {
            this.errFill = false;
            const updateAD = {
              title: title,
              price: price,
              status: status,
              provincia: provincia,
              currency: currency,
              description: description,
              room: room,
              bathroom: bathroom,
              space: space,
              type: type,
              round: round
            };
            this.$fireStore
              .doc(`${category}/${id}`)
              .update(updateAD)
              .then(() => {
                this.upload = true;
                if (!this.remImg.length && !this.newImg.length) {
                  this.update = true;
                  setTimeout(() => {
                    this.update = false;
                    location.reload();
                  }, 2000);
                }
                if (this.remImg.length) {
                  this.remImg.forEach(res => {
                    firebase
                      .storage()
                      .refFromURL(res.img)
                      .delete()
                      .then(() => {
                        this.update = true;
                        setTimeout(() => {
                          this.update = false;
                          location.reload();
                        }, 2000);
                      });
                  });
                }
                if (this.newImg.length) {
                  this.newImg.forEach(res => {
                    firebase
                      .storage()
                      .ref(`ads/${id}/${res.name}`)
                      .put(res)
                      .then(() => {
                        this.update = true;
                        setTimeout(() => {
                          this.update = false;
                          location.reload();
                        }, 2000);
                      });
                  });
                }
              });
          } else {
            this.errFill = true;
          }
        } else if (this.adEdit.category == "vehiculos") {
          if (
            this.formUpdate.title &&
            this.formUpdate.price &&
            this.formUpdate.currency &&
            this.formUpdate.provincia &&
            this.formUpdate.year &&
            this.formUpdate.kilos &&
            this.formUpdate.fuel &&
            this.formUpdate.transmi &&
            this.formUpdate.trac &&
            this.formUpdate.exterior &&
            this.formUpdate.interior &&
            this.formUpdate.faros &&
            this.formUpdate.tipo &&
            this.formUpdate.marca &&
            this.formUpdate.modelo &&
            this.formUpdate.aire &&
            this.formUpdate.limpia &&
            this.formUpdate.pintura &&
            this.formUpdate.vidrios &&
            this.formUpdate.aros &&
            this.formUpdate.bolsa &&
            this.formUpdate.asientos &&
            this.formUpdate.radio &&
            this.formUpdate.cd &&
            this.formUpdate.cantidad &&
            this.formUpdate.motor &&
            this.formUpdate.status &&
            this.formUpdate.description
          ) {
            this.errFill = false;
            const updateAD = {
              title: title,
              price: price,
              status: status,
              provincia: provincia,
              currency: currency,
              description: description,
              year: year,
              kilos: kilos,
              fuel: fuel,
              transmi: transmi,
              trac: trac,
              exterior: exterior,
              interior: interior,
              faros: faros,
              tipo: tipo,
              marca: marca,
              modelo: modelo,
              aire: aire,
              limpia: limpia,
              pintura: pintura,
              vidrios: vidrios,
              aros: aros,
              bolsa: bolsa,
              asientos: asientos,
              radio: radio,
              cd: cd,
              cantidad: cantidad,
              motor: motor
            };
            this.$fireStore
              .doc(`${category}/${id}`)
              .update(updateAD)
              .then(() => {
                this.upload = true;
                if (!this.remImg.length && !this.newImg.length) {
                  this.update = true;
                  setTimeout(() => {
                    this.update = false;
                    location.reload();
                  }, 2000);
                }
                if (this.remImg.length) {
                  this.remImg.forEach(res => {
                    firebase
                      .storage()
                      .refFromURL(res.img)
                      .delete()
                      .then(() => {
                        this.update = true;
                        setTimeout(() => {
                          this.update = false;
                          location.reload();
                        }, 2000);
                      });
                  });
                }
                if (this.newImg.length) {
                  this.newImg.forEach(res => {
                    firebase
                      .storage()
                      .ref(`ads/${id}/${res.name}`)
                      .put(res)
                      .then(() => {
                        this.update = true;
                        setTimeout(() => {
                          this.update = false;
                          location.reload();
                        }, 2000);
                      });
                  });
                }
              });
          } else {
            this.errFill = true;
          }
        } else if (this.adEdit.category == "animales-y-mascotas") {
          if (
            this.formUpdate.title &&
            this.formUpdate.price &&
            this.formUpdate.currency &&
            this.formUpdate.provincia &&
            this.formUpdate.description &&
            this.formUpdate.age
          ) {
            this.errFill = false;
            const updateAD = {
              title: title,
              price: price,
              age: age,
              provincia: provincia,
              currency: currency,
              description: description
            };
            this.$fireStore
              .doc(`${category}/${id}`)
              .update(updateAD)
              .then(() => {
                this.upload = true;
                if (!this.remImg.length && !this.newImg.length) {
                  this.update = true;
                  setTimeout(() => {
                    this.update = false;
                    location.reload();
                  }, 2000);
                }
                if (this.remImg.length) {
                  this.remImg.forEach(res => {
                    firebase
                      .storage()
                      .refFromURL(res.img)
                      .delete()
                      .then(() => {
                        this.update = true;
                        setTimeout(() => {
                          this.update = false;
                          location.reload();
                        }, 2000);
                      });
                  });
                }
                if (this.newImg.length) {
                  this.newImg.forEach(res => {
                    firebase
                      .storage()
                      .ref(`ads/${id}/${res.name}`)
                      .put(res)
                      .then(() => {
                        this.update = true;
                        setTimeout(() => {
                          this.update = false;
                          location.reload();
                        }, 2000);
                      });
                  });
                }
              });
          } else {
            this.errFill = true;
          }
        } else {
          if (
            this.formUpdate.title &&
            this.formUpdate.price &&
            this.formUpdate.currency &&
            this.formUpdate.provincia &&
            this.formUpdate.description &&
            this.formUpdate.status
          ) {
            this.errFill = false;
            const updateAD = {
              title: title,
              provincia: provincia,
              price: price,
              status: status,
              currency: currency,
              description: description
            };
            this.$fireStore
              .doc(`${category}/${id}`)
              .update(updateAD)
              .then(() => {
                this.upload = true;
                if (!this.remImg.length && !this.newImg.length) {
                  this.update = true;
                  setTimeout(() => {
                    this.update = false;
                    location.reload();
                  }, 2000);
                }
                if (this.remImg.length) {
                  this.remImg.forEach(res => {
                    firebase
                      .storage()
                      .refFromURL(res.img)
                      .delete()
                      .then(() => {
                        this.update = true;
                        setTimeout(() => {
                          this.update = false;
                          location.reload();
                        }, 2000);
                      });
                  });
                }
                if (this.newImg.length) {
                  this.newImg.forEach(res => {
                    firebase
                      .storage()
                      .ref(`ads/${id}/${res.name}`)
                      .put(res)
                      .then(() => {
                        this.update = true;
                        setTimeout(() => {
                          this.update = false;
                          location.reload();
                        }, 2000);
                      });
                  });
                }
              });
          } else {
            this.errFill = true;
          }
        }
      } else {
        this.errFill = true;
      }
    },
    deletedAds(category, id, imgs) {
      if (confirm("you are want delete this!")) {
        this.$fireStore
          .doc(`${category}/${id}`)
          .delete()
          .then(() => {
            imgs.forEach(async (img, i) => {
              this.error = true;
              await firebase
                .storage()
                .refFromURL(img)
                .delete();
              if ((imgs.length = i + 1)) {
                this.error = false;
                location.reload();
              }
            });
          });
      }
    },
    removeImg(img) {
      this.remImg.push({ img });
      this.adEdit.imgs.filter(ele => {
        if (ele.url == img) {
          ele.deleted = true;
        }
      });
    },
    restoreImg(img) {
      for (var i = 0; i < this.remImg.length; i++) {
        if (this.remImg[i].img === img) {
          this.remImg.splice(i, 1);
        }
      }
      this.adEdit.imgs.filter(ele => {
        if (ele.url == img) {
          ele.deleted = false;
        }
      });
    }
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
    form1() {
      return {
        phone: this.phone,
        type: this.type
      };
    },
    formUpdate() {
      return {
        title: this.adEdit.title,
        price: this.adEdit.price,
        currency: this.adEdit.currency,
        provincia: this.adEdit.provincia,
        bathroom: this.adEdit.bathroom,
        room: this.adEdit.room,
        round: this.adEdit.round,
        space: this.adEdit.space,
        type: this.adEdit.type,
        year: this.adEdit.year,
        kilos: this.adEdit.kilos,
        fuel: this.adEdit.fuel,
        transmi: this.adEdit.transmi,
        trac: this.adEdit.trac,
        exterior: this.adEdit.exterior,
        interior: this.adEdit.interior,
        faros: this.adEdit.faros,
        tipo: this.adEdit.tipo,
        marca: this.adEdit.marca,
        modelo: this.adEdit.modelo,
        aire: this.adEdit.aire,
        limpia: this.adEdit.limpia,
        pintura: this.adEdit.pintura,
        vidrios: this.adEdit.vidrios,
        aros: this.adEdit.aros,
        bolsa: this.adEdit.bolsa,
        asientos: this.adEdit.asientos,
        radio: this.adEdit.radio,
        cd: this.adEdit.cd,
        cantidad: this.adEdit.cantidad,
        motor: this.adEdit.motor,
        status: this.adEdit.status,
        description: this.adEdit.description,
        age: this.adEdit.age
      };
    }
  },
  watch: {
    phone() {
      this.errorMessages = "";
    },
    type() {
      this.errorMessages = "";
    },
    title() {
      this.errorMessages = "";
    },
    price() {
      this.errorMessages = "";
    },
    status() {
      this.errorMessages = "";
    },
    provincia() {
      this.errorMessages = "";
    },
    currency() {
      this.errorMessages = "";
    },
    description() {
      this.errorMessages = "";
    },
    number() {
      this.errorMessages = "";
    },
    img() {
      this.errorMessages = "";
    },
    //category 1,2
    room() {
      this.errorMessages = "";
    },
    bathroom() {
      this.errorMessages = "";
    },
    space() {
      this.errorMessages = "";
    },
    type() {
      this.errorMessages = "";
    },
    round() {
      this.errorMessages = "";
    },
    //category 3
    year() {
      this.errorMessages = "";
    },
    kilos() {
      this.errorMessages = "";
    },
    feul() {
      this.errorMessages = "";
    },
    transmi() {
      this.errorMessages = "";
    },
    trac() {
      this.errorMessages = "";
    },
    exterior() {
      this.errorMessages = "";
    },
    interior() {
      this.errorMessages = "";
    },
    faros() {
      this.errorMessages = "";
    },
    tipo() {
      this.errorMessages = "";
    },
    marca() {
      this.errorMessages = "";
    },
    modelo() {
      this.errorMessages = "";
    },
    aire() {
      this.errorMessages = "";
    },
    limpia() {
      this.errorMessages = "";
    },
    pintura() {
      this.errorMessages = "";
    },
    vidrios() {
      this.errorMessages = "";
    },
    aros() {
      this.errorMessages = "";
    },
    bolsa() {
      this.errorMessages = "";
    },
    asientos() {
      this.errorMessages = "";
    },
    radio() {
      this.errorMessages = "";
    },
    cd() {
      this.errorMessages = "";
    },
    cantidad() {
      this.errorMessages = "";
    },
    motor() {
      this.errorMessages = "";
    },
    age() {
      this.errorMessages = "";
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
.profile {
  h1 {
    font-family: "Quicksand", sans-serif;
    margin-bottom: 10px;
  }
  .btn-custom {
    width: 120px;
    height: 40px;
    background: none;
    border: 4px solid;
    color: #3498db;
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
    background: #212121;
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
