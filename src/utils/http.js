import axios from 'axios'
import { baseUrl, units, appid } from './config'

axios.defaults.baseURL = baseUrl

export default {
	findCity: params => axios.get('find', { params: { ...params, units, appid } }),
}
