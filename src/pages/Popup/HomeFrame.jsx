import React,{useEffect,useState} from 'react'
import Videohome from "./video/Videohome"
import Editor from './editor/Editor';

export default function HomeFrame(props) {
    const { seteditorActive, editorActive} = props;

    const [name,setName]=useState();
    const [time,setTime]=useState();
    const [url,setUrl]=useState();
    const [currentTime,setCurrentTime]=useState();

    const getTimeStamps=async ()=>{
        let [tab]=await chrome.tabs.query({active:true,currentWindow:true});


        formatTitle(tab.title);

        setUrl(tab.url);
    chrome.scripting.executeScript({
        target:{tabId:tab.id},

        function:storeTimestamp
    });
    chrome.storage.sync.get('timestamp',(data)=>{
        console.log(data);
        setTime(data.timestamp);
    })
    }

    const formatTitle=(videoname)=>{
        if(videoname.charAt(0)==='('){
            let pos=0;
            while(videoname.charAt(pos)!==')'){
                pos++;
            }
            videoname=videoname.substring(pos+1);

        }
        setName(videoname);
    }
    useEffect(async ()=>{

        await getTimeStamps();

        chrome.storage.sync.get('timestamp',(data)=>{
            console.log(data);
        })


    },[]);


    useEffect(()=>{
        const newTime=chrome.storage.sync.get('timestamp',data=>{
            console.log(data.timestamp+"noe");
            setCurrentTime(data.timestamp);
        });

    },[time])

    useEffect(()=>{
        console.log(name);
    },[name])

    const storeTimestamp=()=>{
        console.log("hereiam");
        const time=document.body.getElementsByClassName('ytp-time-current');
        const timestamp=time[0].innerText;

        chrome.storage.sync.set({timestamp});


    }

    return (
        <>
           {editorActive ? <Editor seteditorActive={seteditorActive} videoname={name} timestamp={currentTime} url={url} /> : <Videohome videoname={name} timestamp={currentTime} url={url} seteditorActive={seteditorActive} />}
        </>
    )
}
