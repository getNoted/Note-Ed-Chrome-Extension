import React, { useEffect, useState } from 'react';
import Note from './Note';
import Newnote from './Newnote';
import axios from 'axios';
import LoadingSpinner from '../LoadingSpinner';

// globle variables
const host = 'http://localhost:8000';

export default function Videohome(props) {
  const { setActiveNote, videoname, url, seteditorActive } = props;
  const [allNotes, setAllNotes] = useState(null);
  let [title, setTitle] = useState();

  console.log(setAllNotes, 'setAllNotes in videojmo');

  const fetchNotes = async (video_id) => {
    let { authToken } = await chrome.storage.sync.get('authToken');

    axios
      .get(`${host}/api/v1/video/${video_id}`, {
        headers: {
          authorization: `Bearer ${authToken}`,
        },
      })
      .then((data) => {
        console.log(data.data.message);
        if (data.data.message === 'not found') {
          setAllNotes([]);
        } else {
          setAllNotes(data.data.data);
          setTitle(data.data.videoname);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // API deprecated ❤
  // useEffect(() => {
  //     console.log(videoname);
  //     videoname && fetchNotes();
  // }, [videoname])

  useEffect(() => {
    if (url) {
      let video_id = url.split('watch?v=')[1];
      if (video_id.includes('&t=')) {
        video_id = video_id.split('&t=')[0];
      }
      console.log('Formated video id', video_id);
      fetchNotes(video_id);
    }
  }, [url]);
  return (
    <div className="video-home">
      <h2 className="video-title">{title || videoname}</h2>
      {allNotes ? (
        allNotes.map((singleNote) => {
          let singleNoteKey = Object.keys(singleNote)[0];
          return (
            <Note
              setActiveNote={setActiveNote}
              key={singleNoteKey}
              noteInfo={singleNote}
              url={url}
              setAllNotes={setAllNotes}
              allNotes={allNotes}
              seteditorActive={seteditorActive}
            />
          );
        })
      ) : (
        <LoadingSpinner />
      )}
      <Newnote
        setActiveNote={setActiveNote}
        seteditorActive={seteditorActive}
      />
    </div>
  );
}
