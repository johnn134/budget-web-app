import React, {Component} from 'react';
import PropTypes from 'prop-types';

import './Cell.css';

class StringCell extends Component {

    render () {

        const {value} = this.props;

        return (
            <td className="cell string-cell">{value}</td>
        );

    }

}

StringCell.propTypes = {
    'value': PropTypes.string.isRequired
};

export default StringCell;
