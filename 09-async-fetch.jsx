import React from 'react';
import isEmail from 'validator/lib/isEmail';
const CourseSelect = require('./09-course-select.jsx');

var file = __filename.split('/').slice(-1)[0];
var file1 = file.split('.').slice(0)[0];

module.exports = React.createClass({
	displayName: file1,

	getInitialState() {
		return {
			fields: {},
			fieldErorrs: {},
			poeple: []
		};
	},

	onFormSubmit(e) {

	},

	onInputChange() {

	},

	validate() {
		return false;
	},

	render() {
		return (
		<div>
			<h1>Sign Up Sheet</h1>
			<form onSubmit={this.onFormSubmit}>
				<CourseSelect
					onChange={this.onInputChange}
					department={this.state.fields.department}
					course={this.state.fields.course}/>
			</form>
		</div>

		);
	}
});