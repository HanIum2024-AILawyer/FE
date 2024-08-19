import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
`;

const FormContainer = styled.div`
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  text-align: center;
  width: 50vh;
  height: 40vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 24px;
  color: black;
  margin: 0;
  transform: translateY(-100%);
`;

const Subtitle = styled.p`
  font-size: 16px;
  margin: 10px 0 20px 0;
  color: red;
  transform: translateY(-100%);
`;

const Input = styled.input`
  width: 60%;
  padding: 10px;
  border: 3px solid gray;
  border-radius: 4px;
  font-size: 16px;
  transform: translateY(20%);
`;

const Button = styled.button`
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const AdminPage = () => {
  const [adminCode, setAdminCode] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setAdminCode(e.target.value);
  };

  const handleLogin = async () => {
    const testCode = "123"; // 테스트용 코드
    if (adminCode === testCode) {
      navigate("/adminmenu");
      return;
    }

    try {
      const response = await axios.post("http://example.com/api/admin-login", {
        code: adminCode,
      });
      if (response.data.success) {
        navigate("/adminmenu");
      } else {
        alert("너 누구냐? NAGA");
      }
    } catch (error) {
      navigate("/adminmenu");
      console.error("서버와의 통신에 실패했습니다.", error);
      alert("서버와의 통신에 실패했습니다.");
    }
  };

  return (
    <MainContainer>
      <FormContainer>
        <Title>관리자 코드를 입력하세요</Title>
        <Subtitle>관리자 인원 이외의 접근을 금지합니다</Subtitle>
        <Input
          type="password"
          placeholder="관리자 코드 입력"
          value={adminCode}
          onChange={handleInputChange}
        />
        <Button onClick={handleLogin}>로그인</Button>
      </FormContainer>
    </MainContainer>
  );
};

export default AdminPage;
