import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';

class BrowseStudents extends Component {
    render() {
        return (
            <article>
                <section className="text-section">
                    <label
                        className="form__field-label"
                        htmlFor="Browse Students"
                    >
                        {' '}Browse Students{' '}
                    </label>{' '}
                    <input
                        className="form__field-input"
                        id="Browse Students"
                        placeholder="Browse Students"
                    />
                    <Link to="/postjob" className="btn btn-primary">
                        {' '}Post A Job{' '}
                    </Link>{' '}
                </section>{' '}
            </article>
        );
    }
}

function select(state) {
    return {data: state};
}

// Wrap the component to inject dispatch and state into it
export default connect(select)(BrowseStudents);
