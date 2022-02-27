import { cityService } from "../../services/cityService"

export default {
    state: {
        cities: [],
        currCity: null,
        weatherDays: null,
        favorites: []
    },
    getters: {
        citiesForDisplay(state) {
            return state.cities
        },
        weatherDays(state) {
            return state.weatherDays
        },
        currCity(state) {
            return state.currCity
        },
        favorites(state) {
            return state.favorites
        }
    },
    mutations: {
        setCities(state, { cities }) {
            state.cities = cities
        },
        setWeather(state, { cityWeather, city }) {
            state.currCity = city
            state.weatherDays = cityWeather
        },
        setFavorites(state, { favorites }) {
            state.favorites = favorites
        }
    },
    actions: {
        async loadCities({ commit }, { searchBy }) {
            const cities = await cityService.query(searchBy)
            commit({ type: 'setCities', cities })
        },
        async chooseCity({ commit }, { city }) {
            const { cityWeather, currCity } = await cityService.chooseCity(city.Key)
            commit({ type: 'setWeather', cityWeather, city: Object.keys(city).length ? city : currCity })
        },
        async loadFavorites({ commit }) {
            const favorites = await cityService.loadFavorites()
            commit({ type: 'setFavorites', favorites })
        },
        async updateCity({ commit }, { status, city }) {
            const favCities = await cityService.updateCity(status, city)
            commit({ type: 'setFavorites', favorites: favCities })
        }
    }
}