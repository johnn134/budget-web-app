import React, {Component} from 'react';
import PropTypes from 'prop-types';

import BudgetManager from '../../../managers/BudgetManager';

import StringCell from '../cells/StringCell';
import NumberCell from '../cells/NumberCell';

import './Row.css';

class DiscretionaryRow extends Component {

    constructor () {

        super();

        this.budgetManager = BudgetManager.getInstance();

    }

    render () {
        
        const {columns, title} = this.props;

        return (
            <tr className="row table-discretionary">
                <StringCell value={title}/>
                {columns.map((column, index) =>
                    <NumberCell
                        value={this.budgetManager.getDiscretionaryForPeriod(column.period)}
                        key={index}
                    />
                )}
            </tr>
        );

    }

}

DiscretionaryRow.propTypes = {
    'title': PropTypes.string.isRequired,
    'columns': PropTypes.array.isRequired
};

export default DiscretionaryRow;
