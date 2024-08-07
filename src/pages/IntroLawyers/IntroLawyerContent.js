import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";

// 서버 주소 설정
const SERVER_URL = "http://example.com/api/lawyers"; // 실제 서버 주소로 대체하세요.

// 스타일 정의
const MainContainer = styled.div`
  text-align: center;
  font-family: Arial, sans-serif;
`;

const Header = styled.header`
  background-color: #282c34;
  padding: 20px;
  color: white;
`;

const Nav = styled.nav`
  margin-top: 20px;
`;

const NavList = styled.ul`
  list-style: none;
  padding: 0;
  display: flex;
  justify-content: center;
  margin: 0;
`;

const NavItem = styled.li`
  margin: 0 15px;
  cursor: pointer;
  font-weight: bold;
  color: white;
`;

const LawyerGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: 20px;
`;

const LawyerCardContainer = styled.div`
  border: 1px solid #ddd;
  border-radius: 3%;
  text-align: center;
  margin: 8px;
  background-color: #09132d;
  width: 360px;
  height: 475px;
  cursor: pointer;
`;

const LawyerPhoto = styled.img`
  width: 100%;
  height: 380px;
  border-radius: 3%;
  object-fit: cover;
  margin-bottom: 8px;
`;

const LawyerName = styled.h3`
  font-size: 20px;
  margin: 3px;
  color: #fff;
`;

const LawyerSpecialty = styled.p`
  color: #fff;
  font-size: 15px;
`;

const LawyerDetailContainer = styled.div`
  display: flex;
  padding: 20px;
  text-align: left;
  max-width: 1250px;
  margin: 20px auto;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
`;

const LawyerDetailPhoto = styled.img`
  width: 30%;
  border-radius: 3%;
  object-fit: cover;
  margin-right: 20px;
`;

const LawyerDetailInfo = styled.div`
  margin-left: 10px;
  text-align: left;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 70%;
`;

const ListsContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const InfoList = styled.ul`
  color: #666;
  width: 45%;
`;

const CareerList = styled.ul`
  color: #666;
  width: 45%;
`;

const LawyerDetailHeader = styled.h2`
  color: #333;
  margin-right: 10px;
`;

const LawyerDetailSpecialty = styled.h5`
  color: #666;
  margin: 0;
`;

const HeaderSpecialtyContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

const LawyerDetailText = styled.p`
  color: #666;
  margin-bottom: 10px;
`;

const BackButton = styled.button`
  width: 120px;
  height: 30px;
  color: #fff;
  background-color: #09132d;
  border: 2px solid black;
  border-radius: 10%;
  margin-top: 5px;
  position: absolute;
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%);
`;

// LawyerCard 컴포넌트 정의
const LawyerCard = ({ lawyer, onClick }) => {
  return (
    <LawyerCardContainer onClick={() => onClick(lawyer)}>
      <LawyerPhoto src={lawyer.imgSrc} alt={`${lawyer.name}`} />
      <LawyerName>{lawyer.name}</LawyerName>
      <LawyerSpecialty>{lawyer.specialty}</LawyerSpecialty>
    </LawyerCardContainer>
  );
};

// IntroLawyerContent 컴포넌트 정의
const IntroLawyerContent = () => {
  const [lawyers, setLawyers] = useState([]);
  const [selectedSpecialty, setSelectedSpecialty] = useState(null);
  const [selectedLawyer, setSelectedLawyer] = useState(null);

  useEffect(() => {
    fetchLawyers();
  }, []);

  const fetchLawyers = async () => {
    try {
      const response = await axios.get(SERVER_URL);
      setLawyers(response.data);
    } catch (error) {
      console.error("Failed to fetch lawyers", error);
    }
  };

  const handleSpecialtyClick = (specialty) => {
    setSelectedSpecialty(specialty);
    setSelectedLawyer(null); // 세부사항 보기 상태 초기화
  };

  const handleLawyerClick = (lawyer) => {
    setSelectedLawyer(lawyer);
  };

  const filteredLawyers = selectedSpecialty
    ? lawyers.filter((lawyer) => lawyer.specialty === selectedSpecialty)
    : lawyers;

  return (
    <MainContainer>
      <Header>
        <h1>변호사 소개</h1>
        <Nav>
          <NavList>
            <NavItem onClick={() => handleSpecialtyClick("상속")}>상속</NavItem>
            <NavItem onClick={() => handleSpecialtyClick("이혼")}>이혼</NavItem>
            <NavItem onClick={() => handleSpecialtyClick("성범죄")}>
              성범죄
            </NavItem>
            <NavItem onClick={() => handleSpecialtyClick("교통")}>교통</NavItem>
            <NavItem onClick={() => handleSpecialtyClick("형사")}>형사</NavItem>
            <NavItem onClick={() => handleSpecialtyClick(null)}>전체</NavItem>
          </NavList>
        </Nav>
      </Header>
      {selectedLawyer ? (
        <div>
          <LawyerDetailContainer>
            <LawyerDetailPhoto
              src={selectedLawyer.imgSrc}
              alt={selectedLawyer.name}
            />
            <LawyerDetailInfo>
              <HeaderSpecialtyContainer>
                <LawyerDetailHeader>{selectedLawyer.name}</LawyerDetailHeader>
                <LawyerDetailSpecialty>
                  {selectedLawyer.specialty}
                </LawyerDetailSpecialty>
              </HeaderSpecialtyContainer>
              <LawyerDetailText>{selectedLawyer.intro}</LawyerDetailText>
              <ListsContainer>
                <CareerList>
                  <h2>약력</h2>
                  {selectedLawyer.career &&
                    selectedLawyer.career.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                </CareerList>
                <InfoList>
                  <h2>정보</h2>
                  {selectedLawyer.info &&
                    selectedLawyer.info.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                </InfoList>
              </ListsContainer>
            </LawyerDetailInfo>
          </LawyerDetailContainer>
          <BackButton onClick={() => setSelectedLawyer(null)}>
            목록으로
          </BackButton>
        </div>
      ) : (
        <LawyerGrid>
          {filteredLawyers.map((lawyer, index) => (
            <LawyerCard
              key={index}
              lawyer={lawyer}
              onClick={handleLawyerClick}
            />
          ))}
        </LawyerGrid>
      )}
    </MainContainer>
  );
};

export default IntroLawyerContent;
