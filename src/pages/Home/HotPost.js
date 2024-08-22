import React, { useState, useEffect } from "react";
import styled from "styled-components";

const HotPostContainer = styled.div`
  display: flex;
  align-items: center;
  background-color: #fff;
  padding: 7px 12px;
  border: 2px solid red;
  border-radius: 10px;
  margin: 10px 0;
  transform: translateY(8px);
  width: 80vw;
`;

const HotLabel = styled.div`
  color: red;
  font-weight: bold;
  font-size: 0.75rem;
  margin-right: 10px;
`;

const HotTitle = styled.div`
  flex: 1;
  font-weight: normal;
  font-size: 0.65rem;
`;

const HotLikes = styled.div`
  display: flex;
  font-size: 0.75rem;
  align-items: center;
`;

const LikeIcon = styled.img`
  width: 10px;
  height: auto;
  margin-right: 5px;
`;

function HotPost() {
  const [hotPost, setHotPost] = useState(null);

  useEffect(() => {
    // 24시간 이내에 가장 높은 좋아요 수를 받은 게시글을 가져오는 API 호출
    fetch("http://localhost:8080/api/v1/posts/hot")
      .then((response) => response.json())
      .then((data) => {
        setHotPost(data.hotPost);
      })
      .catch((error) => console.error("Failed to fetch hot post:", error));
  }, []);

  if (!hotPost) {
    return <div>Loading...</div>;
  }

  return (
    <HotPostContainer>
      <HotLabel>Now HOT!</HotLabel>
      <HotTitle>{hotPost.title}</HotTitle>
      <HotLikes>
        <LikeIcon src="/images/like_icon.png" alt="좋아요 아이콘" />
        <span>{hotPost.likeCount}</span>
      </HotLikes>
    </HotPostContainer>
  );
}

export default HotPost;
