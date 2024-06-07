import React, { useState } from 'react'
import WelcomeContent from './WelcomeContent'
import AuthContent from './AuthContent'
import LoginForm from './LoginForm'
import { request, setAuthHeader } from '../axios_helper'
import Buttons from './Buttons'

const AppContent = () => {


    const [componentToShow, setComponentToShow] = useState("welcome");

    const login = () => setComponentToShow("login");

    const logout = () => setComponentToShow("welcome");

    const onLogin = (username, password) => {
        request(
            "POST",
            "/login",
            {
                login: username,
                password: password
            }).then(
                (response) => {
                    setAuthHeader(response.data.token);
                    setComponentToShow("messages");
                }
            ).catch( (error) => {
                setAuthHeader(null);
                setComponentToShow("welcome");
            }
        );

    };

    const onRegister = (firstName, lastName, username, password) => {
        request(
            "POST",
            "/register",
            {
                firstName: firstName,
                lastName: lastName,
                login: username,
                password: password
            }).then(
            (response) => {
                setAuthHeader(response.data.token);
                setComponentToShow("messages");
            }).catch(
            (error) => {
                setAuthHeader(null);
                setComponentToShow("welcome");
            }
        );
    };


  return (

    <>
        <Buttons login={login} logout={logout} />

        {componentToShow === "welcome" && <WelcomeContent /> }
        {componentToShow === "login" && <LoginForm onLogin={onLogin} onRegister={onRegister} />}
        {componentToShow === "messages" && <AuthContent /> }
    </>
  )
}

export default AppContent