import {
  ChatMessageBox as BoxMessage,
  Message,
  MessageAuthor,
  MessageDate,
} from "./styles";
interface MessageBox {
  currentAuthor: boolean;
  author: string;
  message: string;
  date: string;
}
export const ChatMessageBox = ({
  currentAuthor,
  author,
  date,
  message,
}: MessageBox) => {
  return (
    <BoxMessage currentAuthor={currentAuthor}>
      <MessageAuthor>{author}</MessageAuthor>
      <Message>{message}</Message>
      <MessageDate>{date}</MessageDate>
    </BoxMessage>
  );
};
