export default {
  '/mocker.api': {
    target: 'http://rddgit.changhong.com:7300/mock/5dd5efbdc239b926aeb04627/seid.api',
    changeOrigin: true,
    secure: false,
    pathRewrite: { '^/mocker.api': '' },
  },
  '/api-gateway/pm': {
    target: 'http://localhost:8080',
    changeOrigin: true,
    secure: false,
    pathRewrite: { '^/api-gateway/pm': '' },
  },
  '/api-gateway': {
    target: 'http://10.233.0.170/api-gateway',
    changeOrigin: true,
    secure: false,
    pathRewrite: { '^/api-gateway': '' },
  },
};
