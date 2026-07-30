# 公开书架 PDF 目录

将 PDF 文件放入此目录后，会自动在 `/bookshelf/` 页面展示。

## 可选元数据

创建 `bookshelf-meta.json` 提供标题、描述、分类：

```json
{
  "my-book": {
    "title": "我的书籍",
    "description": "一本很好的书",
    "category": "技术"
  }
}
```

## 访问

- 书架列表：`/bookshelf/`
- 单本阅读：`/bookshelf/<slug>/`（slug 为文件名去除 .pdf 后缀）
