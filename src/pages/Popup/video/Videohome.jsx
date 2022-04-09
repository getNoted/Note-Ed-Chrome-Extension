import React, { useEffect, useState } from 'react'
import Login from '../login/Login'
import Note from './Note'
import Newnote from './Newnote';
import axios from 'axios';

export default function Videohome(props) {

    const { seteditorActive, videoname, timestamp, url } = props;
    const [notes, setNotes] = useState();
    let [title, setTitle] = useState();
    const fetchNotes = () => {

        axios.get(`https://Backend-1.prathameshdukare.repl.co/api/v1/video/${videoname}`, {
            headers: {
                "authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InNpeWEiLCJlbWFpbCI6InNpeWFAZ21haWwuY29tIiwidXNlcl9pZCI6IjYyNGIzMDZjMmZkYTE2NDJjNzk2MzE1MiIsImlhdCI6MTY0OTQ5ODYxMX0.nWaNg430WccmNnxLHblG4xRI-TPsCcMZIW5zQunJcOg"

            }
        }).then(data => {
            console.log(data);
            setNotes(data.data.data);
        })
    }




    useEffect(() => {
        console.log(videoname);
        videoname && fetchNotes();
    }, [videoname])





    return (
        <div className='video-home'>
            <h2 className='video-title'>{videoname}</h2>
            {notes && notes.map((singleNote) => {
                let singleNoteKey = Object.keys(singleNote)[0]
                return <Note key={singleNoteKey} noteInfo={singleNote} seteditorActive={seteditorActive} />
            })}
            <Newnote seteditorActive={seteditorActive} />
        </div>
    )
}
