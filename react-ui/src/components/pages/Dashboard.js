import React, {Component} from 'react';
import {Link} from 'react-router';

class Dashboard extends Component {
    render() {
        return (
            <article>
                <section className="container text-center">
                    <div className="welcome">
                        <h1>WELCOME TO BEEVR</h1>
                    </div>
                    <div className="container-flex-dashboard">
                        <div className="col-sm-5 bgimg_student">
                            <Link to="/browsejobs" className="front_student">
                                <h1 className="front_title_student">Student</h1>
                            </Link>
                        </div>
                        <div className="col-sm-1" />
                        <div className="col-sm-5 bgimg_resident">
                            <Link
                                to="/browsestudents"
                                className="front_resident"
                            >
                                <h1 className="front_title_resident">
                                    Resident
                                </h1>
                            </Link>
                        </div>
                    </div>
                </section>
            </article>
        );
    }
}

export default Dashboard;
