import React, { useState, useEffect } from "react";
import styled from "styled-components";

const SERVER_URL = process.env.SERVER_URL;

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
  border-bottom: 2px solid #ccc;
  background: none;
  color: ${(props) => (props.active ? "#ccc" : "#282c34")};
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
  flex-direction: column;
  align-items: flex-start;
`;

const QuestionTitle = styled.div`
  font-weight: bold;
  color: black;
  margin-bottom: 5px;
  align-self: flex-start;
`;

const QuestionEmail = styled.div`
  font-weight: bold;
  color: black;
  align-self: flex-start;
`;

const QuestionText = styled.div`
  margin-top: 10px;
  color: black;
  align-self: flex-start;
`;

const AnswerContainer = styled.div`
  background-color: #d9d9d9;
  padding: 20px;
  margin: 10px 0;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
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

const Answer = () => {
  const [questions, setQuestions] = useState([]);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [answer, setAnswer] = useState("");
  const [activeTab, setActiveTab] = useState("waiting");

  useEffect(() => {
    // 페이지가 로드되면 대기 중인 문의를 기본값으로 설정하여 데이터를 불러오는 API 호출
    fetchQuestions("waiting");
  }, []);

  const fetchQuestions = async (tab) => {
    const endpoint =
      tab === "waiting"
        ? "http://localhost:8080/admin/inquery/pending?page=0&size=10"
        : "http://localhost:8080/admin/inquery/answered?page=0&size=10";

    try {
      const response = await fetch(endpoint, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`, // 로컬 스토리지에서 토큰 가져오기
        },
      });

      const result = await response.json();

      if (result.is_success) {
        setQuestions(result.payload.content);
      } else {
        alert("문의 목록을 불러오는 데 실패했습니다.");
      }
    } catch (error) {
      alert("문의 목록을 불러오는 도중 오류가 발생했습니다.");
    }
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    setSelectedQuestion(null);
    fetchQuestions(tab); // 탭에 따라 데이터를 다시 불러옴
  };

  const handleQuestionClick = (question) => {
    setSelectedQuestion(question);
    setAnswer("");
  };

  const handleAnswerChange = (e) => {
    setAnswer(e.target.value);
  };

  const handleSendAnswer = async () => {
    // 서버로 전송하는 코드
    try {
      const response = await fetch(
        `${SERVER_URL}/admin/inquery/${selectedQuestion.id}/answer`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("authToken")}`, // 로컬 스토리지에서 토큰 가져오기
          },
          body: JSON.stringify({ answer }),
        }
      );

      if (response.ok) {
        alert("답변이 성공적으로 전송되었습니다.");

        // 답변 완료로 상태 업데이트
        setQuestions((prevQuestions) =>
          prevQuestions.map((q) =>
            q.id === selectedQuestion.id ? { ...q, isAnswer: true } : q
          )
        );

        setSelectedQuestion(null);
        setAnswer("");
      } else {
        alert("답변 전송에 실패했습니다.");
      }
    } catch (error) {
      alert("답변 전송 중 오류가 발생했습니다.");
    }
  };

  const filteredQuestions = questions.filter((question) =>
    activeTab === "waiting" ? !question.isAnswer : question.isAnswer
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
              <QuestionTitle>{question.title}</QuestionTitle>
              <QuestionEmail>{question.userName}</QuestionEmail>
              <QuestionText>{question.content}</QuestionText>
              {question.isAnswer && <AnsweredButton>답변 완료</AnsweredButton>}
            </QuestionItem>
            {selectedQuestion && selectedQuestion.id === question.id && (
              <AnswerContainer>
                <QuestionTitle>{selectedQuestion.title}</QuestionTitle>
                <QuestionEmail>{selectedQuestion.userName}</QuestionEmail>
                <QuestionText>{selectedQuestion.content}</QuestionText>
                {activeTab === "waiting" ? (
                  <>
                    <AnswerTextArea
                      placeholder="답변하기..."
                      value={answer}
                      onChange={handleAnswerChange}
                    />
                    <Button onClick={handleSendAnswer}>전송</Button>
                  </>
                ) : (
                  <AnswerTextArea value={selectedQuestion.answer} readOnly />
                )}
              </AnswerContainer>
            )}
          </div>
        ))}
      </QuestionList>
    </MainContainer>
  );
};

export default Answer;
