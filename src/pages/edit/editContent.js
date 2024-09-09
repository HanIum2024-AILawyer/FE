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
      const fileExtension = fileName.split(".").pop().toLowerCase();

      // 파일 형식 확인
      if (!["doc", "docx"].includes(fileExtension)) {
        setMessages((prevMessages) => [
          ...prevMessages,
          { isUser: true, text: fileName },
          {
            isUser: false,
            text: "잘못된 파일 형식입니다. Word 파일(.doc, .docx)만 업로드 가능합니다.",
          },
        ]);
        return;
      }

      const newMessages = [
        ...messages,
        { isUser: true, text: fileName },
        { isUser: false, text: "소송장을 업로드 중입니다..." },
      ];

      setMessages(newMessages);
      setUploading(true);

      // 서버에 연결된 것처럼 가정하고, 직접 응답을 시뮬레이션
      setTimeout(() => {
        const processedFileName = `processed_${fileName}`; // 서버에서 처리된 파일 이름
        const fileUrl = `http://localhost:8080/download/${processedFileName}`; // 다운로드 URL (가정)

        const updatedMessages = [
          ...newMessages.slice(0, -1),
          {
            isUser: false,
            text: "첨삭이 완료되었습니다. 다운로드 하여 내용을 꼭 확인하세요!",
          },
          {
            isUser: false,
            text: (
              <a href={fileUrl} download>
                첨삭된 {processedFileName}
              </a>
            ),
          },
        ];
        setMessages(updatedMessages);
        setUploading(false);
      }, 2000); // 2초 후에 응답 시뮬레이션
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
