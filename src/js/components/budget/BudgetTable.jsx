import React, {Component} from 'react';

import BudgetManager from '../../managers/BudgetManager';

import Category from './Category';
import HeaderRow from './rows/HeaderRow';
import ElementRow from './rows/ElementRow';
import DiscretionaryRow from './rows/DiscretionaryRow';

const {PERIODS, PERIOD_INTERVALS, VALUE_TYPES} = BudgetManager;

class BudgetTable extends Component {
    
    budgetManager;
    columns;

    constructor(props) {

        super(props);

        console.log(props);

        this.budgetManager = BudgetManager.getInstance();

        this.columns = [
            {
                'name': 'Year',
                'period': PERIODS.YEAR
            },
            {
                'name': 'Month',
                'period': PERIODS.MONTH
            },
            {
                'name': 'Week',
                'period': PERIODS.WEEK
            },
            {
                'name': 'Day',
                'period': PERIODS.DAY
            }
        ];

        this.budgetManager.setActiveBudget(this.props.match.params.id);

    }

    componentDidMount () {

        this.budgetManager.getBudgetUpdateObservable().subscribe(() => this.forceUpdate());

    }

    componentWillReceiveProps (nextProps) {

        if (nextProps.match.params.id !== this.props.match.params.id) {

            this.budgetManager.setActiveBudget(nextProps.match.params.id);

        }

    }

    render () {

        const activeBudget = this.budgetManager.getActiveBudget();

        return (  
            <table>
                <tbody>
                    <HeaderRow
                        title={"Budget"}
                        columns={this.columns.map(column => column.name)}
                    />
                    {activeBudget.categories.map((category, index) =>
                        <Category
                            category={this.budgetManager.getCategory(category)}
                            columns={this.columns}
                            key={index}
                        />
                    )}
                    <DiscretionaryRow
                        title={"Discretionary"}
                        columns={this.columns}
                    />
                </tbody>
            </table>
        );

    }

}

export default BudgetTable;
