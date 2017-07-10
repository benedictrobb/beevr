import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

console.log('Dashboard');
class Dashboard extends Component {
  render() {
    return (
      <article>
        <section className="text-section">
          <p>Student</p>
          <p>Resident</p>
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
