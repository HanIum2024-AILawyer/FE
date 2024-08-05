import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { MdEdit } from "react-icons/md";

// 서버 주소 설정
const SERVER_URL = "http://example.com/api/documents"; // 실제 서버 주소로 대체하세요.

const Container = styled.div`
  padding: 0px 150px;
`;

const List = styled.div`
  display: flex;
  justify-content: space-between; /* 각 항목을 양 끝으로 배치 */
  position: relative;
  padding: 10px;
  border-bottom: 1px solid;
  font-size: 23px;
  color: white;
`;

const KeySpan = styled.span`
  padding: 10px 0; /* 위아래 패딩 추가 */
  font-size: 23px;
  color: white;
`;

const KeyInput = styled.input`
  padding: 10px 0; /* 위아래 패딩 추가 */
  font-size: 23px;
  border: none;
  background: none;
  color: white;
  &:focus {
    outline: none;
    border-bottom: 1px solid #000;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  align-items: center;
`;

const Button = styled.button`
  padding: 8px;
  background-color: #7fb1bf;
  color: white;
`;

const ButtonSeparator = styled.span`
  margin: 0 8px;
  color: white;
`;

const Time = styled.div`
  position: relative;
  padding: 8px;
  left: 200px;
  color: white;
`;

const EditButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: white;
`;

const SaveButton = styled.button`
  padding: 8px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-left: 10px;
`;

const DocumentContent = () => {
  const [documents, setDocuments] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [newTitle, setNewTitle] = useState("");

  useEffect(() => {
    fetchDocuments();
  }, []);

  const fetchDocuments = async () => {
    try {
      const response = await axios.get(SERVER_URL);
      setDocuments(response.data);
    } catch (error) {
      console.error("Failed to fetch documents", error);
    }
  };

  const handleDownload = (id) => {
    // 다운로드 기능 구현
    console.log(`Downloading document with id: ${id}`);
    // 예시 코드. 실제 구현 필요
    axios({
      url: `${SERVER_URL}/${id}/download`,
      method: "GET",
      responseType: "blob", // 중요한 부분입니다. 응답 데이터를 Blob으로 설정
    }).then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `document_${id}.pdf`); // 파일 이름 설정
      document.body.appendChild(link);
      link.click();
    });
  };

  const handleDelete = async (id) => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      try {
        await axios.delete(`${SERVER_URL}/${id}`);
        fetchDocuments(); // 문서 목록 갱신
      } catch (error) {
        console.error("Failed to delete document", error);
      }
    }
  };

  const handleEditClick = (id, title) => {
    setEditingId(id);
    setNewTitle(title);
  };

  const handleTitleChange = (e) => {
    setNewTitle(e.target.value);
  };

  const handleSaveClick = async (id) => {
    try {
      await axios.put(`${SERVER_URL}/${id}`, { title: newTitle });
      setEditingId(null);
      setNewTitle("");
      fetchDocuments(); // 문서 목록 갱신
    } catch (error) {
      console.error("Failed to update document title", error);
    }
  };

  return (
    <div>
      <h1 style={{ color: "white" }}>소송장 관리하기</h1>
      <Container>
        {documents.map((item) => (
          <List key={item.id}>
            {editingId === item.id ? (
              <>
                <KeyInput
                  type="text"
                  value={newTitle}
                  onChange={handleTitleChange}
                />
                <SaveButton onClick={() => handleSaveClick(item.id)}>
                  저장
                </SaveButton>
              </>
            ) : (
              <>
                <KeySpan>{item.title}</KeySpan>
                <EditButton
                  onClick={() => handleEditClick(item.id, item.title)}
                >
                  <MdEdit />
                </EditButton>
              </>
            )}
            <Time>{item.date}</Time> {/* item의 date 속성을 표시 */}
            <ButtonGroup>
              <Button onClick={() => handleDownload(item.id)}>다운로드</Button>
              <ButtonSeparator>|</ButtonSeparator>
              <Button onClick={() => handleDelete(item.id)}>삭제하기</Button>
            </ButtonGroup>
          </List>
        ))}
      </Container>
    </div>
  );
};

export default DocumentContent;
