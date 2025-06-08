import React, { useState, useEffect } from "react";

const socket = new WebSocket("ws://localhost:8080");

function App() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);

  useEffect(() => {
    socket.onmessage = (event) => {
      setChat((prev) => [...prev, event.data]);
    };
  }, []);

  const sendMessage = () => {
    if (message.trim() !== "") {
      socket.send(message);
      setChat((prev) => [...prev, You: ${message}]);
      setMessage("");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Real-Time Chat</h2>
      <div style={{ border: "1px solid gray", padding: "10px", height: "200px", overflowY: "scroll" }}>
        {chat.map((msg, index) => (
          <div key={index}>{msg}</div>
        ))}
      </div>
      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type a message"
        style={{ marginTop: "10px", width: "70%" }}
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}

export default App;
