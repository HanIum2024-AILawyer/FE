import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Header from "./Header";
import Tabs from "./Tabs";
import HotPost from "./HotPost";
import Post from "./Post";
import BottomNavigation from "./BottomNavigation";

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
  min-height: 100vh;
`;

const WriteButton = styled.img`
  position: fixed;
  right: 5vw;
  bottom: 26vw;
  cursor: pointer;
  z-index: 100;
`;

const PostsContainer = styled.div`
  width: 100%;
  max-width: 800px;
  padding: 0px;
  overflow-y: auto;
  margin-top: 0px;
`;

const PostButton = styled.button`
  background: none;
  border: none;
  width: 100%;
  text-align: left;
  padding: 8px;
  margin: 0;
  cursor: pointer;
  border-radius: 5px;
  transition: background 0.3s ease;

  &:hover {
    background-color: #f0f0f0;
  }
`;

function Home() {
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState("자유게시판");
  const [posts, setPosts] = useState([]);
  const [hotPost, setHotPost] = useState(null);

  useEffect(() => {
    let apiEndpoint = "";

    // 선택된 탭에 따라 API 엔드포인트를 설정
    switch (selectedTab) {
      case "자유게시판":
        apiEndpoint = "http://localhost:8080/api/v1/posts/free";
        break;
      case "비밀게시판":
        apiEndpoint = "http://localhost:8080/api/v1/posts/secret";
        break;
      case "중고장터":
        apiEndpoint = "http://localhost:8080/api/v1/posts/market";
        break;
      default:
        break;
    }

    // 서버에서 선택된 게시판의 게시글을 가져오는 API 호출
    fetch(apiEndpoint)
      .then((response) => response.json())
      .then((data) => {
        setPosts(data.post); // 게시글 리스트 설정

        if (selectedTab === "비밀게시판") {
          setHotPost(data.hotPost); // 비밀게시판의 경우 hotPost도 가져옴
        } else {
          setHotPost(null); // 다른 게시판에서는 hotPost를 초기화
        }
      })
      .catch((error) => console.error("Failed to fetch posts:", error));
  }, [selectedTab]);

  const goWritePage = () => {
    navigate("/writepage");
  };

  return (
    <HomeContainer>
      <Header />
      <Tabs selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
      {hotPost && <HotPost hotPost={hotPost} />}
      <WriteButton
        src="/images/writeButton.png"
        alt="글쓰기 버튼"
        onClick={goWritePage}
      />
      <PostsContainer>
        {posts.map((post) => (
          <Link to={`/post/${post.id}`} key={post.id}>
            <PostButton>
              <Post author={post.name} time={post.minute} title={post.title} />
            </PostButton>
          </Link>
        ))}
      </PostsContainer>
      <BottomNavigation />
    </HomeContainer>
  );
}

export default Home;
