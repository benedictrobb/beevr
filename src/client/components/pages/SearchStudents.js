import React, {Component} from 'react';
import {connect} from 'react-redux';
import Axios from 'axios';
import * as actions from '../../actions/search_students.js';

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
        this.props.fetchStudents(this.props.term);
    }

    onStudentSearchChange(evt) {
        this.props.setTerm(evt.target.value);
    }

    // student_id      SERIAL          PRIMARY KEY NOT NULL,
    // first_name      VARCHAR(25)     NOT NULL,
    // last_name       VARCHAR(100)    NOT NULL,
    // email           VARCHAR(50)     NOT NULL,
    // password        VARCHAR(500)	,
    // DOB             DATE            NOT NULL,
    // univ_school     VARCHAR(250)    NOT NULL,
    // student_cat         VARCHAR(1000)   NOT NULL,
    // picture         VARCHAR(500)    NOT NULL,
    // bio             VARCHAR(1500)   NOT NULL,
    // phone
    renderStudents(student) {
        return (
            <div key={student.student_id}>
                <h2>
                    {student.first_name}
                </h2>
                <h4>
                    <label>Categories: </label>
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
                <form onSubmit={this.onSubmit}>
                    <label className="form__field-label" htmlFor="Browse Jobs">
                        Browse Jobs
                    </label>
                    <input
                        className="form-control"
                        id="Browse Jobs"
                        type="text"
                        placeholder="Browse Jobs"
                        list="students"
                        onChange={this.onStudentSearchChange}
                        value={this.props.SearchTerm}
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
            );
        }
        return (
            <article>
                <section className="text-section">
                    <form onSubmit={this.onSubmit}>
                        <label
                            className="form__field-label"
                            htmlFor="Browse Jobs"
                        >
                            Browse Jobs
                        </label>

                        <input
                            className="form-control"
                            id="Browse Jobs"
                            type="text"
                            placeholder="Browse Jobs"
                            list="students"
                            onChange={this.onStudentSearchChange}
                            value={this.props.SearchTerm}
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
        // students: state.searchJobs.studentsRequest.response,
        SearchTerm: state.searchJobs.term
    };
}

export default connect(mapStateToProps, actions)(BrowseStudents);
