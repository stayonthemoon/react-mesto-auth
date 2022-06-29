import React from 'react';

import { useLocation } from 'react-router-dom';

import header_logo_opt from '../images/header/header_logo_opt.svg';

function Header(props) {
    const location = useLocation();

    return (
        <header className="header">
            <img className="header__logo" src={header_logo_opt} alt="Логотип" />
            <nav className='header__wrapper'>
                <p className='header__email'>{props.userData}</p>
                <button
                    type='button'
                    onClick={location.pathname === '/' ? props.handleLogout
                        :
                        location.pathname === '/sign-in' ? props.toRegistration
                            :
                            props.toLogin}
                    className='header__exit'
                >
                    {location.pathname === '/sign-in' ? 'Регистрация'
                        :
                        location.pathname === '/sign-up' ? 'Войти'
                            :
                            'Выйти'}
                </button>
            </nav>
        </header>
    );
}

export default Header;
