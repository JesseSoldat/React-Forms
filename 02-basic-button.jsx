import React from 'react';
var file = __filename.split('/').slice(-1)[0];
var file1 = file.split('.').slice(0)[0];
// console.log(file1);
var numArray = ['01','02','03','04','05','06','07','08','09','10'];
// console.log(numArray.length);
var list = numArray.map( (num, i) => {
		return <li key={i+1}><button name="`button-${i+1}`" value={i}>{num}</button></li>
});
// console.log(list);
module.exports = React.createClass({
	displayName: file1,

	btnCreater (num, i) {
		// console.log(num);
		// console.log(i);
		return <li key={i+1}><button name="`button-${i+1}`" value={i} onClick={(num) => this.clickHandler(num)}>{num}</button></li>
		
	},

	clickHandler(e) {
		var btn = e.target.value + 1;
		console.log(e);
		console.log(`The user clicked ${btn}`);
	},

	render() {
		return (
		<div>
			<h1>Buttons</h1>
			<ul>
				{numArray.map((num, i) => this.btnCreater(num, i))}
			</ul>
		</div>

		)
	}
})
