import React, {Component} from 'react';

class JobPostSuccess extends Component {
    render() {
        return (
            <div className="parent-container">
                <div>
                    <div className="flex-container">
                        <img
                            className="success_image"
                            src={require('../../utils/lemmling-Cartoon-beaver.svg')}
                        />
                    </div>

                    <div className="flex-container">
                        <h3 className="success_message">SUCCESS!</h3>
                    </div>
                    <div className="flex-container">
                        <h6>Your job has been posted</h6>
                    </div>
                </div>
            </div>
        );
    }
}

export default JobPostSuccess;
