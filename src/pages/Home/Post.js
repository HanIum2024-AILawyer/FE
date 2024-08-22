import React from "react";
import styled from "styled-components";

// Define the styled-components

const PostContainer = styled.div`
  border-bottom: 1px solid #ddd;
  padding: 10px 0;
  transform: translateY(-3px);
`;

const PostHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  transform: translateX(7px);
`;

const AuthorInfo = styled.div`
  display: flex;
  align-items: center;
`;

const ProfileIcon = styled.img`
  width: 30px;
  height: auto;
  border-radius: 50%;
  margin-right: 10px;
`;

const PostTime = styled.div`
  color: gray;
  font-size: 0.75rem;
`;

const PostIcons = styled.div`
  display: flex;
  align-items: center;
  font-size: 13px;
  transform: translate(-10px, 57px);
`;

const PostIcon = styled.img`
  width: 15px;
  height: auto;
  margin-left: 7px;
  transform: translate(-2px);
`;

const PostBody = styled.div`
  padding: 10px 0;
  transform: translateX(2%);
`;

const PostTitle = styled.span`
  font-weight: bold;
  font-size: 1rem;
`;

const PostContent = styled.div`
  color: gray;
  font-size: 0.875rem;
`;

function Post({ author, time, title }) {
  return (
    <PostContainer>
      <PostHeader>
        <AuthorInfo>
          <ProfileIcon src="../images/profile_icon.png" alt="프로필" />
          <div>
            <div>{author}</div>
            <PostTime>{time}</PostTime>
          </div>
        </AuthorInfo>
        <PostIcons>
          <PostIcon src="../images/like_icon.png" alt="좋아요" />
          <span>13</span>
          <PostIcon src="/images/comment_icon.png" alt="댓글" />
          <span>13</span>
          <PostIcon src="../images/scrab_icon.png" alt="스크랩" />
          <span>13</span>
        </PostIcons>
      </PostHeader>
      <PostBody>
        <PostTitle>{title}</PostTitle>
        <PostContent>오후 5시에 7790 버스 좀 알려줘?</PostContent>
      </PostBody>
    </PostContainer>
  );
}

export default Post;
