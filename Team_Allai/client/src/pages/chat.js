import { useEffect, useRef, useState } from "react"
import { HiArrowNarrowRight } from "react-icons/hi"
import { AiOutlineSend } from "react-icons/ai"
import botPfp from "../res/chat/bot-pfp.svg"
import { formatResponse } from "../utils/fn"
import Form from 'react-bootstrap/Form';
import { ethers } from "ethers";
import { Web3Provider } from "@ethersproject/providers";
import { getAddress } from "ethers";

const ChatInfoCard = (props) => {
    const t_f = props.onClick ? props.onClick : () => { };
    return (
        <>
            <div onClick={(e) => t_f(e)} className="bg-white mb-6 rounded-lg border-[1px] border-gray-300 hover:bg-[#e9f9ee] hover:border-black duration-100 ease-in-out cursor-pointer p-4">
                <div className="grid grid-cols-12">
                    <div className="bg-[#2b6877] rounded-full h-auto w-1 col-span-1"></div>
                    <div className="flex gap-1 items-center col-span-11 justify-between my-1">
                        <div>{props.title}</div>
                        <HiArrowNarrowRight className="text-2xl text-[#2b6877]" />
                    </div>
                </div>
            </div>
        </>
    )
}

const BotChatCard = (props) => {
    const data = props.data || {};
    const conf = props.onConfirm || (() => { });
    const deny = props.onDeny || (() => { });
    return (
        <>
            <div className="flex items-center mb-4">
                <div className="flex-none flex flex-col items-center space-y-1 mr-4">
                    {!props.prev && <img className="rounded-full w-10 h-10" src={botPfp} /> || <div className="w-10"></div>}
                </div>
                <div className="bg-[#fff] border-[1px] border-gray-300 p-2 px-4 text-black rounded-lg mb-2 relative">
                    {data.msg_type === "message" && <div>{(data.content ? formatResponse(data.content) : false) || "Something went wrong! Please reload this page"}</div>}
                    {data.msg_type === "action" && <div>
                        {formatResponse(data.content)}
                        <br />
                        <div className="mt-4 font-semibold text-lg">Did that work?</div>
                        <div className="my-2 flex gap-2">
                            <button onClick={(e) => { conf(e) }} className="bg-[#ebebeb] p-2 px-12 rounded-lg border-transparent border-[1px] duration-200 hover:border-black">YES</button>
                            <button onClick={(e) => { deny(e) }} className="bg-[#ebebeb] p-2 px-12 rounded-lg border-transparent border-[1px] duration-200 hover:border-black">NO</button>
                        </div>
                    </div>}
                    {data.msg_type === "loader" && <div>{data.content}</div>}

                    {!props.prev && <div className="absolute left-0 top-1/2 transform -translate-x-1/2 rotate-45 w-2 h-2 bg-[#fff] border-[1px] border-gray-300"></div>}
                </div>
            </div>
        </>
    )
}

const UserChatCard = (props) => {
    return (
        <>
            <div className="flex items-center flex-row-reverse mb-4">
                <div className="bg-[#f2f2f2] text-black px-4 p-2 rounded-lg mb-2 relative">
                    {props.content !== "" && <div>{props.content}</div>}
                    <div className="absolute right-0 top-1/2 transform translate-x-1/2 rotate-45 w-2 h-2 bg-[#f2f2f2]"></div>
                </div>
            </div>
        </>
    )
}

