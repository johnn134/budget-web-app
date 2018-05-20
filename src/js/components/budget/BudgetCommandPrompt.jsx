import React, {Component} from 'react';
import PropTypes from 'prop-types';

import './BudgetCommandPrompt.css';

class BudgetCommandPrompt extends Component {

    constructor () {

        super();

        this.state = {
            'commandHistory': ['Initial Message', 'Test message']
        }
    }

    getHistory = () => this.state.commandHistory.join('\n');

    render () {

        return (
            <div className='budget-command-prompt'>
                Command Prompt
                <input type='text' />
                <textarea disabled value={this.getHistory()}/>
            </div>
        );

    }

}

BudgetCommandPrompt.propTypes = {
};

export default BudgetCommandPrompt;
