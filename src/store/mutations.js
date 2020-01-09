import * as TYPES from './types';
import _ from 'lodash';

export default {
  [TYPES.SET_FETCHING](state, value) {
    state.fetching = value || false
  },
  [TYPES.SET_LISTS](state, array) {
    state.lists = array;
  },
  [TYPES.SET_CHAR_DATA](state, object) {
    _.merge(state.char_data, object)
  },
  [TYPES.SET_PROP](state, object) {
    state.char_data[object.prop] = object.prop_value;
  },
}
