import React, {Component} from 'react';
import {connect} from 'react-redux';

class BrowseJobs extends Component {
    render() {
        return (
            <article>
                <section className="text-section">
                    <label className="form__field-label" htmlFor="Browse Jobs">
                        Browse Jobs
                    </label>
                    <input
                        className="form__field-input"
                        id="Browse Jobs"
                        placeholder="Browse Jobs"
                    />
                </section>
            </article>
        );
    }
}

function select(state) {
    return {data: state};
}

// Wrap the component to inject dispatch and state into it
export default connect(select)(BrowseJobs);
