import React, { useContext } from "react";
import Messages from "./Messages";
import Avatar from "../img/Capture.JPG"
import Input from "./Input";
import { ChatContext } from "../context/ChatContext";

const Chat = () => {
    const { data } = useContext(ChatContext);

    return (
        <div className="chat">
            <div className="chatInfo">
                <div className="imagescontainer">
                    {data.user.photoURL ?(<img src={data.user.photoURL} alt=""/>)  : <img src={ Avatar } alt=""/>}
                </div>
                    
                <span>{data.user?.displayName}</span>
            </div>
            <Messages />
            <Input />
        </div>
    );
};

export default Chat;