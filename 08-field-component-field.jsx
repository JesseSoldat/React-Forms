import React, {PropTypes} from 'react';

module.exports = React.createClass({
	propTypes: {
		placeholder: PropTypes.string,
		name: PropTypes.string.isRequired,
		value: PropTypes.string,
		validate: PropTypes.func,
		onChange: PropTypes.func.isRequired
	},

	getInitialState() {
		return {
			value: this.props.value,
			error: false
		};
	},

	componentWillReceiveProps(update) {
		// console.log('receive props', update);
		this.setState({value: update.value});
		//in case the parent updates the value this.state.name / this.state.email
		//also on submit the parent will return name: '', email: '';
	},

	onChange(e){
		 const name = this.props.name;
		 const value = e.target.value;
		 //only equals the current input value
		 const error = this.props.validate ? this.props.validate(value) : false;
		 //if there is NO this.props.validate return false (not a required PropType)
		 //Name input error calls a funtion that returns ( val ? false : 'Name Required' )
		 //Email input error calls that returns ( isEmail(val) ? false : 'Invalid Email' )
		 const ref = this.refs.name;
		 //ref is only for the name input so we can focus on it after user hits enter

		 this.setState({ value });
		 
		 this.props.onChange({ name, value, error, ref });
		 //the error here disables the buttons
	},

	onBlur(e){
		const name = e.target.name;
		const value = e.target.value;
		const error = this.props.validate ? this.props.validate(value) : false;

		if(name === 'name'){
			this.setState({ error });
			//display name input error
		}

		if(name === 'email'){
			this.setState({ error });
			//display email input error
		}
	},

	render() {
		return (
		<div>
			<input placeholder={this.props.placeholder}
						name={this.props.name}
						ref={this.props.name}
						value={this.state.value}
						onChange={this.onChange}
						onBlur={this.onBlur}/>
			<span style={{color: 'red'}}>{this.state.error}</span>
		</div>
		)
	}

})