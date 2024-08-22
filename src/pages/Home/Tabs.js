import React from "react";
import styled from "styled-components";

// Styled-components 정의
const TabsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: #ffffff;
  border-bottom: 1px solid #ddd;
  border-top: none;
  width: 100vw;
`;

const TabButton = styled.button`
  flex: 1; /* 버튼이 동일한 너비를 가지게 함 */
  background: none;
  border: none;
  font-size: 12px;
  cursor: pointer;
  padding: 10px;
  text-align: center; /* 텍스트 가운데 정렬 */
  position: relative;

  &.selected::after {
    content: "";
    display: block;
    width: 80%;
    height: 4px;
    background-color: black;
    position: absolute;
    bottom: 0;
    left: 10%;
  }

  &:not(:last-child) {
    border-right: 1.5px solid #ddd; /* 버튼 사이의 구분선 */
  }
`;

function Tabs({ selectedTab, setSelectedTab }) {
  return (
    <TabsContainer>
      {["자유게시판", "비밀게시판", "중고장터"].map((tab) => (
        <TabButton
          key={tab}
          className={selectedTab === tab ? "selected" : ""}
          onClick={() => setSelectedTab(tab)}
        >
          {tab}
        </TabButton>
      ))}
    </TabsContainer>
  );
}

export default Tabs;
