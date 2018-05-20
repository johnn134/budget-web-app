import React, {Component} from 'react';
import PropTypes from 'prop-types';
import * as Rx from 'rxjs/Rx';

import './Cell.css';
import './CategoryHeaderCell.css';

const SHOW_CLASS = 'show';
const HIDE_CLASS = 'hide';

class CategoryHeaderCell extends Component {
    
    constructor() {

        super();

        this.isActive = true;

        this.state = {
            'isMenuActive': false
        };

    }

    toggle () {

        this.isActive = !this.isActive;

        this.props.toggleActive();

    }

    getButton () {

        const content = this.isActive ? 'V' : '^';

        return <div className="cell-button" onClick={this.toggle.bind(this)}>{content}</div>;
        
    }

    toggleMenu () {

        this.setState({'isMenuActive': !this.state.isMenuActive})
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

    render () {

        const {value} = this.props;

        const menuClass = this.state.isMenuActive ? SHOW_CLASS : HIDE_CLASS;

        return (
            <td className="cell category-header-cell">
                <div className="cell-title">{value}</div>
                {this.getButton()}
                {/* <div className="cell-options">
                    <div onClick={this.toggleMenu.bind(this)}>...</div>
                    <div className={`cell-menu ${menuClass}`}>
                        <div>Add</div>
                        <div>Delete</div>
                    </div>
                </div> */}
            </td>
        );

    }

}

CategoryHeaderCell.propTypes = {
    'toggleActive': PropTypes.func.isRequired,
    'value': PropTypes.string.isRequired
};

export default CategoryHeaderCell;
