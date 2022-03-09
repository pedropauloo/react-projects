import moment from "moment";
import { ChatInputMessage } from "./ChatInputMessage";
import { ChatMessageBox } from "./ChatMessageBox";
import {
  ChatContainer,
  ChatHeader,
  ChatTitle,
  ChatContent,
  ChatFooter,
  ChatButton,
} from "./styles";

export const Chat = () => {
  return (
    <ChatContainer>
      <ChatHeader>
        <ChatTitle>CHAT</ChatTitle>
      </ChatHeader>
      <ChatContent>
        <ChatMessageBox
          author="own"
          date={moment().format("DD/MM/YYYY H:m")}
          message="messagem"
        />
        <ChatMessageBox
          author="other"
          date={moment().format("DD/MM/YYYY H:m")}
          message="messagem"
        />
        <ChatMessageBox
          author="own"
          date={moment().format("DD/MM/YYYY H:m")}
          message="messagem"
        />
        <ChatMessageBox
          author="other"
          date={moment().format("DD/MM/YYYY H:m")}
          message="messagem"
        />
      </ChatContent>
      <ChatFooter>
        <ChatInputMessage label="Message" />
        <ChatButton>Send</ChatButton>
      </ChatFooter>
    </ChatContainer>
  );
};
