import React, {Component} from 'react';
import PropTypes from 'prop-types';
import * as Rx from 'rxjs/Rx';

import BudgetManager from '../../../managers/BudgetManager';

import './Cell.css';

class TabelCell extends Component {

    constructor () {

        super();

        this.state = {
            'editing': false
        };

        this.inputElementIsActive = false;

        this.budgetManager = BudgetManager.getInstance();

    }

    formatNumber (value) {

        var parts = value.toFixed(2).toString().split(".");

        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");

        return parts.join(".");

    }

    getInputRef (element) {

        this.inputElement = element;

        if (this.inputElement) {
            
            this.inputElement.select();

        }

    }

    handleInputKeyPress (event) {

        this.valueHasChanged = true;

        if (this.state.editing && event.key === 'Enter') {
            
            this.deactivateInputElement();

        }

    }

    activateInputElement () {

        this.setState({'editing': true});
        
        this.inputCreatedOnClick = true;

    }

    deactivateInputElement () {
        
        const {element, period} = this.props;

        if (this.valueHasChanged) {

            const newValue = parseFloat(this.inputElement.value.replace(',', ''));

            if (!Number.isNaN(newValue)) {

                this.budgetManager.updateBudgetElement(element, period, newValue);

            } else {

                console.error('Invalid input, NaN');

            }            

        }
        
        this.setState({'editing': false});
        
        this.inputCreatedOnClick = false;
        this.valueHasChanged = false;

    }

    clickFunc () {

        if (!this.state.editing) {

            console.log('toggling');

            this.activateInputElement();

        }

    }

    componentDidMount () {

        const clickStream = Rx.Observable.fromEvent(document, 'click');

        this.clickSub = clickStream
            .filter(() => this.state.editing)
            .filter(event => this.inputElement && !this.inputElement.contains(event.target) && !this.inputCreatedOnClick)
            .subscribe(() => this.deactivateInputElement());

        clickStream
            .filter(() => this.inputCreatedOnClick)
            .subscribe(() => this.inputCreatedOnClick = false);

    }

    componentWillUnmount () {

        this.clickSub.unsubscribe();

    }

    render () {

        const { element, period} = this.props;

        const value = this.formatNumber(this.budgetManager.getValueForPeriod(element.baseValue, period));

        const cellContent = this.state.editing
            ? <input
                ref={this.getInputRef.bind(this)}
                autoFocus
                onKeyPress={this.handleInputKeyPress.bind(this)}
                defaultValue={value}
                type="text" />
            : value

        return (
            <td className="cell table-cell" onClick={this.clickFunc.bind(this)}>{cellContent}</td>
        );

    }

}

TabelCell.propTypes = {
    'element': PropTypes.object.isRequired,
    'period': PropTypes.string.isRequired
};

export default TabelCell;
