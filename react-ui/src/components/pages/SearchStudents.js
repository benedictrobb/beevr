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
                <h2>
                    {student.firstName}
                </h2>
                <h4>
                    {student.univSchool}
                </h4>
                <label>Bio</label>
                <p>
                    {student.bio}
                </p>
                <label>Picture</label>
                <p>Example picture</p>
            </div>
        );
    }

    render() {
        const options = categories.map(function(elem) {
            return (
                <option value={categories[elem]}>
                    {elem}
                </option>
            );
        });

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
                                    <option value="" disabled />
                                    {options}
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
                        <Link
                            to="/postjob"
                            className="btn btn-primary pull-right submit_button"
                        >
                            Post A Job
                        </Link>

                        <Link
                            to="/mypostedjobs"
                            className="btn btn-primary pull-right submit_button"
                        >
                            My jobs
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
                                <option value="" disabled />
                                {options}
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
    return {
        students: state.searchStudents.studentsRequest.response,
        searchTerm: state.searchStudents.searchTerm,
    };
}

export default connect(mapStateToProps, actions)(BrowseStudents);
