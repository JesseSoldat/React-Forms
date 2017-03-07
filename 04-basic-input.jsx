import React from 'react';

var file = __filename.split('/').splice(-1)[0];
var file1 = file.split('.').splice(0)[0];

module.exports = React.createClass({

	displayName: file1,

	getInitialState() {
		return { names: [] };
	},

	onFormSubmit(evt) {
		evt.preventDefault();
		const name = this.refs.name.value;
		const names = [...this.state.names, name];
		this.setState({ names: names });
		this.refs.name.value = '';

	},

	render() {
		return (
		<div>
			<h1>Sign Up Sheet</h1>
			<form onSubmit={this.onFormSubmit}>
				<input placeholder='Name' ref='name'/>
				<input type='submit' />
			</form>

			<div>
				<h3>Names</h3>
				<ul>
					{ this.state.names.map((name, i) => <li key={i}>{name}</li>) }
				</ul>
			</div>
		</div>
		)
	}
})