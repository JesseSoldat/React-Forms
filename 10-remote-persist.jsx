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

		apiClient.savePeople(people)
			.then( () => {
				this.setState({
					people: people,
					fields: {},
					_saveStatus: 'SUCCESS',
					name: '',
					email: '',
				});
			}).catch( (err) => {
				console.error(err);
				this.setState({ _saveStatus: 'ERROR'});
			});
	},

	onInputChange({name, value, err}) {
		// console.log('name', name, 'value', value, 'err', err);
		var fieldsObject = {};
		const fields = this.state.fields;
		const fieldErrors = this.state.fieldErrors;

		if(name === 'name'){
			fieldsObject = this.state.fields;
			fieldsObject[name] = value;
			fieldErrors[name] = err;
			// console.log('name',fieldErrors);
			this.setState({ fields: fieldsObject, name: value, _saveStatus: 'READY' });

			return;
		}

		if(name === 'email'){
			fieldsObject = this.state.fields;
			fieldsObject[name] = value;
			fieldErrors[name] = err;
			// console.log('email',fieldErrors);
			this.setState({ fields: fieldsObject, email: value, _saveStatus: 'READY' });
			return;
		}


		fields[name] = value;
		fieldErrors[name] = err;
		console.log(fieldErrors);

		this.setState({fields, fieldErrors, _saveStatus: 'READY'});
	},

	validate() {
		const fields = this.state.fields;
		const fieldErrors = this.state.fieldErrors;
		const errMessages = Object.keys(fieldErrors).filter( (k) => fieldErrors[k]);

		if(!fields.name) return true;
		if(!fields.email) return true;
		if(!fields.course) return true;
		if(!fields.department) return true;
		if(errMessages.length) return true;

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
					validate={(val) => (val ? false : 'Name Required')}
				/>
				<br />
				<Field
					placeholder='Email'
					name='email'
					value={this.state.email}
					onChange={this.onInputChange}
					validate={(val) => (isEmail(val) ? false : 'Invalid Email')}
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
					ERROR: <input value='Save Failed - Retry?' type='submit' disabled={this.validate()} />,
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

	count: 1,

	savePeople: function(people) {
		const success = !!(this.count++ % 2);
		//first save with work 1 % 2 = 1 TRUE
		//second save count: 2   2 % 2 = 0 FALSE

		return new Promise( (resolve, reject ) => {
			setTimeout( () => {
				if (!success) return reject({ success });

				localStorage.people = JSON.stringify(people);
				return resolve( { success });
			}, 1000);
		});
	},
}