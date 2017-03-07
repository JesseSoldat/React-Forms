import React from 'react';

var file = __filename.split('/').slice(-1)[0];
var file1 = file.split('.').slice(0)[0];

module.exports = React.createClass({
	displayName: file1,

	getInitialState() {
		return {	
			name: '',
			email: '',
			people: []
		};
	},

	onFormSubmit(evt) {
		let fields = {
			name: this.state.name,
			email: this.state.email
		}
		const people = [...this.state.people, fields];
		console.log(people);
		this.setState({ people: people, name: '', email: '' });
		evt.preventDefault();
		let focus = this.refs.name;
		// console.log(focus)
		focus.focus()
		//if user hits enter instead of submit the focus will return to the name input

	},

	onInputChange(evt){
		const field = evt.target.name.toString();
		// console.log(field);
		const data = evt.target.value;
		// console.log(data);
		// var eventTarget = evt.target.placeholder.toLowerCase();
		// var eventTarget = evt.target.name;
		// fields[eventTarget] = evt.target.value;
		if(field === 'name'){
			this.setState({ name: data });
		}
		if(field === 'email'){
			this.setState({ email: data });

		}
	},

	render() {
		return (
		<div>
			<h1>Sign Up Sheet</h1>
			<form onSubmit={this.onFormSubmit}>
			<input placeholder='Name' name='name' ref="name"
						value={this.state.name}
						 onChange={this.onInputChange}/>
			<input placeholder='Email' name='email'
						value={this.state.email}
						onChange={this.onInputChange}/>
			<input type="submit"/>
			</form>
			<div>
				<h3>People</h3>
				<ul>
					{ this.state.people.map( ({ name, email }, i) => 
						<li key={i}>{name} ({email})</li> )}
				</ul>
			</div>
		</div>
		);
	}
});