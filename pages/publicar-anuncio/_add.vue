<template>
  <div>
    <v-stepper v-model="e6" vertical>
      <div class="text-center ma-2">
        <v-snackbar v-model="succes" top color="success">{{ textSuc }}</v-snackbar>
      </div>
      <div class="text-center ma-2">
        <v-snackbar v-model="error" top color="error">{{ textErr }}</v-snackbar>
      </div>
      <div class="text-center">
        <v-overlay :value="upload != 0">
          <v-progress-circular
            :rotate="-90"
            :size="100"
            :width="15"
            :value="upload"
            color="primary"
          >{{ Math.floor(upload) }}</v-progress-circular>
        </v-overlay>
      </div>

      <v-stepper-step :complete="e6 > 1" step="1">Que vendes?</v-stepper-step>
      <v-stepper-content step="1">
        <v-card color="grey lighten-1" class="mb-12 pa-5">
          <v-row>
            <v-col cols="12" class="pa-1">
              <v-text-field
                ref="title"
                :rules="[() => !!title || 'Campo obligatorio']"
                :error-messages="errorMessages"
                required
                v-model="title"
                label="Titulo del post"
                solo
              ></v-text-field>
            </v-col>
            <v-col cols="12" class="pa-1">
              <v-select
                ref="sub"
                :rules="[() => !!sub || 'Campo obligatorio']"
                :error-messages="errorMessages"
                v-model="sub"
                :items="itemSub"
                label="Subcategoria"
                solo
              ></v-select>
            </v-col>
          </v-row>
          <Adsense data-ad-client="ca-pub-3374289978792695" data-ad-slot="9806134228"></Adsense>
        </v-card>
        <v-btn color="primary" @click="nuxt1">Continue</v-btn>
      </v-stepper-content>

      <v-stepper-step :complete="e6 > 2" step="2">Precio, tipo de moneda y localidad</v-stepper-step>
      <v-stepper-content step="2">
        <v-card color="grey lighten-1" class="mb-12 pa-5">
          <v-row>
            <v-col cols="12" sm="6" class="pa-1">
              <v-text-field
                ref="price"
                :rules="[() => !!price || 'Campo obligatorio',() => price > 0 && price != 0 || 'Price number is incorrect' ]"
                :error-messages="errorMessages"
                v-model="price"
                type="number"
                label="Precio"
                solo
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" class="pa-1">
              <v-select
                ref="currency"
                :rules="[() => !!currency || 'Campo obligatorio']"
                :error-messages="errorMessages"
                v-model="currency "
                :items="itemCurrency "
                label="Moneda"
                solo
              ></v-select>
            </v-col>
            <v-col cols="12" sm="6" class="pa-1">
              <v-select
                ref="provincia"
                :rules="[() => !!provincia || 'Campo obligatorio']"
                :error-messages="errorMessages"
                v-model="provincia"
                :items="itemProvince"
                label="Provincia"
                solo
              ></v-select>
            </v-col>
          </v-row>
          <Adsense data-ad-client="ca-pub-3374289978792695" data-ad-slot="9806134228"></Adsense>
        </v-card>
        <v-btn color="primary" @click="nuxt2">Continue</v-btn>
        <v-btn text @click="e6 = 1">Cancel</v-btn>
      </v-stepper-content>

      <!-- change code -->
      <v-stepper-step :complete="e6 > 3" step="3">Detalles del articulo</v-stepper-step>
      <v-stepper-content step="3">
        <v-card color="grey lighten-1" class="mb-12 pa-5">
          <!-- category 1 -->
          <v-row
            v-if="this.$route.params.add == 'inmueebles-en-alquiler' || this.$route.params.add == 'inmueebles-en-venta'"
          >
            <v-col cols="12" sm="4" class="pa-1">
              <v-select
                ref="room"
                :rules="[() => !!room || 'Campo obligatorio']"
                :error-messages="errorMessages"
                v-model="room"
                :items="itemN"
                label="Número de Habitaciones"
                solo
              ></v-select>
            </v-col>
            <v-col cols="12" sm="4" class="pa-1">
              <v-select
                ref="round"
                :rules="[() => !!round || 'Campo obligatorio']"
                :error-messages="errorMessages"
                v-model="round"
                :items="itemN"
                label="Numero de salas"
                solo
              ></v-select>
            </v-col>
            <v-col cols="12" sm="4" class="pa-1">
              <v-select
                ref="bathroom"
                :rules="[() => !!bathroom || 'Campo obligatorio']"
                :error-messages="errorMessages"
                v-model="bathroom"
                :items="itemN"
                label="Número de Baños"
                solo
              ></v-select>
            </v-col>
            <v-col cols="12" sm="4" class="pa-1">
              <v-select
                ref="type"
                :rules="[() => !!type || 'Campo obligatorio']"
                :error-messages="errorMessages"
                v-model="type"
                :items="itemType"
                label="Amueblado"
                solo
              ></v-select>
            </v-col>
            <v-col cols="12" sm="4" class="pa-1">
              <v-text-field
                ref="space"
                :rules="[() => !!space || 'Campo obligatorio']"
                :error-messages="errorMessages"
                v-model="space"
                label="Construcción"
                solo
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="4" class="pa-1">
              <v-select
                ref="status"
                :rules="[() => !!status || 'Campo obligatorio']"
                :error-messages="errorMessages"
                v-model="status"
                :items="itemStatus"
                label="Condición"
                solo
              ></v-select>
            </v-col>
          </v-row>
          <!-- category 2 -->
          <v-row v-if="this.$route.params.add == 'vehiculos'">
            <v-col cols="12" sm="4" class="pa-1">
              <v-text-field
                ref="year"
                :rules="[() => !!year || 'Campo obligatorio']"
                :error-messages="errorMessages"
                v-model="year"
                label="Año"
                solo
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="4" class="pa-1">
              <v-text-field
                ref="kilos"
                :rules="[() => !!kilos || 'Campo obligatorio']"
                :error-messages="errorMessages"
                v-model="kilos"
                label="Kilometraje"
                solo
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="4" class="pa-1">
              <v-select
                ref="fuel"
                :rules="[() => !!fuel || 'Campo obligatorio']"
                :error-messages="errorMessages"
                v-model="fuel"
                :items="itemFuel"
                label="Fuel"
                solo
              ></v-select>
            </v-col>
            <v-col cols="12" sm="4" class="pa-1">
              <v-select
                ref="transmi"
                :rules="[() => !!transmi || 'Campo obligatorio']"
                :error-messages="errorMessages"
                v-model="transmi"
                :items="itemTransmi"
                label="Transmisión"
                solo
              ></v-select>
            </v-col>
            <v-col cols="12" sm="4" class="pa-1">
              <v-select
                ref="trac"
                :rules="[() => !!trac || 'Campo obligatorio']"
                :error-messages="errorMessages"
                v-model="trac"
                :items="itemTrac"
                label="Tracción"
                solo
              ></v-select>
            </v-col>
            <v-col cols="12" sm="4" class="pa-1">
              <v-text-field
                ref="exterior"
                :rules="[() => !!exterior || 'Campo obligatorio']"
                :error-messages="errorMessages"
                v-model="exterior"
                label="Color exterior"
                solo
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="4" class="pa-1">
              <v-text-field
                ref="interior"
                :rules="[() => !!interior || 'Campo obligatorio']"
                :error-messages="errorMessages"
                v-model="interior"
                label="Color interior"
                solo
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="4" class="pa-1">
              <!-- <v-text-field
                ref="faros"
                :rules="[() => !!faros || 'Campo obligatorio']"
                :error-messages="errorMessages"
                v-model="faros"
                label="Faros"
                solo
              ></v-text-field>-->
              <v-select
                ref="faros"
                :rules="[() => !!faros || 'Campo obligatorio']"
                :error-messages="errorMessages"
                v-model="faros"
                :items="itemFaros"
                label="Faros"
                solo
              ></v-select>
            </v-col>
            <!-- <v-col cols="12" sm="4" class="pa-1">
              <v-select
                ref="tipo"
                :rules="[() => !!tipo || 'Campo obligatorio']"
                :error-messages="errorMessages"
                v-model="tipo"
                :items="itemTpio"
                label="Tipo"
                solo
              ></v-select>
            </v-col>-->
            <v-col cols="12" sm="4" class="pa-1">
              <v-text-field
                ref="marca"
                :rules="[() => !!marca || 'Campo obligatorio']"
                :error-messages="errorMessages"
                v-model="marca"
                label="Marca"
                solo
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="4" class="pa-1">
              <v-text-field
                ref="modelo"
                :rules="[() => !!modelo || 'Campo obligatorio']"
                :error-messages="errorMessages"
                v-model="modelo"
                label="Modelo"
                solo
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="4" class="pa-1">
              <v-select
                ref="aire"
                :rules="[() => !!aire || 'Campo obligatorio']"
                :error-messages="errorMessages"
                v-model="aire"
                :items="itemYN"
                label="Aire acondicionado"
                solo
              ></v-select>
            </v-col>
            <v-col cols="12" sm="4" class="pa-1">
              <v-select
                ref="limpia"
                :rules="[() => !!limpia || 'Campo obligatorio']"
                :error-messages="errorMessages"
                v-model="limpia"
                :items="itemYN"
                label="Limpia vidrios trasero"
                solo
              ></v-select>
            </v-col>
            <v-col cols="12" sm="4" class="pa-1">
              <v-select
                ref="pintura"
                :rules="[() => !!pintura || 'Campo obligatorio']"
                :error-messages="errorMessages"
                v-model="pintura"
                :items="itemYN"
                label="Pintura de fábrica"
                solo
              ></v-select>
            </v-col>
            <v-col cols="12" sm="4" class="pa-1">
              <v-select
                ref="vidrios"
                :rules="[() => !!vidrios || 'Campo obligatorio']"
                :error-messages="errorMessages"
                v-model="vidrios"
                :items="itemYN"
                label="Vidrios eléctricos"
                solo
              ></v-select>
            </v-col>
            <v-col cols="12" sm="4" class="pa-1">
              <v-select
                ref="aros"
                :rules="[() => !!aros || 'Campo obligatorio']"
                :error-messages="errorMessages"
                v-model="aros"
                :items="itemYN"
                label="Aros de fábrica"
                solo
              ></v-select>
            </v-col>
            <v-col cols="12" sm="4" class="pa-1">
              <v-select
                ref="bolsa"
                :rules="[() => !!bolsa || 'Campo obligatorio']"
                :error-messages="errorMessages"
                v-model="bolsa"
                :items="itemYN"
                label="Bolsa de Aire"
                solo
              ></v-select>
            </v-col>
            <v-col cols="12" sm="4" class="pa-1">
              <v-select
                ref="asientos"
                :rules="[() => !!asientos || 'Campo obligatorio']"
                :error-messages="errorMessages"
                v-model="asientos"
                :items="itemYN"
                label="Asientos en piel"
                solo
              ></v-select>
            </v-col>
            <v-col cols="12" sm="4" class="pa-1">
              <v-select
                ref="radio"
                :rules="[() => !!radio || 'Campo obligatorio']"
                :error-messages="errorMessages"
                v-model="radio"
                :items="itemYN"
                label="Radio AM/FM"
                solo
              ></v-select>
            </v-col>
            <v-col cols="12" sm="4" class="pa-1">
              <v-select
                ref="cd"
                :rules="[() => !!cd || 'Campo obligatorio']"
                :error-messages="errorMessages"
                v-model="cd"
                :items="itemYN"
                label="CD player"
                solo
              ></v-select>
            </v-col>
            <v-col cols="12" sm="4" class="pa-1">
              <v-select
                ref="cantidad"
                :rules="[() => !!cantidad || 'Campo obligatorio']"
                :error-messages="errorMessages"
                v-model="cantidad"
                :items="itemN"
                label="Cantidad de puertas"
                solo
              ></v-select>
            </v-col>
            <v-col cols="12" sm="4" class="pa-1">
              <v-select
                ref="motor"
                :rules="[() => !!motor || 'Campo obligatorio']"
                :error-messages="errorMessages"
                v-model="motor"
                :items="itemN"
                label="Motor/CC"
                solo
              ></v-select>
            </v-col>
            <v-col cols="12" sm="4" class="pa-1">
              <v-select
                ref="status"
                :rules="[() => !!status || 'Campo obligatorio']"
                :error-messages="errorMessages"
                v-model="status"
                :items="itemStatus"
                label="Condición"
                solo
              ></v-select>
            </v-col>
          </v-row>

          <v-row
            v-if="this.$route.params.add == 'bebes-y-ninos' ||
          this.$route.params.add == 'hogar' ||
          this.$route.params.add == 'moda-y-belleza' ||
          this.$route.params.add == 'deportes-y-entertenimiento' ||
          this.$route.params.add == 'electronica' ||
          this.$route.params.add == 'negocios-y-servicios'"
          >
            <v-col cols="12" sm="4" class="pa-1">
              <v-select
                ref="status"
                :rules="[() => !!status || 'Campo obligatorio']"
                :error-messages="errorMessages"
                v-model="status"
                :items="itemStatus"
                label="Condición"
                solo
              ></v-select>
            </v-col>
          </v-row>

          <v-row v-if="this.$route.params.add == 'animales-y-mascotas' ">
            <v-col cols="12" sm="4" class="pa-1">
              <v-text-field v-model="age" label="age" solo></v-text-field>
            </v-col>
          </v-row>
          <Adsense data-ad-client="ca-pub-3374289978792695" data-ad-slot="9806134228"></Adsense>
        </v-card>
        <v-btn color="primary" @click="nuxt3">Continue</v-btn>
        <v-btn text @click="e6 = 2">Cancel</v-btn>
      </v-stepper-content>

      <v-stepper-step :complete="e6 > 4" step="4">Detalles del articulo</v-stepper-step>
      <v-stepper-content step="4">
        <v-card color="grey lighten-1" class="mb-12 pa-5">
          <v-row>
            <v-col cols="12" class="pa-0">
              <v-textarea
                ref="description"
                :rules="[() => !!description || 'Campo obligatorio']"
                :error-messages="errorMessages"
                v-model="description"
                name="input-7-4"
                solo
                label="Descripcion del articulo"
              ></v-textarea>
            </v-col>
            <v-col cols="12" class="pa-0">
              <v-file-input
                small-chips
                multiple="true"
                label="Adjuntar fotos"
                accept="image/*"
                ref="img"
                solo
                :rules="[() => !!img[0] || 'Campo obligatorio']"
                :error-messages="errorMessages"
                v-model="img"
              ></v-file-input>
            </v-col>
          </v-row>
          <Adsense data-ad-client="ca-pub-3374289978792695" data-ad-slot="9806134228"></Adsense>
        </v-card>
        <v-btn color="primary" @click="saveAD" :loading="loading">publish ad</v-btn>
        <v-btn text @click="e6 = 3">Cancel</v-btn>
      </v-stepper-content>
    </v-stepper>
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
  </div>
