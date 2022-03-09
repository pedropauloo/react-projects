import { ChatMessageBox as BoxMessage, Message } from "./styles";
interface MessageBox {
  author: string;
  date: Date;
  message: string;
}
export const ChatMessageBox = ({ author, date, message }: MessageBox) => {
  return (
    <BoxMessage author={author}>
      <Message>{message}</Message>
    </BoxMessage>
  );
};
