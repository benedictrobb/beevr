import React, { Component } from 'react';
import { connect } from 'react-redux';

console.log('Dashboard');
class Dashboard extends Component {
    constructor() {
        super();
        this.state = { items: [] }
    }

    componentWillMount() {
        fetch('http://trkdz-spectre-devuan:4000')
            .then( response => response.json() ) 
            .then( ({results: items}) => this.setState({items}))
    }
     
    render() {
        let items = this.state.items
        return (
            <article>
                <section className="text-section">
                    <p>Student</p>
                    <p>Resident</p>
                </section>
            {items.map(item => <h1>{item.message}</h1>)}
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
