import React from 'react'
import "./popupNavStyle.css"
import redirectIcon from "../../../assets/img/redirect-icon-32.png"
// import deleteIcon from "../../../assets/img/delete-icon-32.png"
import settingIcon from "../../../assets/img/settings-32.svg"
import icon from "../../../assets/img/icon-34.png"

export default function PopupNav() {
    return (
        <div className='popup-nav'>
            <div>
                <img src={icon} alt="noted icon" />
            </div>
            <div className="hero" title='Noted'>Noted</div>
            {/* <div className="nav"> */}
                {/* <a className='nav-icon' href="#gf" rel="noreferrer"><img src={deleteIcon} className="action-btn-icon" alt="clear notes icon" title='Clear Notes' /></a> */}
                {/* <a className='nav-icon' href="chrome-extension://fkldjphfipjbgmadnppjeebikbhoaelm/options.html"><img src={settingIcon} className="action-btn-icon" alt="settings" title='settings' /></a>
                <a className='nav-icon' href="https://linktr.ee/prathameshdukare" target="_blank" rel="noreferrer"><img src={redirectIcon} className="action-btn-icon" alt="redirect icon" title='Go to Dashboard' /></a>
            </div> */}

        </div>
    )
}
