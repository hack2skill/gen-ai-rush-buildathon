const debug = require("debug")("hackthethon:app");
const initDatabase = require("./config/mongo");
const express = require("express");
const app = express();
const personality = require("./data");
const userData = require("./userdata");
const axios = require("axios");
app.use(express.json());

initDatabase();

app.get("/", (req, res) => {
    res.send("Server up and running!!");
});

var FormData = require("form-data");
var data = new FormData();
data.append("api_key", process.env.API_KEY);

app.post("/api", async (req, res) => {
    console.log(req.body);
    data.append("text", req.body.text);
    var config = {
        method: "post",
        url: "https://apis.paralleldots.com/v4/emotion",
        headers: {
            ...data.getHeaders(),
        },
        data: data,
    };
    try {
        const response = await axios(config);
        console.log(response);
        if (response.status == 200) {
            var emotion = Object.keys(response.data.emotion).reduce((a, b) =>
                response.data.emotion[a] > response.data.emotion[b] ? a : b
            );
            var persona = {
                method: "post",
                url: process.env.PERSONALITY_API,
                data: text,
            };
            const personalityTrait = axios(persona);
            console.log(personality[personalityTrait][emotion]);
            userData.create({
                userId: req.body.userId,
                text: req.body.text,
                date: req.body.date,
                prediction: emotion,
                personality: personalityTrait,
            });
            res.send(emotion);
        } else {
            res.send("error");
        }
    } catch (error) {
        res.send("error");
        console.log(error);
    }
});

app.get("/notify", (req, res) => {
    var noti = {
        method: "post",
        url: "https://fcm.googleapis.com/fcm/send",
        headers: {
            "Content-Type": "application/json",
            Authorization: `key=${process.env.FCM_KEY}`,
        },
        data: {
            to: "/topics/all",
            notification: {
                title: "Let’s boosts your productivity by goal setting.",
                body: "🎯 Set Goals: Define specific, measurable, achievable, relevant, and time-bound goals using our SMART Goal setting technique. \n 🌟 Stay Inspired: Create your personal Vision Board with images and quotes that represent your dreams and aspirations.",
            },
            data: {
                emotion: "Happy",
                prompt: "How can I stay inspired and motivated to reach my goals?",
                url: "https://www.cim.co.uk/media/10562/content-hub_smart_homepage-banner.jpg?crop=0,0.15743501856612396,0,0.16410257783490428&cropmode=percentage&width=1280&height=380&rnd=133107526210000000",
            },
        },
    };
    axios(noti)
        .then(function (response) {
            console.log(JSON.stringify(response.data));
            res.send(response.data);
        })
        .catch(function (error) {
            console.log(error.response);
        });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    debug(`Server listening on port ${PORT}`);
});

function sleep(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}
