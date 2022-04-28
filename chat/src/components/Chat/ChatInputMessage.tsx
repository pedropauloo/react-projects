import { ChatInput, ContainerInput, Label } from "./styles";
export const ChatInputMessage = (props: any) => {
  const { label, innerRef, ...input } = props;
  
  return (
    <ContainerInput>
      <Label>{label}</Label>
      <ChatInput {...input} ref={innerRef} />
    </ContainerInput>
  );
};
