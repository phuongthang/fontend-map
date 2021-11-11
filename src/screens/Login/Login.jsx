import React from 'react';

export default function Login(props) {
    /**
     * defined state
     */
    const _onClick = () => {
        sessionStorage.setItem('ikey','oIBi6LRoHmONA49');
        props.history.push('/');
    }

    /**
     * render template
     */
    return (
        <div className="login">
            <div className="limiter">
                <div className="container-login100">
                    <div className="wrap-login100 p-t-85 p-b-20">
                        <div className="login100-form validate-form">
                            <span className="login100-form-title p-b-70">Welcome</span>
                            <div
                                className="wrap-input100 validate-input m-t-85 m-b-35"
                                data-validate="Enter username"
                            >
                                <input className="input100" type="text" name="username" />
                                <span className="focus-input100"/>
                            </div>
                            <div
                                className="wrap-input100 validate-input m-b-50"
                                data-validate="Enter password"
                            >
                                <input className="input100" type="password" name="pass" />
                                <span className="focus-input100"/>
                            </div>
                            <div className="container-login100-form-btn">
                                <button onClick={_onClick} className="login100-form-btn">Login</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}