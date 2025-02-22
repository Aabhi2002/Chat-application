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
      host: env("DATABASE_HOST", "0.0.0.0"), // Render MySQL hostname
      port: env.int("DATABASE_PORT", 3306),
      database: env("DATABASE_NAME"), // Render MySQL database name
      user: env("DATABASE_USERNAME"), // Render MySQL username
      password: env("DATABASE_PASSWORD"), // Render MySQL password
      ssl: env.bool("DATABASE_SSL", false) ? { rejectUnauthorized: false } : false, 
    },
    debug: false,
  },
});
