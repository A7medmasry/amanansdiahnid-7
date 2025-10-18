const functions = require('firebase-functions')
const { Nuxt } = require('nuxt')
const express = require('express')
const app = express()
const admin = require('firebase-admin');
admin.initializeApp()
const config = {
  dev: false,
  buildDir: "nuxt",
  build: {
    publicPath: '/dist/'
  }
}
const nuxt = new Nuxt(config);

const nodemailer = require('nodemailer');

exports.sendEmailNotificationActive = functions.https.onCall(async (data, context) => {
  let authData = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: "klkrd.anuncios@gmail.com",
      pass: "SuperME$071700"
    }
  });
  await authData
    .sendMail({
      from: "info.truly@makethatapp.com",
      to: `${data.email}`,
      subject: `¡Hola ${data.name}!`,
      text: `${data.email}`,
      html: `
      <div style="text-align:center">
        <img style="width: 60%;" src="https://firebasestorage.googleapis.com/v0/b/kikrd-ef495.appspot.com/o/logo.png?alt=media&token=7542f181-40f6-4ae9-863c-9f79dfb56a7b"/>
        <p style="text-align:left; font-size:20px; line-height: 1.6; letter-spacing: 1.5px;">
          Hola <b>${data.name} </b>, han pasado 90 días
          luego de la creación de su anuncio <b>${data.title}</b>,
          le escribimos para saber si deseas
          re-publicarlo o si ya fue vendido y
          deseas eliminarlo.
          <a href="https://klkrd.com">Haz click para realizar acción</a>
        </p>
      </div>`
    })
    .then(() => {
      console.log("successfully sent that mail");
      const activeAd = {
        notification: true
      };
      admin.firestore()
        .collection(data.collection)
        .doc(data.id)
        .update(activeAd);
    })
    .catch(err => console.log(err));
});

exports.sendEmailNotification = functions.firestore.document('users/{docId}')
  .onCreate((snap, ctx) => {
    const data = snap.data();
    let authData = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: 'klkrd.anuncios@gmail.com',
        pass: 'SuperME$071700'
      }
    });
    authData.sendMail({
      from: 'info.truly@makethatapp.com',
      to: `${data.email}`,
      subject: `Bienvenido  ${data.name}`,
      text: `${data.email}`,
      html: `
      <div style="text-align:center">
        <img style="width: 60%;" src="https://firebasestorage.googleapis.com/v0/b/kikrd-ef495.appspot.com/o/logo.png?alt=media&token=7542f181-40f6-4ae9-863c-9f79dfb56a7b"/>
        <p style="text-align:left; font-size:20px; line-height: 1.6; letter-spacing: 1.5px;">
          ¡Estamos felices de que formes parte de nuestra familia!,
          a partir de hoy te damos la bienvenida a una plataforma de grandes
          oportunidades donde podrás comprar y vender tus artículos.
          Para completar tu alta solo falta confirmar tu registro
          <a href="https://klkrd.com">click al enlace</a>
        </p>
      </div>`,
    }).then(res => console.log('successfully sent that mail')).catch(err => console.log(err));
  });


function handleRequest(req, res) {
  res.set('Cache-Control', 'public, max-age=600, s-maxage=1200');
  nuxt.renderRoute(req.path).then(({ html }) => {
    console.log('path', req.path)
    res.send(html);
  }).catch(err => {
    console.log('error', err)
  })
}
app.get('*', handleRequest);
exports.ssrapp = functions.https.onRequest(app);
