import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Loginpage from "./pages/Loginpage";
import Mypage from "./pages/Mypage";
import Joinpage from "./pages/Joinpage";
import Joinpage2 from "./pages/Joinpage2";
import Notification from "./pages/notification";
import Home from "./pages/Home/App";
import PostDetail from "./pages/Home/PostDetail";
import WritePage from "./pages/writePage";
import FindPw from "./pages/findpw";
import ProfileChangePage from "./pages/ProfileChangePage";

// 꼭 페이지마다 import 시키세요
// 그리고 path를 설정하세요

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Loginpage />} />
        <Route path="/mypage" element={<Mypage />} />
        <Route path="/joinpage" element={<Joinpage />} /> {/* 소문자로 변경 */}
        <Route path="/joinpage2" element={<Joinpage2 />} />{" "}
        {/* 소문자로 변경 */}
        <Route path="/notification" element={<Notification />} />
        <Route path="/home" element={<Home />} />
        <Route path="/findpw" element={<FindPw />} />
        <Route path="/post/:postId" element={<PostDetail />} />
        <Route  path="/writepage" element={<WritePage />} />{" "}
        <Route path="/profilechange" element={<ProfileChangePage />} />
        {/* 컴포넌트 이름의 첫 글자를 대문자로 변경, 경로 소문자로 변경 */}
      </Routes>
    </Router>
  );
}

export default App;
