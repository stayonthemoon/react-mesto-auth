import React from 'react';

function Login(props) {
    const [formValues, setFormValues] = React.useState(
        {
            email: '',
            password: '',
        }
    )

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formValues.email || !formValues.password) {
            return;
        }
        props.handleAuthorization(
            {
                email: formValues.email,
                password: formValues.password,
            }
        )
    };

    return (

        <div className="popup_type_register">
            <form
                className="popup__form popup__form-register"
                onSubmit={handleSubmit}
                name="login">
                <h2 className="popup__title popup__title_dark">Вход</h2>

                <input className="popup__input popup__input_dark popup__input_type-email"
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
                <input className="popup__input popup__input_dark popup__input_type-password"
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
            <button aria-label="Войти" type="submit" className="popup__save-button popup__save-button_register"
                onClick={handleSubmit}>Войти</button>
        </div>
    )
}

export default Login;