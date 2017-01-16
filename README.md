*基于`react` + `react-dom` + `react-router` + `ES6` + `sass` + `iconfont` + `webpack`, 相关包依赖请查看package.json*

*Ajax请求采用第三方包，`fetch`，使用说明请查看[官方文档](https://github.com/github/fetch)。*

## 目录结构
```bash
+____build                # 编译后输出目录
+____src                  # 开发源目录
|____.babelrc             # babel 预处理配置
|____.editorconfig        # 编辑器配置文件
|____.gitignore           # git 忽略设置
|____README.md            # 说明文档
|____package.json         # npm配置文件
|____server.js            # 开发环境服务器配置
|____webpack.config.js    # webpack打包配置文件
```


## 构建说明
1. 安装[node](https://nodejs.org/en/)，已安装请忽略。

2. clone项目

    ```bash
    git clone https://github.com/littlelake/rc-mobile.git
    ```

3. 进入项目

    ```bash
    cd rc-mobile
    ```

4. 安装依赖

    ```bash
    npm install
    ```

5. 本地开发

    ```bash
    npm run dev
    ```

6. 打包发布

    ```bash
    npm run build
    ```
