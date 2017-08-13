import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../../actions/search_students.js';
import {Link} from 'react-router';
import categories from '../../constants/job_categories.js';

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
            <div key={student.studentId}>
                <h3 className="light_brown_title">
                    {student.firstName}
                </h3>
                <h5 className="light_brown_title">
                    {student.univSchool}
                </h5>
                <p>
                    <img className="profile_image" src={student.picture} />
                </p>
                <p>
                    {student.bio}
                </p>
            </div>
        );
    }

    render() {
        let {students} = this.props;
        let studentList = students && students.studentList;

        if (!studentList) {
            return (
                <div className="container-fluid">
                    <article className="row-fluid search_jobs">
                        <section className="col-md-6 col-md-offset-3">
                            <Link
                                to="/postjob"
                                className="btn btn-primary pull-right submit_button"
                            >
                                Post A Job
                            </Link>
                            <form onSubmit={this.onSubmit}>
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
                                </datalist>
                                <button
                                    type="submit"
                                    className="btn btn-primary submit_button"
                                >
                                    Submit
                                </button>
                            </form>
                        </section>
                    </article>
                </div>
            );
        }
        return (
            <div className="container-fluid">
                <article className="row-fluid search_jobs">
                    <section className="col-md-6 col-md-offset-3">
                        {this.props.isAuthenticated === true
                            ? <div>
                                <Link
                                    to="/postjob"
                                    className="btn btn-primary pull-right submit_button margin_left"
                                >
                                    Post A Job
                                </Link>
                                <Link
                                    to="/mypostedjobs"
                                    className="btn btn-primary pull-right submit_button"
                                >
                                    My posted jobs
                                </Link>
                            </div>
                            : <div className="optional-login pull-right">
                                Login to see:
                                <Link
                                    to="/login"
                                    className="btn btn-primary pull-right submit_button"
                                >
                                    Post A Job
                                </Link>
                                <Link
                                    to="/login"
                                    className="btn btn-primary pull-right submit_button"
                                >
                                    My posted jobs
                                </Link>
                            </div>}
                        <form onSubmit={this.onSubmit}>
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
                            </datalist>

                            <button
                                type="submit"
                                className="btn btn-primary submit_button"
                            >
                                Submit
                            </button>
                        </form>
                        <ul className="search_results_ul">
                            {studentList.map(this.renderStudents)}
                        </ul>
                    </section>
                </article>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const isAuthenticated =
        state.auth &&
        state.auth.response &&
        state.auth.response.isAuthenticated;

    return {
        students: state.searchStudents.studentsRequest.response,
        searchTerm: state.searchStudents.searchTerm,
        isAuthenticated,
    };
}

export default connect(mapStateToProps, actions)(BrowseStudents);
