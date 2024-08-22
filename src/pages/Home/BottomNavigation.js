import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const BottomNavContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 10px 0;
  background-color: #fff;
  border-top: 3px solid #ddd;
  position: fixed;
  bottom: 0;
  width: 100%;
`;

const NavButton = styled.button`
  background: none;
  border: none;
  font-size: 14px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const NavIcon = styled.img`
  width: ${({ size }) => size || "25px"};
  height: auto;
`;

const NavText = styled.div`
  font-size: ${({ size }) => size || "12px"};
`;

function BottomNavigation() {
  const navigate = useNavigate();

  const goMypage = () => {
    navigate("/Mypage");
  };

  return (
    <BottomNavContainer>
      <NavButton>
        <NavIcon src="/images/home_icon.png" alt="홈" />
        <NavText>홈</NavText>
      </NavButton>
      <NavButton>
        <NavIcon src="/images/study_icon.png" alt="학사관리" size="31px" />
        <NavText>학사관리</NavText>
      </NavButton>
      <NavButton>
        <NavIcon src="/images/game_icon.png" alt="게임" size="70px" />
        <NavText size="18px">게임</NavText>
      </NavButton>
      <NavButton>
        <NavIcon
          src="/images/announcement_icon.png"
          alt="공지사항"
          size="40px"
        />
        <NavText>채팅</NavText>
      </NavButton>
      <NavButton onClick={goMypage}>
        <NavIcon src="/images/mypage_icon.png" alt="마이페이지" size="24.5px" />
        <NavText>마이페이지</NavText>
      </NavButton>
    </BottomNavContainer>
  );
}

export default BottomNavigation;
