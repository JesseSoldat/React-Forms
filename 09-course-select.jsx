import React, {PropTypes} from 'react';
import Core from './api/core.json';
import Electives from './api/electives.json';

const Courses = {
	core: Core,
	electives: Electives
};

module.exports = React.createClass({
	propTypes: {
	  department: PropTypes.string,
	  course: PropTypes.string,
	  onChange: PropTypes.func.isRequired
	},

	getInitialState() {
		return {
			department: null,
			course: null,
			courses: [],
			_loading: false
		};
	},

	componentWillReceiveProps(nextProps) {
		// console.log('componentWillReceiveProps', nextProps);		
		this.setState({
			department: nextProps.department,
			course: nextProps.course,
		});
	},

	onSelectDepartment(e) {
		const department = e.target.value;
		const course = null;
		this.setState({department, course});

		this.props.onChange({name: 'department', value: department});
		this.props.onChange({name: 'course', value: course});

		if(department) this.fetch(department);

	},

	onSelectCourse(e) {
		const course = e.target.value;
		this.setState({ course });
		this.props.onChange({ name: 'course', value: course });
	},

	fetch(department) {
		this.setState({_loading: true, courses: [] });

		apiClient(department).then( (courses) => {
			this.setState( {_loading: false, courses })
		});
	},

	renderDepartmentSelect() {
		return (
			<select onChange={this.onSelectDepartment}
							value={this.state.department || ''}>
				<option value=''>
					Which department?
				</option>
				<option value='core'>
					NodeSchool: Core
				</option>
				<option value="electives">
					NodeSchool: Electives
				</option>
			</select>
		);
	},

	renderCourseSelect() {
		if (this.state._loading) {
			return <img alt='loading' src='/img/loading.gif' />;
		}
		if (!this.state.department || !this.state.courses.length) return <span />;

		return (
		<select onChange={this.onSelectCourse} 
						value={this.state.course || ''} >
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
			{this.renderDepartmentSelect()}
			<br /><br />
			{this.renderCourseSelect()}
		</div>
		);
	}
});	

function apiClient(department) {
	return {
		then: function(cb) {
			setTimeout( () => {cb(Courses[department]); }, 1000)
		},
	};
}