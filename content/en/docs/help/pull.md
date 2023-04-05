---
title: "部署"
description: ""
lead: "把本地的项目部署到服务器上"
date: 2023-04-04T15:22:20+01:00
lastmod: 2020-04-04T15:22:20+01:00
draft: false
images: []
menu: 
  docs:
    parent: "help"
weight: 620
toc: true
---

## 把本地仓库推送到远程仓库

- 使用 [`GitHub Desktop`](https://desktop.github.com/) 推送到远程仓库

- 或者直接命令行推送到远程仓库

```bash
git init # 初始化本地仓库
git add . # 添加所有文件到暂存区
git commit -m "first commit" # 提交到本地仓库
git remote add origin
git push -u origin master # 推送到远程仓库
```
- node.js生成静态页面

```bash
npm run build:preview
```
