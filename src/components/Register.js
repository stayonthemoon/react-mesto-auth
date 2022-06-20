import React from 'react';
import { Link } from 'react-router-dom';

function Register(props) {
    const [formValues, setFormValues] = React.useState(
        {
            email: '',
            password: '',
        }
    )

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues(
            {
                [name]: value,
            }
        )
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formValues.email || formValues.password) {
            let { email, password } = formValues;
            props.handleRegister({ email, password });
        }
    };

    return (
        <>
            <div className="popup popup_type_register popup_opened">

                <div className="popup__wrapper">
                    <form className="popup__form popup__form-register" onSubmit={handleSubmit} name="register">
                        <h2 className="popup__title">Регистрация</h2>

                        <input className="popup__input popup__input_type-email"
                            required
                            value={formValues.email || ''}
                            onChange={handleChange}
                            minLength='2'
                            maxLength='40'
                            type="email"
                            name="email"
                            id="email"
                            placeholder='Email'
                        />
                        <span className="popup__input-error name-error"></span>
                        <input className="popup__input popup__input_type-password"
                            required
                            value={formValues.password || ''}
                            onChange={handleChange}
                            minLength='2'
                            maxLength='40'
                            type="password"
                            name="password"
                            id="password"
                            placeholder='Password'
                        />
                        <span className="popup__input-error name-error"></span>
                    </form>
                    <button onClick={props.onClose} aria-label="Сохранить" type="submit" className="popup__save-button">Зарегистрироваться</button>

                    <div className='popup__signin'>
                        <p className='popup__signin-descr'>Уже зарегистрированы?</p>
                        <Link to='/log-in' className='popup__login-link'>Войти</Link>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Register;