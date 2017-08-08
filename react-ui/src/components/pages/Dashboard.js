import React, {Component} from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import {Link} from 'react-router';
import {store} from '../../index.js';

class Dashboard extends Component {
    constructor() {
        super();
        this.state = store.getState();
    }

    render() {
        console.log('dash',this.state);
        return (
            <article>
                <section className="container text-center">
                    <div className="welcome">
                        <h1>WELCOME</h1>
                    </div>
                    <div className="container-flex-dashboard">
                        <div className="col-sm-5 bgimg_student">
                            <Link to="/browsejobs" className="front_student">
                                <h1>Student</h1>
                            </Link>
                        </div>
                        <div className="col-sm-1" />
                        <div className="col-sm-5 bgimg_resident">
                            <Link
                                to="/browsestudents"
                                className="front_resident"
                            >
                                <h1>Resident</h1>
                            </Link>
                        </div>
                    </div>
                </section>
            </article>
        );
    }
}

//function mapStateToProps(state) {
    //return {data: state};
//}

//export default connect(mapStateToProps)(Dashboard);
export default Dashboard;
