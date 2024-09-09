import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import { IoMdPerson } from "react-icons/io";
import axios from "axios";

const TopBar = styled.div`
  display: flex;
  justify-content: flex-start;
  background-color: #111;
  padding: 15px 30px;
  color: #fff;
  font-size: 13px;
  border-bottom: 1px solid #fff;

  a {
    color: #fff;
    text-decoration: none;
    margin-right: 30px;

    &:hover,
    &:visited {
      color: #fff;
      text-decoration: none;
    }
  }
`;

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background-color: transparent;
  color: #fff;
`;

const Logo = styled.div`
  font-family: "", cursive;
  font-size: 36px;
  display: flex;
  align-items: center;

  img {
    height: 50px;
    margin-right: 10px;
  }
`;

const Nav = styled.nav`
  ul {
    display: flex;
    list-style: none;
    gap: 100px;
    margin-left: 300px;
  }

  li {
    cursor: pointer;
    white-space: nowrap;
  }

  a {
    color: #fff;
    text-decoration: none;
    font-size: 18px;

    &:hover,
    &:visited {
      color: #fff;
      text-decoration: none;
    }
  }
`;

const Icons = styled.div`
  display: flex;
  align-items: center;
  gap: 30px;
  margin-right: 100px;

  svg {
    cursor: pointer;
  }
`;

const DropdownBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 120px;
  right: 95px;
  background-color: #09132d;
  color: white;
  padding: 10px;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  z-index: 1000;

  a {
    color: #fff;
    text-decoration: none;
    margin: 5px 0;

    &:hover,
    &:visited {
      color: #fff;
      text-decoration: none;
    }
  }
`;

const MenuDropdownBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 120px;
  right: 135px;
  background-color: #09132d;
  color: white;
  padding: 10px;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  z-index: 1000;

  a {
    color: #fff;
    text-decoration: none;
    margin: 5px 0;

    &:hover,
    &:visited {
      color: #fff;
      text-decoration: none;
    }
  }
`;

const DropMenuStyle = styled.div`
  position: absolute;
  top: 143px;
  left: 0;
  width: 100%;
  background-color: #09132d;
  padding: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  z-index: 999;
`;

const DropMenuContainer = styled.div`
  position: relative;
  display: grid;
  grid-template-rows: repeat(3, 40px);
  grid-template-columns: repeat(3, 170px);
  white-space: nowrap;
  left: 50%;
`;

const DropMenuList = styled.div`
  padding: 10px;
  background-color: #09132d;
  color: white;

  a {
    color: #fff;
    text-decoration: none;

    &:hover,
    &:visited {
      color: #fff;
      text-decoration: none;
    }
  }
`;

const Header = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const dropdownRef = useRef(null);
  const menuDropdownRef = useRef(null);
  const dropMenuRef = useRef(null);
  const headerContainerRef = useRef(null);

  useEffect(() => {
    // 로그인 상태 확인 (예시로 localStorage를 사용)
    const token = localStorage.getItem("authToken");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const toggleDropdown = (dropdownType) => {
    if (!isLoggedIn) {
      alert("로그인 하신 다음 이용해주세요");
      navigate("/login"); // 로그인 페이지로 이동
    } else {
      setActiveDropdown((prev) =>
        prev === dropdownType ? null : dropdownType
      );
    }
  };

  const handleMouseEnter = () => {
    setActiveDropdown("dropMenu");
  };

  const handleMouseLeave = (event) => {
    if (
      headerContainerRef.current &&
      dropMenuRef.current &&
      event.relatedTarget instanceof Node &&
      !headerContainerRef.current.contains(event.relatedTarget) &&
      !dropMenuRef.current.contains(event.relatedTarget)
    ) {
      setActiveDropdown(null);
    }
  };

  const handleClickOutside = (event) => {
    if (
      dropdownRef.current &&
      menuDropdownRef.current &&
      dropMenuRef.current &&
      event.target instanceof Node &&
      !dropdownRef.current.contains(event.target) &&
      !menuDropdownRef.current.contains(event.target) &&
      !dropMenuRef.current.contains(event.target)
    ) {
      setActiveDropdown(null);
    }
  };

  const handleLogout = async () => {
    const accessToken = localStorage.getItem("kakaoAccessToken");
    try {
      await axios.get("http://54.180.142.197:8080/logout", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      // 로그아웃 성공 시 로컬 스토리지에서 토큰 제거
      localStorage.removeItem("kakaoAccessToken");
      localStorage.removeItem("kakaoRefreshToken");
      localStorage.removeItem("kakaoUserId");
      localStorage.removeItem("kakaoUserEmail");

      // 로그아웃 후 로그인 페이지로 리디렉트
      setIsLoggedIn(false);
      navigate("/login");
    } catch (error) {
      console.error("로그아웃 실패:", error);
      // 로그아웃 실패 시 추가적인 에러 처리
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <TopBar>
        <Link to="/intro">웹사이트 소개</Link>
        <Link to="/developer">개발자 소개</Link>
      </TopBar>
      <HeaderContainer
        ref={headerContainerRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <Logo>
          <img src="../assets/logo.png" alt="스스LAW 로고" />
          <span>스스LAW</span>
        </Logo>
        <Nav>
          <ul>
            <li>
              <Link to="/">홈</Link>
            </li>
            <li>
              <Link to="/choicechat"> Ai 상담</Link>
            </li>
            <li>
              <Link to="/introLawyer">변호사 소개</Link>
            </li>
            <li>자료실</li>
          </ul>
        </Nav>
        <Icons>
          <FaBars size={20} onClick={() => toggleDropdown("menuDropdown")} />
          <IoMdPerson
            size={20}
            onClick={() => toggleDropdown("userDropdown")}
          />
          {activeDropdown === "userDropdown" && (
            <DropdownBox ref={dropdownRef}>
              {isLoggedIn ? (
                <>
                  <Link to="#" onClick={handleLogout}>
                    로그아웃
                  </Link>
                  <Link to="/withdrawl">회원탈퇴</Link>
                </>
              ) : (
                <Link to="/login">로그인</Link>
              )}
            </DropdownBox>
          )}
          {activeDropdown === "menuDropdown" && (
            <MenuDropdownBox ref={menuDropdownRef}>
              <Link to="/faq">FAQ</Link>
              <Link to="/inquiry">문의하기</Link>
              <Link to="/useRules">약관 확인</Link>
            </MenuDropdownBox>
          )}
        </Icons>
      </HeaderContainer>
      {activeDropdown === "dropMenu" && (
        <DropMenuStyle ref={dropMenuRef} onMouseLeave={handleMouseLeave}>
          <DropMenuContainer>
            <DropMenuList>
              <Link to="/chat">AI에게 질문하기</Link>
            </DropMenuList>
            <DropMenuList>
              <Link to="/introlawyer">변호사 목록</Link>
            </DropMenuList>
            <DropMenuList>
              <Link to="/document">소송장 관리하기</Link>
            </DropMenuList>
            <DropMenuList>
              <Link to="/edit">AI에게 첨삭받기</Link>
            </DropMenuList>
            <DropMenuList></DropMenuList>
            <DropMenuList>
              <Link to="/search">법률정보 검색하기</Link>
            </DropMenuList>
            <DropMenuList>
              <Link to="/make">AI로 소송장 만들기</Link>
            </DropMenuList>
            <DropMenuList></DropMenuList>
            <DropMenuList></DropMenuList>
          </DropMenuContainer>
        </DropMenuStyle>
      )}
    </>
  );
};

export default Header;
