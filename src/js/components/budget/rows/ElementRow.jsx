import React, {Component} from 'react';
import PropTypes from 'prop-types';

import StringCell from '../cells/StringCell';
import NumberCell from '../cells/NumberCell';
import TableCell from '../cells/TableCell';

import './Row.css';

class ElememtRow extends Component {

    render () {

        const {element, columns} = this.props;

        return (
            <tr className="row table-element">
                <StringCell value={element.name}/>
                {columns.map((column, index) =>
                    <TableCell
                        element={element}
                        period={column.period}
                        key={index}
                    />
                )}
            </tr>
        );

    }

}

ElememtRow.propTypes = {
    'element': PropTypes.object.isRequired,
    'columns': PropTypes.array.isRequired
};

export default ElememtRow;
