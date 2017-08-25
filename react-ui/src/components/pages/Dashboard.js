import React, {Component} from 'react';
import {Link} from 'react-router';

class Dashboard extends Component {
    render() {
        return (
            <article>
                <section className="container text-center">
                    <div className="welcome">
                        <h2>
                            <b>A JOBS PLATFORM FOR STUDENTS & RESIDENTS</b>
                        </h2>
                    </div>
                    <div className="container-flex-dashboard">
                        <div>
                            <Link
                                to="/browsejobs"
                                className="btn btn-primary front-button"
                            >
                                Student
                            </Link>
                        </div>
                        <div className="col-sm-1" />
                        <div>
                            <Link
                                to="/browsestudents"
                                className="btn btn-primary front-button"
                            >
                                Resident
                            </Link>
                        </div>
                    </div>
                </section>
            </article>
        );
    }
}

export default Dashboard;
