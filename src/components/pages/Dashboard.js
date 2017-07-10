import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';


class Dashboard extends Component {
  render() {
    return (
      <article>
        <section className="text-section">
        <Link to="/browsejobs" className="btn btn--login btn--nav"><h2>Student</h2></Link>
        <Link to="/browsestudents" className="btn btn--login btn--nav"><h2>Resident</h2></Link>
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
