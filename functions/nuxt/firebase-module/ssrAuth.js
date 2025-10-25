import admin from 'firebase-admin'

const config = {"apiKey":"AIzaSyCs1ZWYpBkq-iH1wyPoQDdyBwPfhvTZmc0","authDomain":"klkrd.com","databaseURL":"https:\u002F\u002Fkikrd-ef495.firebaseio.com","projectId":"kikrd-ef495","storageBucket":"kikrd-ef495.appspot.com","messagingSenderId":"1060482020142","appId":"1:1060482020142:web:5605da12e9f5bfa87780bf","measurementId":"G-HF03LPH5Q9"}

const simulateUserRecord = ({
  uid,
  email,
  email_verified: emailVerified,
  name: displayName
}) => ({
  uid,
  email,
  emailVerified,
  displayName
})

if (!admin.apps.length) {
  admin.initializeApp(config)
}

export default async ({ req, res }) => {
  if (!req || !req.headers.authorization) {
    return
  }

  // Parse the injected ID token from the request header.
  const authorizationHeader = req.headers.authorization || ''
  const components = authorizationHeader.split(' ')
  const idToken = components.length > 1 ? components[1] : ''

  try {
    // Try to verify the id token, additionally checking if the token was revoked
    const decodedToken = await admin.auth().verifyIdToken(idToken)

    if (decodedToken.uid) {
      const authUser = simulateUserRecord(decodedToken)

      res.locals = {
        ...res.locals,
        user: {
          ...authUser,
          allClaims: decodedToken
        }
      }
    }
  } catch (e) {
    console.error(e)
  }
}
