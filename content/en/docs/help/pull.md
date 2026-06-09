---
title: "部署"
description: "记录将本地 Hugo/Doks 项目推送到远程仓库并生成静态页面的基础流程。"
lead: "把本地项目推送到远程仓库，并生成可发布的静态页面。"
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

## 推送到远程仓库

可以使用 [GitHub Desktop](https://desktop.github.com/) 推送，也可以直接用命令行完成。

命令行流程如下：

```bash
git init
git add .
git commit -m "first commit"
git remote add origin <your-repository-url>
git push -u origin main
```

## 生成静态页面

部署前可以先在本地生成预览版本，确认页面能够正常构建。

```bash
npm run build:preview
```
