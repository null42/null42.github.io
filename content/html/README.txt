# HTML 文档目录

将 `.html` 文件放入本目录后，构建会自动生成 `/html/<路径>/` 页面。

可在同名 `.json` 文件中配置：

```json
{
  "title": "文档标题",
  "description": "文档说明"
}
```

HTML 会通过沙箱 iframe 静态托管，支持文档自身的 CSS、JavaScript、表单和全屏阅读。
