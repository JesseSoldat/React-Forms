import React from 'react';

let styles = {
	container: {
		width: '600px',
		margin: 'auto',
		color: 'black',
		padding: '20px',
		textAlign: 'center'
	},
	count: {
		margin: 0,
		padding: '20px',
		fontSize: '36px'
	},
	blueBtn: {
		border: 0,
		padding: '15px',
		margin: '10px',
		width: '20%',
		background: '#55acee',
		fontSize: '15px',
		outline: 'none',
		borderRadius: '5px',
		color: '#FFF',
		fontWeight: 'bold',
		boxShadow: '0px 5px 0px 0px #3C93D5'
	},
	blueHover: {
		border: 0,
		padding: '15px',
		margin: '10px',
		width: '20%',
		background: '#6FC6FF',
		fontSize: '15px',
		outline: 'none',
		borderRadius: '5px',
		color: '#FFF',
		fontWeight: 'bold',
		boxShadow: '0px 5px 0px 0px #3C93D5'
	},
	greenBtn: {
		border: 0,
		padding: '15px',
		margin: '10px',
		width: '20%',
		background: '#2ecc71',
		fontSize: '15px',
		outline: 'none',
		borderRadius: '5px',
		color: '#FFF',
		fontWeight: 'bold',
		boxShadow: '0px 5px 0px 0px #15B358'
	},
	greenHover: {
		border: 0,
		padding: '15px',
		margin: '10px',
		width: '20%',
		background: '#48E68B',
		fontSize: '15px',
		outline: 'none',
		borderRadius: '5px',
		color: '#FFF',
		fontWeight: 'bold',
		boxShadow: '0px 5px 0px 0px #15B358'
	},
	purpleBtn: {
		border: 0,
		padding: '15px',
		margin: '10px',
		width: '20%',
		background: '#9b59b6',
		fontSize: '15px',
		outline: 'none',
		borderRadius: '5px',
		color: '#FFF',
		fontWeight: 'bold',
		boxShadow: '0px 5px 0px 0px #82409D'
	},
	purpleHover: {
		border: 0,
		padding: '15px',
		margin: '10px',
		width: '20%',
		background: '#9b59b6',
		fontSize: '15px',
		outline: 'none',
		borderRadius: '5px',
		color: '#FFF',
		fontWeight: 'bold',
		boxShadow: '0px 5px 0px 0px #B573D0'
	}
}

let file = __filename.split('/').slice(-1)[0];
let file1 = file.split('.').slice(0)[0];

module.exports = React.createClass({
	displayName: file1,

	getInitialState() {
		return {
			counter: 0,
			blueHover: false,
			greenHover: false,
			purpleHover: false
		}
	},

	toggleHover(e) {
		let button = e.target.name.toString();
		switch(button) {
			case 'blue':
				this.setState({blueHover: !this.state.blueHover});
			return;
			case 'green':
				this.setState({greenHover: !this.state.greenHover});
			return;
			case 'purple':
				this.setState({purpleHover: !this.state.purpleHover});
			return;
			default:
				return;
		}	
	},

	setStyles(c) {
		let color = c;
		switch(color) {
			case 'blue':
				let blue = this.state.blueHover ? styles.blueHover : styles.blueBtn; 
				return blue;
				
			case 'green':
				let green = this.state.greenHover ? styles.greenHover: styles.greenBtn;
				return green;
			case 'purple':
				let purple = this.state.purpleHover ? styles.purpleHover : styles.purpleBtn;
				return purple;
			default:
				return;
		}	
	},

	onIncrement(num) {
		this.setState({
			counter: this.state.counter + num
		})
	},

	render() {
		return (
		<div style={styles.container}>
			<h1 style={styles.count}>Count: {this.state.counter} </h1>
			<button name="blue" onMouseEnter={this.toggleHover} 
				onMouseLeave={this.toggleHover}
				style={this.setStyles('blue')}
				onClick={() => this.onIncrement(1)}>
					Add 1
			</button>

			<button name="green" onMouseEnter={this.toggleHover} 
				style={this.setStyles('green')}
				onMouseLeave={this.toggleHover}
				onClick={() => this.onIncrement(5)}>
					Add 5
			</button>

			<button name="purple" onMouseEnter={this.toggleHover} 
				style={this.setStyles('purple')}
				onMouseLeave={this.toggleHover}
				onClick={() => this.onIncrement(10)}>
				Add 10
			</button>
		</div>
		);
	}
});