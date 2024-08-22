// WritePage.js
import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  max-width: 100%;
  margin: 0 auto;
  height: 100vh;
  background-color: white;
  padding: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  font-family: "Arial, sans-serif";
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const BackButton = styled.button`
  background: none;
  border: none;
  font-size: 18px;
  cursor: pointer;
`;

const PostButton = styled.button`
  background-color: #007bff;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  font-size: 14px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

const InputGroup = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  position: relative;
`;

const Input = styled.input`
  padding: 10px;
  margin-right: 5px;
  border: none;
  border-bottom: 1px solid #ccc;
  flex-grow: 1;
`;

const IconButton = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  padding: 5px 10px;
`;

const HiddenFileInput = styled.input`
  display: none;
`;

const TextArea = styled.textarea`
  padding: 10px;
  border: none;
  margin-bottom: 10px;
  resize: none;
  flex-grow: 1;
  height: 200px; /* 적절한 높이 설정 */
`;

const CarouselContainer = styled.div`
  margin-top: auto; /* 화면 하단으로 밀어내기 위해 사용 */
  background-color: #f8f8f8;
  padding: 10px;
  border-radius: 10px;
`;

const Carousel = styled.div`
  display: flex;
  overflow-x: scroll;
  gap: 10px;
`;

const ImagePreview = styled.img`
  height: 100px;
  width: auto;
  border-radius: 10px;
`;

const WritePage = () => {
  const fileInputRef = useRef(null);
  const [selectedImages, setSelectedImages] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  const handleIconClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    const imageUrls = files.map((file) => URL.createObjectURL(file));
    setSelectedImages((prevImages) =>
      [...prevImages, ...imageUrls].slice(0, 6)
    );
  };

  const handlePostClick = async () => {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);

    const fileInputs = fileInputRef.current.files;
    for (let i = 0; i < fileInputs.length; i++) {
      formData.append("images", fileInputs[i]);
    }

    try {
      const response = await fetch("https://your-server-endpoint.com/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();
      console.log(result);
      alert("성공적으로 업로드 되었습니다");
      navigate(-1);
    } catch (error) {
      console.error("Error uploading data:", error);
    }
  };

  const goback = () => {
    navigate(-1);
  };

  return (
    <Container>
      <Header>
        <BackButton onClick={goback}>◀︎ 글 쓰기</BackButton>
        <PostButton type="button" onClick={handlePostClick}>
          게시하기
        </PostButton>
      </Header>
      <Form>
        <InputGroup>
          <Input
            type="text"
            placeholder="제목을 입력해주세요"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <IconButton type="button" onClick={handleIconClick}>
            +📷
          </IconButton>
          <HiddenFileInput
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*"
            multiple
          />
        </InputGroup>
        <TextArea
          rows="5"
          placeholder="여기에 글을 써주세요"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></TextArea>
      </Form>
      <CarouselContainer>
        <Carousel>
          {selectedImages.map((image, index) => (
            <ImagePreview
              key={index}
              src={image}
              alt={`Selected ${index + 1}`}
            />
          ))}
        </Carousel>
      </CarouselContainer>
    </Container>
  );
};

export default WritePage;
