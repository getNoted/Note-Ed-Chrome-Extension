import React, { useState } from 'react';
import './Popup.css';
import PopupNav from './popupNav/PopupNav';
import Login from './login/Login';
import HomeFrame from './HomeFrame';

const Popup = () => {
    const [isLoggedin, setisLoggedin] = useState(false);
    const [editorActive, seteditorActive] = useState(false);

    chrome.storage.sync.get(['loggedInStatus'], function (result) {
        console.log('loggedInStatus is ' + result.loggedInStatus);
        if (result.loggedInStatus) {
            setisLoggedin(true);
        }
    });

    return (
        <div className="App">
            <PopupNav />
            {isLoggedin ? <HomeFrame seteditorActive={seteditorActive} editorActive={editorActive} /> : <Login setisLoggedin={setisLoggedin} />}

            {/* <Editor /> */}
            {/* <Videohome seteditorActive={seteditorActive} /> */}

        </div>
    );
};

export default Popup;