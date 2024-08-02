import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import { IoMdPerson } from "react-icons/io";

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

    &:hover {
      text-decoration: none;
    }

    &:visited {
      color: #fff;
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
    &:hover {
      text-decoration: none;
    }

    &:visited {
      color: #fff;
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
    &:hover {
      text-decoration: none;
    }

    &:visited {
      color: #fff;
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
  grid-template-rows: repeat(2, 40px);
  grid-template-columns: repeat(3, 170px);
  white-space: nowrap;
  left: 50%;
`;

const DropMenuList = styled.div`
  padding: 10px;
  background-color: #09132d;
  color: white;
`;

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const dropdownRef = useRef(null);
  const menuDropdownRef = useRef(null);
  const dropMenuRef = useRef(null);
  const headerContainerRef = useRef(null);

  const toggleDropdown = (dropdownType) => {
    setActiveDropdown((prev) => (prev === dropdownType ? null : dropdownType));
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

  const handleLogout = () => {
    setIsLoggedIn(false);
    // 로그아웃 후 리다이렉트가 필요하면 아래 코드를 사용하세요.
    // history.push("/login");
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
                  <Link to="/logout" onClick={handleLogout}>
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
          </DropMenuContainer>
        </DropMenuStyle>
      )}
    </>
  );
};

export default Header;
