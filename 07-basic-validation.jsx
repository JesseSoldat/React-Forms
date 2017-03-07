import React from 'react';
import isEmail from 'validator/lib/isEmail';

var file = __filename.split('/').slice(-1)[0];
var file1 = file.split('.').slice(-2)[0];

module.exports = React.createClass({
	displayName: file1,

	getInitialState() {
		return {
			name: '',
			email: '',
			fieldsErrors: {},
			people: []
		}
	},

	onFormSubmit(evt) {
		evt.preventDefault();
		var focusInput = this.refs.name;
		var evtData = {
			name: this.state.name,
			email: this.state.email
		}
		const people = [...this.state.people];
		const person = evtData;
		const fieldsErrors = this.validate(person);
		//if no errors returns an empty OBJECT
		this.setState({fieldsErrors});

		if(Object.keys(fieldsErrors).length) return;
		//check to see if the fieldErrors object has any properties 

		people.push(person);
		this.setState({ people, name: '', email: ''});

		focusInput.focus();

	},

	validate(person){
		const errors = {};
		// console.log(isEmail(person.email)); //isEmail returns false if no email
		if (!person.name) errors.name = 'Name Required';
		if (!person.email) errors.email = 'Email Required';
		if (person.email && !isEmail(person.email) ) errors.email = 'Invalid Email';
		//must have an email AND if no email is returned is we get FALSE !false = true
		return errors;
	},

	onInputChange(evt) {
	
		if(evt.target.name === 'name'){
			this.setState({ name: evt.target.value });
		}

		if(evt.target.name === 'email'){
			this.setState({ email: evt.target.value });
		}
		
	},

	render() {
		return(
		<div>
			<h1>Sign Up Sheet</h1>
			<form onSubmit={this.onFormSubmit}>
				<input placeholder='Name' name='name' ref='name'
					value={this.state.name}
					onChange={this.onInputChange}/>
				<span style={{color: 'red'}}>{this.state.fieldsErrors.name}</span>
				<br/>

				<input placeholder="Email" name="email"
					value={this.state.email}
					onChange={this.onInputChange}/>
				<span style={{color: 'red'}}>{this.state.fieldsErrors.email}</span>
				<br/>
				<input type='submit'/>
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