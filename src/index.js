import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import store from './store'
import WeatherList from './containers/WeatherList/index'

ReactDOM.render(
	<Provider store={store}>
		<WeatherList />
	</Provider>,
	document.getElementById('root')
)
