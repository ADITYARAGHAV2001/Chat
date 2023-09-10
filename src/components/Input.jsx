import React, { useContext, useState } from "react";
import Img from "../img/img.png";
import Attach from "../img/attach.png";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import {
  arrayUnion,
  doc,
  serverTimestamp,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { db, storage } from "../firebase";
import { v4 as uuid } from "uuid";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

const Input = () => {
  const [text, setText] = useState("");
  const [img, setImg] = useState(null);

  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const handleSend = async () => {
    let imageUrl = null;

    // Upload image if exists
    if (img) {
      const storageRef = ref(storage, uuid());
      const uploadTask = uploadBytesResumable(storageRef, img);

      await new Promise((resolve, reject) => {
        uploadTask.on(
          (error) => {
            //TODO: Handle error
            reject(error);
          },
          async () => {
            imageUrl = await getDownloadURL(uploadTask.snapshot.ref);
            resolve();
          }
        );
      });
    }

    const message = {
      id: uuid(),
      text,
      senderId: currentUser.uid,
      date: Timestamp.now(),
      ...(imageUrl && { img: imageUrl }), // Conditionally add the img property
    };

    // Update chats
    await updateDoc(doc(db, "chats", data.chatId), {
      messages: arrayUnion(message),
    });

    // Update userChats for the currentUser
    await updateDoc(doc(db, "userChats", currentUser.uid), {
      [`${data.chatId}.lastMessage`]: { text },
      [`${data.chatId}.date`]: serverTimestamp(),
    });

    // Update userChats for the other user
    await updateDoc(doc(db, "userChats", data.user.uid), {
      [`${data.chatId}.lastMessage`]: { text },
      [`${data.chatId}.date`]: serverTimestamp(),
    });

    setText("");
    setImg(null);
  };

  return (
    <div className="input">
      <input
        type="text"
        placeholder="Type something..."
        onChange={(e) => setText(e.target.value)}
        value={text}
      />
      <div className="send">
        <img src={Attach} alt="" />
        <input
          type="file"
          style={{ display: "none" }}
          id="file"
          onChange={(e) => setImg(e.target.files[0])}
        />
        <label htmlFor="file">
          <img src={Img} alt="" />
        </label>
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
};

export default Input;
