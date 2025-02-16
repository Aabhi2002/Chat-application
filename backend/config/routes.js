module.exports = [
    { method: "POST", path: "/auth/register", handler: "auth.register" },
    { method: "POST", path: "/auth/login", handler: "auth.login" },
    { method: "POST", path: "/chat/send", handler: "message.sendMessage" },
    { method: "GET", path: "/chat/messages", handler: "message.getMessages" }
  ];
  