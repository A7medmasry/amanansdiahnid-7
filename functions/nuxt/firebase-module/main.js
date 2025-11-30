import firebase from 'firebase/app'

const config = {"apiKey":"AIzaSyCs1ZWYpBkq-iH1wyPoQDdyBwPfhvTZmc0","authDomain":"klkrd.com","databaseURL":"https:\u002F\u002Fkikrd-ef495.firebaseio.com","projectId":"kikrd-ef495","storageBucket":"kikrd-ef495.appspot.com","messagingSenderId":"1060482020142","appId":"1:1060482020142:web:5605da12e9f5bfa87780bf","measurementId":"G-HF03LPH5Q9"}

export default async ({ res }, inject) => {
  if (!firebase.apps.length) {
    firebase.initializeApp(config)
  }
  const session = firebase.apps[0]

  /** --------------------------------------------------------------------------------------------- **/
  /** -------------------------------------- FIREBASE AUTH ---------------------------------------- **/
  /** --------------------------------------------------------------------------------------------- **/

  await import('firebase/auth')

  const fireAuth = session.auth()
  const fireAuthObj = firebase.auth
  inject('fireAuth', fireAuth)
  inject('fireAuthObj', fireAuthObj)

  /** --------------------------------------------------------------------------------------------- **/
  /** ------------------------------------- FIREBASE FIRESTORE ------------------------------------ **/
  /** --------------------------------------------------------------------------------------------- **/

  await import('firebase/firestore')

  const fireStore = session.firestore()
  const fireStoreObj = firebase.firestore
  inject('fireStore', fireStore)
  inject('fireStoreObj', fireStoreObj)

  /** --------------------------------------------------------------------------------------------- **/
  /** -------------------------------------- FIREBASE STORAGE ------------------------------------- **/
  /** --------------------------------------------------------------------------------------------- **/

  await import('firebase/storage')

  const fireStorage = session.storage()
  const fireStorageObj = firebase.storage
  inject('fireStorage', fireStorage)
  inject('fireStorageObj', fireStorageObj)

  /** --------------------------------------------------------------------------------------------- **/
  /** ------------------------------------ FIREBASE FUNCTIONS ------------------------------------- **/
  /** --------------------------------------------------------------------------------------------- **/

  await import('firebase/functions')

  const fireFunc = session.functions()
  const fireFuncObj = firebase.functions

  inject('fireFunc', fireFunc)
  inject('fireFuncObj', fireFuncObj)

  /** --------------------------------------------------------------------------------------------- **/
  /** ----------------------------------- FIREBASE ANALYTICS -------------------------------------- **/
  /** --------------------------------------------------------------------------------------------- **/

  // Firebase Analytics can only be initiated on the client side
  if (process.client) {
    await import('firebase/analytics')

    const fireAnalytics = session.analytics()
    const fireAnalyticsObj = firebase.analytics
    inject('fireAnalytics', fireAnalytics)
    inject('fireAnalyticsObj', fireAnalyticsObj)
  }
}
