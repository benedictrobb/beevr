import React, {Component} from 'react';
import {Link} from 'react-router';

class Dashboard extends Component {
    render() {
        return (
            <article className="horizontal">
                <section className="container text-center max-width bgimg_student">
                    <div className="welcome">
                        <h2>
                            <b>A JOBS PLATFORM FOR STUDENTS & RESIDENTS</b>
                        </h2>
                    </div>
                    <div className="container-flex-dashboard button-group">
                        <div>
                            <Link
                                to="/browsejobs"
                                className="btn btn-primary front-button"
                            >
                                <div className="button-text">Student</div>
                            </Link>
                        </div>
                        <div className="col-sm-1" />
                        <div>
                            <Link
                                to="/browsestudents"
                                className="btn btn-primary front-button"
                            >
                                <div className="button-text">Resident</div>
                            </Link>
                        </div>
                        <div className="col-sm-1" />
                        <div>
                            <Link
                                to="/login"
                                className="btn btn-primary front-button sign-in-button"
                            >
                                <div className="button-text"> Sign In </div>
                            </Link>
                        </div>
                    </div>
                </section>
            </article>
        );
    }
}

export default Dashboard;
