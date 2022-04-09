import React from 'react'
import "./login.css"

export default function Login() {
    const host = 'http://localhost:3000/login';
    // const endpoint = 'api/login';
    return (
        <div className="login-redirect">
            <h2>Please Login to Start taking notes</h2>
            <a className='App-link login-link' href={`${host}`} rel="noreferrer" target="_blank">Click Here to log in</a>
        </div>
    )
}
