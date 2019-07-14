<script>
  import axios from 'axios';

  export default {
    name: 'CharacterSheet',
    props: {

    },

    data() {
      return {
        char_data: {
          char_name: '',
          class_level: '',
          predistoria: '',
          player_name: '',
          race: '',
          alignment: '',
          exp_points: null,
        },
        info: '',
      }
    },

    methods: {
      save() {
        fetch('https://dnd5charlist.firebaseio.com/test-sheet', {
          method: 'POST',
          body: JSON.stringify(this.char_data)})
          .then(response => response.json())
          .then(json => console.log(json))
      },
    },
    created() {
      axios.get('https://dnd5charlist.firebaseio.com/dnd5charlist/test-sheet/0L17WCWne6M2y6sxD33R.json',
        {
          data: {
            ...this.char_data,
            auth: {
              uid: "ZAq66gyJO4ThRElh5vGj99Skw3A3",
              token: {
                sub: "ZAq66gyJO4ThRElh5vGj99Skw3A3",
                aud: "dnd5charlist",
                email: "adeonzsv@gmail.com",
                email_verified: true,
                phone_number: "",
                name: "",
                firebase: {
                  sign_in_provider: "google.com"
                }
              }
            }
          }
        })
        .then(response => (this.info = response))
    },
  }
</script>

<template>
  <div class="main">
    <div class="header">
      <div>
        <div class="header__input-wrapper header-input__wrapper--char-name">
          <input
              type="text"
              id="character-name"
              class="header__input header__input--char-name"
              v-model="char_data.char_name">
          <label for="character-name">Имя персонажа</label>
        </div>
      </div>
      <div class="header-info">
        <div class="header__input-wrapper">
          <input v-model="char_data.class_level" id="class-level" type="text" class="header__input">
          <label for="class-level"> Класс и уровень</label>
        </div>
        <div class="header__input-wrapper">
          <input v-model="char_data.predistoria" id="predistoria" type="text" class="header__input">
          <label for="predistoria">Предыстория</label>
        </div>
        <div class="header__input-wrapper">
          <input v-model="char_data.player_name" id="player-name" type="text" class="header__input">
          <label for="player-name">Имя игрока</label>
        </div>
        <div class="header__input-wrapper">
          <input v-model="char_data.race" id="race" type="text" class="header__input">
          <label for="race">Раса</label>
        </div>
        <div class="header__input-wrapper">
          <input v-model="char_data.alignment" id="alignment" type="text" class="header__input">
          <label for="alignment">Мировоззрение</label>
        </div>
        <div class="header__input-wrapper">
          <input v-model="char_data.exp_points" id="exp-points" type="number" class="header__input">
          <label for="exp-points">Очки опыта</label>
        </div>
      </div>
    </div>
    <button @click="save">
      Сохранить
    </button>
    <div>
      {{ info }}
    </div>
  </div>
</template>

<style scoped lang="scss">
  * {
    margin: 0;
    padding: 0;
    text-transform: uppercase;
    font-family: sans-serif;
    font-size: 10px;
  }

  input {
    border: 1px solid #000;
  }

  ul {
    list-style: none;
  }

  .main {
    margin: 0 auto;
    border: 1px solid #000;
    max-width: 720px;
    padding: 0 10px;
  }

  .header {
    display: grid;
    grid-template-columns: 40% 60%;
    align-items: center;
    padding-top: 50px;
  }

  .header-info {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
  }

  .header__input-wrapper {
    display: flex;
    flex-direction: column;
    padding: 5px;

    &--char-name {
      padding: 20px;
    }
  }

  .header__input {
    padding: 2px;
    font-size: 12px;

    &--char-name {
      padding: 7px;
      font-size: 25px;
      text-align: center;
      font-weight: 700;
    }
  }


</style>
