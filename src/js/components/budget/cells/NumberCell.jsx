import React, {Component} from 'react';
import PropTypes from 'prop-types';

import './Cell.css';

class NumberCell extends Component {

    formatNumber (value) {

        var parts = value.toFixed(2).toString().split(".");

        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");

        return parts.join(".");

    }

    render () {

        const {value} = this.props;

        return (
            <td className="cell number-cell">{this.formatNumber(value)}</td>
        );

    }

}

NumberCell.propTypes = {
    'value': PropTypes.number.isRequired
};

export default NumberCell;
