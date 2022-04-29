import axios from 'axios';
import React, { useEffect, useState } from 'react';
import YtLogo from '../../../assets/img/youtube-96.png';
import './yt-home.css';
import SingleVideo from './SingleVideo';
import VideoNotes from './VideoNotes';
import Editor from '../editor/Editor';
import LoadingSpinner from '../LoadingSpinner';

const host = 'https://backend-1.prathameshdukare.repl.co';

export default function YTHome() {
  const [allMyVideos, setAllMyVideos] = useState(null);
  // const [isVideoListOpen, setisVideoListOpen] = useState(true);
  const [isVideoNotesOpen, setisVideoNotesOpen] = useState(false);
  const [activeVideo, setactiveVideo] = useState(null);
  const [editorActive, seteditorActive] = useState(false);
  const [activeNote, setActiveNote] = useState(null);

  useEffect(() => {
    getAllVideos();
  }, []);

  const getAllVideos = async () => {
    const { authToken } = await chrome.storage.sync.get('authToken');

    axios
      .get(`${host}/api/v1/videos`, {
        headers: {
          authorization: `Bearer ${authToken}`,
        },
      })
      .then((data) => {
        // console.log(data.data.videos)
        setAllMyVideos(data.data.videos);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const whenVideoListOpen = () => {
    return (
      <div className='main-videohome'>
        <div className="title">
          <img className="yt-logo" src={YtLogo} alt="youtube logo" />
          <h1 className='videos-subtitle'>Your Videos</h1>
        </div>
        <div className="video-list">
          {allMyVideos ? (
            allMyVideos.map((video, index) => {
              return (
                <SingleVideo
                  key={video.video_id}
                  videoInfo={video}
                  setisVideoNotesOpen={setisVideoNotesOpen}
                  setactiveVideo={setactiveVideo}
                />
              );
            })
          ) : (
            <LoadingSpinner />
          )}
        </div>
      </div>
    );
  };
  const mainYTHomeFrame = () => {
    return (
      <>
        {isVideoNotesOpen ? (
          <VideoNotes
            activeVideo={activeVideo}
            setActiveNote={setActiveNote}
            seteditorActive={seteditorActive}
            setisVideoNotesOpen={setisVideoNotesOpen}
          />
        ) : (
          whenVideoListOpen()
        )}
      </>
    );
  };
  
  return (
    <div>
      {editorActive ? (
        <Editor
          activeNote={activeNote}
          url={activeVideo.video_url}
          videoname={activeVideo.video_name}
          seteditorActive={seteditorActive}
        />
      ) : (
        mainYTHomeFrame()
      )}
      {/* {editorActive ? <Editor activeNote={activeNote} seteditorActive={seteditorActive} videoname={activeVideo.video_name} currentTime={"time"} url={"a"} /> : <VideoNotes setActiveNote={setActiveNote} videoname={"activeVideo.video_name"} url={"activeVideo.video_url"} seteditorActive={seteditorActive} />} */}
    </div>
  );
}
