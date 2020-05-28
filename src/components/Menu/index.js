import React from 'react';
import './styles.css';

import logo from '../../images/logo2.png';

// import { Container } from './styles';

function Menu() {


    return (
        <div>
            <div className="topnav">
                <a className="active" href="#home"><img src={logo} alt="a"></img></a>

            </div>
        </div>
    );
}

export default Menu;