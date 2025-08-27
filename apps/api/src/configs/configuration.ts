export default () => ({
  app: {
    name: process.env.APP_NAME,
    version: process.env.APP_VERSION,
    port: process.env.PORT || 8000,
  },
  database: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    name: process.env.DB_NAME,
    user: process.env.DB_USER,
    pass: process.env.DB_PASS,
  },
});
