import React from 'react';
import isEmail from 'validator/lib/isEmail';

const Field = require('./08-field-component-field.jsx');
const CourseSelect = require('./09-course-select.jsx');

let file = __filename.split('/').slice(-1)[0];
let file1 = file.split('.').slice(0)[0];

let apiClient;

module.exports = React.createClass({
	displayName: file1,

	getInitialState() {
		return({
			name: '',
			email: '',
			fields: {},
			fieldErrors: {},
			people: [],
			_loading: false,
			_saveStatus: 'READY',
		});
	},

	componentWillMount() {
		this.setState({_loading:true});

		apiClient.loadPeople().then( (people) => {
			this.setState( {_loading: false, people});
		});
	},

	formSubmit(e) {
		e.preventDefault();
		const person = this.state.fields;

		if(this.validate()) return;

		const people = [...this.state.people, person];

		this.setState({_saveStatus: 'SAVING'});


	},

	onInputChange({name, value, err}) {
		if(name === 'name'){
			this.setState({name: value});
			return;
		}

		if(name === 'email'){
			this.setState({email: value});
			return;
		}

		const fields = this.state.fields;
		const fieldErrors = this.state.fieldErrors;

		fields[name] = value;

		this.setState({fields, fieldErrors, _saveStatus: 'READY'});
	},

	validate() {
		return false;
	},

	render() {
		if(this.state._loading) {
			return <img alt='loading' src='/img/loading.gif' />;
		}
		return (
		<div>
			<h1>Sign Up</h1>
			<form onSubmit={this.formSubmit}>
				<Field
					placeholder='Name'
					name='name'
					value={this.state.name}
					onChange={this.onInputChange}
				/>
				<br />
				<Field
					placeholder='Email'
					name='email'
					value={this.state.email}
					onChange={this.onInputChange}
				/>
				<br />
				<CourseSelect
					department={this.state.fields.department}
					course={this.state.fields.course}
					onChange={this.onInputChange}
				/>
				<br />
				{{
					SAVING: <input value='Saving...' type='submit' disabled />,
					SUCCESS: <input value='Saved...' type='submit' disabled />,
					ERROR: <input value='Save Failed - Retry?' type='submit' disabled />,
					READY: <input value='Submit' type='submit' disabled={this.validate()} />,
				}[this.state._saveStatus]}

			</form>
			<div>
				<h3>People</h3>
				<ul>
					{this.state.people.map( ({name, email, department, course}, i) => 
						<li key={i}>{[name, email, department, course].join(' - ')}</li>
					)}
				</ul>
			</div>
		</div>
		);
	},
});

apiClient = {
	loadPeople: function() {
		return {
			then: function(cb) {
				setTimeout( () => {
					cb(JSON.parse(localStorage.people || '[]'));
				}, 1000);
			}
		}
	},

	savePeople: function() {

	}
}