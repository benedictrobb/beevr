import React, {Component} from 'react';
import Select from 'react-select';
import categories from '../constants/job_categories.js';

class MultiSelectField extends Component {
    constructor() {
        super();
        //this.handleSelectChange = this.handleSelectChange.bind(this);
        //this.mergeStudentCategories = this.mergeStudentCategories.bind(this);

        this.state = {
            options: categories,
            jobCategories: [],
        };
    }

    //handleSelectChange(jobCategories) {
        ////if (this.state.jobCategories.length < 8) {
            //console.log('You\'ve selected:', jobCategories);
            //this.setState({jobCategories});
        ////}
    //}
    
    //mergeStudentCategories(props, jobCategories) {
        //props = this.props.student;
        //jobCategories = this.state.jobCategories;
        //var student = {...props, jobCategories};
        //console.log(student);
    //}

    render() {
        console.log('multi-props', this.props);
        console.log('multi-state',this.state);
        return (
            <div className="form-group">
                <label
                    className="control-label"
                    name="jobCategories"
                    htmlFor="jobCategories"
                >
                    Your job categories
                </label>
                <Select
                    multi
                    joinValue
                    disabled={this.state.disabled}
                    value={this.state.jobCategories}
                    placeholder="Select up to 8 categories"
                    options={this.state.options}
                    onChange={this.handleSelectChange}
                />
            </div>
        );
    }
}

export default MultiSelectField;
