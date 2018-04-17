import React, { Component } from 'react'
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'

import './styles.css'

class Header extends Component {
    render() {
        return (
            <header className="app-header navbar">
                <ul className="nav navbar-nav hidden-md-down">
                    <li className="nav-item">
                        <a className="nav-link navbar-toggler sidebar-toggler" onClick={ this.sidebarToggle } href="">&#9776;</a>
                    </li>
                </ul>
                <a className="navbar-brand" href="/">
                    <div className="d-flex h-100 flex-column justify-content-center align-items-center">
                        <strong>Callouts - Masters</strong>
                    </div>
                </a>

                <ul className="nav navbar-nav ml-auto">
                    <li className="nav-item">
                       <a className="nav-link navbar-toggler sidebar-toggler" href=""> Logout </a>
                    </li>
                </ul>
            </header>  
        );
    }
}

export default Header