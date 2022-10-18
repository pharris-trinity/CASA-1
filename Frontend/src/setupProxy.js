const { createProxyMiddleware } = require('http-proxy-middleware');
require('dotenv').config({path: "../../.env"});

const PORT = process.env.PORT || 3001;

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:' + PORT,
      changeOrigin: true,
    })
  );
};