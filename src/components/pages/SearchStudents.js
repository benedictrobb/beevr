import React, { Component } from 'react';
import { connect } from 'react-redux';


class BrowseStudents extends Component {
  render() {
    return (
      <article>
        <section className="text-section">
          <label className="form__field-label" htmlFor="Browse Students">Browse Students</label>
          <input className="form__field-input" id="Browse Students" placeholder="Browse Students" />
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
export default connect(select)(BrowseStudents);
