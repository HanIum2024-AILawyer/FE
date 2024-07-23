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

    &:visited {
      color: #fff;
    }

    &:hover {
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

  a {
    display: flex;
    align-items: center;
    color: #fff;
    text-decoration: none;

    &:visited {
      color: #fff;
    }

    &:hover {
      text-decoration: none;
    }

    span {
      cursor: pointer;
    }
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
    position: relative;
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
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.01);
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
  top: 100%;
  left: 0;
  width: 200px;
  background-color: rgba(9, 19, 45, 0.8);
  padding: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  z-index: 999;
  display: ${({ isVisible }) => (isVisible ? "block" : "none")};
`;

const DropMenuContainer = styled.div`
  position: relative;
  display: grid;
  grid-template-rows: repeat(2, 40px);
  grid-template-columns: repeat(3, 170px);
  white-space: nowrap;
`;

const DropMenuList = styled.div`
  padding: 10px;
  background-color: gray;
  color: white;
  transform: translate(-40%, 0);

  a {
    color: white;
    text-decoration: none;

    &:hover {
      text-decoration: none;
    }

    &:visited {
      color: white;
    }
  }
`;

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const dropdownRef = useRef(null);
  const menuDropdownRef = useRef(null);

  const handleMouseEnter = (menu) => {
    setActiveDropdown(menu);
  };

  const handleMouseLeave = (event) => {
    if (!event.currentTarget.contains(event.relatedTarget)) {
      setActiveDropdown(null);
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    // 로그아웃 후 리다이렉트가 필요하면 아래 코드를 사용하세요.
    // history.push("/login");
  };

  return (
    <>
      <TopBar>
        <Link to="/intro">웹사이트 소개</Link>
        <Link to="/developer">개발자 소개</Link>
      </TopBar>
      <HeaderContainer>
        <Logo>
          <Link to="/">
            <img src="../assets/logo.png" alt="스스LAW 로고" />
            <span>스스LAW</span>
          </Link>
        </Logo>
        <Nav>
          <ul>
            <li
              onMouseEnter={() => handleMouseEnter("home")}
              onMouseLeave={handleMouseLeave}
            >
              <Link to="/">홈</Link>
              <DropMenuStyle isVisible={activeDropdown === "home"}>
                <DropMenuContainer>
                  <DropMenuList>
                    <Link to="/chat">AI에게 질문하기</Link>
                  </DropMenuList>
                  <DropMenuList>
                    <Link to="/introLawyer">변호사 목록</Link>
                  </DropMenuList>
                  <DropMenuList>
                    <Link to="/document">소송장 관리하기</Link>
                  </DropMenuList>
                  <DropMenuList>AI에게 첨삭받기</DropMenuList>
                  <DropMenuList></DropMenuList>
                  <DropMenuList>법률정보 검색하기</DropMenuList>
                </DropMenuContainer>
              </DropMenuStyle>
            </li>
            <li
              onMouseEnter={() => handleMouseEnter("chat")}
              onMouseLeave={handleMouseLeave}
            >
              <Link to="/chat">Ai 상담</Link>
              <DropMenuStyle isVisible={activeDropdown === "chat"}>
                <DropMenuContainer>
                  <DropMenuList>
                    <Link to="/chat">AI에게 질문하기</Link>
                  </DropMenuList>
                  <DropMenuList>
                    <Link to="/introLawyer">변호사 목록</Link>
                  </DropMenuList>
                  <DropMenuList>
                    <Link to="/document">소송장 관리하기</Link>
                  </DropMenuList>
                  <DropMenuList>AI에게 첨삭받기</DropMenuList>
                  <DropMenuList></DropMenuList>
                  <DropMenuList>법률정보 검색하기</DropMenuList>
                </DropMenuContainer>
              </DropMenuStyle>
            </li>
            <li
              onMouseEnter={() => handleMouseEnter("introLawyer")}
              onMouseLeave={handleMouseLeave}
            >
              <Link to="/introLawyer">변호사 소개</Link>
              <DropMenuStyle isVisible={activeDropdown === "introLawyer"}>
                <DropMenuContainer>
                  <DropMenuList>
                    <Link to="/chat">AI에게 질문하기</Link>
                  </DropMenuList>
                  <DropMenuList>
                    <Link to="/introLawyer">변호사 목록</Link>
                  </DropMenuList>
                  <DropMenuList>
                    <Link to="/document">소송장 관리하기</Link>
                  </DropMenuList>
                  <DropMenuList>AI에게 첨삭받기</DropMenuList>
                  <DropMenuList></DropMenuList>
                  <DropMenuList>법률정보 검색하기</DropMenuList>
                </DropMenuContainer>
              </DropMenuStyle>
            </li>
            <li
              onMouseEnter={() => handleMouseEnter("document")}
              onMouseLeave={handleMouseLeave}
            >
              <Link to="/document">자료실</Link>
              <DropMenuStyle isVisible={activeDropdown === "document"}>
                <DropMenuContainer>
                  <DropMenuList>
                    <Link to="/chat">AI에게 질문하기</Link>
                  </DropMenuList>
                  <DropMenuList>
                    <Link to="/introLawyer">변호사 목록</Link>
                  </DropMenuList>
                  <DropMenuList>
                    <Link to="/document">소송장 관리하기</Link>
                  </DropMenuList>
                  <DropMenuList>AI에게 첨삭받기</DropMenuList>
                  <DropMenuList></DropMenuList>
                  <DropMenuList>법률정보 검색하기</DropMenuList>
                </DropMenuContainer>
              </DropMenuStyle>
            </li>
          </ul>
        </Nav>
        <Icons>
          <FaBars size={20} onClick={() => setActiveDropdown("menuDropdown")} />
          <IoMdPerson
            size={20}
            onClick={() => setActiveDropdown("userDropdown")}
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
              <Link to="/faq">F&A</Link>
              <Link to="/contact">문의하기</Link>
              <Link to="/useRules">약관 확인</Link>
            </MenuDropdownBox>
          )}
        </Icons>
      </HeaderContainer>
    </>
  );
};

export default Header;
