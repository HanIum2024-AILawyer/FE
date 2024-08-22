import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  height: 100vh;
  padding-top: 60px;
  box-sizing: border-box;
  background-color: #ffffff;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #003fe0;
  color: white;
  width: 100%;
  padding: 0.5vh 0;
  position: fixed;
  top: 0;
`;

const BackButton = styled(Link)`
  position: absolute;
  left: 5vw;
  top: 1.8vh;
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  text-decoration: none;
  img {
    width: 1.3vh;
    height: auto;
  }
`;

const HeaderText = styled.h1`
  margin: 1vh 0;
  font-size: 3.5vh;
  text-align: center;

  @media (max-width: 1023px) {
    font-size: 2vh;
  }
`;

const Notice = styled.p`
  text-align: center;
  position: relative;
  left: -21%;
  top: 5%;
  margin-bottom: 3vh;
  font-size: 0.9rem;
  color: #003fe0;
  font-weight: 900;
`;

const Subtitle = styled.p`
  font-size: 0.9rem;
  color: #333;
  text-align: left;
  width: 90%;
  margin: 5vh 0 0.5vh; /* 상단 마진을 줄임 */
`;

const EmailInputContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 400px;
  position: relative;
  left: 3.5vw;
  margin-top: 0.5vh;

  Button {
    width: 28%;
    position: absolute;
    right: 5vw;
  }
`;

const InputLabel = styled.span`
  font-size: 1rem;
  color: #333;
  margin-left: 1vw;
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 0.8rem;
  width: 30%;
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: #cfcfcf;
  color: #000;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  min-width: 100px;
  font-weight: bold;
  font-size: 0.8rem;
`;

const CodeInputContainer = styled.div`
  display: flex;
  align-items: center;
  width: 90%;
  margin-top: 0.5vh; /* 상단 마진을 줄임 */
`;

const VerificationCodeInput = styled.input`
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 1rem;
  flex: 1;
  margin-right: 10px;
`;

const PWInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 243%;
  margin-top: 1vh;
  margin-left: -10vw;

  input {
    border: 1px solid #ddd;
    border-radius: 5px;
    font-size: 0.8rem;
    width: 35%;
    margin-bottom: 1vh;
    margin-left: 10vw;
  }
`;

const Footer = styled.div`
  width: 100%;
  text-align: center;
  margin-top: 4vh;
`;

const CompleteButton = styled(Link)`
  border: none;
  font-size: 2.7vh;
  width: 100%;
  background-color: ${(props) => (props.enabled ? "#3f51b5" : "#d3d3d3")};
  color: white;
  text-decoration: none;
  text-align: center;
  position: fixed;
  bottom: 0;
  display: block;
  padding: 2vh 0;

  @media (max-width: 1023px) {
    font-size: 2.5vh;
    padding: 2vh 0;
  }

  @media (max-width: 767px) {
    font-size: 2vh;
    padding: 1.8vh 0;
  }
`;

const FindPw = () => {
  const [verificationCode, setVerificationCode] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const [isButtonClicked, setIsButtonClicked] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPasswordFields, setShowPasswordFields] = useState(false);

  const correctCode = "123456"; // 예시로 올바른 코드 설정

  const handleCodeChange = (e) => {
    setVerificationCode(e.target.value);
    if (e.target.value === correctCode) {
      setIsVerified(true);
    } else {
      setIsVerified(false);
    }
  };

  const handleButtonClick = () => {
    if (isVerified) {
      setIsButtonClicked(true);
      setShowPasswordFields(true);
    }
  };

  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const isPasswordMatch =
    newPassword && confirmPassword && newPassword === confirmPassword;

  return (
    <Container>
      <Header>
        <BackButton to="/">
          <img src="./images/Back_icon.png" alt="back" />
        </BackButton>
        <HeaderText>비밀번호 찾기</HeaderText>
      </Header>

      <Notice>귀하의 이메일을 입력해주세요.</Notice>

      <Subtitle>수원대 전자메일 주소</Subtitle>
      <EmailInputContainer>
        <Input type="email" placeholder="Example : xxxxxx" />
        <InputLabel>@ suwon.ac.kr</InputLabel>
        <Button>메일 인증</Button>
      </EmailInputContainer>

      <Subtitle>학교 이메일로 발송된 인증번호를 입력해주세요.</Subtitle>
      <CodeInputContainer>
        <VerificationCodeInput
          type="text"
          placeholder="인증코드 입력(임시코드=123456)"
          value={verificationCode}
          onChange={handleCodeChange}
        />
        <Button onClick={handleButtonClick}>확인</Button>
      </CodeInputContainer>

      {showPasswordFields && (
        <>
          <Subtitle>새로운 비밀번호를 입력해주세요.</Subtitle>
          <PWInputContainer>
            <Input
              type="password"
              placeholder="새로운 비밀번호 입력"
              value={newPassword}
              onChange={handleNewPasswordChange}
            />
            <Input
              type="password"
              placeholder="비밀번호 확인"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
            />
          </PWInputContainer>
        </>
      )}

      <Footer>
        <CompleteButton
          to={isVerified && isButtonClicked && isPasswordMatch ? "/" : "#"}
          enabled={isVerified && isButtonClicked && isPasswordMatch}
        >
          변경완료
        </CompleteButton>
      </Footer>
    </Container>
  );
};

export default FindPw;
