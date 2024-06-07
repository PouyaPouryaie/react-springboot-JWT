import React, { useState } from 'react'
import classNames from 'classnames'

const LoginForm = ( {onLogin, onRegister} ) => {


    const [active, setActive] = useState("login");
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        login: "",
        password: ""
    });

    const onChangeHandler = (e) => {
        const { name, value } = e.target;
        setFormData({...formData, [name]: value});
    }

    const onSubmitLogin = (e) => {
        e.preventDefault();
        onLogin(formData.login, formData.password);
    }

    const onSubmitRegister = (e) =>{
        e.preventDefault();
        onRegister(formData.firstName,
            formData.lastName,
            formData.login,
            formData.password);
    }

  return (
    <div className='row justify-content-md-center'>
        <div className='col-4'>
            <ul className='nav nav-pills nav-justified mb-3' id="ex1" role="tablist">
                <li className='nav-item' role="presentation">
                    <button className={classNames("nav-link", active === "login" ? "active" : "")} id="tab-login"
                    onClick={ () => setActive("login")}>Login</button>
                </li>
                <li className='nav-item' role="presentation">
                    <button className={classNames("nav-link", active === "register" ? "active" : "")} id="tab-register"
                    onClick={ () => setActive("register")}>Register</button>
                </li>
            </ul>

            <div className='tab-content'>
                <div className={classNames("tab-pane", "fade", active === "login" ? "show active": "")} id="pills-login">
                    <form onSubmit={onSubmitLogin}>
                        <div className='form-outline mb-4'>
                            <input type='text' id="loginName" name="login" className='form-control' onChange={onChangeHandler} />
                            <label htmlFor="loginName" className='form-label'>Username</label>
                        </div>
                        <div className='form-outline mb-4'>
                            <input type='password' id="loginPassword" name="password" className='form-control' onChange={onChangeHandler} />
                            <label htmlFor="loginPassword" className='form-label'>Password</label>
                        </div>

                        <button type='submit' className='btn btn-primary btn-block mb-4'>Sign in</button>

                    </form>
                </div>
                <div className={classNames("tab-pane", "fade", active === "register" ? "show active" : "")} id="pills-register" >
                    <form onSubmit={onSubmitRegister}>

                        <div className="form-outline mb-4">
                            <input type="text" id="firstName" name="firstName" className="form-control" onChange={onChangeHandler} />
                            <label className="form-label" htmlFor="firstName">First name</label>
                        </div>

                        <div className="form-outline mb-4">
                            <input type="text" id="lastName" name="lastName" className="form-control" onChange={onChangeHandler} />
                            <label className="form-label" htmlFor="lastName">Last name</label>
                        </div>

                        <div className="form-outline mb-4">
                            <input type="text" id="registerLogin" name="login" className="form-control" onChange={onChangeHandler} />
                            <label className="form-label" htmlFor="registerLogin">Username</label>
                        </div>

                        <div className="form-outline mb-4">
                            <input type="password" id="registerPassword" name="password" className="form-control" onChange={onChangeHandler} />
                            <label className="form-label" htmlFor="registerPassword">Password</label>
                        </div>

                        <button type="submit" className="btn btn-primary btn-block mb-3">Sign up</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
  )
}

export default LoginForm;