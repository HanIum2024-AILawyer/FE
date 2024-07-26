import React, { useState, useEffect } from "react";
import styled from "styled-components";

// Styled Components for Sidebar
const SidebarContainer = styled.div`
  width: 20%;
  height: 80vh;
  border-right: 1px solid #ccc;
  padding: 10px;
  box-sizing: border-box;
`;

const AppContainer = styled.div`
  display: flex;
  height: 80vh;
`;

const NewChatButton = styled.button`
  width: 90%;
  height: 25px;
  margin-bottom: 30px;
`;

const Logo = styled.div`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
  color: white;
`;

const ChatList = styled.ul`
  list-style: none;
  padding: 0;
  color: white;
`;

const ChatItem = styled.li`
  padding: 10px;
  cursor: pointer;
  border-bottom: 1px solid #ccc;

  &:hover {
    background-color: #a3a3a3;
  }
`;

// Styled Components for ChatWindow
const ChatWindowContainer = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
  height: 80vh;
`;

const ChatContent = styled.div`
  flex: 1;
  padding: 20px;
  overflow-y: auto;
  background-color: #f9f9f9;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const WelcomeMessage = styled.div`
  color: #888;
  font-size: 1.2em;
`;

const MessageList = styled.div`
  width: 100%;
`;

const Message = styled.div`
  display: flex;
  justify-content: ${(props) => (props.isUser ? "flex-end" : "flex-start")};
  margin-bottom: 20px;
`;

const MessageBubble = styled.div`
  max-width: 60%;
  padding: 10px;
  border-radius: 10px;
  background-color: ${(props) => (props.isUser ? "#007bff" : "#e5e5ea")};
  color: ${(props) => (props.isUser ? "#fff" : "#000")};
`;

const User = styled.span`
  font-weight: bold;
  color: #fff;
`;

const Bot = styled.span`
  font-weight: bold;
  color: #007bff;
`;

const Text = styled.span`
  margin-left: 10px;
  color: black;
`;

const ChatInputContainer = styled.div`
  display: flex;
  border-top: 1px solid #ccc;
  background-color: black;
  padding: 10px;
`;

const Input = styled.input`
  flex: 1;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-right: 10px;
`;

const Button = styled.button`
  padding: 10px 20px;
  border: none;
  background-color: #007bff;
  color: #fff;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const ChatApp = () => {
  const [selectedChat, setSelectedChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [chatHistory, setChatHistory] = useState({});

  const chatList = Object.keys(chatHistory); // 대화 리스트

  useEffect(() => {
    // Load chat history on initial render
    fetch("http://localhost:11434/api/chat-history")
      .then((response) => response.json())
      .then((data) => {
        setChatHistory(data);
      })
      .catch((error) => {
        console.error("Error loading chat history:", error);
      });
  }, []);

  useEffect(() => {
    if (selectedChat) {
      fetch(`http://localhost:11434/api/chat-history/${selectedChat}`)
        .then((response) => response.json())
        .then((data) => {
          setMessages(data.messages);
        })
        .catch((error) => {
          console.error("Error loading chat messages:", error);
        });
    } else {
      setMessages([]);
    }
  }, [selectedChat]);

  const handleSend = async () => {
    if (input.trim()) {
      const newMessages = [...messages, { isUser: true, text: input }];
      setMessages(newMessages);
      setInput("");

      try {
        const response = await fetch("http://localhost:11434/api/chat", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: "phi3",
            stream: false,
            messages: [
              {
                role: "user",
                content: input,
              },
            ],
          }),
        });
        const data = await response.json();
        const botMessage = data.messages[0].content;

        const updatedMessages = [
          ...newMessages,
          { isUser: false, text: botMessage },
        ];
        setMessages(updatedMessages);

        // Save chat history
        setChatHistory((prevChatHistory) => ({
          ...prevChatHistory,
          [selectedChat]: updatedMessages,
        }));

        await fetch(`http://localhost:11434/api/chat-history/${selectedChat}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            messages: updatedMessages,
          }),
        });
      } catch (error) {
        console.error("Error sending message to chatbot:", error);
        setMessages((prevMessages) => [
          ...prevMessages,
          { isUser: false, text: "챗봇 응답 오류." },
        ]);
      }
    }
  };

  const handleNewChat = async () => {
    try {
      const response = await fetch("http://localhost:11434/api/chat-history", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: `New Chat`,
        }),
      });
      const data = await response.json();
      const newChatId = data.id;

      setChatHistory((prevChatHistory) => ({
        ...prevChatHistory,
        [newChatId]: [],
      }));
      setSelectedChat(newChatId);
    } catch (error) {
      console.error("Error creating new chat:", error);
    }
  };

  return (
    <AppContainer>
      <SidebarContainer>
        <NewChatButton onClick={handleNewChat}>
          대화 새로 시작하기
        </NewChatButton>
        <Logo>대화기록</Logo>
        <ChatList>
          {chatList.map((chat, index) => (
            <ChatItem key={index} onClick={() => setSelectedChat(chat)}>
              {chat}
            </ChatItem>
          ))}
        </ChatList>
      </SidebarContainer>
      <ChatWindowContainer>
        <ChatContent>
          {messages.length === 0 ? (
            <WelcomeMessage>
              환영합니다! 메시지를 입력해 대화를 시작하세요.
            </WelcomeMessage>
          ) : (
            <MessageList>
              {messages.map((message, index) => (
                <Message key={index} isUser={message.isUser}>
                  <MessageBubble isUser={message.isUser}>
                    {message.isUser ? <User>User:</User> : <Bot>ChatGPT:</Bot>}
                    <Text>{message.text}</Text>
                  </MessageBubble>
                </Message>
              ))}
            </MessageList>
          )}
        </ChatContent>
        <ChatInputContainer>
          <Input
            type="text"
            placeholder="메시지를 입력하세요..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSend()}
          />
          <Button onClick={handleSend}>전송</Button>
        </ChatInputContainer>
      </ChatWindowContainer>
    </AppContainer>
  );
};

export default ChatApp;
