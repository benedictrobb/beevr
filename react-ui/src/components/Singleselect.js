import React from 'react';
import Select from 'react-select';


var StatesField = createClass({
    displayName: 'StatesField',
    propTypes: {
        label: PropTypes.string,
        searchable: PropTypes.bool,
    },
    getDefaultProps() {
        return {
            label: 'States:',
            searchable: true,
        };
    },
    getInitialState() {
        return {
            country: 'AU',
            disabled: false,
            searchable: this.props.searchable,
            selectValue: 'new-south-wales',
            clearable: true,
        };
    },
    updateValue(newValue) {
        console.log('State changed to ' + newValue);
        this.setState({
            selectValue: newValue,
        });
    },
    focusStateSelect() {
        this.refs.stateSelect.focus();
    },
    render() {
        var options = STATES[this.state.country];
        return (
            <div className="section">
                <h3 className="section-heading">
                    {this.props.label}
                </h3>
                <Select
                    ref="stateSelect"
                    autofocus
                    options={options}
                    simpleValue
                    clearable={this.state.clearable}
                    name="selected-state"
                    disabled={this.state.disabled}
                    value={this.state.selectValue}
                    onChange={this.updateValue}
                    searchable={this.state.searchable}
                />

                <div style={{marginTop: 14}}>
                    <button type="button" onClick={this.focusStateSelect}>
                        Focus Select
                    </button>
                </div>
            </div>
        );
    },
});

module.exports = StatesField;
