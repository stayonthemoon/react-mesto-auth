import React from 'react';

import header_logo_opt from '../images/header/header_logo_opt.svg';

function Header(props) {
    let { email } = props.userData || {};

    return (
        <header className="header">
            <img className="header__logo" src={header_logo_opt} alt="Логотип" />
            <nav className='header__wrapper'>
                <p className='header__email'>{email}</p>
                <button
                    type='button'
                    onClick={props.onLogout}
                    className='header__exit'
                >
                    {props.text}
                </button>
            </nav>
        </header>
    );
}

export default Header;
