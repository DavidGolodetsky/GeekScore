import firebase from 'firebase/app'
import 'firebase/auth'
import { auth } from 'firebaseui'
import store from '@/store'

const firebaseConfig = {
  apiKey: 'AIzaSyAscgoXoqL2LOk84LfNxq1BCu-JnFwyNug',
  authDomain: 'geekstat-v.firebaseapp.com',
  databaseURL: 'https://geekstat-v.firebaseio.com',
  projectId: 'geekstat-v',
  storageBucket: 'geekstat-v.appspot.com',
  messagingSenderId: '748797302864',
  appId: '1:748797302864:web:1f23f4bb7d8b8698461955'
}

firebase.initializeApp(firebaseConfig)
firebase.auth().onAuthStateChanged(user => {
  if (user) {
    store.dispatch('user/autoSignIn', user)
  }
})

const uiConfig = {
  signInFlow: 'popup',
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.FacebookAuthProvider.PROVIDER_ID
  ],
  callbacks: {
    signInSuccessWithAuthResult: () => false,
    uiShown() {
      document.getElementById('loader').style.display = 'none'
    }
  }
}

const ui = new auth.AuthUI(firebase.auth())

export const fbStart = () => {
  ui.start('#firebaseui-auth-container', uiConfig)
}

export const setupFb = () => {}

export default firebase
