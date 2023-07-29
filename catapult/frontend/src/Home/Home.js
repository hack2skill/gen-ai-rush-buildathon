import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import config from "../config";

function Home() {
    const [name, setName] = useState('');
    const navigate = useNavigate();

    const signIn = (authType) => {
        /*
        - send random request to backend and get the id_token in response, and then set the cookie with that id_token
        - if authType is GUEST, {auth_type, auth_token, user_name} 
        - if authType is GOOGLE, {auth_type, auth_token}
        */

        fetch(config.backendUrl + "/signin", {
            method: 'POST',
            headers: {
                'Content-Type':
                    'application/json;charset=utf-8'
            },
            body: JSON.stringify({
                user_name : name,
                auth_type : authType
            })

        })
            .then(res => {
                if (res.ok) { return res.json() }
                else { console.log("something went wrong", res) }
            })
            .then(data => {
                const id_token = data.auth_token;
                sessionStorage.setItem('idToken', id_token);
                navigate("/dashboard");
            })
            .catch(e => { console.log(e) })

    }

    return (
        <div>
            <h1>Catapult : Logo</h1>
            <br></br>
            <h3>Paragraph Text. Lorem ipsum doler amet</h3>
            <br></br>
            <p>Get started - </p>
            <i>Don't worry, we will not spam you and we only take you name and email</i>
            <br></br>
            <div>
                <button>LOGIN WITH GOOGLE</button>
            </div>
            <br></br>
            <div>Still don't trust us? No worries. Try out the interview feature as guest.</div>
            <div>
                <input placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}>
                </input>
                <br></br>
                <button onClick={() => signIn('GUEST')}>
                    SIGNIN AS GUEST
                    <br></br>
                    <i>(Only interview feature available)</i>
                </button>
                <br></br>
            </div>
        </div>
    )
}

export default Home;