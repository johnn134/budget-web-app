import React, {Component} from 'react';
import PropTypes from 'prop-types';

import BudgetManager from '../../../managers/BudgetManager';

import ElementRow from './ElementRow';

import './Row.css';

class CategoryBody extends Component {

    constructor () {

        super();

        this.budgetManager = BudgetManager.getInstance();

    }

    render () {

        const {category, columns} = this.props;

        return category.elements.map((elementID, index) => {

            return (
                <ElementRow
                    element={this.budgetManager.getElement(elementID)}
                    columns={columns}
                    key={index}
                />
            );

        });

    }

}

CategoryBody.propTypes = {
    'category': PropTypes.object.isRequired,
    'columns': PropTypes.array.isRequired
};

export default CategoryBody;
