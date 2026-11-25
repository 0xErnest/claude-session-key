# Claude SessionKey

一个轻量的 Chrome Manifest V3 扩展，手动读取当前 Chrome 用户里 `https://claude.ai/` 的 `sessionKey` Cookie。无需安装依赖、无需构建，密钥只在本机处理。

## 安装

1. 下载并解压[项目源码](https://github.com/0xErnest/claude-session-key/archive/refs/heads/main.zip)，或运行 `git clone https://github.com/0xErnest/claude-session-key.git`。
2. 打开 `chrome://extensions`，启用「开发者模式」。
3. 点击「加载已解压的扩展程序」，选择包含 `manifest.json` 的目录。
4. 在同一个 Chrome 用户中打开 https://claude.ai/ 并登录。
5. 点击扩展图标 →「读取 SessionKey」→「复制密钥」。

密钥默认遮挡，可手动显示或清除。关闭弹窗后不保留密钥；系统剪贴板可能保留复制的内容。

## 行为与限制

- 只申请 `cookies`、`clipboardWrite` 和 `https://claude.ai/*`。通过 Chrome Cookies API 读取该站点的 Cookie（包括 HttpOnly）。不读取其他站点。
- 用户点击复制时才写入剪贴板。
- 无后台脚本、内容注入、远程脚本、网络请求或持久化存储。CSP 禁止网络连接。
- 无痕窗口默认不可用；需在扩展详情中开启「在无痕模式下启用」，并在无痕窗口登录后打开插件。split 模式使用独立的 Cookie 上下文。
- 读到密钥不代表会话仍有效；插件不发送验证请求。Claude 若更改 Cookie 名称或存储方式，需要调整实现。
- SessionKey 是登录凭证，仅用于自己的账号，请勿公开或发给他人。

本项目与 Anthropic 无关联，亦未获得其认可。

## 排查

- 未找到：确认当前 Chrome 用户已登录 Claude；退出登录或 Cookie 被清理后需重新登录。
- 读取失败：检查扩展是否获准访问 claude.ai，以及浏览器是否受组织策略限制。

## 开发

编辑 `popup.html`、`popup.css` 或 `popup.js` 后，在 Chrome 扩展管理页面点击重新加载。
可运行 `node --check popup.js` 检查 JavaScript 语法。

## 赞助

[星桥订阅](https://xingqiaosub.com) 面向中国大陆用户，用人民币把 ChatGPT、Claude 订阅开通到你自己的账号。微信或支付宝付款，不需要海外信用卡，也不需要交出密码。Claude 开通时，提交本插件读取的 SessionKey 即可。

## 许可证

[MIT](LICENSE)
