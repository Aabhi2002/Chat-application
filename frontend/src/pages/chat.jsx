// import React, { useEffect, useState } from "react";
// import "./Chat.css"; // Import the CSS file

// let socket;

// function connectWebSocket(setMessages) {
//   socket = new WebSocket("ws://localhost:8080");

//   socket.onopen = () => console.log("✅ Connected to WebSocket Server");

//   socket.onmessage = async (event) => {
//     let textMessage = event.data;

//     if (event.data instanceof Blob) {
//       textMessage = await event.data.text(); // Convert Blob to text
//     }

//     console.log("📩 Message received:", textMessage);

//     setMessages((prev) => [...prev, { text: textMessage, sender: "other" }]); // Show received message
//   };

//   socket.onclose = () => {
//     console.log("⚠️ WebSocket closed, reconnecting...");
//     setTimeout(() => connectWebSocket(setMessages), 3000); // Auto-reconnect
//   };

//   socket.onerror = (error) => {
//     console.error("❌ WebSocket error:", error);
//     socket.close();
//   };
// }

// function Chat() {
//   const [message, setMessage] = useState("");
//   const [messages, setMessages] = useState([]);

//   useEffect(() => {
//     connectWebSocket(setMessages);
//   }, []);

//   const sendMessage = () => {
//     if (message.trim() !== "" && socket.readyState === WebSocket.OPEN) {
//       socket.send(message);
//       setMessages((prev) => [...prev, { text: `You: ${message}`, sender: "self" }]); // Show sent message
//       setMessage("");
//     } else {
//       console.warn("⚠️ WebSocket is not open. Message not sent.");
//     }
//   };

//   return (
//     <div className="chat-container">
//       <h2 className="chat-heading">💬 Live Chat</h2>
//       <div className="chat-box">
//         {messages.map((msg, i) => (
//           <p key={i} className={msg.sender === "self" ? "sent-message" : "received-message"}>
//             {msg.text}
//           </p>
//         ))}
//       </div>
//       <div className="input-container">
//         <input
//           type="text"
//           className="chat-input"
//           placeholder="Type your message..."
//           value={message}
//           onChange={(e) => setMessage(e.target.value)}
//         />
//         <button className="send-button" onClick={sendMessage}>
//           Send 🚀
//         </button>
//       </div>
//     </div>
//   );
// }

// export default Chat;






import React, { useEffect, useState } from "react";
import "./Chat.css"; // Import CSS file

let socket;

function connectWebSocket(setMessages, messages) {
  if (socket && socket.readyState === WebSocket.OPEN) {
    return; // Prevent multiple connections
  }

  socket = new WebSocket("ws://localhost:8080");

  socket.onopen = () => console.log("✅ Connected to WebSocket Server");

  socket.onmessage = async (event) => {
    let textMessage = event.data;

    if (event.data instanceof Blob) {
      textMessage = await event.data.text(); // Convert Blob to text
    }

    console.log("📩 Message received:", textMessage);

    // 🔥 Prevent duplicate messages by checking if it already exists
    if (!messages.some((msg) => msg.text === textMessage)) {
      setMessages((prev) => [...prev, { text: textMessage, sender: "other" }]); // Show received message
    }
  };

  socket.onclose = () => {
    console.log("⚠️ WebSocket closed, reconnecting...");
    setTimeout(() => connectWebSocket(setMessages, messages), 3000); // Auto-reconnect
  };

  socket.onerror = (error) => {
    console.error("❌ WebSocket error:", error);
    socket.close();
  };
}

function Chat() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    connectWebSocket(setMessages, messages);
  }, [messages]); // Dependency array to track messages

  const sendMessage = () => {
    if (message.trim() !== "" && socket.readyState === WebSocket.OPEN) {
      socket.send(message);
      setMessages((prev) => [...prev, { text: `You: ${message}`, sender: "self" }]); // Show sent message
      setMessage("");
    } else {
      console.warn("⚠️ WebSocket is not open. Message not sent.");
    }
  };

  return (
    <div className="chat-container">
      <h2 className="chat-heading">💬 Live Chat</h2>
      <div className="chat-box">
        {messages.map((msg, i) => (
          <p key={i} className={msg.sender === "self" ? "sent-message" : "received-message"}>
            {msg.text}
          </p>
        ))}
      </div>
      <div className="input-container">
        <input
          type="text"
          className="chat-input"
          placeholder="Type your message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button className="send-button" onClick={sendMessage}>
          Send 🚀
        </button>
      </div>
    </div>
  );
}

export default Chat;
