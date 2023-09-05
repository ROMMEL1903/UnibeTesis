const proxy= [
  {
    context: '/api',
    target: 'https://pay.payphonetodoesposible.com',
    secure: true,
    changeOrigin: true
  }
] 
module.exports = proxy;