</template>
<script>
import Adsense from "../../components/Adsense.vue";

export default {
  components: {
    Adsense
  },
  head() {
    let data = this.$route.params.add;
    return {
      base: process.env.BASE_URL,
      title: data
        ? `Vende lo que quieras en la categoría ${
            this.$route.params.add.split("-")[0]
          } ${this.$route.params.add.split("-")[1]} ${
            this.$route.params.add.split("-")[2]
          }`
        : "Compra y vende en República Dominicana",
      titleTemplate: "%s ← Publicar anuncio ← Klkrd!",
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
      upload: 0,
      succes: false,
      loading: false,
      textSuc: "Publicó con éxito un anuncio",
      error: false,
      textErr: "Error publicado",
      title: null,
      sub: null,
      price: null,
      status: null,
      provincia: null,
      currency: null,
      description: null,
      number: null,
      img: [],
      dialog: false,

      //category 1,2
      room: null,
      bathroom: null,
      space: null,
      type: null,
      round: null,

      //category 3
      year: null,
      kilos: null,
      fuel: null,
      transmi: null,
      trac: null,
      exterior: null,
      interior: null,
      faros: null,
      // tipo: null,
      marca: null,
      modelo: null,
      aire: null,
      limpia: null,
      pintura: null,
      vidrios: null,
      aros: null,
      bolsa: null,
      asientos: null,
      radio: null,
      cd: null,
      cantidad: null,
      motor: null,

      age: null,
      errorMessages: null,
      e6: 1,
      itemSub: [],
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
      // itemTpio: [
      //   "Carro",
      //   "Jeepeta",
      //   "Camioneta",
      //   "Autobús",
      //   "Minibus",
      //   "Pasola",
      //   "Motocicleta",
      //   "Camión",
      //   "Construcción",
      //   "Montacargas",
      //   "Industrial",
      //   "Hatchback",
      //   "Sedán (4 puertas)"
      // ],
      itemFaros: ["Xenón", "Bixenón", "Halógeno"],
      itemStatus: ["Nuevo", "Usado"],
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
      category: ""
    };
  },
  beforeCreate() {
    if (!this.$store.state.auth) {
      this.$router.push("/");
    }
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
    form1() {
      return {
        title: this.title,
        sub: this.sub
      };
    },
    form2() {
      return {
        price: this.price,
        provincia: this.provincia,
        currency: this.currency
      };
    },
    //change
    form3() {
      return {
        room: this.room,
        bathroom: this.bathroom,
        space: this.space,
        type: this.type,
        round: this.round,
        status: this.status
      };
    },
    form33() {
      return {
        year: this.year,
        kilos: this.kilos,
        fuel: this.fuel,
        transmi: this.transmi,
        trac: this.trac,
        exterior: this.exterior,
        interior: this.interior,
        faros: this.faros,
        // tipo: this.tipo,
        marca: this.marca,
        modelo: this.modelo,
        aire: this.aire,
        limpia: this.limpia,
        pintura: this.pintura,
        vidrios: this.vidrios,
        aros: this.aros,
        bolsa: this.bolsa,
        asientos: this.asientos,
        radio: this.radio,
        cd: this.cd,
        cantidad: this.cantidad,
        motor: this.motor,
        status: this.status
      };
    },
    form34() {
      return {
        status: this.status
      };
    },
    form4() {
      return {
        description: this.description,
        img: this.img
      };
    },
    form5() {
      return {
        number: this.number
      };
    }
  },

  watch: {
    title() {
      this.errorMessages = "";
    },
    sub() {
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
    // tipo() {
    //   this.errorMessages = "";
    // },
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
    }
  },

  created() {
    // console.log("object", this.$refs["wrapper"]);

    // document.getElementsByClassName("v-stepper__wrapper").style.height = "0";
    if (
      this.$route.params.add == "inmueebles-en-alquiler" ||
      this.$route.params.add == "inmueebles-en-venta"
    ) {
      this.itemSub.push(
        "Apartamentos",
        "Casas",
        "Villas",
        "Solares",
        "Fincas",
        "Naves",
        "Oficinas",
        "Edificios",
        "Penthouses",
        "Negocios",
        "Local comercial"
      );
    } else if (this.$route.params.add == "vehiculos") {
      this.itemSub.push(
        "Carros",
        "Jeepetas",
        "Camionetas",
        "Autobús",
        "Motores",
        "Pasolas",
        "Botes",
        "Vehículos recreativos",
        "Camiones y vehiculos pesados",
        "Otros vehículos"
      );
    } else if (this.$route.params.add == "bebes-y-ninos") {
      this.itemSub.push(
        "ropa y zapatos",
        "muebles",
        "coches y sillas",
        "cuidado y nutricion",
        "juguetes",
        "accesories"
      );
    } else if (this.$route.params.add == "hogar") {
      this.itemSub.push(
        "electrodomesticos",
        "decoracion accesorios",
        "Aires acondicionados y Abanicos",
        "Muebles y Colchones",
        "cocina",
        "Herramientas y Jardines"
      );
    } else if (this.$route.params.add == "moda-y-belleza") {
      this.itemSub.push(
        "Ropa para mujer",
        "Ropa para hombre",
        "Carteras y maletas",
        "Joyas y accesorios",
        "Relojes",
        "Zapatos para mujer",
        "Zapatos para hombre",
        "Uniex",
        "Salud y belleza"
      );
    } else if (this.$route.params.add == "deportes-y-entertenimiento") {
      this.itemSub.push(
        "Hobby y Colección",
        "Taquillas para eventos",
        "Deportes",
        "Bicicletas accesorios",
        "Libros revistas",
        "Tours viajes",
        "Intrumentos musicales"
      );
    } else if (this.$route.params.add == "electronica") {
      this.itemSub.push(
        "Celulares y tabletas",
        "Televisores",
        "Computadoras y laptops",
        "Videojuegos y consolas",
        "Impresoras y escanners",
        "Camaras y audio",
        "Plantas e inversores"
      );
    } else if (this.$route.params.add == "negocios-y-servicios") {
      this.itemSub.push(
        "Servicios profesionales",
        "Cursos y clases",
        "Equipos profesionales",
        "Artículos de oficina",
        "Negocios en venta",
        "Construcción e industrial"
      );
    } else if (this.$route.params.add == "animales-y-mascotas") {
      this.itemSub.push(
        "Perros",
        "Gatos",
        "Hámsters",
        "Pájaros",
        "Peces",
        "Serpientes"
      );
    } else {
      this.$router.push({ name: "notFound" });
    }
  },

  methods: {
    saveAD() {
      if (this.form4.description && this.form4.img[0]) {
        this.loading = true;
        if (
          this.$route.params.add == "inmueebles-en-alquiler" ||
          this.$route.params.add == "inmueebles-en-venta"
        ) {
          const addAD = {
            title: this.title.toUpperCase(),
            history: {
              now: Date.now(),
              after: Date.now() + 7776000000
            },
            sub: this.sub,
            price: this.price,
            status: this.status,
            provincia: this.provincia,
            currency: this.currency,
            description: this.description,
            uid: this.user.uid,
            room: this.room,
            bathroom: this.bathroom,
            space: this.space,
            type: this.type,
            round: this.round
          };
          this.$fireStore
            .collection(this.$route.params.add)
            .add(addAD)
            .then(async res => {
              const index = 100 / this.img.length;
              await Object.keys(this.img).forEach(async i => {
                await this.$fireStorage
                  .ref(`ads/${res.id}/${this.img[i].name}`)
                  .put(this.img[i]);
                console.log(i);
                this.upload = this.upload + index;
                if (Math.floor(this.upload) === 100) {
                  this.upload = 0;
                  this.succes = true;
                  setTimeout(() => {
                    this.$router.push(`/${this.$route.params.add}`);
                  }, 2000);
                }
              });
            });
        } else if (this.$route.params.add == "vehiculos") {
          const addAD = {
            title: this.title.toUpperCase(),
            history: {
              now: Date.now(),
              after: Date.now() + 7776000000
            },
            sub: this.sub,
            price: this.price,
            status: this.status,
            provincia: this.provincia,
            currency: this.currency,
            description: this.description,
            uid: this.user.uid,
            //category 3
            year: this.year,
            kilos: this.kilos,
            fuel: this.fuel,
            transmi: this.transmi,
            trac: this.trac,
            exterior: this.exterior,
            interior: this.interior,
            faros: this.faros,
            // tipo: this.tipo,
            marca: this.marca,
            modelo: this.modelo,
            aire: this.aire,
            limpia: this.limpia,
            pintura: this.pintura,
            vidrios: this.vidrios,
            aros: this.aros,
            bolsa: this.bolsa,
            asientos: this.asientos,
            radio: this.radio,
            cd: this.cd,
            cantidad: this.cantidad,
            motor: this.motor
          };
          this.$fireStore
            .collection(this.$route.params.add)
            .add(addAD)
            .then(async res => {
              const index = 100 / this.img.length;
              await Object.keys(this.img).forEach(async i => {
                await this.$fireStorage
                  .ref(`ads/${res.id}/${this.img[i].name}`)
                  .put(this.img[i]);
                console.log(i);
                this.upload = this.upload + index;
                console.log(this.upload);
                if (Math.floor(this.upload) === 100) {
                  this.upload = 0;
                  this.succes = true;
                  setTimeout(() => {
                    this.$router.push(`/${this.$route.params.add}`);
                  }, 2000);
                }
              });
            });
        } else if (
          this.$route.params.add == "bebes-y-ninos" ||
          this.$route.params.add == "hogar" ||
          this.$route.params.add == "moda-y-belleza" ||
          this.$route.params.add == "deportes-y-entertenimiento" ||
          this.$route.params.add == "electronica" ||
          this.$route.params.add == "negocios-y-servicios"
        ) {
          const addAD = {
            title: this.title.toUpperCase(),
            history: {
              now: Date.now(),
              after: Date.now() + 7776000000
            },
            sub: this.sub,
            price: this.price,
            status: this.status,
            provincia: this.provincia,
            currency: this.currency,
            description: this.description,
            uid: this.user.uid
          };
          this.$fireStore
            .collection(this.$route.params.add)
            .add(addAD)
            .then(async res => {
              const index = 100 / this.img.length;
              await Object.keys(this.img).forEach(async i => {
                await this.$fireStorage
                  .ref(`ads/${res.id}/${this.img[i].name}`)
                  .put(this.img[i]);
                console.log(i);
                this.upload = this.upload + index;
                console.log(this.upload);
                if (Math.floor(this.upload) === 100) {
                  this.upload = 0;
                  this.succes = true;
                  setTimeout(() => {
                    this.$router.push(`/${this.$route.params.add}`);
                  }, 2000);
                }
              });
            });
        } else if (this.$route.params.add == "animales-y-mascotas") {
          const addAD = {
            title: this.title.toUpperCase(),
            history: {
              now: Date.now(),
              after: Date.now() + 7776000000
            },
            sub: this.sub,
            price: this.price,
            age: this.age,
            provincia: this.provincia,
            currency: this.currency,
            description: this.description,
            uid: this.user.uid
          };
          this.$fireStore
            .collection(this.$route.params.add)
            .add(addAD)
            .then(async res => {
              const index = 100 / this.img.length;
              await Object.keys(this.img).forEach(async i => {
                await this.$fireStorage
                  .ref(`ads/${res.id}/${this.img[i].name}`)
                  .put(this.img[i]);
                console.log(i);
                this.upload = this.upload + index;
                console.log(this.upload);
                if (Math.floor(this.upload) === 100) {
                  this.upload = 0;
                  this.succes = true;
                  setTimeout(() => {
                    this.$router.push(`/${this.$route.params.add}`);
                  }, 2000);
                }
              });
            });
        } else {
          console.log("dont save");
        }
      } else {
        this.formHasErrors = false;
        Object.keys(this.form5).forEach(f => {
          if (!this.form5[f]) this.formHasErrors = true;
          this.$refs[f].validate(true);
        });
      }
    },
    nuxt1() {
      if (this.form1.title && this.form1.sub) {
        this.$fireStore
          .collection("users")
          .where("id", "==", this.user.uid)
          .get()
          .then(querySnapshot => {
            if (!querySnapshot.empty) {
              this.e6 = 2;
            } else {
              this.dialog = true;
            }
          });
      } else {
        this.formHasErrors = false;
        Object.keys(this.form1).forEach(f => {
          if (!this.form1[f]) this.formHasErrors = true;
          this.$refs[f].validate(true);
        });
      }
    },
    nuxt2() {
      if (this.form2.provincia && this.form2.price && this.form2.currency) {
        this.e6 = 3;
      } else {
        this.formHasErrors = false;
        Object.keys(this.form2).forEach(f => {
          if (!this.form2[f]) this.formHasErrors = true;
          this.$refs[f].validate(true);
        });
      }
    },
    nuxt3() {
      if (
        this.$route.params.add == "inmueebles-en-alquiler" ||
        this.$route.params.add == "inmueebles-en-venta"
      ) {
        if (
          this.form3.room &&
          this.form3.round &&
          this.form3.type &&
          this.form3.space &&
          this.form3.bathroom &&
          this.form3.status
        ) {
          this.e6 = 4;
        } else {
          this.formHasErrors = false;
          Object.keys(this.form3).forEach(f => {
            if (!this.form3[f]) this.formHasErrors = true;
            this.$refs[f].validate(true);
          });
        }
      } else if (this.$route.params.add == "vehiculos") {
        if (
          this.form33.year &&
          this.form33.kilos &&
          this.form33.fuel &&
          this.form33.transmi &&
          this.form33.trac &&
          this.form33.exterior &&
          this.form33.interior &&
          this.form33.faros &&
          // this.form33.tipo &&
          this.form33.marca &&
          this.form33.modelo &&
          this.form33.aire &&
          this.form33.limpia &&
          this.form33.pintura &&
          this.form33.vidrios &&
          this.form33.aros &&
          this.form33.bolsa &&
          this.form33.asientos &&
          this.form33.radio &&
          this.form33.cd &&
          this.form33.cantidad &&
          this.form33.motor &&
          this.form33.status
        ) {
          this.e6 = 4;
        } else {
          this.formHasErrors = false;
          Object.keys(this.form33).forEach(f => {
            if (!this.form33[f]) this.formHasErrors = true;
            this.$refs[f].validate(true);
          });
        }
      } else if (
        this.$route.params.add == "bebes-y-ninos" ||
        this.$route.params.add == "hogar" ||
        this.$route.params.add == "moda-y-belleza" ||
        this.$route.params.add == "deportes-y-entertenimiento" ||
        this.$route.params.add == "electronica" ||
        this.$route.params.add == "negocios-y-servicios"
      ) {
        if (this.form34.status) {
          this.e6 = 4;
        } else {
          this.formHasErrors = false;
          Object.keys(this.form34).forEach(f => {
            if (!this.form34[f]) this.formHasErrors = true;
            this.$refs[f].validate(true);
          });
        }
      } else if (this.$route.params.add == "animales-y-mascotas") {
        this.e6 = 4;
      }
    }
  }
};
</script>
<style scoped>
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
.v-progress-circular {
  margin: 1rem;
}
</style>
