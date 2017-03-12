import React from 'react';
import thunkMiddleware from 'redux-thunk';
import {connect, Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';

import { reducer } from './11-redux-reducer.js';
const Form = require('./11-redux-form.jsx');

const store = createStore(reducer, applyMiddleware(thunkMiddleware));

const ReduxForm = connect(mapStateToProps)(Form);

var file = __filename.split('/').slice(-1)[0];
var file1 = file.split('.').slice(0)[0];

module.exports = React.createClass({
	displayName: file1,

	render() {
		return (
			<Provider store={store}>
				<ReduxForm />
			</Provider>
		);
	},
});

function mapStateToProps(state) {
	return {
		isLoading: state.isLoading,
		fields: state.person,
		people: state.people,
		saveStatus: state.saveStatus,
	};
}