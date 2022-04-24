import React, { useEffect, useState } from 'react'
import VideoNotes from './VideoNotes';

export default function SingleVideo(props) {
    const { videoInfo, setisVideoNotesOpen, setactiveVideo } = props;
    const [shortVideoName,setShortVideoName]=useState();
    useEffect(()=>{
        const {video_name}=videoInfo;
        if(video_name.length>=35)
            setShortVideoName(video_name.substring(0,36)+"...");
    },[])
    const onSingleVideoClick = () => {
        setactiveVideo(videoInfo)
        setisVideoNotesOpen(true)
    }
    return (
        <div onClick={onSingleVideoClick} className='single-video'>
            <p>{shortVideoName ||videoInfo.video_name}</p>
        </div>
    )
}
