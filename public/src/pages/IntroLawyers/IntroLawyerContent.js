import React, { useState } from "react";
import styled from "styled-components";

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
  color: white; // 텍스트 색상 추가
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
  color: #fff; // 텍스트 색상 추가
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
  margin: 20px auto; /* 위의 nav와의 간격을 추가하기 위해 margin-top을 20px로 설정 */
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
`;

const LawyerDetailPhoto = styled.img`
  width: 40%;
  border-radius: 3%;
  object-fit: cover;
  margin-right: 20px;
`;

const LawyerDetailInfo = styled.div`
  margin-left: 20px;
  text-align: left;
  width: 60%;
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
  margin-bottom: 20px; /* 제목과 텍스트 간의 간격 */
`;

const LawyerDetailText = styled.p`
  color: #666;
`;

const LawyerCareer = styled.ul`
  color: #666;
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

// 변호사 목록 데이터
const lawyers = [
  {
    name: "한상진 변호사",
    specialty: "상속",
    imgSrc: `${process.env.PUBLIC_URL}/lawyerImage/lawyer1.jpg`,
    detail:
      "상속 전문 변호사 한상진입니다. 여러 상속 관련 소송 경험이 풍부합니다.",
    career: [
      "2010년 - 변호사 자격 취득",
      "2011년 - 상속 관련 소송 경험 다수",
      "2015년 - 유명 상속 사건 담당",
    ],
  },
  {
    name: "이상민 변호사",
    specialty: "이혼",
    imgSrc: `${process.env.PUBLIC_URL}/lawyerImage/lawyer2.jpg`,
    detail:
      "이혼 전문 변호사 이상민입니다. 복잡한 이혼 소송을 전문적으로 처리합니다.",
    career: [
      "2012년 - 변호사 자격 취득",
      "2013년 - 이혼 관련 소송 경험 다수",
      "2016년 - 유명 이혼 사건 담당",
    ],
  },
  {
    name: "박성재 변호사",
    specialty: "형사",
    imgSrc: `${process.env.PUBLIC_URL}/lawyerImage/lawyer3.jpg`,
    detail:
      "형사 전문 변호사 박성재입니다. 다양한 형사 사건을 성공적으로 변호해 왔습니다.",
    career: [
      "2014년 - 변호사 자격 취득",
      "2015년 - 형사 사건 소송 경험 다수",
      "2018년 - 유명 형사 사건 담당",
    ],
  },
  {
    name: "한상진 변호사",
    specialty: "성범죄",
    imgSrc: `${process.env.PUBLIC_URL}/lawyerImage/lawyer1.jpg`,
    detail:
      "성범죄 전문 변호사 한상진입니다. 성범죄 관련 사건을 다수 처리해왔습니다.",
    career: [
      "2010년 - 변호사 자격 취득",
      "2012년 - 성범죄 관련 소송 경험 다수",
      "2017년 - 유명 성범죄 사건 담당",
    ],
  },
  {
    name: "한상진 변호사",
    specialty: "교통",
    imgSrc: `${process.env.PUBLIC_URL}/lawyerImage/lawyer1.jpg`,
    detail:
      "교통사고 전문 변호사 한상진입니다. 교통사고 소송에서 많은 경험을 가지고 있습니다.",
    career: [
      "2010년 - 변호사 자격 취득",
      "2013년 - 교통사고 관련 소송 경험 다수",
      "2016년 - 유명 교통사고 사건 담당",
    ],
  },
];

// IntroLawyerPage 컴포넌트 정의
const IntroLawyerContent = () => {
  const [selectedSpecialty, setSelectedSpecialty] = useState(null);
  const [selectedLawyer, setSelectedLawyer] = useState(null);

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
              <LawyerDetailText>{selectedLawyer.detail}</LawyerDetailText>
              {selectedLawyer.career && (
                <LawyerCareer>
                  {selectedLawyer.career.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </LawyerCareer>
              )}
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
