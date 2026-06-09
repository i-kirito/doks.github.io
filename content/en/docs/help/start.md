---
title: "搭建"
description: "记录如何在 Node.js 和 Hugo 环境下搭建并启动本站这类 Doks 静态文档页面。"
lead: "如何搭建类似本站点的页面"
date: 2020-11-12T13:26:54+01:00
lastmod: 2020-11-12T13:26:54+01:00
draft: false
images: []
menu:
  docs:
    parent: "help"
weight: 610
toc: true
---

{{< alert icon="💡" text="Node.js框架下部署hugo静态页面" />}}

## 前置需要

- 下载最新 node.js [`LTS版本`](https://nodejs.org/en) 安装到本地或Linux服务器:

- fork并克隆本站源码 [`GitHub`](https://github.com/i-kirito/doks.github.io) 到本地或Linux服务器:

### 安装依赖

- 在主题目录下执行命令安装依赖:

```bash
npm install
```

### 启动本地服务

- 安装成功后执行命令启动本地服务:

```bash
npm run start
```
