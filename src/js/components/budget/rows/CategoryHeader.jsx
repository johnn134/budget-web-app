import React, {Component} from 'react';
import PropTypes from 'prop-types';

import BudgetManager from '../../../managers/BudgetManager';

import CategoryHeaderCell from '../cells/CategoryHeaderCell';
import NumberCell from '../cells/NumberCell';

import './Row.css';

class CategoryHeader extends Component {

    constructor () {

        super();

        this.budgetManager = BudgetManager.getInstance();

    }

    constructColumns = () => {

        const {category, columns} = this.props;

        return columns.map((column, index) => {

            const columnSum = category.elements
                .map(this.budgetManager.getElement)
                .map(element => this.budgetManager.getValueForPeriod(element.baseValue, column.period))
                .reduce((total, current) => total + current);

            return <NumberCell value={columnSum} key={index}/>

        });

    };

    render () {

        const {category, toggleCategory} = this.props;

        return (
            <tr className="row category-header">
                <CategoryHeaderCell toggleActive={toggleCategory} value={category.name} />
                {this.constructColumns()}
            </tr>
        );

    }

}

CategoryHeader.propTypes = {
    'category': PropTypes.object.isRequired,
    'columns': PropTypes.array.isRequired,
    'toggleCategory': PropTypes.func.isRequired
};

export default CategoryHeader;
