import React from 'react'
import "./login.css"

export default function Login() {
    const host = 'http://localhost:3001/';
    // const endpoint = 'api/login';
    return (
        <div className="login-redirect">
            
            <h2 className='login-text'>Log in to start using Noted</h2>
                

            <a className='App-link login-link' href={`${host}`} rel="noreferrer" target="_blank">
                <div className='onboard-signup'>
                    Log In
                </div>
            </a>
        </div>
    )
}
