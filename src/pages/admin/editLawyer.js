import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";

// 서버 주소 설정
const SERVER_URL = "http://example.com/api/lawyers"; // 실제 서버 주소로 대체하세요.
const DELETE_URL = "http://localhost:8080/admin/lawyer";
const MODIFY_URL = "http://localhost:8080/admin/lawyer/modification";

// 스타일 정의
const MainContainer = styled.div`
  text-align: center;
  font-family: Arial, sans-serif;
  overflow: auto;
  height: 100vh;
`;

const Header = styled.header`
  background-color: gray;
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
  height: 525px;
  cursor: pointer;
  position: relative;
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

const CardButtons = styled.div`
  position: absolute;
  bottom: 10px;
  width: 100%;
  display: flex;
  justify-content: space-around;
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
`;

const AddEditForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
`;

const Input = styled.input`
  margin: 10px;
  padding: 10px;
  width: 300px;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const Textarea = styled.textarea`
  margin: 10px;
  padding: 10px;
  width: 300px;
  height: 100px;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const Button = styled.button`
  margin: 10px;
  padding: 10px 20px;
  color: white;
  background-color: #09132d;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

// LawyerCard 컴포넌트 정의
const LawyerCard = ({ lawyer, onClick, onDelete }) => {
  return (
    <LawyerCardContainer>
      <LawyerPhoto src={lawyer.imgSrc} alt={`${lawyer.name}`} />
      <LawyerName>{lawyer.name}</LawyerName>
      <LawyerSpecialty>{lawyer.specialty}</LawyerSpecialty>
      <CardButtons>
        <Button onClick={() => onClick(lawyer)}>편집</Button>
        <Button onClick={() => onDelete(lawyer.id)}>삭제</Button>
      </CardButtons>
    </LawyerCardContainer>
  );
};

// EditLawyer 컴포넌트 정의
const EditLawyer = () => {
  const [lawyers, setLawyers] = useState([]);
  const [selectedSpecialty, setSelectedSpecialty] = useState(null);
  const [selectedLawyer, setSelectedLawyer] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    lawyerName: "",
    lawyerTag: "",
    lawyerImage: "",
    lawyerProfile: "",
    lawyerExInfo: "",
  });

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
    setFormData({
      lawyerName: lawyer.lawyerName,
      lawyerTag: lawyer.lawyerTag,
      lawyerImage: lawyer.lawyerImage,
      lawyerProfile: lawyer.lawyerProfile.join("\n"),
      lawyerExInfo: lawyer.lawyerExInfo.join("\n"),
    });
    setIsEditing(true);
  };

  const handleDeleteLawyer = async (id) => {
    try {
      await axios.delete(`${DELETE_URL}/${id}`);
      setLawyers(lawyers.filter((lawyer) => lawyer.id !== id));
    } catch (error) {
      console.error("Failed to delete lawyer", error);
    }
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const updatedLawyer = {
      lawyerName: formData.lawyerName,
      lawyerTag: formData.lawyerTag,
      lawyerImage: formData.lawyerImage,
      lawyerProfile: formData.lawyerProfile.split("\n"),
      lawyerExInfo: formData.lawyerExInfo.split("\n"),
    };

    try {
      if (isEditing && selectedLawyer) {
        // 변호사 정보를 수정하는 POST 요청
        const response = await axios.post(
          `${MODIFY_URL}/${selectedLawyer.id}`,
          updatedLawyer
        );
        setLawyers(
          lawyers.map((lawyer) =>
            lawyer.id === selectedLawyer.id ? response.data : lawyer
          )
        );
      } else {
        // 새로운 변호사 추가하는 POST 요청
        const response = await axios.post(SERVER_URL, updatedLawyer);
        setLawyers([...lawyers, response.data]);
      }

      setIsEditing(false);
      setSelectedLawyer(null);
      setFormData({
        lawyerName: "",
        lawyerTag: "",
        lawyerImage: "",
        lawyerProfile: "",
        lawyerExInfo: "",
      });
    } catch (error) {
      console.error("Failed to save lawyer", error);
    }
  };

  const handleAddNewLawyer = () => {
    setSelectedLawyer(null);
    setIsEditing(true);
    setFormData({
      lawyerName: "",
      lawyerTag: "",
      lawyerImage: "",
      lawyerProfile: "",
      lawyerExInfo: "",
    });
  };

  const filteredLawyers = selectedSpecialty
    ? lawyers.filter((lawyer) => lawyer.lawyerTag === selectedSpecialty)
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
      <Button onClick={handleAddNewLawyer}>새 변호사 추가</Button>
      {isEditing ? (
        <AddEditForm onSubmit={handleFormSubmit}>
          <Input
            type="text"
            name="lawyerName"
            placeholder="이름"
            value={formData.lawyerName}
            onChange={handleFormChange}
            required
          />
          <Input
            type="text"
            name="lawyerTag"
            placeholder="전문 분야"
            value={formData.lawyerTag}
            onChange={handleFormChange}
            required
          />
          <Input
            type="text"
            name="lawyerImage"
            placeholder="이미지 URL"
            value={formData.lawyerImage}
            onChange={handleFormChange}
            required
          />
          <Textarea
            name="lawyerProfile"
            placeholder="약력 (줄 바꿈으로 구분)"
            value={formData.lawyerProfile}
            onChange={handleFormChange}
            required
          />
          <Textarea
            name="lawyerExInfo"
            placeholder="정보 (줄 바꿈으로 구분)"
            value={formData.lawyerExInfo}
            onChange={handleFormChange}
            required
          />
          <Button type="submit">저장</Button>
        </AddEditForm>
      ) : selectedLawyer ? (
        <div>
          <LawyerDetailContainer>
            <LawyerDetailPhoto
              src={selectedLawyer.lawyerImage}
              alt={selectedLawyer.lawyerName}
            />
            <LawyerDetailInfo>
              <HeaderSpecialtyContainer>
                <LawyerDetailHeader>
                  {selectedLawyer.lawyerName}
                </LawyerDetailHeader>
                <LawyerDetailSpecialty>
                  {selectedLawyer.lawyerTag}
                </LawyerDetailSpecialty>
              </HeaderSpecialtyContainer>
              <ListsContainer>
                <CareerList>
                  <h2>약력</h2>
                  {selectedLawyer.lawyerProfile &&
                    selectedLawyer.lawyerProfile.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                </CareerList>
                <InfoList>
                  <h2>정보</h2>
                  {selectedLawyer.lawyerExInfo &&
                    selectedLawyer.lawyerExInfo.map((item, index) => (
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
              onDelete={handleDeleteLawyer}
            />
          ))}
        </LawyerGrid>
      )}
    </MainContainer>
  );
};

export default EditLawyer;
