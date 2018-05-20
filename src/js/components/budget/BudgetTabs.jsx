import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {NavLink} from "react-router-dom";

import './BudgetTabs.css';

const ACTIVE_TAB_CLASS = 'active-tab';

class BudgetTabs extends Component {

    constructTabs = () =>
        this.props.tabs.map((tab, index) =>
            <NavLink exact to={`/budget/${tab.id}`} activeClassName={ACTIVE_TAB_CLASS} key={index}>
                {tab.name}
            </NavLink>
        );

    render () {

        return (
            <div className="budget-tabs-container">
                <div className="budget-tabs">
                    {this.constructTabs()}
                </div>
            </div>
        );

    }

}

BudgetTabs.propTypes = {
    'tabs': PropTypes.array.isRequired
};

export default BudgetTabs;
