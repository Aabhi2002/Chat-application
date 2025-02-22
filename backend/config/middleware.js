module.exports = (config, { strapi }) => {
    const WebSocket = require("ws");
  
    strapi.server.wss = new WebSocket.Server({ server: strapi.server });
  
    strapi.server.wss.on("connection", (ws) => {
      console.log("WebSocket Client Connected");
  
      ws.on("message", (message) => {
        console.log("Received:", message.toString());
        strapi.server.wss.clients.forEach((client) => {
          if (client.readyState === WebSocket.OPEN) {
            client.send(message.toString());
          }
        });
      });
  
      ws.on("close", () => console.log("WebSocket Client Disconnected"));
    });
  
    console.log("WebSocket initialized inside Strapi.");
  };
  