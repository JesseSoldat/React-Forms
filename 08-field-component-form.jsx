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
			//points to the NAME INPUT
		}
		const fieldErrors = this.state.fieldErrors;

		fieldErrors[name] = error;
		//console.log(fieldErrors.name); //starts as undefined -> false -> Name Required
		//console.log(fieldErrors.email); //starts as undefined -> Invalid Email

		if(name === 'name'){
			this.setState({ name: value, fieldErrors});
		}
		if(name === 'email'){
			this.setState({ email: value, fieldErrors });
		};
	},

	validate() {
		const fieldErrors = this.state.fieldErrors;
		//console.log('fieldErrors ', fieldErrors); //Object {name: false} => Object {name: "Name Required"}
		const errMessages = Object.keys(fieldErrors).filter( (k) => {
			//console.log(fieldErrors[k]); //VALUE of fieldErrors = false || 'Name Required' 
			//(if false errMessages = [] do not return anything)  (if TRUTHY 'Name Required' return ["name"])
			return fieldErrors[k]; 
		});
		//["name", "email"] as errors occur the new KEYS name and email appear on fieldErrors: {}
		//console.log(errMessages);
		//----------------------------------------------
		const array = [1,0, false, undefined, 'hello'];
		let arrayFilter= array.filter( (item) => !!item);  
		//filter removes all falsey items;
		//console.log(arrayFilter); //[1, "hello"]
		let arrayFilterTruthy= array.filter( (item) => !item);  
		//console.log(arrayFilterTruthy); //[0, false, undefined]
		let myItem = 1;
		let myItem1 = 0;
		//console.log(!!myItem);//true
		//console.log(!!myItem1);//false

		//----------------------------------------------

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