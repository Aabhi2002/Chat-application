const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = {
  async register(ctx) {
    const { username, password } = ctx.request.body;
    const existingUser = await strapi.db.query("api::user.user").findOne({ where: { username } });
    if (existingUser) return ctx.badRequest("Username taken");

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await strapi.entityService.create("api::user.user", { data: { username, password: hashedPassword } });

    return ctx.send({ message: "User registered", user });
  },

  async login(ctx) {
    const { username, password } = ctx.request.body;
    const user = await strapi.db.query("api::user.user").findOne({ where: { username } });
    if (!user) return ctx.badRequest("Invalid credentials");

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return ctx.badRequest("Invalid credentials");

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "1h" });
    return ctx.send({ message: "Login successful", token });
  }
};
