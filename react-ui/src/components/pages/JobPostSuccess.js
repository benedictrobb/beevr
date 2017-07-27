import React, {Component} from 'react';
import {Link} from 'react-router';

class JobPostSuccess extends Component {
    render() {
        return (
            <article>
                <h1>Job posted successfully!</h1>
                <Link to="/" className="btn">
                    Home
                </Link>
            </article>
        );
    }
}

export default JobPostSuccess;
