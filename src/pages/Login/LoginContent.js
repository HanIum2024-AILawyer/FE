import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";

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
    if (provider === "kakao" || provider === "google" || provider === "naver") {
      window.location.href = `http://54.180.142.197:8080/oauth2/authorization/${provider}`;
    } else {
      alert("지원되지 않는 로그인 공급자입니다.");
    }
  };

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const token = queryParams.get("token");

    if (token) {
      localStorage.setItem("jwt", token);
      navigate("/secure-page");
    } else {
      // 만약 토큰이 만료되어 있으면 새 토큰을 발급받는다.
      const refreshToken = localStorage.getItem("refreshToken");
      if (refreshToken) {
        axios
          .get("http://localhost:8080/reissue/access-token", {
            headers: {
              "Authorization-refresh": `Bearer ${refreshToken}`,
            },
          })
          .then((response) => {
            if (response.data.is_success) {
              localStorage.setItem("jwt", response.data.payload.access_token);
              navigate("/secure-page");
            } else {
              console.error("토큰 재발급 실패", response.data.message);
              // 실패 시 로그인 페이지로 다시 리디렉션하거나 적절한 처리를 한다.
              navigate("/login");
            }
          })
          .catch((error) => {
            console.error("토큰 재발급 요청 중 오류 발생", error);
            navigate("/login");
          });
      }
    }
  }, [navigate]);

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
          {["kakao", "naver", "google"].map((provider) => (
            <LoginButton
              key={provider}
              className={provider}
              onClick={() => handleOAuthLogin(provider)}
            >
              <img
                src={`/assets/loginImage/${
                  provider.charAt(0).toUpperCase() + provider.slice(1)
                }_icon.png`}
                alt={provider}
              />
              <span>
                {provider.charAt(0).toUpperCase() + provider.slice(1)} 계정으로
                가입 / 로그인
              </span>
            </LoginButton>
          ))}
        </Container>
      </WhiteBox>
      <AdminLoginText onClick={() => navigate("/admin")}>
        관리자로 로그인
      </AdminLoginText>
    </>
  );
};

export default LoginPageContent;
