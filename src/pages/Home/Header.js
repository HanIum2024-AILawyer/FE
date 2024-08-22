import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 15px 0px 20px; /* 위와 아래는 10px, 좌우는 20px */
  background-color: #fff;
  width: 100vw;
  box-sizing: border-box; /* 패딩을 포함한 전체 너비 계산 */
`;

const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
`;

const HeaderLogo = styled.img`
  width: 75px;
  height: auto;
`;

const HeaderText = styled.div`
  font-size: 2rem;
  color: blue;
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
`;

const IconsContainer = styled.div`
  display: flex;
  align-items: center;
  margin-right: 10px;
`;

const Icon = styled.img`
  width: 20px;
  height: auto;
  margin-left: 7px;
  margin-right: 8px;
`;

function Header() {
  const navigate = useNavigate();

  const handleNotificationClick = () => {
    navigate("/notification");
  };

  return (
    <HeaderContainer>
      <HeaderLeft>
        <HeaderLogo src="/images/sucat_logo.png" alt="SUCAT 로고" />
        <HeaderText>Sucat</HeaderText>
      </HeaderLeft>
      <IconsContainer>
        <Icon src="/images/search_icon.png" alt="검색" />
        <Icon
          src="/images/notification_icon.png"
          alt="알림"
          onClick={handleNotificationClick}
        />
        <Icon src="/images/chat.png" alt="채팅" />
      </IconsContainer>
    </HeaderContainer>
  );
}

export default Header;
