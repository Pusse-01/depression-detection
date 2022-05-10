import React, {Component} from 'react';
import ReactPlayer from 'react-player';
import {ReactMediaRecorder} from "react-media-recorder";
import './sessionPage.css'
import { FaBeer , FaHome} from 'react-icons/fa';

const axios = require('axios').default;
class SessionPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            message:"",
            videoLink:"https://www.youtube.com/watch?v=vjf774RKrLc",
            selectedRecordedVideo:"",
            videos:[],
            blobUrls:[],
            count:0,
            user:"626fd77ce05e0d36169aaf4d",
            session:"626f983b1e9a9f3964b46830",
            sessionName:"Session1",
            userName:"User1",
            recordingStatus:"Not yet answered for any question."
        }
    }
    answerSubmit = async () => {
        if(this.state.videos.length===0){
            console.log("There are no recordings.")
        }else{
            const config = {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            }
            const formData = new FormData();
            formData.append("user", this.state.user);
            formData.append("session", this.state.session);
            for(let i=0;i<this.state.videos.length;i++){
                formData.append("videos", this.state.videos[i]);
            }
            axios.post('http://localhost:3003/api/sessionAnswers/addSessionAnswer', formData)
                .then(response => {
                    console.log(response)
                })
        }
    }

    render() {
        let count =0;
        if(true){
            return (
                <div className="sessionPageMainBody">
                    <ReactMediaRecorder
                        video
                        render={({status, startRecording, stopRecording, mediaBlobUrl}) => (
                            <div className="session_page_main_body">
                                {this.state.props}
                                <div className="player_container">
                                    <div className="session_answers_go_home">
                                        <FaHome className="session_page_home_icon"/>
                                        <h7>Home</h7>
                                    </div>

                                    <ReactPlayer
                                        width="60%"
                                        height="96%"
                                        controls
                                        onReady={() => {
                                            console.log("On Ready Callback")
                                        }}
                                        onStart={() => {
                                            console.log("On Start Callback")
                                        }}
                                        // onPause={startRecording}
                                        onEnded={() => {
                                            console.log("On Ended Callback")
                                        }}
                                        onError={() => {
                                            console.log("On Error Callback")
                                        }}
                                        // onPlay={stopRecording}
                                        url={this.state.videoLink}
                                    />
                                </div>

                                <div className="session_page_answers">
                                    <div className="session_page_answer_video">
                                        <video width="50%" className="recordPayer"
                                               height="80%" src={this.state.selectedRecordedVideo} controls autoPlay/>

                                        <div className="session_page_record_button_container">
                                            <div className='session_page_recording_status'>
                                                <h7>{this.state.recordingStatus}</h7>
                                            </div>
                                            <div
                                                className="session_page_answer_button"
                                                onClick ={
                                                    () => {
                                                        startRecording();
                                                    }
                                                }
                                            >
                                                <h7>Start</h7>
                                            </div>
                                            <div
                                                className="session_page_stop_answer_button"
                                                onClick={async ()=>{
                                                    stopRecording()
                                                }}
                                            >
                                                <h7>Stop</h7>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="session_page_answers_list">
                                        <p className="session_page_answers_list_title">Answers</p>
                                        {
                                            this.state.blobUrls.map((element,idx) => {
                                                return(
                                                    <div className="answer_container" onClick={()=>{
                                                        this.setState({
                                                            selectedRecordedVideo:element
                                                        })
                                                    }}>
                                                        <h7 className="answer">Answer {idx+1}</h7>
                                                    </div>
                                                );
                                            })
                                        }
                                    </div>
                                </div>
                            </div>
                        )}
                        onStart={
                            ()=>{
                                this.setState({
                                    recordingStatus:"Started answering for question "+(this.state.videos.length+1)
                                })
                            }
                        }
                        onStop={
                            async (blobUrl, blob) => {
                                console.log("Blob URL",blobUrl);
                                const videoBlob =  await fetch(blobUrl).then(r => r.blob());
                                const videoFile = new File([videoBlob],
                                    "AnswerFor_"+this.state.session+
                                    "_"+(this.state.videos.length+1)+
                                    "_"+this.state.user
                                    +".mp4", { type: "video/mp4" })
                                let videosCopy = []
                                let blobUrlsCopy = []
                                let i =0;
                                for(;i<this.state.videos.length;i++){
                                    videosCopy[i]=this.state.videos[i]
                                    blobUrlsCopy[i] =  this.state.blobUrls[i]
                                }
                                videosCopy[i] = videoFile
                                blobUrlsCopy[i] = blobUrl
                                this.setState({
                                    count : this.state.count++,
                                    videos : videosCopy,
                                    blobUrls : blobUrlsCopy,
                                    selectedRecordedVideo:blobUrl,
                                    recordingStatus:"Stopped answering for question "+(i+1)
                                })
                            }
                        }
                    />
                    <div className="session_page_submit_button_container">
                        <div
                            className="session_answers_submit_button"
                            onClick={()=>this.answerSubmit()}
                        >
                            <p>Submit Answers</p>
                        </div>
                    </div>
                </div>
            );
        }else{
            return null;
        }
    }
}

export default SessionPage;

