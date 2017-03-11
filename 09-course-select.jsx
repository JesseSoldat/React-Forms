import React, {PropTypes} from 'react';
import Core from './api/core.json';
import Electives from './api/electives.json';

const Courses = {
	core: Core,
	electies: Electives
};

module.exports = React.createClass({
	propTypes: {
	  department: PropTypes.string,
	  course: PropTypes.string,
	  onChange: PropTypes.func.isRequired
	},

	getInitialState() {
		return {
			department: 'test',
			course: null,
			courses: Electives,
			_loading: false
		};
	},

	componentWillReceiveProps(nextProps) {
		
	},

	onSelectDepartment(e) {

	},

	onSelectCourse(e) {

	},

	renderCourseSelect() {
		if (this.state._loading) {
			return <img alt='loading' src='/img/loading.gif' />;
		}
		if (!this.state.department || !this.state.courses.length) return <span />;

		return (
		<select onChange={this.onSelectCourse} 
						value={this.state.coure || ''} >
			{[
				<option value='' key='course-none'>
					Which course?
				</option>,

				...this.state.courses.map( (course, i) => (
					<option value={course} key={i}>
						{course}
					</option>
				)),
			]}
		</select>
		);

	},

	render() {
		return (
		<div>
			course
			<br />
			{this.renderCourseSelect()}
		</div>
		);
	}

});	