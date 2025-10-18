<template>
  <div>admin</div>
</template>
<script>
export default {
  data() {
    return {
      users: [],
      ads: [],
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
  created() {
    this.$fireStore
      .collection("users")
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          this.users.push(doc.data());
          this.collections.forEach(collection => {
            this.$fireStore
              .collection(collection)
              .where("uid", "==", doc.data().id)
              .get()
              .then(res => {
                if (!res.empty) {
                  var ad = [];
                  res.forEach(doc => {
                    const data = {
                      category: collection,
                      id: doc.id,
                      title: doc.data().title,
                      price: doc.data().price,
                      history: doc.data().history,
                      description: doc.data().description,
                      currency: doc.data().currency
                    };
                    ad.push(data);
                  });
                  var ads = {
                    user: doc.data().id,
                    ads: ad
                  };
                  this.ads.push(ads);
                }
              });
          });
        });
        setTimeout(() => {
          console.log("this.users", this.users, this.ads);
        }, 10000);
      });
  }
};
</script>
