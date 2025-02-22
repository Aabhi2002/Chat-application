const WebSocket = require("ws");
const WS_PORT = process.env.WS_PORT || 10000;
const wss = new WebSocket.Server({ port: WS_PORT});

wss.on("connection", (ws) => {
  console.log("Client connected");
  ws.on("message", (message) => {
    console.log("Received: ", message);
    ws.send(message); // Echo back
  });

  ws.on("close", () => console.log("Client disconnected"));
});

console.log("WebSocket server running on ws://localhost:10000");
