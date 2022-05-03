import React, { useEffect, useState } from "react";
import ReactDom from "react-dom";

function Login({ onLogin }) {
  const [username, setUsername] = useState("test");
  function handleSubmit(event) {
    event.preventDefault();
    onLogin(username);
  }

  return (
    <div>
      <h1>Please log in</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <button>Login</button>
      </form>
    </div>
  );
}

function ChatMessage({ chat: { author, message } }) {
  return (
    <div>
      <strong>{author}</strong>
      {message}
    </div>
  );
}

function ChatApplication({ username }) {
  const [ws, setWs] = useState();
  useEffect(() => {
    const ws = new WebSocket("ws://localhost:3000/");
    setWs(ws);
  }, []);

  const [chatLog, setChatLog] = useState([
    {
      author: "Sebastian",
      message: "Skjer gutta,",
    },
    {
      author: "Vegard",
      message: "Du er den perfekte mann Sebastian",
    },
    {
      author: "Ramstad",
      message: "Poker eller gutta?",
    },
  ]);
  const [message, setMessage] = useState("");

  function handleNewMessage(event) {
    event.preventDefault();
    setChatLog([...chatLog, { author: username, message }]);
    setMessage("");
  }

  return (
    <div className={"application"}>
      <header>Chat Application {username}</header>
      <main>
        {chatLog.map((chat, index) => (
          <ChatMessage key={index} chat={chat} />
        ))}
      </main>
      <footer>
        <form onSubmit={handleNewMessage}>
          <input value={message} onChange={(e) => setMessage(e.target.value)} />
          <button>Submit</button>
        </form>
      </footer>
    </div>
  );
}

function Application() {
  const [username, setUsername] = useState();

  if (!username) {
    return <Login onLogin={(username) => setUsername(username)} />;
  }

  return <ChatApplication username={username} />;
}

ReactDom.render(<Application />, document.getElementById("app"));
