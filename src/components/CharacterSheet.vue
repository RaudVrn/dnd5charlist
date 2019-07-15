<script>
  import firebase from 'firebase/app';
  import 'firebase/firestore';

  // Initialize Cloud Firestore through Firebase
  firebase.initializeApp({
    apiKey: 'AIzaSyALs6_fWvnUAEacKd1jXQTNSJKhO1QidZY',
    authDomain: 'dnd5-online-charlist.firebaseapp.com',
    projectId: 'dnd5-online-charlist'
  });

  let db = firebase.firestore();

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
          exp_points: '',
          strength: '',
          agility: '',
          stamina: '',
          intelligence: '',
          wisdom: '',
          charisma: '',
          inspiration: '',
          mastery_points: '',
          saving_throws: {
            strength: {
              check: false,
              value: '',
            },
            agility: {
              check: false,
              value: '',
            },
            stamina: {
              check: false,
              value: '',
            },
            intelligence: {
              check: false,
              value: '',
            },
            wisdom: {
              check: false,
              value: '',
            },
            charisma: {
              check: false,
              value: '',
            },
          },
          skills: {
            acrobatics: {
              check: false,
              value: '',
            },
            athletics: {
              check: false,
              value: '',
            },
            magic: {
              check: false,
              value: '',
            },
            cheating: {
              check: false,
              value: '',
            },
            history: {
              check: false,
              value: '',
            },
            insight: {
              check: false,
              value: '',
            },
            intimidation: {
              check: false,
              value: '',
            },
            investigation: {
              check: false,
              value: '',
            },
            medicine: {
              check: false,
              value: '',
            },
            nature: {
              check: false,
              value: '',
            },
            perception: {
              check: false,
              value: '',
            },
            performance: {
              check: false,
              value: '',
            },
            conviction: {
              check: false,
              value: '',
            },
            religion: {
              check: false,
              value: '',
            },
            theft: {
              check: false,
              value: '',
            },
            stealth: {
              check: false,
              value: '',
            },
            survival: {
              check: false,
              value: '',
            },
            animal_handling: {
              check: false,
              value: '',
            },
          }
        },
        id: '',
        stats: [
          {
            name: 'Сила',
            id_name: 'strength',
          },
          {
            name: 'Ловкость',
            id_name: 'agility',
          },
          {
            name: 'Телосложение',
            id_name: 'stamina',
          },
          {
            name: 'Интеллект',
            id_name: 'intelligence',
          },
          {
            name: 'Мудрость',
            id_name: 'wisdom',
          },
          {
            name: 'Харизма',
            id_name: 'charisma',
          }
        ],
        skills_list: [
          {
            name: 'Акробатика',
            id_name: 'acrobatics',
            stat: 'agility',
          },
          {
            name: 'Атлетика',
            id_name: 'athletics',
            stat: 'strength',
          },
          {
            name: 'Магия',
            id_name: 'magic',
            stat: 'intelligence',
          },
          {
            name: 'Обман',
            id_name: 'cheating',
            stat: 'charisma',
          },
          {
            name: 'История',
            id_name: 'history',
            stat: 'intelligence',
          },
          {
            name: 'Проницательность',
            id_name: 'insight',
            stat: 'wisdom',
          },
          {
            name: 'Запугивание',
            id_name: 'intimidation',
            stat: 'charisma',
          },
          {
            name: 'Расследование',
            id_name: 'investigation',
            stat: 'intelligence',
          },
          {
            name: 'Медицина',
            id_name: 'medicine',
            stat: 'wisdom',
          },
          {
            name: 'Природа',
            id_name: 'nature',
            stat: 'wisdom',
          },
          {
            name: 'Восприятие',
            id_name: 'perception',
            stat: 'wisdom',
          },
          {
            name: 'Выступление',
            id_name: 'performance',
            stat: 'charisma',
          },
          {
            name: 'Убеждение',
            id_name: 'conviction',
            stat: 'charisma',
          },
          {
            name: 'Религия',
            id_name: 'religion',
            stat: 'intelligence',
          },
          {
            name: 'Ловкость рук',
            id_name: 'theft',
            stat: 'agility',
          },
          {
            name: 'Скрытность',
            id_name: 'stealth',
            stat: 'agility',
          },
          {
            name: 'Выживание',
            id_name: 'survival',
            stat: 'wisdom',
          },
          {
            name: 'Обращение с животными',
            id_name: 'animal_handling',
            stat: 'wisdom',
          },
        ]
      }
    },

    computed: {

    },

    methods: {
      getModifier(stat){
        return stat ? Math.floor((stat - 10)/2) : '' ;
      },
      getSavingThrowsModifier(stat) {
        this.char_data.saving_throws[stat].value = this.char_data.saving_throws[stat].check ?
          Number(this.getModifier(this.char_data[stat])) + Number(this.char_data.mastery_points) :
          this.getModifier(this.char_data[stat]);
        return this.char_data.saving_throws[stat].value
      },
      getSkillsModifier(skill, stat) {
        this.char_data.skills[skill].value = this.char_data.skills[skill].check ?
          Number(this.getModifier(this.char_data[stat])) + Number(this.char_data.mastery_points) :
          this.getModifier(this.char_data[stat]);
        return this.char_data.skills[skill].value
      },

      save() {
        db.collection("lists").add(this.char_data)
          .then(function(data) {
            console.log(data);
          })
          .catch(function(error) {
            console.error("Error adding document: ", error);
          });
      },
      update() {
        db.collection('lists').doc('UZTDh74bydQIbGXomCOg').set(this.char_data)
      }
    },
    created() {
      this.skills_list.forEach((skill) => {
        console.log(skill.id_name);
        console.log(this.char_data.skills[skill.id_name].check);
      })
      // db.collection("lists").get().then((querySnapshot) => {
      //   querySnapshot.forEach((doc) => {
      //     this.char_data = doc.data();
      //     this.id = doc.id;
      //   });
      // })
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
    <div class="main-info__wrapper">
      <div class="main-info__stats-wrapper">
        <div class="main-info__stats">
          <div
            class="main-info__stats-stat-wrapper"
            v-for="(stat, index) in stats"
            :key="index">
            <label :for="stat.id_name">{{stat.name}}</label>
            <p class="main-info__stats-stat-modifier">{{ char_data[stat.id_name] > 11 ? '+' : '' }}{{ getModifier(char_data[stat.id_name]) }}</p>
            <input
              class="main-info__stats-stat-input"
              v-model="char_data[stat.id_name]"
              :id="stat.id_name"
              type="number"
              min="1">
          </div>
        </div>
        <div class="main-info__stats-fits">
          <div class="main-info__stats-inspiration-wrapper">
            <input class="main-info__stats-inspiration" v-model="char_data.inspiration" id="inspiration" type="text">
            <label for="inspiration">Вдохновение</label>
          </div>
          <div class="main-info__stats-mastery-points-wrapper">
            <input  class="main-info__stats-mastery-points" v-model="char_data.mastery_points" id="mastery_points" type="text">
            <label for="mastery_points">Бонус мастерства</label>
          </div>
          <div style="margin-bottom: 10px" class="main-info__stats-saving-throws">
            <div style="margin-bottom: 10px; border: 1px solid #000; width: 85%;padding: 2px"
              v-for="(stat, index) in stats"
              :key="index">
              <input type="checkbox"
                     :id="'saving_throw_check_' + stat.id_name"
                      v-model="char_data.saving_throws[stat.id_name].check">
              <div style="display: inline-block; width: 20px; text-align: center">
                <p style="display: inline-block" :id="'saving_throw_' + stat.id_name">
                  {{ char_data.saving_throws[stat.id_name].value > 0 ? '+' : '' }}{{getSavingThrowsModifier(stat.id_name) }}
                </p>
              </div>
              <label :for="'saving_throw_' + stat.id_name">{{stat.name}}</label>
            </div>
            <p>Спасброски</p>
          </div>
          <div class="main-info__stats-skills">
            <div style="margin-bottom: 10px;border: 1px solid #000;width: 85%; padding: 2px"
              v-for="(skill, index) in skills_list"
              :key="index">
              <input type="checkbox"
                     :id="'skill_check_' + skill.id_name"
                     v-model="char_data.skills[skill.id_name].check">
              <div style="display: inline-block; width: 20px; text-align: center">
                <p style="display: inline-block" :id="'skills_' + skill.id_name">
                  {{ char_data.skills[skill.id_name].value > 0 ? '+' : '' }}{{getSkillsModifier(skill.id_name, skill.stat) }}
                </p>
              </div>
              <label>{{skill.name}}</label>
            </div>
            <p>Навыки</p>
          </div>
        </div>
      </div>
      <div class="main-info__battle"></div>
      <div class="main-info__skills"></div>
    </div>
    <button @click="update">
      Сохранить
    </button>
  </div>
</template>

<style scoped lang="scss">
  * {
    margin: 0;
    padding: 0;
    text-transform: uppercase;
    font-family: sans-serif;
    font-size: 9px;
  }

  input {
    border: 1px solid #000;
  }

  ul {
    list-style: none;
  }

  label {
    font-weight: 600;
  }

  .main {
    margin: 0 auto;
    border: 1px solid #000;
    max-width: 760px;
    max-height: 1076px;
    height: 1076px;
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

  .main-info__wrapper {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 10px;
  }

  .main-info__stats-wrapper {
    min-width: 240px;
    display: grid;
    grid-template-columns: 35% 65%;
    grid-gap: 10px;
    border: 1px solid #000;
    padding: 2px;
  }

  .main-info__stats {

  }

  .main-info__stats-stat-modifier {
    display: inline-block;
    width: 80%;
    height: 40px;
    border: 1px solid #000;
    margin-bottom: 5px;
    font-size: 30px;
    text-align: center;
    line-height: 40px;
  }

  .main-info__stats-stat-input {
    padding: 2px;
    width: 30px;
    font-size: 12px;
    text-align: center;
  }

  .main-info__stats-stat-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 20px 0;
    border: 1px solid #000;
    padding: 5px 0;
  }

  .main-info__stats-inspiration,
  .main-info__stats-mastery-points {
    width: 30px;
    height: 25px;
    margin-right: 10px;
  }

  .main-info__stats-inspiration-wrapper,
  .main-info__stats-mastery-points-wrapper {
    margin: 10px 0;
  }



  .main-info__battle {
    min-width: 240px;
    border: 1px solid #000;
  }

  .main-info__skills {
    min-width: 240px;
    border: 1px solid #000;
  }



</style>
