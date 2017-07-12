import React, { Component } from 'react';
import { connect } from 'react-redux';
import Axios from 'axios'

//console.log('Dashboard');
class Dashboard extends Component {
    constructor() {
        super();
        this.state = { 
            data: {} 
        };
    }

    componentWillMount() {
        Axios.get('/api/jobs')
            .then((response) => {
                console.log(response.data);
                var data = response.data;
                this.setState({data});
            });
    }
        
    render() {
        let data = this.state.data;
        return (
            <article>
                <section className="text-section">
                    <p>Student</p>
                    <p>Resident</p>
                    <h1>{data.message}</h1>
                </section>
            </article>
        );
    }
}

// Which props do we want to inject, given the global state?
function select(state) {
    return {
        data: state
    };
}

// Wrap the component to inject dispatch and state into it
export default connect(select)(Dashboard);
