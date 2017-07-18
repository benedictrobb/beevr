import React, {Component} from 'react';
import {DateRange} from 'react-date-range';

class DateRange extends Component {
    handleSelect(range) {
        console.log(range);
    }

    render() {
        return (
            <div>
                <DateRange
                    onInit={this.handleSelect}
                    onChange={this.handleSelect}
                />
            </div>
        );
    }
}
