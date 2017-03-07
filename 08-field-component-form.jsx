import React from 'react';
import isEmail from 'validator/lib/isEmail';
const Field = require('./08-field-component-field.jsx');

var file = __filename.split('/').slice(-1)[0];
var file1 = file.split('.').slice(0)[0];
var focusInput;

module.exports = React.createClass({
	displayName: file1,

	getInitialState() {
		return {
			name: '',
			email: '',
			fieldErrors: {},
			people: [],
		}
	},

	onFormSubmit(e) {
		e.preventDefault();
		const fields = {
			name: this.state.name,
			email: this.state.email
		}
		const people = this.state.people;
		const person = fields;

		if (this.validate()) return;
		people.push(person);

		this.setState({ people, name: '', email: ''});

		focusInput.focus();
	},

	onInputChange({ name, value, error, ref }) {
		
		if(ref !== undefined){
			// console.log(ref);
			focusInput = ref
		}
		const fieldErrors = this.state.fieldErrors;

		fieldErrors[name] = error;

		// console.log(name, value, error);
		if(name === 'name'){
			this.setState({ name: value, fieldErrors});
		}
		if(name === 'email'){
			this.setState({ email: value, fieldErrors });
		};

	},

	validate() {
		const fieldErrors = this.state.fieldErrors;
		const errMessages = Object.keys(fieldErrors).filter( (k) => fieldErrors[k]);
		// console.log(errMessages);

		if(!this.state.name) return true;
		if(!this.state.email) return true;
		if(errMessages.length) return true;


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
					validate={(val) => (val ? false : 'Name Required')}/>
				<br/>

				<Field
					placeholder='Email'
					name='email'
					value={this.state.email}
					onChange={this.onInputChange}
					validate={(val) => (isEmail(val) ? false : 'Invalid Email')}/>
				<br/>

				<input type="submit" disabled={this.validate()} />
			</form>
			<div>
				<h3>People</h3>
				<ul>
					{ this.state.people.map( ({name, email}, i) => 
						<li key={i}>{name} ({email})</li> )}
				</ul>
			</div>
		</div>
		)
	}
})