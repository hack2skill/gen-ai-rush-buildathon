//refered from - https://medium.com/tinyso/how-to-create-a-modal-component-in-react-from-basic-to-advanced-a3357a2a716a

import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import './Modal.css';
import config from "../../config";


const ModalComponent = ({ show, closeModal }) => {

    const [position, setPosition] = useState("");
    const [skills, setSkills] = useState("");
    const [jobDescription, setJobDescription] = useState("");
    const [experience, setExperience] = useState("");

    const navigate = useNavigate();

    const startInterview = () => {
        /* 
        - make a request to start the interview POST /interview/setup
        - on response ok, redirect to /interview/<interview-id-from-response> 
        */

        fetch(config.backendUrl + "/interview/setup", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'auth-token': sessionStorage.getItem('idToken')
            },
            body: JSON.stringify({
                position,
                skills,
                job_description: jobDescription,
                experience
            })

        })
            .then(res => {
                if (res.ok) { return res.json() }
                else { console.log("something went wrong", res) }
            })
            .then(data => {
                const interviewId = data.interview_id;
                sessionStorage.setItem(`interview-title-${interviewId}`, position);
                navigate(`/interview/${interviewId}`);
            })
            .catch(e => { console.log(e) })
    }

    if (!show) {
        return null
    }

    return (
        <div className='modal-component-modal' onClick={closeModal}>
            <div className='modal-component-modal-content' onClick={e => e.stopPropagation()}>
                <h2>Before we get started</h2>
                <p>The more precise you are, the better experience you get</p>

                <label>What do you want to be interviewed for ? </label>
                <br></br>
                <textarea placeholder='e.g. Data Scientist at Google (Maps department)'
                    value={position} onChange={e => setPosition(e.target.value)}>
                </textarea>
                <br></br>
                <br></br>


                <label>What relevant skills do you have for it ? </label>
                <br></br>
                <textarea placeholder='e.g. Python, Pandas, Seaborn, Pytorch, Tensorflow'
                    value={skills} onChange={e => setSkills(e.target.value)}></textarea>
                <br></br>
                <br></br>


                <label>What are the requirements of the job you're preparing for ? </label>
                <br></br>
                <textarea placeholder='Feel free to paste the whole job description here'
                    value={jobDescription} onChange={e => setJobDescription(e.target.value)}></textarea>
                <br></br>
                <br></br>


                <label>Describe your relevant experience in the field, if any? </label>
                <br></br>
                <textarea placeholder='Be as descriptive as you can be'
                    value={experience} onChange={e => setExperience(e.target.value)}></textarea>
                <br></br>
                <br></br>


                <button onClick={startInterview}>
                    <h3>START</h3>
                </button>

            </div>
        </div>
    );
};

export default ModalComponent;
