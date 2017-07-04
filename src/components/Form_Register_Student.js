import React, { Component } from 'react';
import { changeForm } from '../actions/AppActions';
import LoadingButton from './LoadingButton.js';
import ErrorMessage from './ErrorMessage.js';

const assign = Object.assign;


class Form_Register_Student extends Component {
  render() {
    return(
      <form className="form" onSubmit={this._onSubmit.bind(this)}>
        <ErrorMessage />
        <div className="form__field-wrapper">
        <label className="form__field-label" htmlFor="First Name">Password</label>
        <input className="form__field-input" id="First Name" type="First Name" value={this.props.data.password} placeholder="First Name"  onChange={this._changePassword.bind(this)} />

        </div>
        <div className="form__field-wrapper">
        <label className="form__field-label" htmlFor="Last Name">Last Name</label>
        <input className="form__field-input" id="Last Name" type="Last Name" value={this.props.data.password} placeholder="Last Name"  onChange={this._changePassword.bind(this)} />

        </div>
        <div className="form__field-wrapper">
        <label className="form__field-label" htmlFor="username">Username</label>
          <input className="form__field-input" type="text" id="username" value={this.props.data.username} placeholder="email" onChange={this._changeUsername.bind(this)} autoCorrect="off" autoCapitalize="off" spellCheck="false" />

        </div>
        <div className="form__field-wrapper">
        <label className="form__field-label" htmlFor="password">Password</label>
          <input className="form__field-input" id="password" type="password" value={this.props.data.password} placeholder="password"  onChange={this._changePassword.bind(this)} />

        </div>
        <div className="form__field-wrapper">
        <label className="form__field-label" htmlFor="Date Of Birth">Date of Birth</label>
          <input className="form__field-input" id="Date Of Birth" type="Date Of Birth" value={this.props.data.password} placeholder="Date Of Birth"  onChange={this._changePassword.bind(this)} />

        </div>

        <div className="form__field-wrapper">
        <label className="form__field-label" htmlFor="University/School">University/School</label>
          <input className="form__field-input" id="University/School" type="University/School" value={this.props.data.password} placeholder="University/School"  onChange={this._changePassword.bind(this)} />

        </div>

        <div className="form__field-wrapper">
        <label className="form__field-label" htmlFor="Job categories">Job categories</label>
          <input className="form__field-input" id="Job categories" type="Job categories" value={this.props.data.password} placeholder="Job categories"  onChange={this._changePassword.bind(this)} />

        </div>

        <div className="form__field-wrapper">
        <label className="form__field-label" htmlFor="Bio">Bio</label>
          <input className="form__field-input" id="Bio" type="Bio" value={this.props.data.password} placeholder="Bio"  onChange={this._changePassword.bind(this)} />

        </div>

        <div className="form__field-wrapper">
        <label className="form__field-label" htmlFor="Picture">Picture</label>
          <input className="form__field-input" id="Picture" type="Picture" value={this.props.data.password} placeholder="Picture"  onChange={this._changePassword.bind(this)} />

        </div>

        <div className="form__field-wrapper">
        <label className="form__field-label" htmlFor="Phone number">Phone number</label>
          <input className="form__field-input" id="Phone number" type="Phone number" value={this.props.data.password} placeholder="Phone number"  onChange={this._changePassword.bind(this)} />

        </div>

        <div className="form__submit-btn-wrapper">
          {this.props.currentlySending ? (
            <LoadingButton />
          ) : (
            <button className="form__submit-btn" type="submit">{this.props.btnText}</button>
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

Form_Register_Student.propTypes = {
  onSubmit: React.PropTypes.func.isRequired,
  btnText: React.PropTypes.string.isRequired,
  data: React.PropTypes.object.isRequired
}

export default Form_Register_Student;
