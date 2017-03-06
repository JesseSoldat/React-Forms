import React from 'react';

const content = document.createElement('div');
document.body.appendChild(content);

console.log(__filename);
//    /01-basic-button.jsx
var file = __filename.split('/').slice(-1)[0];
//split from a STRING into an ARRAY ['/', '01-basic-button.jsx'] -1 returns the last item
//in the ARRAY as a new ARRAY [0] takes the item out of the ARRAY
console.log(file);
// var file1 = file.split('.').slice(0,1);
// ['01-basic-button','jsx'] gives us any array with the 0 indexed item
var file1 = file.split('.').slice(0)[0];
// 01-basic-button gives a string

module.exports = React.createClass({
	displayName: file1,
	// displayName:  __filename.substr(0, __filename.lastIndexOf('.')),

	render() {
		return (
		<div>
			<h1>What do you think of React?</h1>
		</div>
		);
	}
});