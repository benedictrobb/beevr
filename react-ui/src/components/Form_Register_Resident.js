import React, {Component} from 'react';
import LoadingButton from './LoadingButton.js';
import ErrorMessage from './ErrorMessage.js';
import * as actions from '../actions/register_resident.js';
import {connect} from 'react-redux';

class Form_Register_Resident extends Component {
    constructor() {
        super();
        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
        //this.onChangeResidentFirstName = this.onChangeResidentFirstName.bind(this);
        //this.onChangeResidentLastName = this.onChangeResidentLastName.bind(this);
        //this.onChangeResidentEmail = this.onChangeResidentEmail.bind(this);
        //this.onChangePassword = this.onChangePassword.bind(this);
        //this.onChangeDOB = this.onChangeDOB.bind(this);
        //this.onChangeBio = this.onChangeBio.bind(this);
        //this.onChangePhone = this.onChangePhone.bind(this);
        //this.onChangePicture = this.onChangePicture.bind(this);

        this.state = {
            residentObject: {}
        };
    }

    onSubmit(evt) {
        evt.preventDefault();
        this.props.registerResident(this.state.residentObject);
    }

    onChange(evt) {
        var residentObject = this.state.residentObject;
        this.setState({
            residentObject: {
                ...residentObject,
                [evt.target.name]: evt.target.value
            }
        });
    }
    
    //onChangeResidentFirstName(evt) {
        //var residentObject = this.state.residentObject;
        //this.setState({
            //residentObject: {
                //...residentObject,
                //firstName: evt.target.value
            //}
        //});
    //}

    //onChangeResidentLastName(evt) {
        //var residentObject = this.state.residentObject;
        //this.setState({
            //residentObject: {
                //...residentObject,
                //lastName: evt.target.value
            //}
        //});
    //}

    //onChangeResidentEmail(evt) {
        //var residentObject = this.state.residentObject;
        //this.setState({
            //residentObject: {
                //...residentObject,
                //residentObjectEmail: evt.target.value
            //}
        //});
    //}

    //onChangePassword(evt) {
        //var residentObject = this.state.residentObject;
        //this.setState({
            //residentObject: {
                //...residentObject,
                //password: evt.target.value
            //}
        //});
    //}

    //onChangeDOB(evt) {
        //var residentObject = this.state.residentObject;
        //this.setState({
            //residentObject: {
                //...residentObject,
                //DOB: evt.target.value
            //}
        //});
    //}

    //onChangeBio(evt) {
        //var residentObject = this.state.residentObject;
        //this.setState({
            //residentObject: {
                //...residentObject,
                //bio: evt.target.value
            //}
        //});
    //}

    //onChangePicture(evt) {
        //var residentObject = this.state.residentObject;
        //this.setState({
            //residentObject: {
                //...residentObject,
                //picture: evt.target.value
            //}
        //});
    //}

    //onChangePhone(evt) {
        //var residentObject = this.state.residentObject;
        //this.setState({
            //residentObject: {
                //...residentObject,
                //phone: evt.target.value
            //}
        //});
    //}

    render() {
        return (
            <form className="form-group" onSubmit={this.onSubmit}>
                <ErrorMessage />
                <div className="form__field-wrapper">
                    <label className="form__field-label" htmlFor="First Name">
                        First Name
                    </label>
                    <input
                        className="form-control"
                        name="first_name"
                        id="First Name"
                        type="text"
                        placeholder="First Name"
                        value={this.state.residentObject.first_name}
                        onChange={this.onChange}
                    />
                </div>
                <div className="form__field-wrapper">
                    <label className="form__field-label" htmlFor="Last Name">
                        Last Name
                    </label>
                    <input
                        className="form-control"
                        name="last_name"
                        id="Last Name"
                        type="text"
                        placeholder="Last Name"
                        value={this.state.residentObject.last_name}
                        onChange={this.onChange}
                    />
                </div>
                <div className="form__field-wrapper">
                    <label className="form__field-label" htmlFor="username">
                        Email
                    </label>
                    <input
                        className="form-control"
                        name="email"
                        type="text"
                        id="username"
                        value={this.state.residentObject.email}
                        placeholder="email"
                        onChange={this.onChange}
                        autoCorrect="off"
                        autoCapitalize="off"
                        spellCheck="false"
                    />
                </div>
                <div className="form__field-wrapper">
                    <label className="form__field-label" htmlFor="password">
                        Password
                    </label>
                    <input
                        className="form-control"
                        name="password"
                        id="password"
                        type="password"
                        value={this.state.residentObject.password}
                        placeholder="password"
                        onChange={this.onChange}
                    />
                </div>
                <div className="form__field-wrapper">
                    <label
                        className="form__field-label"
                        htmlFor="Date Of Birth"
                    >
                        Date of Birth
                    </label>
                    <input
                        className="form-control"
                        name="DOB"
                        id="Date Of Birth"
                        type="date"
                        placeholder="Date Of Birth"
                        value={this.state.residentObject.DOB}
                        onChange={this.onChange}
                    />
                </div>
                <div className="form__field-wrapper">
                    <label className="form__field-label" htmlFor="Bio">
                        Address
                    </label>
                    <input
                        className="form-control"
                        name="address"
                        id="Address"
                        type="text"
                        placeholder="Address"
                        value={this.state.residentObject.address}
                        onChange={this.onChange}
                    />
                </div>
                <div className="form__field-wrapper">
                    <label className="form__field-label" htmlFor="Bio">
                        Bio
                    </label>
                    <input
                        className="form-control"
                        name="bio"
                        id="Bio"
                        type="text"
                        placeholder="Bio"
                        value={this.state.residentObject.bio}
                        onChange={this.onChange}
                    />
                </div>
                <div className="form__field-wrapper">
                    <label className="form__field-label" htmlFor="Picture">
                        Profile picture
                    </label>
                    <input
                        className="form-control"
                        name="picture"
                        id="Picture"
                        type="file"
                        placeholder="Picture"
                        value={this.state.residentObject.picture}
                        onChange={this.onChange}
                    />
                </div>
                <div className="form__field-wrapper">
                    <label className="form__field-label" htmlFor="Phone number">
                        Phone number
                    </label>
                    <input
                        className="form-control"
                        name="phone"
                        id="Phone number"
                        type="text"
                        placeholder="Phone number"
                        value={this.state.residentObject.phone}
                        onChange={this.onChange}
                    />
                </div>
                <div className="form__submit-btn-wrapper">
                    {this.props.currentlySending
                        ? <LoadingButton />
                        : <button className="btn btn-primary" type="submit">
                            {this.props.btnText}
                        </button>}
                </div>
            </form>
        );
    }

}

//Form_Register_Resident.propTypes = {
//onSubmit: React.PropTypes.func.isRequired,
//btnText: React.PropTypes.string.isRequired,
//data: React.PropTypes.object.isRequired
//};
function mapStateToProps(state) {
    return {
        residentObject: state.registerResident.residentObject.response
    };
}

export default connect(mapStateToProps, actions)(Form_Register_Resident);
