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
      }
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
      })
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
   <div v-else>
     <router-link :db="db" to="new-list">Create new list</router-link>
     <ul>
       <li v-for="(list, index) in lists" :key="index">
         <p><router-link :db="db" :to="`/list/${list.id}`">{{ list.char_name }} {{ list.class_level }}</router-link></p>
       </li>
     </ul>
   </div>
 </div>
</template>

<style scoped>
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

</style>
