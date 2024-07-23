import React from "react";
import styled, { createGlobalStyle } from "styled-components";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";

import HomePage from "./pages/Home/HomePage";
import AboutPage from "./pages/About/AboutPage";
import IntroLawyerPage from "./pages/IntroLawyers/IntroLawyerPage";
import LoginPage from "./pages/Login/LoginPage"; // 이곳에서 /login을 /lo로 바꾸고 싶어요.
import AdminPage from "./pages/Login/AdminPage";
import UseRulesPage from "./pages/useRules/useRulesPage";
import WithdrawlPage from "./pages/withdrawl/withdrawlPage";
import ChatPage from "./pages/chat/chatPage";
import DocumentPage from "./pages/document/DocumentPage";

const GlobalStyle = createGlobalStyle`
  html, body {
    overflow: hidden;
  }
`;

const AppContainer = styled.div`
  background: url(${process.env.PUBLIC_URL}/assets/background.png) no-repeat
    center center;
  background-size: cover;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  color: #fff;
  text-align: center;
  overflow: hidden; /* 스크롤바 숨기기 */
`;

const Content = styled.div`
  flex: 1;
`;

const App = () => {
  return (
    <Router>
      <GlobalStyle />
      <AppContainer>
        <Header />
        <Content>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/introLawyer" element={<IntroLawyerPage />} />
            <Route path="/lo" element={<LoginPage />} />{" "}
            {/* /login을 /lo로 변경 */}
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/useRules" element={<UseRulesPage />} />
            <Route path="/withdrawl" element={<WithdrawlPage />} />
            <Route path="/chat" element={<ChatPage />} />
            <Route path="/document" element={<DocumentPage />} />
          </Routes>
        </Content>
        <Footer />
      </AppContainer>
    </Router>
  );
};

export default App;
