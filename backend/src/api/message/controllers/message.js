module.exports = {
    async sendMessage(ctx) {
      const { text, userId } = ctx.request.body;
      if (!text || !userId) return ctx.badRequest("Invalid data");
  
      const message = await strapi.entityService.create("api::message.message", {
        data: { text, user: userId },
      });
  
      return ctx.send({ message: "Message sent", data: message });
    },
  
    async getMessages(ctx) {
      const messages = await strapi.db.query("api::message.message").findMany({
        populate: ["user"],
        orderBy: { timestamp: "asc" },
      });
  
      return ctx.send(messages);
    }
  };
  