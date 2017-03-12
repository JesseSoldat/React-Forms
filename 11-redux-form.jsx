import React, {PropTypes} from 'react';
import isEmail from 'validator/lib/isEmail';

const Field = require('./08-field-component-field.jsx');
const CourseSelect = require('./09-course-select.jsx');

module.exports = React.createClass({
	propTypes: {
		people: PropTypes.array.isRequired,
		isLoading: PropTypes.bool.isRequired,
		saveStatus: PropTypes.string.isRequired,
		fields: PropTypes.object,
		onSubmit: PropTypes.func.isRequired,
	},

	getInitialState() {
		return {
			fields: this.props.fields || {},
			fieldErrors: {},
			name: '',
			email: '',
		};
	},

	componentWillReceiveProps(nextProps) {
		this.setState({ fields: nextProps.fields });
	},

	onSubmit(e) {
		e.preventDefault();
		
		const person = this.state.fields;

		if(this.validate()) return;

		this.props.onSubmit([...this.props.people, person]);
	},

	onInputChange({name, value, err}) {
		var fieldsObject = {};
		const fields = this.state.fields;
		const fieldErrors = this.state.fieldErrors;

		fieldErrors[name] = err;
		
		if(name === 'name'){
			fieldsObject = this.state.fields;
			fieldsObject[name] = value;
			this.setState({ fields: fieldsObject, name: value });
			return;
		}

		if(name === 'email'){
			fieldsObject = this.state.fields;
			fieldsObject[name] = value;
			this.setState({ fields: fieldsObject, email: value });
			return;
		}

		fields[name] = value;

		this.setState({fields, fieldErrors})
	},

	validate() {
		const fields = this.state.fields;
		const fieldErrors = this.state.fieldErrors;
		const errMessages = Object.keys(fieldErrors).filter( (k) => fieldErrors[k]);
		
		if (!fields.name) return true;
    if (!fields.email) return true;
    if (!fields.course) return true;
    if (!fields.department) return true;
    if (errMessages.length) return true;

		return false;
	},

	render() {
		if(this.props.isLoading) {
      return <img alt='loading' src='/img/loading.gif' />;
		}
		const dirty = ( (this.state.name || this.state.email )? true : false );
		let status = this.props.saveStatus;
		if(status === 'SUCCESS' && dirty) status = 'READY';
		// console.log('dirty', dirty);
		return (
		<div>
			<h1>Sign Up Sheet</h1>
			<form onSubmit={this.onSubmit}>
				<Field
					placeholder='Name'
					name='name'
					value={this.state.name}
					onChange={this.onInputChange}
					validate={ (val) => (val ? false : 'Name Required')}
				/>
				<br />
				<Field
					placeholder='Email'
					name='email'
					value={this.state.email}
					onChange={this.onInputChange}
					validate={ (val) => ( isEmail(val) ? false : 'Invalid Email')}
				/>
				<br />
				<CourseSelect
					department={this.state.fields.department}
					course={this.state.fields.course}
					onChange={this.onInputChange}
				/>
				<br />

				{
					{
						SAVING: <input value='Saving...' type='submit' disabled />,
            SUCCESS: <input value='Saved!' type='submit' disabled />,
            ERROR: <input
              value='Save Failed - Retry?'
              type='submit'
              disabled={this.validate()}
            />,
            READY: <input
              value='Submit'
              type='submit'
              disabled={this.validate()}
            />,
          }[status]
				}
			</form>
			<div>
				<h3>People</h3>
				<ul>
					{this.props.people.map( ({name,email,department,course},i) => 
						<li key={i}>{ [name,email,department,course].join(' - ') }</li> 
					)}
				</ul>
			</div>
		</div>
		);
	},

});