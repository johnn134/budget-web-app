import React, {Component} from 'react';
import PropTypes from 'prop-types';

import BudgetManager from '../../managers/BudgetManager';

import CategoryHeader from './rows/CategoryHeader';
import CategoryBody from './rows/CategoryBody';

class Category extends Component {

    constructor () {

        super();

        this.state = {
            'isActive': true
        };

    }

    toggleCategory () {

        this.setState({
            'isActive': !this.state.isActive
        })

    }

    render () {

        const {category, columns} = this.props;

        const categoryContent = [
            <CategoryHeader
                category={category}
                columns={columns}
                toggleCategory={this.toggleCategory.bind(this)}
                key={0}
            />
        ];

        if (this.state.isActive) {

            categoryContent.push(
                <CategoryBody
                    category={category}
                    columns={columns}
                    key={1}
                />
            );

        }

        return categoryContent

    }

}

Category.propTypes = {
    'category': PropTypes.object.isRequired,
    'columns': PropTypes.array.isRequired
};

export default Category;
