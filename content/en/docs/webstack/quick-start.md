---
title: "Vercel 部署"
description: "记录使用 Vercel 托管 WebStack-Hugo 静态导航站的基础流程。"
lead: "使用 Vercel 托管 WebStack-Hugo 静态导航站。"
date: 2020-11-16T13:59:39+01:00
lastmod: 2020-11-16T13:59:39+01:00
draft: false
images: []
menu:
  docs:
    parent: "webstack"
weight: 110
toc: true
---

## 准备工作

- 注册 [Vercel](https://vercel.com/) 账号，并绑定 GitHub。
- 准备 WebStack-Hugo 项目仓库，例如
  [shenweiyan/WebStack-Hugo](https://github.com/shenweiyan/WebStack-Hugo)。

{{< details "Vercel 是什么？" >}}
Vercel 是一个云端部署平台，适合托管静态站点和现代前端应用。对于 Hugo
这类静态站点，只需要绑定仓库并配置构建命令，就可以自动完成部署。
{{< /details >}}

## 创建项目

在 Vercel 控制台中创建新项目，选择 GitHub 仓库，确认构建配置后点击部署。

## 绑定域名

在项目的域名设置中添加自定义域名，并按 Vercel 提示配置 DNS 记录。

## 快速克隆主题

安装 Hugo 并配置好环境变量后，可以在 Hugo 项目的 `themes/` 目录下克隆主题：

```bash
git clone https://github.com/shenweiyan/WebStack-Hugo.git
```
