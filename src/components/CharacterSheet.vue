<script>
  import _ from 'lodash';
  import firebase from 'firebase/app';
  import 'firebase/firestore';

  export default {
    name: 'CharacterSheet',
    props: {
      db: {
        type: Object,
        default: () => {}
      },
    },

    data() {
      return {
        char_data: {
          user_data: {},
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
          features_and_traits: '',
          spellcaster_type: '',
          spell_main_stat: '',
          spell_saving_throw: '',
          spell_modifier: '',
          spells: {
            0: [
                {
                  id: 1,
                  spell: '',
                }
              ],
            1: [
              {
                id: 1,
                check: false,
                spell: '',
              }
              ],
            2:[
                {
                  id: 1,
                  check: false,
                  spell: '',
                }
              ],
            3:[
                {
                  id: 1,
                  check: false,
                  spell: '',
                }
              ],
            4:[
                {
                  id: 1,
                  check: false,
                  spell: '',
                }
              ],
            5:[
                {
                  id: 1,
                  check: false,
                  spell: '',
                }
              ],
            6:[
                {
                  id: 1,
                  check: false,
                  spell: '',
                }
              ],
            7:[
                {
                  id: 1,
                  check: false,
                  spell: '',
                }
              ],
            8:[
                {
                  id: 1,
                  check: false,
                  spell: '',
                }
              ],
            9:[
                {
                  id: 1,
                  check: false,
                  spell: '',
                }
              ],
          },
        },
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
      id() {
        return this.$route.params.id
      }
    },

    methods: {
      getModifier(stat){
        if  (stat === 'agility') {
          return this.char_data.initiative = this.char_data[stat] ? Math.floor((this.char_data[stat] - 10)/2) : '' ;
        }
        return this.char_data[stat] ? Math.floor((this.char_data[stat] - 10)/2) : '' ;
      },
      getSavingThrowsModifier(stat) {
        this.char_data.saving_throws[stat].value = this.char_data.saving_throws[stat].check ?
          Number(this.getModifier(stat)) + Number(this.char_data.mastery_points) :
          this.getModifier(stat);
        return this.char_data.saving_throws[stat].value
      },
      getSkillsModifier(skill, stat) {
        this.char_data.skills[skill].value = this.char_data.skills[skill].check ?
          Number(this.getModifier(stat)) + Number(this.char_data.mastery_points) :
          this.getModifier(stat);
        return this.char_data.skills[skill].value
      },
      getPerception(){
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
      deleteLastAttackRow() {
        if (this.char_data.attacks.length > 1) {
          this.char_data.attacks.pop()
        }
      },
      addSpellRow(tier) {
        if (tier > 0) {
          this.char_data.spells[tier].push({
            id: this.char_data.spells[tier][this.char_data.spells[tier].length -1].id + 1,
            check: false,
            spell: '',
          });
        }
        if  (tier === '0') {
          this.char_data.spells[tier].push({
            id: this.char_data.spells[tier][this.char_data.spells[tier].length -1].id + 1,
            spell: '',
          });
        }
      },
      deleteLastSpellRow(tier) {
        if (this.char_data.spells[tier].length > 1) {
          this.char_data.spells[tier].pop()
        }
      },


      save() {
        if (localStorage.hasOwnProperty('current_user')) {
          if (this.char_data.char_name !== '') {
            this.char_data.user_data = {
              current_user: localStorage.current_user,
              user_id: localStorage.user_id,
              accessToken: localStorage.accessToken,
            };
            this.db.collection("lists").add(this.char_data)
              .then(function(data) { // eslint-disable-next-line

              })
              .catch(function(error) { // eslint-disable-next-line
                console.error("Error adding document: ", error);
              });
            this.$router.push('/')
          }
          else {
            alert('Вашему персонажу необходимо имя :)')
          }
        }
        else {
          alert ('Вам необходимо сначала войти в систему')
        }
      },
      update() {
        if (localStorage.hasOwnProperty('current_user')) {
          if (this.char_data.char_name !== '') {
            this.db.collection('lists').doc(this.id).set(this.char_data)
            this.$router.push('/')
          }
          else {
            alert('Вашему персонажу необходимо имя :)')
          }
        }
      },
      deleteList() {
        let really = confirm('Действительно удалить лист?');
        if (really) {
          this.db.collection('lists').doc(this.id).delete();
          this.$router.push('/')
        }
      }
    },
    created() {
      if  (this.$route.name !== 'new-list') {
        this.db.collection("lists").doc(this.id).get().then((doc) => {
          let result = doc.data();
          _.merge(this.char_data, result)
        })
      }
    },
  }
</script>

<template>
  <article>
    <div class="save-buttons">
      <button class="list-button" v-if="this.$route.name === 'new-list'" @click="save">
        Сохранить
      </button>
      <button class="list-button" v-else @click="update">
        Сохранить изменения
      </button>
      <button v-if="this.$route.name !== 'new-list'" class="list-button" @click="deleteList">
        Удалить лист
      </button>
    </div>
    <section class="main-info">
      <div class="main-info__header">
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
        <div class="main-info__parameters">
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
              <div class="main-info__stats-saving-throws">
                <div class="saving-throws__wrapper"
                     v-for="(stat, index) in stats"
                     :key="index">
                  <input class="saving-throws__input" type="checkbox"
                         :id="'saving_throw_check_' + stat.id_name"
                         v-model="char_data.saving_throws[stat.id_name].check">
                    <p class="saving-throws__modifier" style="">
                      {{ char_data.saving_throws[stat.id_name].value > 0 ? '+' : '' }}{{getSavingThrowsModifier(stat.id_name) }}
                    </p>
                  <label :for="'saving_throw_check_' + stat.id_name">{{stat.name}}</label>
                </div>
                <p>Спасброски</p>
              </div>
              <div class="main-info__stats-skills">
                <div class="skills__wrapper"
                     v-for="(skill, index) in skills_list"
                     :key="index">
                  <input class="skills__input" type="checkbox"
                         :id="'skill_check_' + skill.id_name"
                         v-model="char_data.skills[skill.id_name].check">
                  <p class="skills__modifier">
                    {{ char_data.skills[skill.id_name].value > 0 ? '+' : '' }}{{getSkillsModifier(skill.id_name, skill.stat) }}
                  </p>
                  <label :for="'skill_check_' + skill.id_name">{{skill.name}}</label>
                </div>
                <p>Навыки</p>
              </div>
            </div>
          </div>
          <div class="main-info__stats-perception-wrapper">
            <input class="main-info__stats-perception" :value="getPerception()" id="perception_passive" type="text">
            <label for="perception_passive">МУДРОСТЬ, ПАССИВНАЯ (ВОСПРИЯТИЕ)</label>
          </div>
          <div style="margin: 10px; display: flex;justify-content: center;flex-direction: column;flex-grow: 1">
            <textarea-autosize class="main-info__languages" v-model="char_data.languages">
            </textarea-autosize>
            <label style="text-align: center;margin: 2px;">ДРУГИЕ УМЕНИЯ И ЯЗЫКИ</label>
          </div>
        </div>
        <div class="main-info__battle">
          <div class="main-info__battle-main-wrapper"  >
            <div class="main-info__battle-main"><input v-model="char_data.armor_class" id="armor_class" type="text"><label for="armor_class">Класс Доспехов</label></div>
            <div class="main-info__battle-main">
              <p class="main-info__battle-main-initiative">{{ getInitiative() > 0 ? '+' + getInitiative() : getInitiative() }}</p><p class="main-info__battle-main-initiative-label">Инициатива</p></div>
            <!--<div class="main-info__battle-main"><input :value="getInitiative() > 0 ? '+' + getInitiative() : getInitiative()" id="initiative" type="text"><label for="initiative">Инициатива</label></div>-->
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
                <input v-model="char_data.hit_points_current" style="display: block" id="hit_points_current" type="text">
                <label for="hit_points_current">ОЧКИ ЗДОРОВЬЯ, ТЕКУЩИЕ</label>
              </div>
            </div>
            <div>
              <div style="display: flex;flex-direction: column;align-items: center;">
                <input v-model="char_data.hit_points_temporary" style="display: block" id="hit_points_temporary" type="text">
                <label for="hit_points_temporary">ОЧКИ ЗДОРОВЬЯ, ВРЕМЕННЫЕ</label>
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
              <div style="display: flex;justify-content: space-between;align-items: center;margin-bottom: 10px;flex-direction: column">
                <label>Успехи</label>
                <div>
                  <input v-model="char_data.life_throw_1" id="life_throw_1" type="checkbox">
                  <input v-model="char_data.life_throw_2" id="life_throw_2" type="checkbox">
                  <input v-model="char_data.life_throw_3" id="life_throw_3" type="checkbox">
                </div>
              </div>
              <div style="display: flex;justify-content: space-between; align-items: center;margin-bottom: 5px;flex-direction: column">
                <label>Провалы</label>
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
            <table cellpadding="0" cellspacing="0" border="0" style="border-collapse: collapse; width: 100%">
              <thead>
              <tr>
                <td>
                  <table cellpadding="0" cellspacing="0" border="0" style="border-collapse: collapse; width: 100%">
                    <tr style="width: 100%; display: flex;justify-content: space-around;">
                      <th style="width: 50%; text-align: left;"><p>Название</p></th>
                      <th style="width: 15%; text-align: left;"><p>Мод.</p></th>
                      <th style="width: 25%; text-align: left;"><p>Урон / тип</p></th>
                    </tr>
                  </table>
                </td>
              </tr>
              </thead>
              <tbody>
              <tr v-for="(attack, index) in char_data.attacks" :key="index" :id="`attack-${attack.id}`">
                <td style="width: 100%;">
                  <table cellpadding="0" cellspacing="0" border="0" style="border-collapse: collapse;width: 100%;">
                    <tbody>
                    <tr style="width: 100%; display: flex;justify-content: space-around;">
                      <td style="width: 50%;"><input v-model="attack.name" style="width: 100%; font-size: 12px; margin-bottom: 5px; text-transform: none;" type="text"></td>
                      <td style="width: 15%;"><input v-model="attack.modifier" style="width: 100%; font-size: 12px;margin-bottom: 5px;text-transform: none;" type="text"></td>
                      <td style="width: 25%;"><input v-model="attack.type" style="width: 100%; font-size: 12px;text-transform: none;" type="text"></td>
                    </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
              <tr>
                <td>
                  <table style="width: 100%">
                    <tr>
                      <td style="width: 50%"><button @click="deleteLastAttackRow" style="font-size: 10px; padding: 1px; width: 100%">Удалить</button></td>
                      <td style="width: 50%"><button @click="addAttackRow" style="font-size: 10px; padding: 1px; width: 100%">Добавить</button></td>
                    </tr>
                  </table>
                </td>
              </tr>
              </tbody>
            </table>
          </div>
          <div class="main-info__battle-equip-wrapper" style="margin: 10px;display: flex;flex-direction: column;align-items: center;flex-grow: 1;">
            <textarea-autosize class="main-info__equipment" v-model="char_data.equipment" id="equipment">
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
          <div style="margin: 10px;display: flex;flex-direction: column;flex-grow: 1;">
            <textarea-autosize class="main-info__features" v-model="char_data.features_and_traits" id="features-and-traits" >
            </textarea-autosize>
            <label for="equipment">УМЕНИЯ И ОСОБЕННОСТИ</label>
          </div>
        </div>
      </div>
    </section>
    <section class="spell-list">
      <div class="spell-list__header">
        <div>
          <div class="header__input-wrapper header-input__wrapper--char-name">
            <input
                    type="text"
                    id="spellcaster-type"
                    class="header__input header__input--char-name"
                    v-model="char_data.spellcaster_type">
            <label for="spellcaster-type">Класс заклинателя<br><br></label>
          </div>
        </div>
        <div class="header-info">
          <div class="header__input-wrapper">
            <input v-model="char_data.spell_main_stat" id="spell-main-stat" type="text" class="header__input header__input--spell-list">
            <label for="spell-main-stat">Базовая характеристика<br>заклинаний</label>
          </div>
          <div class="header__input-wrapper">
            <input v-model="char_data.spell_saving_throw" id="spell-saving-throw" type="text" class="header__input header__input--spell-list">
            <label for="spell-saving-throw">Сложность<br>спасброска</label>
          </div>
          <div class="header__input-wrapper">
            <input v-model="char_data.spell_modifier" id="spell-modifier" type="text" class="header__input header__input--spell-list">
            <label for="spell-modifier">Бонус броска атаки<br>заклинанием</label>
          </div>
        </div>
      </div>
      <div class="spells__wrapper-flex">
        <div v-for="(spell_tier, index) in char_data.spells"
             :key="index"
             class="spells__list"
             :class="index === '0' ? 'spells__list--cantrips' : ''">
          <div class="spell__label-wrapper"
               :class="index === '0' ? 'spell__label-wrapper--cantrips' : ''">
            <p class="spell__level">{{ index }}</p>
            <p v-if="index === '0'"
               class="spell__label spell__label--cantrips">Заговоры</p>
            <div class="spells-list__cells-wrapper" v-else>
              <div class="spells-list__cells-input-wrapper">
                <label class="spells-list__cells-label" v-if="index < 3" :for="`tier-${index}-all`">Итого ячеек</label>
                <input class="spells-list__cells-input" :id="`tier-${index}-all`" type="text">
              </div>
              <div class="spells-list__cells-input-wrapper">
                <label class="spells-list__cells-label" v-if="index < 3" :for="`tier-${index}-quantity`">Израсходовано</label>
                <input class="spells-list__cells-input" :id="`tier-${index}-quantity`" type="text">
              </div>
            </div>
          </div>
          <div>
            <div class="spell-list__spell-table" style="margin: 10px;">
              <table cellpadding="0" cellspacing="0" border="0" style="border-collapse: collapse; width: 100%">
                <tbody>
                <tr v-for="(spell, jindex) in char_data.spells[index]" :key="jindex" :id="`tier-${index}-spell-${spell.id}`">
                  <td class="spell__wrapper" style="width: 100%;">
                    <input v-if="index > 0" class="spell__check" v-model="spell.check" type="checkbox">
                    <input class="spell__input" v-model="spell.spell" type="text">
                  </td>
                </tr>
                <tr>
                  <td>
                    <table style="width: 100%">
                      <tr>
                        <td style="width: 50%"><button @click="deleteLastSpellRow(index)" style="font-size: 10px; padding: 1px; width: 100%">Удалить</button></td>
                        <td style="width: 50%"><button @click="addSpellRow(index)" style="font-size: 10px; padding: 1px; width: 100%">Добавить</button></td>
                      </tr>
                    </table>
                  </td>
                </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div class="spells__wrapper-w">

        </div>
        <!--<div class="spells__grid-view">-->
          <!---->
        <!--</div>-->
        <!--<div class="spells__grid-view"></div>-->
        <!--<div class="spells__grid-view"></div>-->
      </div>
    </section>
  </article>
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

  .main-info,
  .spell-list {
    border: 1px solid #000;
    margin: 0 auto 10px;
    max-width: 760px;
    min-height: 1076px;
    padding: 0 10px;

    @media print {
      zoom: 89%;
      margin: 0 auto !important;
      page-break-after: always;
    }
  }

  .main-info__header,
  .spell-list__header {
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

    &--spell-list {
      height: 40px;
    }
  }

  .main-info__wrapper,
  .spells__wrapper {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 10px;
    min-height: 900px;

    @media screen and (max-width: 768px){
      grid-template-columns: 1fr;
    }
  }

  .spells__wrapper-flex {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    width: 244px;
    height: 1000px;

    @media screen and (max-width: 768px) {
      height: auto;
      width: auto;
    }
  }

  .main-info__parameters {
    display: flex;
    flex-direction: column;
  }

  .main-info__stats-wrapper {
    min-width: 240px;
    display: grid;
    grid-template-columns: 35% 55%;
    grid-gap: 10px;
    margin: 10px;
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

  .main-info__languages,
  .main-info__features,
  .main-info__equipment {
    width: calc(100% - 14px);
    flex-grow: 1;
    padding: 5px;
    border: 1px solid #000;
    margin-bottom: 2px;
    font-size: 12px;
    text-transform:none;

    @media screen and (min-width: 768px){
      resize: none !important;
      height: auto !important;
    }

    @media print {
      height: auto !important;
    }
  }

  .main-info__stats-inspiration,
  .main-info__stats-mastery-points {
    width: 30px;
    height: 25px;
    margin-right: 10px;
  }

  .main-info__stats-inspiration-wrapper,
  .main-info__stats-mastery-points-wrapper {
    margin: 0 0 10px;
  }

  .main-info__stats-saving-throws {
    margin-bottom: 6px
  }

  .saving-throws__wrapper {
    margin-bottom: 3px;
    border: 1px solid #000;
    padding: 2px;
  }

  .saving-throws__modifier {
    font-size: 12px;
    font-weight: 700;
    display: inline-block;
    width: 20px;
    text-align: center;
    height: 12px;
  }

  .skills__wrapper {
    margin-bottom: 3px;
    border: 1px solid #000;
    padding: 2px;
  }

  .skills__modifier {
    display: inline-block;
    width: 20px;
    text-align: center;
    height: 12px;
    font-size: 12px;
    font-weight: 700;
  }

  .main-info__stats-perception-wrapper {
    margin: 10px;
    border: 1px solid #000;
  }

  .main-info__stats-perception {
    width: 30px;
    height: 25px;
    margin: 2px 10px 2px 2px;

  }

  .main-info__battle,
  .main-info__parameters,
  .main-info__peculiarity,
  .spells__grid-view {
    min-width: 240px;
    border: 1px solid #000;
    display: flex;
    flex-direction: column;
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

    &-initiative {
      display: block;
      border: 1px solid #000;
      width: 98%;
      height: 50px;
      margin-bottom: 5px;
      font-size: 36px;
      line-height: 50px;
      font-weight: 700;
      text-align: center;
    }

    &-initiative-label {
      font-weight: 700;
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
    padding: 5px 5px 5px;
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
    display: flex;
    flex-direction: column;
  }

  textarea {
    border: 1px solid #000;
  }

  .spells__list{
    border: 1px solid #000;
    margin: 5px;
  }

  .spell__label-wrapper {
    display: flex;
    justify-content: space-around;
    align-items: center;
    border: 1px solid #000;
    margin: 10px;
  }

  .spell__level,
  .spell__label{
    display: inline-block;
    font-weight: 700;
  }

  .spell__level {
    font-size: 22px;
    margin: 5px;
  }

  .spell__label {

  }

  .spell-list__spell-table {

  }

  .spells-list__cells-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .spells-list__cells-input-wrapper {
    display: flex;
    flex-direction: column;
  }

  .spells-list__cells-label {
    margin: 5px 5px 0;
    width: 70%;
  }

  .spells-list__cells-input {
    padding: 5px;
    font-size: 14px;
    margin: 5px;
    width: 70%;
  }

  .spell__wrapper {
    display: flex;
    align-items: center;
  }

  .spell__check {
    margin: 5px;
  }

  .spell__input {
    padding: 5px;
    margin: 0 0 5px 0;
    flex-grow: 1;
  }

  .list-button {
    cursor: pointer;
    padding: 10px;
    width: 150px;
    height: 50px;
    border: 1px solid #000;
    background-color: gold;

    :active {
      border: 2px solid #000;
    }
  }

  .save-buttons {
    display: flex;
    justify-content: center;
    max-width: 782px;
    margin: 10px auto;

    @media print {
      display: none !important;
    }
  }


</style>
