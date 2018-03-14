import { handle } from 'redux-pack'
import _ from 'lodash'
import http from '../utils/http'

const SEARCH_CITY = 'SEARCH_CITY'
const ADD_CITY = 'ADD_CITY'
const REMOVE_CITY = 'REMOVE_CITY'
const SELECT_CITY = 'SELECT_CITY'

const initialState = {
	suggestions: [],
	cities: [],
	selectedCityId: null,
	error: null,
}

export default function(state = initialState, action) {
	const { type, payload } = action
	switch (type) {
		case SEARCH_CITY:
			return handle(state, action, {
				start: prevState => ({ ...prevState, error: null }),
				success: prevState => {
					const { data } = payload
					const { list } = data
					return { ...prevState, suggestions: list }
				},
				failure: prevState => ({ ...prevState, error: payload, suggestions: [] }),
			})

		case SELECT_CITY: {
			return { ...state, selectedCityId: payload }
		}

		case ADD_CITY: {
			const { cities, suggestions } = state
			const exists = cities.some(item => item.id === payload)
			if (!exists) {
				const city = suggestions.find(item => item.id === payload)
				return { ...state, cities: [...cities, city] }
			} else return { ...state }
		}

		case REMOVE_CITY: {
			const { cities } = state
			const index = _.findIndex(cities, ['id', payload])
			return { ...state, cities: [...cities.slice(0, index), ...cities.slice(index + 1)] }
		}

		default:
			return { ...state }
	}
}

export function searchCity(name) {
	return {
		type: SEARCH_CITY,
		promise: http.findCity({ q: name }),
	}
}

export function addCity(payload) {
	return {
		type: ADD_CITY,
		payload,
	}
}

export function removeCity(payload) {
	return {
		type: REMOVE_CITY,
		payload,
	}
}

export function selectCity(payload) {
	return {
		type: SELECT_CITY,
		payload,
	}
}
