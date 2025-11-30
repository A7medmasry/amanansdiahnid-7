// import firebase from "firebase/app";

export const state = () => ({
  user: {},
  dark: true,
  auth: false
})
export const mutations = {
  SET_USER(state, payload) {
    state.user = payload;
  },
  // google() {
  //   this.$fireAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then(() => {
  //     location.reload();
  //   })
  // },
  logOut() {
    this.$fireAuth.signOut().then(() => {
      location.reload();
    })
  },
  darkf(state) {
    state.dark = !state.dark
  },
  AUTH(state, payload) {
    state.auth = payload
  },
}
export const actions = {
  fetchCreds({ commit }, { authUser }) {
    if (authUser) {
      commit('AUTH', true);
      this.$fireStore
        .collection("users")
        .where("id", "==", authUser.uid)
        .get().then(res => {
          res.forEach(element => {
            const { displayName, email, uid, emailVerified } = authUser;
            const cleanedUser = { ...element.data(), displayName, email, uid, emailVerified };
            commit('SET_USER', cleanedUser);
          });
        })
    } else {
      commit('SET_USER', {});
    }
  },

}
