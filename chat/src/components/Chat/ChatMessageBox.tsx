import { MomentInput } from "moment";
import { ChatMessageBox as BoxMessage, Message, MessageDate } from "./styles";
interface MessageBox {
  author: string;
  message: string;
  date: string;
}
export const ChatMessageBox = ({ author, date, message }: MessageBox) => {
  return (
    <BoxMessage author={author}>
      <Message>{message}</Message>
      <MessageDate>{date}</MessageDate>
    </BoxMessage>
  );
};
