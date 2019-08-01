<script>
  import 'firebase/firestore';
  import CharacterSheet from './CharacterSheet';

  export default {
    name: "CharactersList",
    data() {
      return {
        fetching: true,
        lists: []
      }
    },
    props: {
      db: {
        type: Object,
        default: () => {}
      },
    },
    components: {
      CharacterSheet,
    },

    created() {
      this.db.collection("lists").get().then((querySnapshot) => {
        this.fetching = true;
        querySnapshot.docs.forEach((doc) => {
          if (doc.data().user_data.user_id === localStorage.user_id)
            this.lists.push({
              char_name: doc.data().char_name,
              class_level: doc.data().class_level,
              id: doc.id,
            });
          });
        }).then(() => {
          this.fetching = false
      });
    }
  }
</script>

<template>
 <div>
   <div v-if="fetching" style="display: flex; justify-content: center; flex-direction: column;align-items: center">
     <h2 style="color: #000;">
       Подождите, список персонажей загружается
     </h2>
     <div class="lds-ring"><div></div><div></div><div></div><div></div></div>
   </div>
   <div class="char-list__wrapper" v-else>
     <router-link class="char-list__new-button glow-on-hover" :db="db" to="new-list">Создать нового персонажа</router-link>
     <ul class="char-list__list">
       <li class="char-list__item" v-for="(list, index) in lists" :key="index">
         <p><router-link class="char-list__link glow-on-hover" :db="db" :to="`/list/${list.id}`">{{ list.char_name }} &ndash; {{ list.class_level }}</router-link></p>
       </li>
     </ul>
     <div v-if="lists.length === 0">
       <h2>
         У Вас еще нет сохраненных персонажей :(
       </h2>
       <h3>Hажмите "Создать нового персонажа" для создания нового листа персонажа</h3>
     </div>
   </div>
 </div>
</template>

<style scoped lang="scss">
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
  .char-list__wrapper {
    display: flex;
    flex-direction: column;
    max-width: 768px;
    margin: 0 auto;
  }

  .char-list__new-button {
    justify-self: center;
    text-decoration: none;
    text-transform: uppercase;
    display: inline-block;
    background-color: lightgreen;
    color: #000;
    padding: 25px 0;
    margin: 25px auto;
    text-align: center;

  }




  .glow-on-hover {
    width: 220px;
    height: 50px;
    outline: none;
    color: #000;
    background: #ffffff;
    cursor: pointer;
    position: relative;
    z-index: 0;
    border-radius: 10px;
    border: 1px solid #000;

  }

  .glow-on-hover:hover {
    border: 1px solid transparent;
  }

  .glow-on-hover:before {
    content: '';
    background: linear-gradient(45deg, #ff0000, #ff7300, #fffb00, #48ff00, #00ffd5, #002bff, #7a00ff, #ff00c8, #ff0000);
    position: absolute;
    top: -2px;
    left:-2px;
    background-size: 400%;
    z-index: -1;
    filter: blur(5px);
    width: calc(100% + 4px);
    height: calc(100% + 4px);
    animation: glowing 20s linear infinite;
    opacity: 0;
    transition: opacity .3s ease-in-out;
    border-radius: 10px;
  }

  .glow-on-hover:active {
    color: #fff
  }

  .glow-on-hover:active:after {
    background: transparent;
  }

  .glow-on-hover:hover:before {
    opacity: 1;
  }

  .glow-on-hover:after {
    z-index: -1;
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    background: #fff;
    left: 0;
    top: 0;
    border-radius: 10px;
  }

  @keyframes glowing {
    0% { background-position: 0 0; }
    50% { background-position: 400% 0; }
    100% { background-position: 0 0; }
  }


  .char-list__list {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  .char-list__item {
    margin-bottom: 30px;

    p{
      margin: 0;
    }
  }

  .char-list__link {
    padding: 20px 0;
    width: 100%;
    display: block;
    text-align: center;
    font-size: 30px;
    text-transform: uppercase;
    text-decoration: none;
    color: #000;
  }

</style>
