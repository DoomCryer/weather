import axios from 'axios'

axios.defaults.baseURL = 'http://api.openweathermap.org/data/2.5'

const units = 'metric'
const appid = '182302c33275130cfca25524abff735d'

export default {
	findCity: params => axios.get('find', { params: { ...params, units, appid } }),
}
