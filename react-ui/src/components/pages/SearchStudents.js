import React, {Component} from 'react';
import {connect} from 'react-redux';
import Axios from 'axios';
import * as actions from '../../actions/search_students.js';
import {Link} from 'react-router';

class BrowseStudents extends Component {
    constructor() {
        super();
        this.renderStudents = this.renderStudents.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onStudentSearchChange = this.onStudentSearchChange.bind(this);
    }

    componentWillMount() {
        this.props.fetchStudents();
    }

    onSubmit(evt) {
        evt.preventDefault();
        this.props.fetchStudents(this.props.searchTerm);
    }

    onStudentSearchChange(evt) {
        this.props.setTerm(evt.target.value);
    }

    renderStudents(student) {
        return (
            <div key={student.student_id}>
                <h2>
                    {student.first_name}
                </h2>
                <h4>
                    {student.univ_school}
                </h4>
                <label>Bio</label>
                <p>
                    {student.bio}
                </p>
                <label>Picture</label>
                <p>
                    {student.picture}
                </p>
            </div>
        );
    }

    render() {
        let {students} = this.props;
        let studentList = students && students.studentList;

        if (!studentList) {
            return (
                <section>
                    <form onSubmit={this.onSubmit}>
                        <label
                            className="form__field-label"
                            htmlFor="Browse Students"
                        >
                            Browse Students
                        </label>
                        <input
                            className="form-control"
                            id="Browse Students"
                            type="text"
                            placeholder="Browse Students"
                            list="students"
                            onChange={this.onStudentSearchChange}
                            value={this.props.searchTerm}
                        />
                        <datalist id="students">
                            <option value="dog walking" />
                            <option value="Tutoring- Spanish" />
                            <option value="Home maintenance" />
                            <option value="Tutoring- Mathematics" />
                            <option value="Cat Sitting" />
                            <option value="Plant watering" />
                            <option value="Babysitting" />
                            <option value="Cooking" />
                            <option value="House Cleaning" />
                            <option value="Band playing" />
                            <option value="photography" />
                            <option value="Other" />
                        </datalist>
                        <button type="submit" className="btn btn-primary">
                            Submit
                        </button>
                    </form>

                    <Link to="/postjob" className="btn btn-primary">
                        Post A Job
                    </Link>
                </section>
            );
        }
        return (
            <article>
                <section className="text-section">
                    <form onSubmit={this.onSubmit}>
                        <label
                            className="form__field-label"
                            htmlFor="Browse Students"
                        >
                            Browse Students
                        </label>

                        <input
                            className="form-control"
                            id="Browse Students"
                            type="text"
                            placeholder="Browse Students"
                            list="students"
                            onChange={this.onStudentSearchChange}
                            value={this.props.searchTerm}
                        />
                        <datalist id="students">
                            <option value="dog walking" />
                            <option value="Tutoring- Spanish" />
                            <option value="Home maintenance" />
                            <option value="Tutoring- Mathematics" />
                            <option value="Cat Sitting" />
                            <option value="Plant watering" />
                            <option value="Babysitting" />
                            <option value="Cooking" />
                            <option value="House Cleaning" />
                            <option value="Band playing" />
                            <option value="photography" />
                            <option value="Other" />
                        </datalist>

                        <button type="submit" className="btn btn-primary">
                            Submit
                        </button>
                    </form>
                    <Link to="/postjob" className="btn btn-primary">
                        Post A Job
                    </Link>
                    <ul>
                        {studentList.map(this.renderStudents)}
                    </ul>
                </section>
            </article>
        );
    }
}

function mapStateToProps(state) {
    return {
        students: state.searchStudents.studentsRequest.response,
        searchTerm: state.searchStudents.term
    };
}

export default connect(mapStateToProps, actions)(BrowseStudents);
