---
title: "Vercel部署"
description: ""
lead: "使用vercel静态网页托管服务部署"
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

## Requirements

- [vercel](https://vercel.com/) — 注册一个免费账号并绑定github账号, 用于部署网站
- [themes](https://github.com/shenweiyan/WebStack-Hugo) — 主题webstack 根据介绍下载到本地部署并推送静态页面到github仓库

{{< details "What is vercel ?" >}}
Vercel是一个云端平台，可以帮助开发者快速构建和部署高性能的现代应用程序。它支持各种编程语言和框架，如React、Next.js、Vue、Angular和Svelte等。
{{< /details >}}

## Add a new Project

在vercel上添加一个新的项目, 选择github仓库, 选择webstack主题, 点击部署

### Manage Domains

在vercel上管理域名, 选择部署的项目, 点击添加域名

#### 快速克隆

- 安装好hugo并且配置好环境变量
- 在hugo的themes目录下克隆主题

```bash
git clone https://github.com/shenweiyan/WebStack-Hugo.git
```
