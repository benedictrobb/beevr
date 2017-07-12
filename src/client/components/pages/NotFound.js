import React, {Component} from 'react';
import {Link} from 'react-router';

class NotFound extends Component {
    // state={data:{}}
    //
    // loadCommentsFromServer() {
    //     fetch("http://trkdz-spectre-devuan:4000/test").then(function(response) {
    //         this.setState({data: response.data});
    //         console.log(response.data)
    //     }).catch(err => err);
    // }

    render() {
        return (
            <article>
                <h1>Page not found.</h1>
                <Link to="/" className="btn">
                    Home
                </Link>
            </article>
        );
    }
}

export default NotFound;
