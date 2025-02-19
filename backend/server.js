// const WebSocket = require("ws"); 
// const wss = new WebSocket.Server({ port: 8080 });

// wss.on("connection", (ws) => {
//   console.log("Client connected");

//   ws.on("message", (message) => {
//     const textMessage = message.toString(); // Convert Buffer to String
//     console.log("Received:", textMessage);

//     // Broadcast to all connected clients
//     wss.clients.forEach((client) => {
//       if (client.readyState === WebSocket.OPEN) {
//         client.send(textMessage);
//       }
//     });
//   });

//   ws.on("close", () => console.log("Client disconnected"));
// });

// console.log("WebSocket server running on ws://localhost:8080");





const WebSocket = require("ws");

const PORT = process.env.PORT || 8080; // Use Render's assigned port or default to 8080
const wss = new WebSocket.Server({ port: PORT });

wss.on("connection", (ws) => {
  console.log("Client connected");

  ws.on("message", (message) => {
    const textMessage = message.toString(); // Convert Buffer to String
    console.log("Received:", textMessage);

    // Broadcast to all connected clients
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(textMessage);
      }
    });
  });

  ws.on("close", () => console.log("Client disconnected"));
});

console.log(`WebSocket server running on ws://localhost:${PORT}`);
