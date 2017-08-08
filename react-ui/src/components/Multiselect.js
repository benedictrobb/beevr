import React, {Component} from 'react';
import Select from 'react-select';
import categories from '../constants/job_categories.js';

class MultiSelectField extends Component {
    constructor() {
        super();
        this.handleSelectChange = this.handleSelectChange.bind(this);

        this.state = {
            options: categories,
            jobCategories: [],
        };
    }

    handleSelectChange(jobCategories) {
        console.log(this.state.jobCategories.length);
        if (this.state.jobCategories.length < 8) {
            console.log('You\'ve selected:', jobCategories);
            this.setState({jobCategories});
        }
    }

    render() {
        console.log('props', this.props);
        console.log(this.state);
        return (
            <div className="section form-group">
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
