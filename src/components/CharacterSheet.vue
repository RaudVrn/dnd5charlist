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
          },
          perception: '',
          languages: '',
          armor_class: '',
          initiative: '',
          speed: '',
          hit_points_max: '',
          hit_points_current: '',
          hit_points_temporary: '',
          life_cubes_max: '',
          life_cubes_current: '',
          life_throw_1: false,
          life_throw_2: false,
          life_throw_3: false,
          death_throw_1: false,
          death_throw_2: false,
          death_throw_3: false,
          attacks: [
            {
              id: 1,
              name: '',
              modifier: '',
              type: '',
            }
          ],
          equipment: '',
          personality_traits: '',
          ideals: '',
          bonds: '',
          flaws: '',
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
        console.log('getMOD');
        if  (stat === 'agility') {
          return this.char_data.initiative = this.char_data[stat] ? Math.floor((this.char_data[stat] - 10)/2) : '' ;
        }
        return this.char_data[stat] ? Math.floor((this.char_data[stat] - 10)/2) : '' ;
      },
      getSavingThrowsModifier(stat) {
        console.log('getSavingThrowsModifier');
        this.char_data.saving_throws[stat].value = this.char_data.saving_throws[stat].check ?
          Number(this.getModifier(stat)) + Number(this.char_data.mastery_points) :
          this.getModifier(stat);
        return this.char_data.saving_throws[stat].value
      },
      getSkillsModifier(skill, stat) {
        console.log('getSkillsModifier');
        this.char_data.skills[skill].value = this.char_data.skills[skill].check ?
          Number(this.getModifier(stat)) + Number(this.char_data.mastery_points) :
          this.getModifier(stat);
        return this.char_data.skills[skill].value
      },
      getPerception(){
        console.log('getPerception');
        return this.char_data.perception = 10 + this.getSkillsModifier('perception', 'wisdom')
      },
      getInitiative(){
        return this.char_data.initiative = this.getModifier('agility')
      },
      addAttackRow() {
        this.char_data.attacks.push({
          id: this.char_data.attacks[this.char_data.attacks.length - 1].id + 1,
          name: '',
          modifier: '',
          type: '',
        });
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
      <div style="border: 1px solid #000;">
        <div class="main-info__stats-wrapper">
          <div class="main-info__stats">
            <div
                    class="main-info__stats-stat-wrapper"
                    v-for="(stat, index) in stats"
                    :key="index">
              <label :for="stat.id_name">{{stat.name}}</label>
              <p class="main-info__stats-stat-modifier">{{ char_data[stat.id_name] > 11 ? '+' : '' }}{{ getModifier(stat.id_name) }}</p>
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
            <div style="margin-bottom: 6px" class="main-info__stats-saving-throws">
              <div style="margin-bottom: 3px; border: 1px solid #000; width: 85%;padding: 2px"
                   v-for="(stat, index) in stats"
                   :key="index">
                <input type="checkbox"
                       :id="'saving_throw_check_' + stat.id_name"
                       v-model="char_data.saving_throws[stat.id_name].check">
                <div style="display: inline-block; width: 20px; text-align: center">
                  <p style="display: inline-block; font-size: 12px; font-weight: 700" :id="'saving_throw_' + stat.id_name">
                    {{ char_data.saving_throws[stat.id_name].value > 0 ? '+' : '' }}{{getSavingThrowsModifier(stat.id_name) }}
                  </p>
                </div>
                <label :for="'saving_throw_' + stat.id_name">{{stat.name}}</label>
              </div>
              <p>Спасброски</p>
            </div>
            <div class="main-info__stats-skills">
              <div style="margin-bottom: 3px;border: 1px solid #000;width: 85%; padding: 2px"
                   v-for="(skill, index) in skills_list"
                   :key="index">
                <input type="checkbox"
                       :id="'skill_check_' + skill.id_name"
                       v-model="char_data.skills[skill.id_name].check">
                <div style="display: inline-block; width: 20px; text-align: center">
                  <p style="display: inline-block;font-size: 12px; font-weight: 700" :id="'skills_' + skill.id_name">
                    {{ char_data.skills[skill.id_name].value > 0 ? '+' : '' }}{{getSkillsModifier(skill.id_name, skill.stat) }}
                  </p>
                </div>
                <label>{{skill.name}}</label>
              </div>
              <p>Навыки</p>
            </div>
          </div>
        </div>
        <div class="main-info__stats-perception-wrapper">
          <input class="main-info__stats-perception" :value="getPerception()" id="perception_passive" type="text">
          <label for="perception_passive">МУДРОСТЬ, ПАССИВНАЯ (ВОСПРИЯТИЕ)</label>
        </div>
        <div style="display: flex;justify-content: center;flex-direction: column;">
          <textarea-autosize v-model="char_data.languages" style="text-transform: none; font-size: 14px;display: block; width: 95%;  margin: 0 2px; min-height: 180px; padding: 4px;">
          </textarea-autosize>
          <label style="text-align: center;margin: 2px;">ДРУГИЕ УМЕНИЯ И ЯЗЫКИ</label>
        </div>
      </div>
      <div class="main-info__battle">
        <div class="main-info__battle-main-wrapper"  >
          <div class="main-info__battle-main"><input v-model="char_data.armor_class" id="armor_class" type="text"><label for="armor_class">Класс Доспехов</label></div>
          <div class="main-info__battle-main"><input :value="getInitiative() > 0 ? '+' + getInitiative() : getInitiative()" id="initiative" type="text"><label for="initiative">Инициатива</label></div>
          <!--<div class="main-info__battle-main"><input @change="() => {console.log('change');}" v-model="char_data.initiative" id="initiative" type="text"><label for="initiative">Инициатива</label></div>-->
          <div class="main-info__battle-main"><input v-model="char_data.speed" id="speed" type="text"><label for="speed">Скорость</label></div>
        </div>
        <div class="main-info__battle-hit-points-wrapper">
          <div>
            <div style="margin-bottom: 10px; display: flex; justify-content: space-between; align-items: center;">
              <label for="hit_points_max">Очки Здоровья, макс.</label>
              <input v-model="char_data.hit_points_max" id="hit_points_max" type="text">
            </div>
            <div style="display: flex;flex-direction: column;align-items: center;margin-bottom: 5px;">
              <input style="display: block" id="hit_points_current" type="text">
              <label v-model="char_data.hit_points_current" for="hit_points_current">ОЧКИ ЗДОРОВЬЯ, ТЕКУЩИЕ</label>
            </div>
          </div>
          <div>
            <div style="display: flex;flex-direction: column;align-items: center;">
              <input style="display: block" id="hit_points_temporary" type="text">
              <label v-model="char_data.hit_points_temporary" for="hit_points_temporary">ОЧКИ ЗДОРОВЬЯ, ВРЕМЕННЫЕ</label>
            </div>
          </div>
        </div>
        <div class="main-info__battle-life-wrapper">
          <div style="border: 1px solid #000;padding: 10px;">
            <div>
              <div style="display: flex;justify-content: space-between;align-items: center;margin-bottom: 10px;">
                <label for="life_cubes_max">Макс.</label>
                <input v-model="char_data.life_cubes_max" id="life_cubes_max" type="text">
              </div>
              <div>
                <input v-model="char_data.life_cubes_current" id="life_cubes_current" type="text">
                <label for="life_cubes_current">Кости хитов</label>
              </div>
            </div>
          </div>
          <div class="main-info__battle-deaththrow_wrapper">
            <div style="display: flex;justify-content: space-between;align-items: center;margin-bottom: 10px;">
              <label>Успехи</label>
              <div>
                <input v-model="char_data.life_throw_1" id="life_throw_1" type="checkbox">
                <input v-model="char_data.life_throw_2" id="life_throw_2" type="checkbox">
                <input v-model="char_data.life_throw_3" id="life_throw_3" type="checkbox">
              </div>
            </div>
            <div style="display: flex;justify-content: space-between; align-items: center;margin-bottom: 15px;">
              <label style="letter-spacing: -1.0px">Провалы</label>
              <div>
                <input v-model="char_data.death_throw_1" id="death_throw_1" type="checkbox">
                <input v-model="char_data.death_throw_2" id="death_throw_2" type="checkbox">
                <input v-model="char_data.death_throw_3" id="death_throw_3" type="checkbox">
              </div>
            </div>
            <p style="font-weight: 700;text-align: center;">Спасброски от смерти</p>
          </div>
        </div>
        <div class="main-info__battle-attacks-wrapper" style="margin: 10px;">
          <table cellpadding="0" cellspacing="0" border="0" style="border-collapse: collapse">
            <thead>
            <tr>
              <th><p>Название</p></th>
              <th><p>Мод.</p></th>
              <th><p>Урон / тип</p></th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(attack, index) in char_data.attacks" :key="index" :id="`attack-${attack.id}`">
              <td><input v-model="attack.name" style="font-size: 12px;width: 108px;padding: 5px;margin-right: 5px; margin-bottom: 5px; text-transform: none;" type="text"></td>
              <td><input v-model="attack.modifier" style="font-size: 12px; width: 20px;padding: 5px;margin-right: 5px;margin-bottom: 5px;text-transform: none;" type="text"></td>
              <td><input v-model="attack.type" style="font-size: 12px; width: 50px;padding: 5px;margin-bottom: 5px;text-transform: none;" type="text"></td>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td><button @click="addAttackRow" style="font-size: 16px; padding: 1px; width: 100%">+</button></td>
            </tr>
            </tbody>
          </table>
        </div>
        <div class="main-info__battle-equip-wrapper" style="margin: 10px;display: flex;flex-direction: column;align-items: center;">
          <textarea-autosize v-model="char_data.equipment" id="equipment" style="width: 94%;padding: 5px;border: 1px solid #000;margin-bottom: 2px;font-size: 12px; text-transform:none;">
          </textarea-autosize>
          <label for="equipment">Снаряжение</label>
        </div>
      </div>
      <div class="main-info__peculiarity">
        <div style="margin: 10px;">
          <div style="display: flex; flex-direction: column; align-items: center;margin-bottom: 5px;">
            <input v-model="char_data.personality_traits" id="personality_traits" style="width: 94%;padding: 5px;text-transform: none;font-size: 12px; height: 48px;" type="text">
            <label for="personality_traits">Черты характера</label></div>
          <div style="display: flex; flex-direction: column; align-items: center;margin-bottom: 5px;">
            <input v-model="char_data.ideals" id="ideals" style="width: 94%;padding: 5px;text-transform: none;font-size: 12px; height: 48px;" type="text">
            <label for="ideals">Идеалы</label></div>
          <div style="display: flex; flex-direction: column; align-items: center;margin-bottom: 5px;">
            <input v-model="char_data.bonds" id="bonds" style="width: 94%;padding: 5px;text-transform: none;font-size: 12px; height: 48px;" type="text">
            <label for="bonds">Привязанности</label></div>
          <div style="display: flex; flex-direction: column; align-items: center;margin-bottom: 5px;">
            <input v-model="char_data.flaws" id="flaws" style="width: 94%;padding: 5px;text-transform: none;font-size: 12px; height: 48px;" type="text">
            <label for="flaws">Слабости</label></div>
        </div>
      </div>
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
    font-weight: 700;
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

  .main-info__stats-perception-wrapper {
    margin: 10px 2px;
    border: 1px solid #000;
  }

  .main-info__stats-perception {
    width: 30px;
    height: 25px;
    margin: 2px 10px 2px 2px;

  }

  .main-info__battle {
    min-width: 240px;
    border: 1px solid #000;
  }

  .main-info__battle-main-wrapper {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 10px;
    margin: 10px;
  }

  .main-info__battle-main {
    border: 1px solid #000;
    padding: 5px;

    input {
      width: 98%;
      height: 50px;
      margin-bottom: 5px;
      font-size: 36px;
      line-height: 50px;
      font-weight: 700;
      text-align: center;
    }

    label {
      text-align: center;
    }
  }

  .main-info__battle-hit-points-wrapper {
    border: 1px solid #000;
    padding: 10px;
    margin: 10px;

    #hit_points_max {
      height: 20px;
      width: 70px;
      font-size: 16px;
      font-weight: 700;
      text-align: center;
    }

    #hit_points_current,
    #hit_points_temporary {
      height: 50px;
      width: 99%;
      font-size: 36px;
      line-height: 50px;
      font-weight: 700;
      text-align: center;
      margin-bottom: 5px;
    }
  }

  .main-info__battle-life-wrapper {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 10px;
    margin: 10px;
    border: 1px solid #000;
    padding: 10px;

    #life_cubes_max {
      width: 40px;
      font-size: 12px;
      text-align: center;
      text-transform: none;
    }

    #life_cubes_current {
      text-align: center;
      font-size: 25px;
      font-weight: 700;
      width: 99%;
      margin-bottom: 5px;
    }
  }

  .main-info__battle-deaththrow_wrapper {
    border: 1px solid #000;
    padding: 20px 5px 5px;
    input {
      margin: 2px;
    }
  }

  .main-info__skills {
    min-width: 240px;
    border: 1px solid #000;
  }

  .main-info__peculiarity {
    border: 1px solid #000;
  }


</style>
