import React, {Component} from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import {logout} from '../actions/logout.js';

class Nav extends Component {
    render() {
        const navButtons =
            <div>
                <Link to="/" className="btn">
                      Home
                </Link>
                <Link to="/registerstudent" className="btn">
                      Register As Student
                </Link>
                <Link to="/registerresident" className="btn">
                      Register As Resident
                </Link>
                <Link to="/login" className="btn">
                      Login
                </Link>
                <Link to="/" className="btn"
                    onClick={this.props.logout}
                >
                      Logout
                </Link>
            </div>;

        return (
            <div className="nav">
                <div className="container-fluid">
                    {navButtons}
                </div>
            </div>
        );
    }

}

function mapStateToProps(state) {
    return {
        isLogged: state.login,
    };
}

export default connect(mapStateToProps, {logout})(Nav);
