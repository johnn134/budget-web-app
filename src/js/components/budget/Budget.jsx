import React, {Component} from 'react';
import {BrowserRouter as Router, Route, NavLink} from "react-router-dom";

import BudgetManager from '../../managers/BudgetManager';

import BudgetTabs from './BudgetTabs';
import BudgetTable from './BudgetTable';
import BudgetCommandPrompt from './BudgetCommandPrompt';

import './Budget.css';

class Budget extends Component {

    constructor () {

        super();

        this.budgetManager = BudgetManager.getInstance();

    }

    render () {

        const tabs = this.budgetManager.getBudgets().map(budget => ({
            'id': budget.id,
            'name': budget.name
        }));

        return (
            <Router>
                <div className="budget">
                    <BudgetTabs tabs={tabs}/>
                    <Route path="/budget/:id" component={BudgetTable}/>
                    <BudgetCommandPrompt />
                </div>
            </Router>
        );

    }

}

export default Budget;
