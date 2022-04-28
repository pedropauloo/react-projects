import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import { ChatInputMessage } from "./ChatInputMessage";
import { ChatMessageBox } from "./ChatMessageBox";
import axios from "axios";
import {
  ChatContainer,
  ChatHeader,
  ChatTitle,
  ChatContent,
  ChatFooter,
  ChatButton,
} from "./styles";

const socket = io("http://10.1.5.252:3333", { transports: ["websocket"] });

interface ConnectionInterface {
  id: string;
  room: string;
  username: string;
}

socket.on("connect", () => console.log("Chat running on port 3333"));

export const Chat = () => {
  const [messages, setMessages] = useState<any>([]);
  const [connection, setConnection] = useState<ConnectionInterface | null>(
    null
  );

  useEffect(() => {
    const res = axios
      .get("https://geolocation-db.com/json/")
      .then((response) => {
        const IPv4 = response.data.IPv4;

        setConnection({
          id: IPv4 ?? Math.random().toString(),
          room: "sala1",
          username: "anonymous",
        });
      });
  }, []);

  useEffect(() => {
    if (connection === null) return;

    socket.emit("chat.join", connection, (response: any) => {
      setMessages(response);
    });
  }, [connection]);

  useEffect(() => {
    const handleNewMessage = (newMessage: any) =>
      setMessages([...messages, newMessage]);

    socket.on("chat.message", (data) => handleNewMessage(data));
  }, [messages]);

  const handleSendMessage = () => {
    if (inputRef.current) {
      const message = inputRef.current.value.trim();

      const newMessage = {
        id: connection?.id,
        room: connection?.room,
        message: message,
        username: connection?.username,
      };

      socket.emit("chat.message", newMessage);
      inputRef.current.value = "";
    }
  };

  const handleKeyPress = (event: any) => {
    if (event.key === "Enter") {
      handleSendMessage();
    }
  };

  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <ChatContainer onKeyPress={handleKeyPress}>
      <ChatHeader>
        <ChatTitle>CHAT</ChatTitle>
        <label htmlFor="username">Username</label>
        <input type="text" id="username" />
        <button>Enter</button>
      </ChatHeader>
      <ChatContent>
        {messages.map((message: any, index: number) => {
          return (
            <ChatMessageBox
              key={index}
              author={message.username}
              currentAuthor={message.id === connection?.id}
              date={message.createdAt}
              message={message.text}
            />
          );
        })}
      </ChatContent>
      <ChatFooter>
        <ChatInputMessage innerRef={inputRef} label="Message" />
        <ChatButton onClick={handleSendMessage}>Send</ChatButton>
      </ChatFooter>
    </ChatContainer>
  );
};