const ChatPage = () => {

    const [chat, setChat] = useState({}); //chat array
    const [loadingHTML, setLoadingHTML] = useState(<></>);
    const [addSOS, setAddSOS] = useState(false);
    const isMounted = useRef(false);
    const chatFieldRef = useRef(null);
    const submitBtn = useRef(null);
    useEffect(() => {
        if (chatFieldRef.current) {
            chatFieldRef.current.focus();
        }
        if (!isMounted.current) {
            isMounted.current = true;
            chatLoading(true);
            fetch('https://chatbot.webxspark.repl.co/chat/start', {
                method: 'GET'
            })
                .then(res => res.json())
                .then(data => {
                    chatLoading(false);
                    if (data.response) {
                        insertChat({
                            type: "bot",
                            msg_type: 'message',
                            content: data.response,
                        })
                    } else {
                        insertChat({
                            type: "bot",
                            msg_type: 'message',
                            content: "Something went wrong while starting the chatbot. Please reload this page.",
                        })
                    }
                })
                .catch(err => {
                    chatLoading(false);
                    insertChat({
                        type: "bot",
                        msg_type: 'message',
                        content: "Something went wrong while starting the chatbot. Please reload this page.",
                    })
                })
        }
    }, [])

    /* Functions */
    const chatLoading = (action = true) => {
        setLoadingHTML(action && <BotChatCard data={{
            msg_type: 'loader', content: <div className="p-3 px-8">
                <div className="spinner">
                    <div className="bounce1"></div>
                    <div className="bounce2"></div>
                    <div className="bounce3"></div>
                </div>
            </div>
        }} /> || <></>)
    };

    const insertChat = (data) => {
        setChat((prev) => {
            var newChat = { ...prev };
            newChat[Object.keys(newChat).length] = data;
            return newChat;
        })
    }
    const insertUserChat = (msg) => {
        chatFieldRef.current.value = msg;
        submitBtn.current.click();
    }
    const getResponse = (message) => {
        chatLoading();
        //json stringify chat and append with message
        message = `{new_message: ${message},  all_messages: ${JSON.stringify(chat)}}`;
        fetch('https://chatbot.webxspark.repl.co/chat', {
            method: 'POST',
            body: new URLSearchParams({
                message: message
            })
        })
            .then(res => res.json())
            .then(data => {
                chatLoading(false);
                if (data.response) {
                    //count the length of the response
                    var responseLength = data.response.length;
                    insertChat({
                        type: "bot",
                        msg_type: (responseLength > 350 ? 'action' : 'message'),
                        content: data.response,
                        onConfirm: () => {
                            insertUserChat("Yeah! That worked for me")
                        },
                        onDeny: () => {
                            insertUserChat("Nope! This is not working...")
                        }
                    })
                    //smooth scroll to #form-footer
                    document.getElementById("form-footer").scrollIntoView({ behavior: "smooth" });
                } else {
                    insertChat({
                        type: "bot",
                        msg_type: 'message',
                        content: "Something went wrong while starting the chatbot. Please reload this page.",
                    })
                }
            })
            .catch(err => {
                chatLoading(false);
                insertChat({
                    type: "bot",
                    msg_type: 'message',
                    content: "Something went wrong while starting the chatbot. Please reload this page.",
                })
            })
    };

    const handleChatSubmit = (e) => {
        e.preventDefault();
        //get the chat field value
        var chat_field = e.target.chat_field.value;
        //empty the chat field
        e.target.chat_field.value = "";

        if (chat_field.trim() === "") return;

        //set value in setChat 
        setChat((prev) => {
            var newChat = { ...prev };
            newChat[Object.keys(newChat).length] = {
                type: "user",
                content: chat_field
            }
            return newChat;
        })
        getResponse(chat_field)

    }
    const resetChat = () => {
        window.confirm("Are you sure you want to reset the chat?") && window.location.reload();
    }
    const ToggleSOS = () => {
        // New SOS
        setAddSOS(!addSOS);
        console.log(addSOS);
    }
    const handleEntailmentRequest = (e) =>{
        return 1
    }
    return (
        <>
            {addSOS ? (
            <div style={{ position: 'absolute',display:'flex',alignItems:'center',justifyContent:'center', width:"100%", height:"80vh", zIndex:90}}>
                <Form style={{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center', width:'50%',height:'50%',backgroundColor:"rgba(0,0,0,0.6)",borderRadius:'10px'}}>
                    <Form.Group className="mb-3" controlId="formGroupEmail">
                        <Form.Label style={{color:'white'}}>Phone No.</Form.Label>
                        <input autoComplete="false" name="num" className="w-full  py-3 focus:outline-none" placeholder="Your Number" style={{borderRadius:'4px'}}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formGroupPassword">
                        <Form.Label style={{color:'white'}}>SOS Num.</Form.Label>
                        <input autoComplete="false" name="sos num" className="w-full  py-3 focus:outline-none" placeholder="SOS Number" style={{borderRadius:'4px'}} />
                    </Form.Group>
                    <button id="subbtn" style={{backgroundColor: '#04AA6D',border: 'none',color: 'white',padding: '16px 32px',textDecoration: 'none',margin: '4px 2px', cursor: 'pointer',borderRadius:'4px'}} onClick={(e) => {handleEntailmentRequest(e)}}>Set SOS</button>
                </Form>
            </div>
            ) : (<></>)}
            <div className="container h-full my-16 font-[Quicksand] font-medium">
                <div className="grid grid-cols-12 gap-4 mx-12">
                    <div className="md:col-span-4 col-span-12 md:order-1 order-2">
                        <ChatInfoCard onClick={() => { insertUserChat('I had an accident') }} title="I had an accident" />
                        <ChatInfoCard onClick={() => { insertUserChat('I have an injury') }} title="I have an injury" />
                        <div className="bg-[#52057B] mb-6 rounded-lg border-[1px] cursor-pointer p-4" onClick={resetChat}>
                            <div className="grid grid-cols-12">
                                <div className="flex gap-1 items-center col-span-12 justify-between my-1 text-white">
                                    <div>New Chat</div>
                                    <HiArrowNarrowRight className="text-2xl text-[#fff]" />
                                </div>
                            </div>
                        </div>
                        {/* New SOS */}
                        <div className="bg-[#52057B] mb-6 rounded-lg border-[1px] cursor-pointer p-4" onClick={ToggleSOS}>
                            <div className="grid grid-cols-12">
                                <div className="flex gap-1 items-center col-span-12 justify-between my-1 text-white">
                                    <div>Add S.O.S Number</div>
                                    <HiArrowNarrowRight className="text-2xl text-[#fff]" />
                                </div>
                            </div>
                        </div>
                        {/* New SOS End */}
                    </div>
                    <div className="md:col-span-8 order-1 lg:order-3 col-span-12">
                        <div className="bg-white rounded-t-lg">
                            <div className="py-12 mx-6">
                                {
                                    Object.keys(chat).map((key, index) => {
                                        if (chat[key].type === "bot") {
                                            return (
                                                <BotChatCard onConfirm={chat[key]['onConfirm'] || null} onDeny={chat[key]['onDeny'] || null} key={index} data={chat[key]} prev={chat[Object.keys(chat)[index - 1]] && chat[Object.keys(chat)[index - 1]].type === "bot"} />
                                            )
                                        } else {
                                            return (
                                                <UserChatCard key={index} content={chat[key].content} />
                                            )
                                        }
                                    })
                                }
                                {loadingHTML}
                            </div>
                        </div>
                        <form onSubmit={handleChatSubmit} autoComplete="off">
                            <div className="bg-white rounded-b-lg items-center border-t-[1px]">
                                <div className="flex mx-6 items-center">
                                    <input ref={chatFieldRef} autoComplete="false" name="chat_field" className="w-full  py-3 focus:outline-none" placeholder="Type a message" />
                                    <button className="p-2 rounded-lg cursor-pointer" type="submit" ref={submitBtn}>
                                        <AiOutlineSend className="text-2xl text-gray-300" />
                                    </button>
                                </div>
                            </div>
                        </form>
                        <div id="form-footer"></div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default ChatPage;