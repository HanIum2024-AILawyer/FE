import React from "react";
import { useNavigate } from "react-router-dom";

function Notification() {
  const navigate = useNavigate();

  const notifications = [
    {
      type: "board",
      text: "어제 가장 Hot했던 글이에요 : ESL 책 빌려주실분",
      time: "2시간 전",
    },
    {
      type: "friend",
      text: "??????이 친구추가를 요청하였습니다",
      time: "2시간 전",
    },
    {
      type: "board",
      text: "어제 가장 Hot했던 글이에요 : ESL 책 빌려주실분",
      time: "2시간 전",
    },
    {
      type: "board",
      text: "어제 가장 Hot했던 글이에요 : ESL 책 빌려주실분",
      time: "2시간 전",
    },
    {
      type: "friend",
      text: "??????이 친구추가를 요청하였습니다",
      time: "2시간 전",
    },
    {
      type: "board",
      text: "어제 가장 Hot했던 글이에요 : ESL 책 빌려주실분",
      time: "2시간 전",
    },
    {
      type: "board",
      text: "어제 가장 Hot했던 글이에요 : ESL 책 빌려주실분",
      time: "2시간 전",
    },
  ];

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <button style={styles.backButton} onClick={() => navigate(-1)}>
          &lt;
        </button>
        <h1 style={styles.title}>알림</h1>
        <div style={styles.profilePic}></div>
      </div>
      <div style={styles.notifications}>
        {notifications.map((notification, index) => (
          <div key={index} style={styles.notification}>
            <div style={styles.icon(notification.type)}></div>
            <div style={styles.textContainer}>
              <p style={styles.text}>{notification.text}</p>
              <span style={styles.time}>{notification.time}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "400px",
    margin: "0 auto",
    fontFamily: "Arial, sans-serif",
    border: "1px solid #d3d3d3",
    borderRadius: "8px",
    overflow: "hidden",
  },
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#3f51b5",
    color: "white",
    padding: "10px",
  },
  backButton: {
    background: "none",
    border: "none",
    color: "white",
    fontSize: "1.5em",
    cursor: "pointer",
  },
  title: {
    margin: 0,
    fontSize: "1.2em",
  },
  profilePic: {
    width: "40px",
    height: "40px",
    backgroundColor: "#d3d3d3",
    borderRadius: "50%",
  },
  notifications: {
    padding: "10px",
  },
  notification: {
    display: "flex",
    alignItems: "center",
    padding: "10px 0",
    borderBottom: "1px solid #d3d3d3",
  },
  icon: (type) => ({
    width: "30px",
    height: "30px",
    backgroundImage:
      type === "board"
        ? "url(https://image.flaticon.com/icons/png/512/889/889140.png)"
        : "url(https://image.flaticon.com/icons/png/512/1077/1077114.png)",
    backgroundSize: "cover",
    marginRight: "10px",
  }),
  textContainer: {
    flex: 1,
  },
  text: {
    margin: "0 0 5px 0",
  },
  time: {
    fontSize: "0.8em",
    color: "#888",
  },
};

export default Notification;
