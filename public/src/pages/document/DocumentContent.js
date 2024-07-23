import React from "react";
import styled from "styled-components";

const exampleList = [
  { key: "value1", date: "6.22" },
  { key: "value2", date: "7.15" },
]; // 예시 데이터를 가진 객체 배열

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
`;

const KeySpan = styled.span`
  padding: 10px 0; /* 위아래 패딩 추가 */
`;

const ButtonGroup = styled.div`
  display: flex;
  align-items: center;
`;

const Button = styled.button`
  padding: 8px;
  backgroundcolor: #7fb1bf;
`;

const ButtonSeparator = styled.span`
  margin: 0 8px;
`;

const Time = styled.div`
  position: relative;
  padding: 8px;
  left: 200px;
`;

const DocumentContent = () => {
  return (
    <div>
      <h1>소송장 관리하기</h1>
      <Container>
        {exampleList.map((item, index) => (
          <List key={index}>
            <KeySpan>map {item.key}</KeySpan> {/* item의 key 속성을 표시 */}
            <Time>{item.date}</Time> {/* item의 date 속성을 표시 */}
            <ButtonGroup>
              <Button>다운로드</Button>
              <ButtonSeparator>|</ButtonSeparator>
              <Button>삭제하기</Button>
            </ButtonGroup>
          </List>
        ))}
      </Container>
    </div>
  );
};

export default DocumentContent;
