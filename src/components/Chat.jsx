import React, { useContext } from "react";
import Messages from "./Messages";
import Input from "./Input";
import { ChatContext } from "../context/ChatContext";

const Chat = () => {
    const { data } = useContext(ChatContext);

    return (
        <div className="chat">
            <div className="chatInfo">
                <div className="imagescontainer">
                <img
                    src={
                        data.user.photoURL
                    }
                    alt=""
                />
                </div>
                    
                <span>{data.user?.displayName}</span>
            </div>
            <Messages />
            <Input />
        </div>
    );
};

export default Chat;