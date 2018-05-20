import React, {Component} from 'react';
import PropTypes from 'prop-types';

import StringCell from '../cells/StringCell';
import NumberCell from '../cells/NumberCell';

import './Row.css';

class HeaderRow extends Component {

    render () {

        const {columns, title} = this.props;

        return (
            <tr className="row table-header">
                <StringCell value={title}/>
                {columns.map((column, index) =>
                    <StringCell
                        value={column}
                        key={index}
                    />
                )}
            </tr>
        );

    }

}

HeaderRow.propTypes = {
    'title': PropTypes.string.isRequired,
    'columns': PropTypes.array.isRequired
};

export default HeaderRow;
