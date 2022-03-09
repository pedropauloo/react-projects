import styled from "styled-components";

export const ChatContainer = styled.div`
  font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
    "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
  display: flex;
  flex-direction: column;
  background: #ccc;
  height: 100vh;
  width: 100vw;
`;
export const ChatHeader = styled.div`
  background: #fff;
  box-shadow: 0 0 1px rgb(0 0 0 / 13%), 0 1px 3px rgb(0 0 0 / 20%);
`;
export const ChatContent = styled.div`
  background: #ccc;
  height: 100%;
  overflow: auto;
`;
export const ChatFooter = styled.div`
  display: flex;
  align-items: center;
  background: #fff;
  height: 50px;
  box-shadow: 0 0 1px rgb(0 0 0 / 13%), 0 1px 3px rgb(0 0 0 / 20%);
`;
export const ChatTitle = styled.h1`
  margin: 10px 0 0 10px;
  font-size: 24px;
  color: #ccc;
  font-weight: 700;
  letter-spacing: 5px;
`;

export const ContainerInput = styled.div`
  position: relative;
  margin: 10px 0;
  padding: 0 10px;
  width: 100%;
`;

export const Label = styled.label`
  top: 0;
  color: #aaa;
  line-height: 2px;
  left: 16px;
  background: #fff;
  position: absolute;
  font-size: 14px;
  padding: 0 5px;
`;

export const ChatInput = styled.input`
  border: 1px solid #aaa;
  color: #587169;
  border-radius: 6px;
  background: #fff;
  padding: 6px;
  width: 100%;
  font-weight: 500;
  &:focus,
  &:focus-visible {
    outline: none;
    border-color: #ccc;
  }
`;

export const ChatButton = styled.button`
  border-radius: 6px;
  height: 29px;
  padding: 5px;
  border: none;
  background: #aaa;
  color: #fff;
  margin-right: 6px;
`;

export const Message = styled.span`
  color: #fff;
  font-size: 14px;
`;

export const MessageDate = styled.span`
  display: block;
  font-size: 10px;
`;

export const ChatMessageBox = styled.div<{ author: string }>`
  border-radius: 6px;
  background: ${({ author }) => (author === "own" ? "#505050" : "#98989f")};
  margin: ${({ author }) =>
    author === "own" ? "5px 0 5px auto" : "5px auto 5px 0"};
  padding: 5px;
  max-width: 250px;
  color: #fff;

  & > ${MessageDate} {
    text-align: ${({ author }) => (author === "own" ? "right" : "left")};
  }
`;
