import * as TYPES from './types';
import firebase from 'firebase/app';


export default {
	fetchLists({ commit }) {
		firebase.firestore().collection("lists").get()
			.then((querySnapshot) => {
        let lists = [];
        commit(TYPES.SET_FETCHING, true)
        querySnapshot.docs.forEach((doc) => {
          if (doc.data().user_data.user_id === localStorage.user_id) {
            lists.push({
              char_name: doc.data().char_name, 
              class_level: doc.data().class_level, 
              id: doc.id
            });
            commit(TYPES.SET_LISTS, lists)
          }
        });
		}).then(() => {
			commit(TYPES.SET_FETCHING, false)
		});
	},
  fetchCharList({ commit }, id) {
    firebase.firestore().collection("lists").doc(id).get()
      .then((doc) => {
        let result = doc.data();
        commit(TYPES.SET_CHAR_DATA, result)
      }
    )
  },
  setProp({ state, commit, dispatch}, object) {
    console.log(object.event.target.id)
    console.log(state.char_data[object.event.target.id])
    console.log(`state.char_data[${object.event.target.id}]`)
    commit(TYPES.SET_PROP, {
      prop: object.event.target.id,
      prop_value: object.event.target.value
    })
    // dispatch('fetchCharList', object.id)
  },
  // eslint-disable-next-line
  saveList({ commit }, object) {
    firebase.firestore().collection("lists").add(object)
      .then((data) =>{ // eslint-disable-next-line
        console.log('save success')
        return data;
      })
      .catch((error) => { // eslint-disable-next-line
        console.error("Error adding document: ", error);
      });
  },
  // eslint-disable-next-line
  updateList({ commit }, object) {
    console.log(object)
   firebase.firestore().collection('lists').doc(object.id).get().then(data => console.log(data.data()))
    firebase.firestore().collection('lists').doc(object.id).set(object.char_data)
      .then((data) =>{ // eslint-disable-next-line
        console.log('save success')
        return data;
      })
      .catch((error) => { // eslint-disable-next-line
        console.error("Error adding document: ", error);
      });
  },
  // eslint-disable-next-line
  deleteList({ commit }, id) {
    firebase.firestore().collection('lists').doc(id).delete();
  },
}
