var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config');
var server = new WebpackDevServer(webpack(config), {
  publish: config.output.publish
});

server.app.get('*', function (req, res) {
  res.sendFile(__dirname + '/index.html')
});

// ================================
// 接口mock
// ================
// 注册短信
var bodyParser = require('body-parser');
server.app.use(bodyParser.json());
server.app.use(bodyParser.urlencoded({ extended: false }));

server.app.post('/customer/sendCode', function(req, res) {
  if (req.body.phone === '13333333333') {
    res.send({
      "code": "0",
      "message": "短信发送成功！"
    })
  } else {
    res.send({
      "code": "-1",
      "message": "短信发送失败！"
    })
  }
})

// ==================================

server.listen(3001);