import React from 'react';
import createClass from 'create-react-class';
import Select from 'react-select';
import categories from '../constants/job_categories.js';

var MultiSelectField = createClass({
    displayName: 'MultiSelectField',
    getInitialState() {
        return {
            options: categories,
            value: [],
        };
    },
    handleSelectChange(value) {
        console.log('You\'ve selected:', value);
        this.setState({value});
    },
    toggleDisabled(e) {
        this.setState({disabled: e.target.checked});
    },

    render() {
        return (
            <div className="section form-group">
                <Select
                    multi
                    simpleValue
                    disabled={this.state.disabled}
                    value={this.state.value}
                    placeholder="Select up to 8 categories"
                    options={this.state.options}
                    onChange={this.handleSelectChange}
                />
            </div>
        );
    },
});

export default MultiSelectField;
