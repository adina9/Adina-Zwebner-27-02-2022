import { storageService } from './storageService.js';
import Axios from 'axios'

var axios = Axios.create({
    withCredentials: false
})

var gFavCities = []
var gDays = []
var gCurrCity = {}

const KEY = 'cityDB'
const KEY_FAV = 'favoritesDB'
const KEY_WEATHER = 'WeatherDaysDB'

const API_KEY = '8STSWKSldaD2BQmXrmqAFgafgd2kb5C5'

export const cityService = {
    query,
    chooseCity,
    loadFavorites,
    updateCity
}


async function query(q) {
    try {
        const cities = storageService.load(KEY) || []

        // EXPLANATION:
        //if there's nothing in storage OR the the relevant keyword hasn't been searched, i'll fetch the data.
        // otherwise, i want to check if the relevant keyword is already been searched;
        // if so, return all the relevant cities by collecting them by their names. 
        if (!cities.length || cities.findIndex(_city => _isCityMatches(q, _city)) < 0) {
            const url = `https://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${API_KEY}&q=${q}&language=en`
            const res = await axios.get(url)
            cities.push(...res.data)
            _saveToStorage(KEY, cities)
            return Promise.resolve(res.data.splice(0, 7))
        } else {
            let citiesForDisplay = []
            cities.forEach(city => {
                if (_isCityMatches(q, city)) citiesForDisplay.push(city)
            })
            return Promise.resolve(citiesForDisplay.slice(0, 7))
        }
    } catch (err) {
        console.log('err in cityService in loadCities:', err);
    }

}

async function loadFavorites() {
    try {
        const favorites = storageService.load(KEY_FAV) || []
        if (favorites.length) {
            gFavCities = [...favorites]
            return Promise.resolve(gFavCities)
        }
    } catch (err) {
        console.log('err in cityService in loadFavorites:', err);
    }
}

async function chooseCity(cityKey) {
    try {
        return new Promise(async (resolve, reject) => {
            gDays = !cityKey ? await _fetchUserCity() : await _fetchChosenCity(cityKey)
            setTimeout(() => {
                resolve({ cityWeather: gDays, currCity: gCurrCity })
            }, 1000)
        })
    } catch (err) {
        console.log('err in cityService in chooseCity:', err);
    }
}


async function updateCity(status, city) {
    try {
        let copyCities = JSON.parse(JSON.stringify(gFavCities))
        if (status) {
            if (copyCities.find(fav => fav.LocalizedName === city.LocalizedName)) return
            const res = await _fetchChosenCity(city.Key)
            copyCities.push({ ...res[0], ...city })
        } else copyCities = copyCities.filter(fav => fav.Key !== city.Key)

        gFavCities = copyCities
        _saveToStorage(KEY_FAV, gFavCities)
        return Promise.resolve(gFavCities)
    } catch (err) {
        console.log('err in cityService in updateCity:', err);
    }
}

async function _fetchChosenCity(cityKey) {
    try {
        const weatherDays = storageService.load(KEY_WEATHER) || []
        if (!weatherDays.length || _cityIndex(weatherDays, cityKey) < 0) {
            const url = `http://dataservice.accuweather.com/forecasts/v1/daily/5day/${cityKey}?apikey=${API_KEY}&details=true`
            const res = await axios.get(url)
            weatherDays.push([...res.data.DailyForecasts])
            _saveToStorage(KEY_WEATHER, weatherDays)
            return Promise.resolve(res.data.DailyForecasts)
        } else {
            return Promise.resolve(weatherDays[_cityIndex(weatherDays, cityKey)])
        }
    } catch (err) {
        console.log('err in cityService in fetchChosenCity:', err);
    }
}

async function _fetchUserCity() {

    const _success = async (pos) => {
        const { latitude, longitude } = pos.coords;
        const res = await axios.get(`http://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=${API_KEY}&q=${latitude},${longitude}&language=en`)
        const city = res.data
        const days = await _fetchChosenCity(city.Key)
        gDays = days
        gCurrCity = city
    }

    const _error = (err) => console.warn(`ERROR(${err.code}): ${err.message}`);

    var options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
    };
    navigator.geolocation.getCurrentPosition(_success, _error, options)
}


const _isCityMatches = (q, city) => city.LocalizedName.slice(0, q.length) === q.slice(0, 1).toUpperCase() + q.slice(1, q.length).toLowerCase()

const _cityIndex = (weatherDays, cityKey) => weatherDays.findIndex(_day => _day[0].Link.includes(cityKey))

function _saveToStorage(key, value) { storageService.save(key, value) }



