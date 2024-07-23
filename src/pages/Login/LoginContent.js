import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const WhiteBox = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 35%;
  height: 50%;
  background-color: #fff;
  color: #000;
  padding: 10px;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 30px;
  transform: translateY(80%);
`;

const LoginButton = styled.div`
  width: 70%;
  height: 50px;
  display: flex;
  align-items: center;
  border-radius: 5px;
  font-weight: bold;
  margin-bottom: 0px;
  cursor: pointer;

  &.kakao {
    background-color: #fee500;
    color: black;
  }

  &.naver {
    background-color: #1ec800;
    color: white;
  }

  &.google {
    background-color: white;
    border: 0.5px solid black;
    color: black;

    span {
      margin-left: 85px;
    }
  }

  img {
    height: 40px;
    width: auto;
    transform: translateX(20%);
  }

  span {
    margin-left: 80px;
  }
`;

const AdminLoginText = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
  width: 100%;
  height: auto;
  position: absolute;
  left: 50%;
  top: 76%;
  transform: translate(-50%, 0);
  font-size: 18px;
  cursor: pointer;
  color: white;
`;

const LoginPageContent = () => {
  const navigate = useNavigate();

  const handleOAuthLogin = (provider) => {
    window.location.href = `http://localhost:8080/auth/${provider}`;
  };

  const handleAdminLogin = () => {
    navigate("/admin");
  };

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const token = queryParams.get("token");
    if (token) {
      localStorage.setItem("jwt", token);
      // 안전페이지로 리디렉트함
    }
  }, []);

  return (
    <>
      <WhiteBox>
        <h1 style={{ position: "absolute", left: "50px" }}>
          로그인 및 회원가입
        </h1>
        <h3 style={{ position: "absolute", left: "50px", top: "70px" }}>
          소셜 로그인으로 이용하실 수 있습니다
        </h3>
        <Container>
          <LoginButton
            className="kakao"
            onClick={() => handleOAuthLogin("kakao")}
          >
            <img src="/assets/loginImage/Kakao_icon.png" alt="Kakao" />
            <span>카카오 계정으로 가입 / 로그인</span>
          </LoginButton>
          <LoginButton
            className="naver"
            onClick={() => handleOAuthLogin("naver")}
          >
            <img src="/assets/loginImage/Naver_icon.png" alt="Naver" />
            <span>네이버 계정으로 가입 / 로그인</span>
          </LoginButton>
          <LoginButton
            className="google"
            onClick={() => handleOAuthLogin("google")}
          >
            <img src="/assets/loginImage/Google_icon.png" alt="Google" />
            <span>구글 계정으로 가입 / 로그인</span>
          </LoginButton>
        </Container>
      </WhiteBox>
      <AdminLoginText onClick={handleAdminLogin}>
        관리자로 로그인
      </AdminLoginText>
    </>
  );
};

export default LoginPageContent;
