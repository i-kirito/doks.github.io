---
title: "部署"
description: "记录将本地 Hugo/Doks 项目构建、提交并发布到线上站点的基础流程。"
lead: "从本地构建到 GitHub 推送，再到线上站点验证的一条完整发布路径。"
date: 2023-04-04T15:22:20+01:00
lastmod: 2023-04-04T15:22:20+01:00
draft: false
images: []
menu: 
  docs:
    parent: "help"
weight: 620
toc: true
---

## 发布前检查

发布前先确认工作区里只有本次需要发布的改动：

```bash
git status --short
```

如果改了样式、模板或 Markdown，建议先执行一次构建：

```bash
npm run build
```

构建成功后，`public/` 目录会生成静态页面。它代表本地构建结果，不等于线上已经更新。

## 提交改动

按本次变更范围生成提交：

```bash
git add .
git commit -m "style: polish docs site"
```

如果只想提交部分文件，可以先用 `git diff --stat` 看改动范围，再精确 `git add`。

## 推送远程

推送到 GitHub：

```bash
git push -u origin main
```

推送完成后，等待 GitHub Pages 或部署平台完成发布。

## 线上验证

打开线上域名检查：

```text
https://doks.xazz.top/
```

建议同时检查：

- 首页是否加载新布局。
- `/docs/` 文档索引是否正常。
- 至少一个具体文档页是否能打开侧栏、目录和代码块。

{{< alert icon="i" text="本地 public/ 构建成功只证明静态页面生成正常；线上是否更新，要以 https://doks.xazz.top/ 的实际访问结果为准。" />}}
