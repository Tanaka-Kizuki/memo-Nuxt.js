import Vuex from 'Vuex'
import createPersistedState from 'vuex-createPersistedState'

export const state = () => ({
     message: 'counter number',
     counter: 0,
});

export const mutations = {
     doit(state) {
          var n = Math.floor(Math.ranbom()*10);
          state.counter += n;
          state.message = 'add' + n + '.'
     },
     reset(state) {
          state.counter = 0;
          state.message = 'reset now ...';
     },
}

export const Plugins = [
     createPersistedState(),
]