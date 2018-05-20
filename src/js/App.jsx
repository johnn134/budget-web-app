import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Link} from "react-router-dom";

import BudgetManager from './managers/BudgetManager';

import AppMenu from './components/AppMenu';
import Home from './components/Home';
import Budget from './components/budget/Budget';
import Settings from './components/settings/Settings';

class App extends Component {

    constructor () {

        super();

        this.links = [
            {
                'path': '/',
                'name': 'Home'
            },
            {
                'path': '/budget',
                'name': 'Budget'
            },
            {
                'path': '/settings',
                'name': 'Settings'
            }
        ];

    }

    render () {

        return (
            <div className="container">
                <Router>
                    <div className="router-wrapper">
                        <AppMenu links={this.links}/>
                        <Route exact path="/" component={Home}/>
                        <Route path="/budget" component={Budget}/>
                        <Route path="/settings" component={Settings}/>
                    </div>
                </Router>
            </div>
        );

    }

}

export default App;
