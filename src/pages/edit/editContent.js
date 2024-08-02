import React, { useState, useRef } from "react";
import styled from "styled-components";
import { AiOutlineCloudUpload } from "react-icons/ai";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80vh;
  background-color: white;
`;

const UploadContainer = styled.div`
  width: 60%;
  height: 50%;
  border: 2px dashed #000;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const ChatContainer = styled.div`
  width: 60%;
  height: 70%;
  border: 2px solid #000;
  display: flex;
  flex-direction: column;
  padding: 20px;
  overflow-y: auto; /* 스크롤 기능 추가 */
`;

const Message = styled.div`
  display: flex;
  align-items: center;
  margin: 10px 0;
  justify-content: ${(props) => (props.isUser ? "flex-end" : "flex-start")};
`;

const Avatar = styled.div`
  width: 40px;
  height: 40px;
  background-color: gray;
  border-radius: 50%;
  margin-right: 10px;
`;

const Text = styled.div`
  padding: 10px;
  background-color: ${(props) => (props.isUser ? "#007bff" : "#f1f1f1")};
  border-radius: 5px;
  color: ${(props) => (props.isUser ? "white" : "black")};
  max-width: 60%;
`;

const Input = styled.input`
  display: none;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Button = styled.button`
  margin-top: 10px;
  padding: 10px 20px;
  border: none;
  background-color: #007bff;
  color: #fff;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const EditContent = () => {
  const [messages, setMessages] = useState([]);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileUpload = async (e) => {
    if (e.target.files.length > 0) {
      const file = e.target.files[0];
      const fileName = file.name;

      const newMessages = [
        ...messages,
        { isUser: true, text: fileName },
        { isUser: false, text: "첨삭중입니다..." },
      ];

      
      setMessages(newMessages);
      setUploading(true);

      const formData = new FormData();
      formData.append("file", file);

      try {
        const response = await fetch("http://localhost:11434/api/upload", {
          method: "POST",
          body: formData,
        });

        const data = await response.json();
        const processedFileUrl = data.fileUrl; // Assume the response contains a URL to the processed file

        const updatedMessages = [
          ...newMessages.slice(0, -1),
          {
            isUser: false,
            text: `첨삭이 완료되었습니다. 꼭 파일 내용을 확인하시기 바랍니다. (${fileName})`,
          },
          {
            isUser: false,
            text: (
              <a href={processedFileUrl} download>
                다운로드
              </a>
            ),
          },
        ];
        setMessages(updatedMessages);
      } catch (error) {
        console.error("Error uploading file:", error);
        setMessages((prevMessages) => [
          ...prevMessages,
          { isUser: false, text: "파일 업로드 오류." },
        ]);
      } finally {
        setUploading(false);
      }
    }
  };

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <Container>
      {messages.length === 0 ? (
        <UploadContainer>
          <label htmlFor="file-upload">
            <AiOutlineCloudUpload
              style={{ color: "black", width: "70%", height: "70%" }}
            />
            <p style={{ color: "black" }}>파일 선택 또는 드래그 하세요</p>
          </label>
          <Input
            id="file-upload"
            type="file"
            onChange={handleFileUpload}
            ref={fileInputRef}
          />
        </UploadContainer>
      ) : (
        <ChatContainer>
          {messages.map((message, index) => (
            <Message key={index} isUser={message.isUser}>
              {!message.isUser && <Avatar />}
              <Text isUser={message.isUser}>{message.text}</Text>
            </Message>
          ))}
          {!uploading && (
            <ButtonContainer>
              <Button onClick={handleButtonClick}>추가로 업로드 하기</Button>
              <Input
                id="file-upload"
                type="file"
                onChange={handleFileUpload}
                ref={fileInputRef}
              />
            </ButtonContainer>
          )}
        </ChatContainer>
      )}
    </Container>
  );
};

export default EditContent;
