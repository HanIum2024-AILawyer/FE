import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { loginWithKakao } from "../../auth/kakaoAuth";

const KakaoCallbackPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleKakaoCallback = async () => {
      try {
        const userInfo = await loginWithKakao();
        console.log("카카오 로그인 성공:", userInfo);

        // 로그인 성공 후 처리 (예: JWT 저장, 사용자 정보 로컬 저장 등)
        localStorage.setItem("kakaoUserId", userInfo.id);
        localStorage.setItem("kakaoUserEmail", userInfo.email);

        // 로그인 후 메인 페이지로 리디렉트
        navigate("/");
      } catch (error) {
        console.error("카카오 로그인 처리 중 오류 발생:", error);
        // 오류 처리 (예: 오류 페이지로 리디렉트)
      }
    };

    handleKakaoCallback();
  }, [navigate]);

  return <div>카카오 로그인 처리 중...</div>;
};

export default KakaoCallbackPage;
