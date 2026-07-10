# 音频资源说明

将音乐文件放入本目录后，在 `.vitepress/theme/kb-theme.ts` 的 `visualMode.music` 数组中追加条目即可启用播放器：

```ts
music: [
  {
    title: '曲目名',
    artist: '作者',
    src: '/audio/your-file.mp3'
  }
]
```

支持格式：mp3、ogg、wav、flac。建议使用压缩后的 mp3 以减小体积。

`music` 为空数组时播放器自动隐藏，不会请求任何音频文件。
