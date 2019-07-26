<script>
  import firebase from 'firebase/app';
  import 'firebase/firestore';
  import 'firebase/auth';
  import CharacterSheet from './components/CharacterSheet'
  import CharactersList from './components/CharactersList'

  export default {
  name: 'app',
    data() {
      return {
        db:  firebase.firestore(),
        isLogin: false,
      }
    },
  components: {
    CharacterSheet,
    CharactersList
  },
    computed: {
      // isLogin() {
      //   if (
      //     localStorage.hasOwnProperty('current_user', 'accessToken', 'user_id')
      //   ) {
      //     return true
      //   }
      //   return false
      // }
    },
    methods: {
      login() {
        if (!this.isLogin) {
          const provider = new firebase.auth.GoogleAuthProvider();
          firebase.auth().signInWithRedirect(provider);
        }
      },
      logout() {
        firebase.auth().signOut().then(function() {
          localStorage.removeItem('accessToken');
          localStorage.removeItem('current_user');
          localStorage.removeItem('user_id');
          console.log(localStorage);
          this.isLogin = false;
        })
      }
    },
    beforeCreate() {
      // Initialize Cloud Firestore through Firebase
      firebase.initializeApp({
        apiKey: 'AIzaSyALs6_fWvnUAEacKd1jXQTNSJKhO1QidZY',
        authDomain: 'dnd5-online-charlist.firebaseapp.com',
        projectId: 'dnd5-online-charlist'
      });

      if  (!this.isLogin) {
        firebase.auth().getRedirectResult().then(function(result) {
          console.log(result);
          if (result.credential) {
            if  (!localStorage.hasOwnProperty('accessToken') || localStorage.accessToken === 'null') {
              let token = result.credential.accessToken;
              localStorage.setItem('accessToken', token)
            }
          }
          if  (!localStorage.hasOwnProperty('current_user') || localStorage.current_user === 'null') {
            let user = result.user.email;
            localStorage.setItem('current_user', user);
          }
          if (!localStorage.hasOwnProperty('user_id') || localStorage.user_id === 'null') {
            let user_id = result.user.uid;
            localStorage.setItem('user_id', user_id);
          }
        }).then(() => {
          this.isLogin = true;
          console.dir(localStorage);
        })
      }
    },

    mounted() {
      console.log(this.isLogin);
    }
  }
</script>

<template>
  <main>
      <button v-if="!isLogin" @click="login">Login</button>
      <button v-else @click="logout">Logout</button>
      <router-view :db="db"></router-view>
  </main>
</template>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
