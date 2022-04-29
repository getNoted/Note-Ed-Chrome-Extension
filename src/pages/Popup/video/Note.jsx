import React from 'react';
import './note.css';
import deleteIcon from '../../../assets/img/delete-icon-32.png';
// import editIcon from '../../../assets/img/edit-24.png';
import axios from 'axios';

const API_URL = 'https://backend-1.prathameshdukare.repl.co';

export default function Note(props) {
  const {
    noteInfo,
    url,
    allNotes,
    setAllNotes,
    setActiveNote,
    seteditorActive,
  } = props;
  console.log(noteInfo, 'noteInfo');

  const deleteNote = async (e) => {
    const { authToken } = await chrome.storage.sync.get('authToken');
    e.preventDefault();
    console.log('deleting');
    let video_id = url.split('watch?v=')[1];
    if (video_id.includes('&t=')) {
      video_id = video_id.split('&t=')[0];
      if (video_id.includes('&list=')) {
        video_id = video_id.split('&list=')[0];
        console.log("inside",video_id);
      }
    }

    axios
      .post(
        `${API_URL}/api/v1/notes/timestamp/delete`,
        { timestamp: Object.keys(noteInfo)[0], video_id },
        {
          headers: {
            authorization: `Bearer ${authToken}`,
          },
        }
      )
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
        return false;
      });

    // setting all notes
    let deletedTimeStamp = Object.keys(noteInfo)[0];
    let newNotes = allNotes.filter((note) => {
      let noteTimeStamp = Object.keys(note)[0];
      if (noteTimeStamp === deletedTimeStamp) {
        return false;
      } else {
        return true;
      }
    });

    console.log(newNotes);
    setAllNotes(newNotes);
    console.log('deleted');
  };
  const editNote = (e) => {
    e.preventDefault();
    console.log('editing');
  };
  const openNote = () => {
    console.log('opening note...');
    setActiveNote(noteInfo);
    seteditorActive(true);
  };
  console.log(url);
  return (
    <div className="note">
      <h2 className="timestamp" title="Open Note" onClick={openNote}>
        {Object.keys(noteInfo)[0]}
      </h2>
      <div className="actions">
        {/* <a className='action-btn' href="" onClick={editNote} role="button"><img className='action-btn-icon' src={editIcon} alt="Edit icon" title='Edit Notes' /></a> */}
        <a className="action-btn" href="" onClick={deleteNote} role="button">
          <img
            className="action-btn-icon"
            src={deleteIcon}
            alt="delete icon"
            title="Delete Note"
          />
        </a>
      </div>
    </div>
  );
}
