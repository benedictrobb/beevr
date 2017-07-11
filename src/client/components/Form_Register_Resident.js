import React, { Component } from 'react';
import { changeForm } from '../actions/AppActions';
import LoadingButton from './LoadingButton.js';
import ErrorMessage from './ErrorMessage.js';

const assign = Object.assign;


class Form_Register_Resident extends Component {
  render() {
    return(
      <form className="form-group" onSubmit={this._onSubmit.bind(this)}>
        <ErrorMessage />
        <div className="form__field-wrapper">
        <label className="form__field-label" htmlFor="First Name">First Name</label>
         <input className="form-control"
          id="First Name"
          type="text"
          placeholder="First Name"  />

        </div>
        <div className="form__field-wrapper">
        <label className="form__field-label" htmlFor="Last Name">Last Name</label>
         <input className="form-control" id="Last Name" type="text" placeholder="Last Name" />

        </div>
        <div className="form__field-wrapper">
        <label className="form__field-label" htmlFor="username">Email</label>
          <input className="form-control"
            type="text" id="username"
            value={this.props.data.username}
            placeholder="email"
            onChange={this._changeUsername.bind(this)}
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck="false" />

        </div>
        <div className="form__field-wrapper">
        <label className="form__field-label" htmlFor="password">Password</label>
          <input className="form-control"
            id="password" type="password"
            value={this.props.data.password}
            placeholder="password"
            onChange={this._changePassword.bind(this)} />

        </div>

        <div className="form__field-wrapper">
        <label className="form__field-label" htmlFor="University/School">Address</label>
        <input className="form-control" id="University/School" type="text" placeholder="University/School"  />

        </div>

        <div className="form__field-wrapper">
        <label className="form__field-label" htmlFor="Date Of Birth">Date of Birth</label>
          <input className="form-control" id="Date Of Birth" type="text" placeholder="Date Of Birth" />

        </div>


        <div className="form__field-wrapper">
        <label className="form__field-label" htmlFor="Picture">Profile picture</label>
        <input className="form-control" id="Picture" type="file" placeholder="Picture"  />

        </div>

        <div className="form__field-wrapper">
        <label className="form__field-label" htmlFor="Phone number">Phone number</label>
        <input className="form-control" id="Phone number" type="text" placeholder="Phone number"  />

        </div>

        <div className="form__field-wrapper">
        <label className="form__field-label" htmlFor="Bio">Bio</label>
          <input className="form-control" id="Bio" type="text" placeholder="Bio"  />

        </div>



        <div className="form__submit-btn-wrapper">
          {this.props.currentlySending ? (
            <LoadingButton />
          ) : (
            <button className="btn btn-primary" type="submit">{this.props.btnText}</button>
          )}
        </div>
      </form>
    );
  }

  // Change the username in the app state
  _changeUsername(evt) {
    var newState = this._mergeWithCurrentState({
      username: evt.target.value
    });

    this._emitChange(newState);
  }

  // Change the password in the app state
  _changePassword(evt) {
    var newState = this._mergeWithCurrentState({
      password: evt.target.value
    });

    this._emitChange(newState);
  }

  // Merges the current state with a change
  _mergeWithCurrentState(change) {
    return assign(this.props.data, change);
  }

  // Emits a change of the form state to the application state
  _emitChange(newState) {
    this.props.dispatch(changeForm(newState));
  }

  // onSubmit call the passed onSubmit function
  _onSubmit(evt) {
    evt.preventDefault();
    this.props.onSubmit(this.props.data.username, this.props.data.password);
  }
}

Form_Register_Resident.propTypes = {
  onSubmit: React.PropTypes.func.isRequired,
  btnText: React.PropTypes.string.isRequired,
  data: React.PropTypes.object.isRequired
}

export default Form_Register_Resident;
