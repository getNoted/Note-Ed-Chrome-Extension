import EditorJS from '@editorjs/editorjs';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './editor.css';
import tools from './commonTools';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const API_URL = 'http://localhost:8000';

export default function Editor(props) {
    const { seteditorActive, activeNote, videoname, url, currentTime } = props;

    const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

    let editor;
    const launchEditor = () => {
        editor = new EditorJS({
            holder: 'editorjs',
            autofocus: true,
            placeholder: 'write your notes here...',
            readOnly: false,
            tools: tools,
            data: activeNote
                ? JSON.parse(activeNote[Object.keys(activeNote)[0]])
                : null,
        });
    };
    // blocks[0] blocks
    const saveData = () => {
        editor
            .save()
            .then(async (outputData) => {
                console.log(outputData);
                // setData(outputData);
                let timestamp = activeNote ? Object.keys(activeNote)[0] : currentTime;
                let note = JSON.stringify(outputData);
                const { authToken } = await chrome.storage.sync.get('authToken');
                axios
                    .post(
                        `${API_URL}/api/v1/notes/timestamp/create`,
                        {
                            video_url: url,
                            videoname,
                            timestamp,
                            content: note,
                            foldername: 'default',
                        },
                        {
                            headers: {
                                authorization: `Bearer ${authToken}`,
                            },
                        }
                    )
                    .then((response) => {
                        console.log(response.status+">>>>>>>>>>>>>>>");
                        if(response.status===200){
                            handleClick();
                        }
                        
                    })
                    .catch((err) => {
                        console.log(err);
                        return false;
                    });
            })
            .catch((error) => {
                console.log('Saving failed: ', error);
            });
    };

    useEffect(() => {
        launchEditor();
    },[]);
    return (
        <>
            <div className="video-nav">
                <div className="video-info">
                    <h2 className='video-title-editor'>{videoname}</h2>
                </div>
                <div className="buttons editor-buttons">
                    <div className="childs">
                        <a
                            className="back-btn"
                            href="#"
                            onClick={() => {
                                seteditorActive(false);
                            }}
                        >
                            Back
                        </a>
                        <a className="save-btn" href="#" onClick={saveData}>
                            Save
                        </a>
                    </div>
                    <h2 className='editor-timestamp'>{`Timestamp : ${activeNote ? Object.keys(activeNote)[0] : currentTime
                        }`}</h2>
                </div>
            </div>
            <div id="editorjs"></div>

            <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          Note Saved!
        </Alert>
      </Snackbar>
        </>
    );
}
