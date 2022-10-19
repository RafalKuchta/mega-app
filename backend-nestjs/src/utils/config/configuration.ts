export default () => ({
  server: {
    ssl: process.env.SSL === 'true',
    domain: process.env.DOMAIN || '0.0.0.0',
    port: parseInt(process.env.PORT, 10) || 3001,
    salt: parseInt(process.env.SALT_ROUND),
    secretKey: process.env.SECRET_OR_KEY,
  },

  databaseMaria: {
    name: process.env.DB_DATABASE_SQL,
    host: process.env.DB_HOST_SQL,
    port: parseInt(process.env.DB_PORT_SQL),
    username: process.env.DB_USERNAME_SQL,
    password: process.env.DB_PASSWORD_SQL,
  },

});
