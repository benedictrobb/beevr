import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../../actions/search_students.js';
import {Link} from 'react-router';
import LoadingIndicator from 'react-loading-indicator';
import categories from '../../constants/job_categories.js';
import DropdownList from 'react-widgets/lib/DropdownList';

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
        this.props.fetchStudents(this.props.searchTerm.value);
    }

    onStudentSearchChange(evt) {
        this.props.setTerm(evt);
    }

    renderStudents(student) {
        if (student && !student.picture) {
            student.picture = require('../../utils/beaver-1528948_640.jpg');
        }
        return (
            <div className="student_wrapper" key={student.studentId}>
                <h3>
                    {student.firstName}
                </h3>
                <h4 className="italic">
                    {student.univSchool}
                </h4>
                <p className="italic">
                    <img className="profile_image" src={student.picture} />
                </p>
                <p className="italic">
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
                <div>
                    <article className="row justify-content-md-center search_jobs">
                        <section className="col col-md-8">
                            {this.props.isAuthenticated === true
                                ? <div className="row px-3 justify-content-center justify-content-md-end">
                                    <Link
                                        to="/postjob"
                                        className="btn btn-primary pull-right submit_button"
                                    >
                                        Post A Job
                                    </Link>
                                </div>
                                : <div className="row px-3 justify-content-center justify-content-md-end">
                                    <Link
                                        to="/login"
                                        className="btn btn-primary submit_button"
                                    >
                                        Login to your profile
                                    </Link>
                                </div>}
                            <form onSubmit={this.onSubmit}>
                                <DropdownList
                                    id="browseStudentsForm"
                                    className="form-control"
                                    data={categories}
                                    textField="value"
                                    placeholder="Browse Students"
                                    onChange={this.onStudentSearchChange}
                                    value={this.props.searchTerm}
                                    groupBy="group"
                                />
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
            <div className="container">
                <article className="row justify-content-md-center search_jobs">
                    <section className="col col-md-8">
                        {this.props.isAuthenticated === true
                            ? <div className="row px-3 justify-content-center justify-content-md-end">
                                <Link
                                    to="/postjob"
                                    className="btn btn-primary ml-2 submit_button"
                                >
                                      Post A Job
                                </Link>
                                <Link
                                    to="/mypostedjobs"
                                    className="btn btn-primary ml-2 submit_button"
                                >
                                      My posted jobs
                                </Link>
                                <Link
                                    to="/updateresidents"
                                    className="btn btn-primary ml-2 submit_button"
                                >
                                      Update your profile
                                </Link>
                            </div>
                            : <div className="row px-3 justify-content-center justify-content-md-end">
                                <Link
                                    to="/login"
                                    className="btn btn-primary submit_button"
                                >
                                    Login to your profile
                                </Link>
                            </div>}
                        <form onSubmit={this.onSubmit}>
                            <DropdownList
                                id="browseStudentsForm"
                                className="form-control"
                                data={categories}
                                textField="value"
                                placeholder="Browse Students"
                                onChange={this.onStudentSearchChange}
                                value={this.props.searchTerm}
                                groupBy="group"
                            />

                            <div className="button" >
                                {this.props.students.status === 'pending'
                                    ? <LoadingIndicator />
                                    : <button className="btn btn-primary" type="submit">
                                        Submit
                                    </button>}
                            </div>
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
