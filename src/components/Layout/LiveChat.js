import styles from "./LiveChat.module.css";
import { FcAssistant, FcSportsMode } from "react-icons/fc";
import { AiOutlinePaperClip } from "react-icons/ai";
import { MdInsertEmoticon } from "react-icons/md";
import { useState, useEffect, useRef } from "react";
import io from "socket.io-client";
import { serverUrl, token } from "../../util/getPostData";

function LiveChat({ closeChatBot }) {
  const inputRef = useRef("");
  // const msgContainer = useRef(null);
  const [room, setRoom] = useState(null);
  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState(null);

  let chatId = localStorage.getItem("chatId");

  // join chat room when open chatting
  function setChatRoom() {
    // if chat id not existing
    if (!chatId) {
      chatId = Math.random().toString(16).substring(2);
      localStorage.setItem("chatId", chatId);
    }
    setRoom(chatId);
  }

  // submit chatting
  function submitHandler(e) {
    e.preventDefault();
    // nothing happen when the value is empty
    if (inputRef.current.value === "") return;

    // config enter by press enter button
    if (e && e.keyCode === 13) {
      document.forms[0].submit();
    }

    // left chat room when command /end
    if (inputRef.current.value === "/end") {
      sessionStorage.removeItem("logMsg");
      localStorage.removeItem("chatId");
      socket.emit("leftRoom", { room: room, chatId: chatId });
      return closeChatBot();
    }

    // send msg to server
    const dataToSent = {
      chatId: chatId,
      messages: inputRef.current.value,
      roomId: room,
      role: "customer",
    };
    socket.emit("chatMsg", dataToSent);

    // clear input value after sent
    inputRef.current.value = "";
  }

  useEffect(() => {
    // socket init
    const socketInit = io(serverUrl, {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setSocket(socketInit);

    return () => socketInit.close();
  }, []);

  useEffect(() => {
    const msg = sessionStorage.getItem("logMsg");
    const msgParse = JSON.parse(msg);
    if (msgParse) setMessages(msgParse);
  }, []);

  useEffect(() => {
    if (!socket) return;
    // update msg array when user sent
    socket.on("newMsg", (data) => {
      setMessages((messages) => [...messages, data]);
    });
  }, [socket]);

  useEffect(() => {
    if (!socket) return;
    setChatRoom();
    // join room chat by chatId
    socket.emit("joinRoom", { chatId: chatId });
  }, [socket, room]);

  useEffect(() => {
    // save chat log to session
    messages?.length > 0 &&
      sessionStorage.setItem("logMsg", JSON.stringify(messages));

    // // set view at the last message
    // msgContainer.current.scrollTop = msgContainer.current.scrollHeight;
  }, [messages]);

  return (
    <div className={styles.modal}>
      <div className={styles.title}>
        <h5>Customer Support</h5>
        <span>Let's Chat App</span>
      </div>
      <ChatMessage messages={messages} />
      <ChatEnter
        submitHandler={submitHandler}
        inputRef={inputRef}
        socket={socket}
      />
    </div>
  );
}

export default LiveChat;

// CHAT CONTENT UI
function ChatMessage({ messages }) {
  const chatMsgRef = useRef();
  const chatMsg = messages?.map((el, i) => (
    <div
      className={el.role === "customer" ? styles.userChat : styles.botChat}
      key={i}
    >
      {el.role === "customer" ? (
        <span>You: {el.messages}</span>
      ) : (
        <span>Admin: {el.messages}</span>
      )}
    </div>
  ));

  useEffect(() => {
    // Scroll to bottom when messages change
    chatMsgRef.current.scrollTop = chatMsgRef.current.scrollHeight;
  }, [messages]);

  return (
    <div className={styles.content} ref={chatMsgRef}>
      {chatMsg}
    </div>
  );
}

// CHAT ENTER UI
function ChatEnter({ submitHandler, inputRef, socket }) {
  const isClose = socket ? false : true;

  return (
    <form className={styles.chatEnter} onSubmit={submitHandler}>
      <div className={styles.icon}>
        <FcAssistant />
      </div>
      <input
        type="text"
        placeholder="Enter Messages!"
        ref={inputRef}
        disabled={isClose}
      />
      <div className={styles.icon}>
        <AiOutlinePaperClip />
      </div>
      <div className={styles.icon}>
        <MdInsertEmoticon />
      </div>
      <button className={styles.icon} type="submit">
        <FcSportsMode />
      </button>
    </form>
  );
}
