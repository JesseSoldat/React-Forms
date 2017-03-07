import React from 'react';

// const content = document.createElement('div');
// document.body.appendChild(content);

var file = __filename.split('/').slice(-1)[0];
var file1 = file.split('.').slice(0)[0];


module.exports = React.createClass({
	displayName: file1,

	onFormSubmit(e) {
		//console.log(e) //SUBMIT EVENT
		// console.log(this);
		e.preventDefault();
		console.log(this.refs.name.value);
	},

	render() {
		return (
		<div>
			<h1>Sign Up Sheet</h1>
			<form onSubmit={this.onFormSubmit}>
				<input placeholder="Name" ref="name"/>
				<input type="submit"/>
			</form>
		</div>
		);
	}
});