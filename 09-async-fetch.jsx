import React from 'react';
import isEmail from 'validator/lib/isEmail';
const Field = require('./08-field-component-field.jsx');
const CourseSelect = require('./09-course-select.jsx');

var file = __filename.split('/').slice(-1)[0];
var file1 = file.split('.').slice(0)[0];

module.exports = React.createClass({
	displayName: file1,

	getInitialState() {
		return {
			name: '',
			email: '',
			fields: {},

			fieldErrors: {},
			people: []
		};
	},

	onFormSubmit(e) {
		e.preventDefault();
		const people = this.state.people;
		const person = this.state.fields;
		people.push(person);
		this.setState({ people, fields: {}, name: '', email: '' });
	},

	onInputChange({name, value, err}) {
		var fieldsObject = {};

		if(name === 'name') {
			fieldsObject = this.state.fields;
			fieldsObject[name] = value;
			this.setState({ fields: fieldsObject, name: value });
			// console.log(this.state.fields);
			return;
		}
		if(name === 'email') {
			fieldsObject = this.state.fields;
			fieldsObject[name] = value;
			this.setState({ fields: fieldsObject, email: value });
			// console.log(this.state.fields);
			return;
		}
		const fields = this.state.fields;
		// const fieldErorrs = this.state.fieldErorrs;

		fields[name] = value;

		this.setState({fields})
	},

	validate() {
		const fields = this.state.fields;
		const fieldErrors = this.state.fieldErrors;
		const errMessages = Object.keys(fieldErrors).filter( (k) => fieldErrors[k] );

		if (!fields.name) return true;
		if (!fields.email) return true;
		if (!fields.department) return true;
		if (!fields.course) return true;
		if (errMessages.length) return true;

		return false;
	},

	render() {
		return (
		<div>
			<h1>Sign Up Sheet</h1>
			<form onSubmit={this.onFormSubmit}>
				<Field 
					placeholder='Name'
					name='name'
					value={this.state.name}
					onChange={this.onInputChange}
					validate={ (val) => (val ? false : 'Name Required')}
				/>
				<br/>

				<Field
					placeholder='Email'
					name='email'
					value={this.state.email}
					onChange={this.onInputChange}
					validate={ (val) => (isEmail(val) ? false : 'Invalid Email')}
				/>
				<br/>

				<CourseSelect
					onChange={this.onInputChange}
					department={this.state.fields.department}
					course={this.state.fields.course}
				/>
				<br />
				<input type='submit' disabled={this.validate()}/>
			</form>
			<div>
				<h3>People</h3>
				<ul>
					{ this.state.people.map( ({name, email, department, course}, i) => 
						<li key={i}>{[name, email, department, course].join(' - ')}</li>
					) }
				</ul>
			</div>
		</div>

		);
	}
});