
const Config = {
  host: {
    // 本地环境
    local: 'http://192.168.1.154:3001',
    // 服务器测试环境
    test: 'http://test.customer.com'
  },

  api: {
    // 短信验证码发送接口
    sendCode: '/customer/sendCode',
  }
}

export default Config;