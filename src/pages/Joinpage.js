import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled, { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  html, body {
    overflow: hidden; //스크롤방지
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  box-sizing: border-box;
  padding: 0vh;
  height: 100vh;
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
    width: 1.3vh; /* 이미지의 너비 조정 */
    height: auto; /* 이미지의 높이는 자동으로 조정 */
  }
`;

const HeaderText = styled.h1`
  margin: 1vh 0;
  font-size: 1rem;
  text-align: center;
`;

const WelcomeText = styled.p`
  position: absolute;
  top: 9vh;
  left: 7vw;
  text-align: center;
  font-size: 1rem;
  color: #003fe0;
  font-weight: 900;
`;

const WelcomText2 = styled.p`
  position: absolute;
  top: 12.5vh;
  left: 7vw;
  font-size: 0.7rem;
  font-weight: 900;
`;

const AgreeButton = styled.button`
  border: none;
  font-size: 0.8rem;
  cursor: pointer;
  width: 90%;
  margin-bottom: 4vh;
  border-radius: 1vh;
  position: relative;
  top: -5vh;
  height: 4.5%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => (props.checked ? "#3f51b5" : "#d3d3d3")};
  color: white;
`;

const CatImage = styled.img`
  position: absolute;
  right: 2.8vw;
  top: -39%;
  transform: translateY(-50%);
  width: 6.5vh;
  height: auto;
`;

const CheckboxContainer = styled.div`
  width: 90%;
  position: relative;
  top: -6%;
`;

const CheckboxItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 2vh 0;
  border-bottom: 0.2vh solid #d3d3d3;
`;

const CheckboxLabel = styled.label`
  flex: 1;
  margin-left: 2vh;
  font-size: 1.5vh; /* 글자 크기 조정 */
`;

const ViewButton = styled.button`
  background: none;
  border: none;
  color: #3f51b5;
  cursor: pointer;
  font-size: 1.3vh;
`;

const Footer = styled.div`
  width: 100%;
  text-align: center;
  margin-top: 4vh;
`;

const NextButton = styled.button`
  border: none;
  font-size: 1.2rem;
  width: 100%;
  background-color: ${(props) => (props.enabled ? "#3f51b5" : "#d3d3d3")};
  color: white;
  text-decoration: none;
  text-align: center;
  position: fixed;
  bottom: 0;
  padding: 1.2vh;
  display: block;
  cursor: ${(props) => (props.enabled ? "pointer" : "default")};
`;

// Component
function Joinpage() {
  const [allChecked, setAllChecked] = useState(false);
  const [terms, setTerms] = useState([false, false, false, false]);
  const navigate = useNavigate();

  const handleAgree = () => {
    const updatedTerms = terms.map(() => !allChecked);
    setTerms(updatedTerms);
    setAllChecked(!allChecked);
  };

  const handleCheckboxChange = (index) => {
    const updatedTerms = terms.map((term, i) => (i === index ? !term : term));
    setTerms(updatedTerms);
    setAllChecked(updatedTerms.every((term) => term));
  };

  const handleNextButtonClick = async () => {
    if (allChecked) {
      try {
        const terms = [1, 1, 1, 1]; // 각 동의 항목에 대해 1로 설정
        const queryParams = terms
          .map((value, index) => `term${index + 1}=${value}`)
          .join("&");

        const response = await fetch(
          `http://15.164.102.12:8080/api/v1/users/signup/next?${queryParams}`,
          {
            method: "GET",
          }
        );

        const data = await response.json();

        if (data.is_success) {
          navigate("/Joinpage2");
        } else {
          alert("통신 오류.다시 시도해주세요.");
        }
      } catch (error) {
        console.error("Error:", error);
        alert("통신에러");
      }
    }
  };

  return (
    <>
      <GlobalStyle />
      <Container>
        <Header>
          <BackButton to="/">
            <img src="./images/Back_icon.png" alt="back" />
          </BackButton>
          <HeaderText>회원가입</HeaderText>
        </Header>
        <WelcomeText>환영합니다!</WelcomeText>
        <WelcomText2>가입을 위해 약관에 동의가 필요합니다.</WelcomText2>
        <AgreeButton checked={allChecked} onClick={handleAgree}>
          네, 모두 동의합니다
          <CatImage src="./images/SucatLogo.png" alt="cat" />
        </AgreeButton>
        <CheckboxContainer>
          {[
            "서비스 이용약관 동의(필수)",
            "서비스 이용약관 동의(필수)",
            "서비스 이용약관 동의(필수)",
            "서비스 이용약관 동의(필수)",
          ].map((term, index) => (
            <CheckboxItem key={index}>
              <input
                type="checkbox"
                id={`term${index}`}
                checked={terms[index]}
                onChange={() => handleCheckboxChange(index)}
              />
              <CheckboxLabel htmlFor={`term${index}`}>{term}</CheckboxLabel>
              <ViewButton>보기</ViewButton>
            </CheckboxItem>
          ))}
        </CheckboxContainer>
        <Footer>
          <NextButton enabled={allChecked} onClick={handleNextButtonClick}>
            다음
          </NextButton>
        </Footer>
      </Container>
    </>
  );
}

export default Joinpage;
