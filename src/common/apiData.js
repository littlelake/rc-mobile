
import config from './config.js';

export default class ApiData {
  constructor(){
    // 服务器地址，修改此处切换环境
    this.host = config.host.test;
    // api接口列表
    this.api = config.api;
  }
  
  // POST请求
  post(url, params, callback) {
    fetch(url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(params)
    }).then((response) => {
      return response.json();
    }).then((data) => {
      if (callback) callback(data);
    })
  }

  // 短信验证码
  sendCode(params, callback) {
    this.post(this.host + this.api.sendCode, params, callback)
  }
}
