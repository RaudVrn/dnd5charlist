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
        fetching: false,
      }
    },
  components: {
    CharacterSheet,
    CharactersList
  },
    computed: {
      // isLogin() {
      //   return localStorage.hasOwnProperty('current_user', 'accessToken', 'user_id');
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
        }).then(() => {
          this.isLogin = false;
          setTimeout(()=> {
            window.location.reload(true);
          }, 20)
        })
      },
      toList() {
        this.$router.push('/')
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
        this.fetching = true;
        firebase.auth().getRedirectResult().then((result) => {
          if (result.credential) {
            if  (!localStorage.hasOwnProperty('accessToken') || localStorage.accessToken === 'null') {
              let token = result.credential.accessToken;
              localStorage.setItem('accessToken', token)
            }
          }
          if (result.user) {
            if  (!localStorage.hasOwnProperty('current_user') || localStorage.current_user === 'null') {
              let user = result.user.email;
              localStorage.setItem('current_user', user);
            }
            if (!localStorage.hasOwnProperty('user_id') || localStorage.user_id === 'null') {
              let user_id = result.user.uid;
              localStorage.setItem('user_id', user_id);
            }
          }
          if (localStorage.hasOwnProperty('current_user', 'accessToken', 'user_id')) {
            this.isLogin = true;
          }
        }).then(() => {
          this.fetching = false;
        })
      }
    },
  }
</script>

<template>
  <main id="app">
    <h1 hidden>Создай лист персонажа для DND 5e онлайн</h1>
    <div v-if="fetching" style="display: flex; justify-content: center; flex-direction: column;align-items: center">
      <h2 style="color: #000;">
        Заходим
      </h2>
      <div class="lds-ring"><div></div><div></div><div></div><div></div></div>
    </div>
    <header class="header" v-else>
      <div class="login-wrapper">
        <button class="login-button" v-if="!isLogin" @click="login">Войти</button>
        <button class="logout-button" v-else @click="logout">Выйти</button>
        <!--<button>Сохранить</button>-->
        <button v-if="this.$route.name !== 'characters-list'" class="to-list-button" @click="toList">К списку персонажей</button>
      </div>
      <router-view  v-if="isLogin" :db="db"></router-view>
    </header>
  </main>
</template>

<style lang="scss">
  body {
    margin: 0;
  }

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    margin: 0;

    @media print {
      margin: 0 !important;
    }
  }

  #page-indicator {
    @media print {
      display: none !important;
    }
  }

  .lds-ring {
    display: inline-block;
    position: relative;
    width: 64px;
    height: 64px;
  }
  .lds-ring div {
    box-sizing: border-box;
    display: block;
    position: absolute;
    width: 51px;
    height: 51px;
    margin: 6px;
    border: 6px solid black;
    border-radius: 50%;
    animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
    border-color: black transparent transparent transparent;
  }
  .lds-ring div:nth-child(1) {
    animation-delay: -0.45s;
  }
  .lds-ring div:nth-child(2) {
    animation-delay: -0.3s;
  }
  .lds-ring div:nth-child(3) {
    animation-delay: -0.15s;
  }
  @keyframes lds-ring {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  .header {
    background-color: beige;
    height: 80px;
  }

  .login-wrapper {
    display: flex;
    justify-content: space-between;
    flex-direction: row-reverse;
    max-width: 782px;
    margin: 0 auto;

    @media print {
      display: none !important;
    }
  }

  .login-button,
  .logout-button,
  .to-list-button {
    padding: 25px;
    background-color: #fff;
    margin: 5px 0;

    @media screen and (max-width: 810px) {
      margin: 5px;
    }
  }
</style>
