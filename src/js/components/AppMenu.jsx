import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {NavLink} from "react-router-dom";

import './AppMenu.css';

const ACTIVE_LINK_CLASS = 'active-link';

class AppMenu extends Component {

    constructLinks = () =>
        this.props.links.map((link, index) =>
            <NavLink  exact to={link.path} activeClassName={ACTIVE_LINK_CLASS} key={index}>
                {link.name}
            </NavLink>
        );

    render () {

        const {links} = this.props;

        return (
            <div className="app-menu">
                <div className="menu-links">
                    {this.constructLinks()}
                </div>
            </div>
        );

    }

}

AppMenu.propTypes = {
    'links': PropTypes.array.isRequired
};

export default AppMenu;
