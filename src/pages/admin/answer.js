import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";

// 서버 주소 설정
const SERVER_URL = "http://example.com/api/questions"; // 실제 서버 주소로 대체하세요.

// 스타일 정의
const MainContainer = styled.div`
  text-align: center;
  font-family: Arial, sans-serif;
`;

const Header = styled.header`
  background-color: #282c34;
  padding: 20px;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const TabContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const Tab = styled.button`
  padding: 10px 20px;
  margin: 0 10px;
  border: none;
  border-bottom: ${(props) => (props.active ? "2px solid #282c34" : "none")};
  background: none;
  color: ${(props) => (props.active ? "#282c34" : "#ccc")};
  cursor: pointer;
  font-weight: bold;
  &:focus {
    outline: none;
  }
`;

const QuestionList = styled.div`
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
`;

const QuestionItem = styled.div`
  background-color: #f0f0f0;
  padding: 20px;
  margin-bottom: 10px;
  border-radius: 5px;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const QuestionEmail = styled.div`
  font-weight: bold;
  color: black;
`;

const QuestionText = styled.div`
  margin-top: 10px;
  color: black;
`;

const AnswerContainer = styled.div`
  background-color: #d9d9d9;
  padding: 20px;
  margin: 10px 0;
  border-radius: 5px;
`;

const AnswerTextArea = styled.textarea`
  width: 100%;
  height: 100px;
  padding: 10px;
  margin-top: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
`;

const Button = styled.button`
  margin-top: 10px;
  padding: 10px 20px;
  background-color: #282c34;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const AnsweredButton = styled(Button)`
  background-color: #999;
`;

const App = () => {
  const [questions, setQuestions] = useState([]);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [answer, setAnswer] = useState("");
  const [activeTab, setActiveTab] = useState("waiting");

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      const response = await axios.get(SERVER_URL);
      setQuestions(response.data);
    } catch (error) {
      console.error("Failed to fetch questions", error);
    }
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    setSelectedQuestion(null);
  };

  const handleQuestionClick = (question) => {
    setSelectedQuestion(question);
    setAnswer("");
  };

  const handleAnswerChange = (e) => {
    setAnswer(e.target.value);
  };

  const handleSendAnswer = async () => {
    try {
      await axios.post(`${SERVER_URL}/${selectedQuestion.id}/answer`, {
        answer,
      });
      fetchQuestions(); // Reload questions to update the status
      setSelectedQuestion(null);
      setAnswer("");
    } catch (error) {
      console.error("Failed to send answer", error);
    }
  };

  const filteredQuestions = questions.filter((question) =>
    activeTab === "waiting" ? !question.answered : question.answered
  );

  return (
    <MainContainer>
      <Header>
        <div>문의 답변 페이지</div>
      </Header>
      <TabContainer>
        <Tab
          active={activeTab === "waiting"}
          onClick={() => handleTabClick("waiting")}
        >
          대기중인 문의
        </Tab>
        <Tab
          active={activeTab === "answered"}
          onClick={() => handleTabClick("answered")}
        >
          답변한 문의
        </Tab>
      </TabContainer>
      <QuestionList>
        {filteredQuestions.map((question) => (
          <div key={question.id}>
            <QuestionItem onClick={() => handleQuestionClick(question)}>
              <div>
                <QuestionEmail>{question.email}</QuestionEmail>
                <QuestionText>{question.text}</QuestionText>
              </div>
              {question.answered && <AnsweredButton>답변 완료</AnsweredButton>}
            </QuestionItem>
            {selectedQuestion && selectedQuestion.id === question.id && (
              <AnswerContainer>
                <div>
                  <QuestionEmail>{selectedQuestion.email}</QuestionEmail>
                  <QuestionText>{selectedQuestion.text}</QuestionText>
                </div>
                <AnswerTextArea
                  placeholder="답변하기..."
                  value={answer}
                  onChange={handleAnswerChange}
                />
                <Button onClick={handleSendAnswer}>전송</Button>
              </AnswerContainer>
            )}
          </div>
        ))}
      </QuestionList>
    </MainContainer>
  );
};

export default App;
