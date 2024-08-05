import React, { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
  color: white;
`;

const Title = styled.h2`
  padding: 0px 30px;
  margin-bottom: 20px;
  border-bottom: 1px solid gray;
`;

const Input = styled.textarea`
  width: 70%;
  height: 200px;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-bottom: 20px;
  background-color: #333; /* 어두운 배경에 맞는 색상 */
  color: white; /* 텍스트 색상 */
`;

const TitleInput = styled.input`
  width: 70%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-bottom: 20px;
  background-color: #333; /* 어두운 배경에 맞는 색상 */
  color: white; /* 텍스트 색상 */
`;

const Button = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  color: white;
  background-color: #007bff; /* 버튼 색상 */
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #0056b3; /* 버튼 호버 색상 */
  }
`;

const InquiryContent = () => {
  const [inquiry, setInquiry] = useState({ title: "", content: "" });

  const handleSubmit = async () => {
    if (window.confirm("제출하시겠습니까? (취소할 수 없습니다)")) {
      try {
        const response = await fetch(
          "https://your-server-endpoint/api/inquiry",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(inquiry),
          }
        );

        if (response.ok) {
          alert("제출이 완료되었습니다.");
          setInquiry({ title: "", content: "" }); // 입력 필드 초기화
        } else {
          alert("제출 중 오류가 발생했습니다. 다시 시도해 주세요.");
        }
      } catch (error) {
        alert("제출 중 오류가 발생했습니다. 다시 시도해 주세요.");
      }
    }
  };

  return (
    <Container>
      <Title>겪고 계신 문제를 알려주세요.</Title>
      <TitleInput
        placeholder="제목을 입력해 주세요."
        value={inquiry.title}
        onChange={(e) => setInquiry({ ...inquiry, title: e.target.value })}
      />
      <Input
        placeholder="문제를 상세하게 설명해주시기 바랍니다."
        value={inquiry.content}
        onChange={(e) => setInquiry({ ...inquiry, content: e.target.value })}
      />
      <Button onClick={handleSubmit}>제출</Button>
    </Container>
  );
};

export default InquiryContent;
