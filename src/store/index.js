import Vue from 'vue'
import Vuex from 'vuex'
import cityModule from './modules/city.module.js'
import { settingsService } from '../services/settingsService.js'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: true,
  state: {
    settings: {}
  },
  getters: {
    settings(state) { return state.settings },
  },
  mutations: {
    updateSetting(state, { optionIdx, value }) {
      state.settings[Object.keys(state.settings)[optionIdx]] = value
    },
    setSettings(state, { settings }) {
      state.settings = settings
    }
  },
  actions: {
    async loadSettings({ commit }) {
      const settings = await settingsService.loadSettings()
      commit({ type: 'setSettings', settings })
    },
    async updateSettings({ commit }, { optionIdx }) {
      const value = await settingsService.updateSettings(optionIdx)
      commit({ type: 'updateSetting', optionIdx, value })
    }
  },
  modules: {
    cityModule
  },
})
