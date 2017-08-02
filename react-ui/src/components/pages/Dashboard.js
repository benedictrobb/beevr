import React, {Component} from 'react';
import {connect} from 'react-redux';
import Axios from 'axios';
import {Link} from 'react-router';

class Dashboard extends Component {
    constructor() {
        super();
        this.state = {
            data: {},
        };
    }

    componentWillMount() {
        Axios.get('/api/jobs').then(response => {
            var data = response.data;
            this.setState({data});
        });
    }

    render() {
        let data = this.state.data;
        return (
            <article>
                <section className="container-fluid text-center">
                    <h1>WELCOME TO BEEVR</h1>
                    <div className="col-sm-6 bgimg_student">
                        <Link to="/browsejobs" className="">
                            <h2>Student</h2>
                        </Link>
                    </div>
                    <div className="col-sm-6 bgimg_resident">
                        <Link to="/browsestudents" className="">
                            <h2>Resident</h2>
                        </Link>
                    </div>
                </section>
            </article>
        );
    }
}

// Which props do we want to inject, given the global state?
function select(state) {
    return {data: state};
}

// Wrap the component to inject dispatch and state into it
export default connect(select)(Dashboard);
