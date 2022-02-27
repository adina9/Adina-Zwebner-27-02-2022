import { storageService } from "./storageService"

const KEY_SETTINGS = 'settingsDB'

export const settingsService = {
    loadSettings,
    updateSettings
}


async function loadSettings() {
    try {
        let settings = storageService.load(KEY_SETTINGS) || {}
        if (Object.keys(settings).length) return Promise.resolve(settings)
        else {
            settings = { isDarkMode: false, isCelsius: true }
            storageService.save(KEY_SETTINGS, settings)
            return Promise.resolve(settings)
        }
    } catch (err) {
        console.log('err in loadSettings in settingsService:', err);
    }
}


async function updateSettings(idx) {
    try {
        let settings = await storageService.load(KEY_SETTINGS)
        const currValue = settings[Object.keys(settings)[idx]]
        settings[Object.keys(settings)[idx]] = !currValue
        storageService.save(KEY_SETTINGS, settings)
        return !currValue
    } catch (err) {
        console.log('err in settingsService in updateSetting:', err);
    }
}

