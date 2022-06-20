import React from 'react';

import header_logo_opt from '../images/header/header_logo_opt.svg';

function Header() {
    return (
        <header className="header">
            <img className="header__logo" src={header_logo_opt} alt="Логотип" />
        </header>
    );
}

export default Header;
