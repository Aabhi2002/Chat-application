// module.exports = ({ env }) => ({
//     connection: {
//       client: "mysql",
//       connection: {
//         host: env("DATABASE_HOST", "localhost"),
//         port: env.int("DATABASE_PORT", 3306),
//         database: env("DATABASE_NAME", "chatdb"),
//         user: env("DATABASE_USERNAME", "chat_user"),
//         password: env("DATABASE_PASSWORD", "password123"),
//         ssl: env.bool("DATABASE_SSL", false),
//       },
//       debug: false,
//     },
//   });
  

module.exports = ({ env }) => ({
  connection: {
    client: "mysql",
    connection: {
      host: env("DATABASE_HOST"), // Render MySQL hostname
      port: env.int("DATABASE_PORT", 3306),
      database: env("DATABASE_NAME"), // Render MySQL database name
      user: env("DATABASE_USERNAME"), // Render MySQL username
      password: env("DATABASE_PASSWORD"), // Render MySQL password
      ssl: { rejectUnauthorized: false }, // SSL enable karo for security
    },
    debug: false,
  },
});
