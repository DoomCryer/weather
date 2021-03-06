import React, { Component } from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'
import { AutoComplete, Input, Table, Button } from 'antd'
import { searchCity, addCity, removeCity, selectCity } from '../../modules/weatherList'
import './index.css'

const Option = AutoComplete.Option

class WeatherList extends Component {
	searchThrottle = _.throttle(() => this.search(), 800)

	search = () => {
		const { dispatch } = this.props
		const name = this.inputField.props.value

		//start searching after 3 letters
		if (name.length > 2) dispatch(searchCity(name))
	}

	renderOption = item => {
		//sometimes the search yields several cities with the same id, so we need to generate unique key
		const key = `${item.id}-${_.random(100, 999)}`
		return (
			<Option key={key} text={item.name}>
				{item.name}
			</Option>
		)
	}

	onSelect = value => {
		//delete autogenerated suffix from id
		const id = _.parseInt(value.slice(0, -4))
		const { dispatch } = this.props
		dispatch(selectCity(id))
	}

	addCity = () => {
		const { selectedCityId: id, dispatch } = this.props
		if (id != null) {
			dispatch(addCity(id))
		}
	}

	removeCity = id => {
		const { dispatch } = this.props
		dispatch(removeCity(id))
	}

	render() {
		const { suggestions, cities } = this.props
		const foundedCities = _.map(suggestions, this.renderOption)
		const columns = [
			{
				title: 'City',
				dataIndex: 'name',
				key: 'name',
				defaultSortOrder: 'ascend',
				sorter: (a, b) => a.name.localeCompare(b.name),
			},
			{
				title: 'Temperature',
				dataIndex: 'main.temp',
				key: 'temp',
			},
			{
				title: 'Pressure',
				dataIndex: 'main.pressure',
				key: 'pressure',
			},
			{
				title: '',
				dataIndex: '',
				key: 'x',
				render: (label, item) => (
					<Button onClick={() => this.removeCity(item.id)} icon="close" shape="circle" />
				),
				width: 50,
			},
		]

		return (
			<div className="root">
				<div className="content">
					<div className="search-field">
						<AutoComplete
							style={{ width: '150px' }}
							dataSource={foundedCities}
							onSearch={this.searchThrottle}
							onSelect={this.onSelect}
							optionLabelProp="text"
							placeholder={`Enter city name`}
						>
							<Input ref={field => (this.inputField = field)} />
						</AutoComplete>
						<Button style={{ marginLeft: '16px' }} type="primary" onClick={this.addCity}>
							Add
						</Button>
					</div>
					<Table
						pagination={false}
						bordered
						rowKey="id"
						onRow={this.onRow}
						columns={columns}
						dataSource={cities}
					/>
				</div>
			</div>
		)
	}
}

export default connect(state => {
	const { weatherList } = state
	return {
		suggestions: weatherList.suggestions,
		cities: weatherList.cities,
		selectedCityId: weatherList.selectedCityId,
		error: weatherList.error,
	}
})(WeatherList)
