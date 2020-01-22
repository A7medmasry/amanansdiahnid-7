import { auth, google } from "@/plugins/firebase";

export const state = () => ({
  user: {},
  dark: false,
})
export const mutations = {
  setUser(state, payload) {
    state.user = payload;
  },
  google() {
    auth.signInWithPopup(google).then(() => {
      router.push("/");
    })
  },
  logOut() {
    auth.signOut().then(() => {
      router.push("/publicar-anuncio");
    })
  },
  darkf(state) {
    state.dark = !state.dark
  }
}
export const actions = {
  fetchCreds({ commit }) {
    auth.onAuthStateChanged(user => {
      if (user) {
        const { displayName, email, photoURL, uid } = user;
        const cleanedUser = { displayName, email, photoURL, uid };
        commit('setUser', cleanedUser);
      } else {
        commit('setUser', {});
      }
    });
  },
}
