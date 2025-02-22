// module.exports = (config, { strapi }) => {
//     const WebSocket = require("ws");
  
//     strapi.server.wss = new WebSocket.Server({ server: strapi.server });
  
//     strapi.server.wss.on("connection", (ws) => {
//       console.log("WebSocket Client Connected");
  
//       ws.on("message", (message) => {
//         console.log("Received:", message.toString());
//         strapi.server.wss.clients.forEach((client) => {
//           if (client.readyState === WebSocket.OPEN) {
//             client.send(message.toString());
//           }
//         });
//       });
  
//       ws.on("close", () => console.log("WebSocket Client Disconnected"));
//     });
  
//     console.log("WebSocket initialized inside Strapi.");
//   };
  




module.exports = (config, { strapi }) => {
    const WebSocket = require("ws");
  
    // Ensure WebSocket is initialized only once
    if (!strapi.server.wss) {
      strapi.server.wss = new WebSocket.Server({ noServer: true });
  
      // Handle WebSocket upgrades properly
      strapi.server.on("upgrade", (request, socket, head) => {
        strapi.server.wss.handleUpgrade(request, socket, head, (ws) => {
          strapi.server.wss.emit("connection", ws, request);
        });
      });
  
      strapi.server.wss.on("connection", (ws) => {
        console.log("✅ WebSocket Client Connected");
  
        ws.on("message", (message) => {
          try {
            const textMessage = message.toString();
            console.log("📩 Received:", textMessage);
  
            // Broadcast message to all clients
            strapi.server.wss.clients.forEach((client) => {
              if (client.readyState === WebSocket.OPEN) {
                client.send(textMessage);
              }
            });
          } catch (error) {
            console.error("⚠️ Error processing message:", error);
          }
        });
  
        ws.on("close", () => console.log("❌ WebSocket Client Disconnected"));
        ws.on("error", (error) => console.error("⚠️ WebSocket Error:", error));
      });
  
      console.log("🚀 WebSocket initialized inside Strapi.");
    }
  };
  
  module.exports = [
    {
      name: "strapi::security",
      config: {
        contentSecurityPolicy: {
          useDefaults: true,
          directives: {
            "connect-src": ["'self'", "ws:", "wss:"], // Allow WebSocket connections (ws & wss)
          },
        },
      },
    },
  ];
  