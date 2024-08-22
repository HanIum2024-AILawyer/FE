import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";

const Container = styled.div`
  max-width: 100vw;
  margin: 0 auto;
  font-family: Arial, sans-serif;
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

const Header = styled.header`
  display: flex;
  align-items: center;
  background-color: #3f51b5;
  color: white;
  padding: 10px;
  position: relative;
`;

const BackButton = styled.button`
  background: none;
  border: none;
  color: white;
  font-size: 1.5em;
  cursor: pointer;
`;

const Title = styled.h1`
  flex: 1;
  text-align: center;
  font-size: 1.2em;
  margin: 0;
`;

const PostContent = styled.div`
  padding: 20px 20px 10px 20px;
  border-bottom: 1px solid #ccc;
  border-radius: 10px;
`;

const PostAuthor = styled.div`
  display: flex;
  align-items: center;
`;

const AuthorPic = styled.div`
  width: 40px;
  height: 40px;
  background-color: #ccc;
  border-radius: 50%;
  margin-right: 10px;
  background-image: url(${(props) => props.src});
  background-size: cover;
  background-position: center;
`;

const AuthorInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const AuthorName = styled.p`
  margin: 0;
  font-weight: bold;
`;

const PostDate = styled.p`
  margin: 0;
  font-size: 0.8em;
  color: gray;
`;

const PostText = styled.div`
  margin-top: 10px;
`;

const PostImages = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 10px;
  gap: 10px;
  overflow-x: auto;
  padding-bottom: 10px;

  &::-webkit-scrollbar {
    display: none;
  }

  -ms-overflow-style: none;
  scrollbar-width: none;
`;

const PostImage = styled.div`
  min-width: 100px;
  height: 100px;
  background-color: ${({ src }) => (src ? "#ccc" : "transparent")};
  border-radius: 10px;
  flex-shrink: 0;
  background-size: cover;
  background-position: center;
  background-image: ${({ src }) => (src ? `url(${src})` : "none")};
`;

const PostActions = styled.div`
  display: flex;
  justify-content: left;
  margin-top: 10px;
  gap: 10px;
`;

const ActionButton = styled.button`
  background: none;
  border: none;
  color: #3f51b5;
  cursor: pointer;
  display: flex;
  align-items: center;
`;

const ActionIcon = styled.img`
  width: 20px;
  height: auto;
  margin-right: 5px;
`;

const CommentsSection = styled.div`
  padding: 10px 20px;
  flex-grow: 1;
  overflow-y: auto;

  &::-webkit-scrollbar {
    display: none;
  }

  -ms-overflow-style: none;
  scrollbar-width: none;
`;

const Comment = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
  padding: 10px;
  background-color: #f9f9f9;
  border-radius: 5px;
`;

const CommentAuthor = styled.div`
  display: flex;
  align-items: center;
`;

const CommentText = styled.p`
  margin: 5px 0 0 0;
`;

const CommentDate = styled.p`
  margin: 0;
  font-size: 0.8em;
  color: gray;
`;

const CommentActions = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 5px;
`;

const CommentInputSection = styled.div`
  display: flex;
  padding: 10px;
  background-color: white;
  border-top: 1px solid #ccc;
  border-radius: 10px 10px 0 0;
`;

const CommentInput = styled.input`
  flex-grow: 1;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-right: 10px;
`;

const CommentSubmit = styled.button`
  background-color: #3f51b5;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  cursor: pointer;
`;

const ContentWrapper = styled.div`
  flex-grow: 1;
  overflow-y: auto;

  &::-webkit-scrollbar {
    display: none;
  }

  -ms-overflow-style: none;
  scrollbar-width: none;
`;

function PostDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [newComment, setNewComment] = useState("");
  const [anonymousCount, setAnonymousCount] = useState(1);

  useEffect(() => {
    fetch(`/api/posts/${id}`)
      .then((response) => response.json())
      .then((data) => {
        const mappedPost = {
          author: data.post.name,
          date: data.post.minute,
          title: data.post.title,
          content: data.post.content,
          images: data.post.imageUrlList,
          likes: data.post.likeCount,
          scrabs: data.post.scrapCount,
          comments: data.CommentPostList.map((comment) => ({
            author: comment.name,
            date: comment.minute,
            content: comment.commentContent,
            likes: comment.likeCount,
            imageUrl: comment.imageUrl,
          })),
        };
        setPost(mappedPost);
      });
  }, [id]);

  const handleCommentSubmit = () => {
    if (newComment.trim()) {
      const newCommentData = {
        commentContent: newComment,
        anonymity: true, // 익명 여부를 true로 설정
      };

      fetch(`http://localhost:8080/api/v1/page/${id}/sendComment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newCommentData),
      })
        .then((response) => response.json())
        .then((data) => {
          // 서버에서 성공적으로 댓글이 추가된 경우에만 상태를 업데이트
          const updatedComments = [
            ...post.comments,
            {
              author: `익명${anonymousCount}`,
              date: new Date().toLocaleString(),
              content: newComment,
              likes: 0,
              imageUrl: null, // 익명 댓글이므로 사용자 이미지 없음
            },
          ];

          setPost({ ...post, comments: updatedComments });
          setNewComment(""); // 입력 필드 초기화
          setAnonymousCount(anonymousCount + 1); // 익명 번호 증가
        });
    }
  };

  const handleLike = () => {
    fetch(`/api/posts/${id}/like`, {
      method: "POST",
    })
      .then((response) => response.json())
      .then((data) => {
        setPost((prevState) => ({
          ...prevState,
          likes: data.newLikeCount,
        }));
      });
  };

  const handleScrap = () => {
    fetch(`/api/posts/${id}/scrap`, {
      method: "POST",
    })
      .then((response) => response.json())
      .then((data) => {
        setPost((prevState) => ({
          ...prevState,
          scrabs: data.newScrapCount,
        }));
      });
  };

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      <Header>
        <BackButton onClick={() => navigate(-1)}>{"<"}</BackButton>
        <Title>자유게시판</Title>
        <div style={{ width: "1.5em" }}></div>
      </Header>
      <ContentWrapper>
        <PostContent>
          <PostAuthor>
            <AuthorPic src={post.imageUrl} />
            <AuthorInfo>
              <AuthorName>{post.author}</AuthorName>
              <PostDate>{post.date}</PostDate>
            </AuthorInfo>
          </PostAuthor>
          <PostText>
            <h3>{post.title}</h3>
            <p>{post.content}</p>
          </PostText>
          {post.images.length > 0 && (
            <PostImages>
              {post.images.map((image, index) => (
                <PostImage key={index} src={image} />
              ))}
            </PostImages>
          )}
          <PostActions>
            <ActionButton onClick={handleLike}>
              <ActionIcon src="/images/likeicon.jpg" alt="좋아요" />
              {post.likes}
            </ActionButton>
            <ActionButton>
              <ActionIcon src="/images/commenticon.png" alt="댓글" />
              {post.comments.length}
            </ActionButton>
            <ActionButton onClick={handleScrap}>
              <ActionIcon src="/images/scrabicon.png" alt="스크랩" />
              {post.scrabs}
            </ActionButton>
          </PostActions>
        </PostContent>
        <CommentsSection>
          {post.comments.map((comment, index) => (
            <Comment key={index}>
              <CommentAuthor>
                <AuthorPic src={comment.imageUrl} />
                <div>
                  <AuthorName>{comment.author}</AuthorName>
                  <CommentDate>{comment.date}</CommentDate>
                </div>
              </CommentAuthor>
              <CommentText>{comment.content}</CommentText>
              <CommentActions>
                <ActionButton>좋아요 {comment.likes}</ActionButton>
                <ActionButton>신고</ActionButton>
              </CommentActions>
            </Comment>
          ))}
        </CommentsSection>
      </ContentWrapper>
      <CommentInputSection>
        <CommentInput
          type="text"
          placeholder="댓글을 입력하세요..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <CommentSubmit onClick={handleCommentSubmit}>전송</CommentSubmit>
      </CommentInputSection>
    </Container>
  );
}

export default PostDetail;
