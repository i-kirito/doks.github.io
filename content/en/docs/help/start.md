---
title: "搭建"
description: "记录如何在 Node.js 和 Hugo 环境下搭建并启动本站这类 Doks 静态文档页面。"
lead: "从依赖安装到本地预览，快速启动一个 Doks/Hugo 文档站。"
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

{{< alert icon="i" text="本站使用 Node.js 管理前端依赖，并通过 Hugo 生成静态页面。" />}}

## 前置需要

- 安装 [Node.js LTS](https://nodejs.org/en)，用于运行 npm 脚本。
- 克隆本站源码：[i-kirito/doks.github.io](https://github.com/i-kirito/doks.github.io)。

## 安装依赖

进入项目目录后安装依赖：

```bash
npm install
```

## 启动本地服务

启动本地预览：

```bash
npm run start
```

默认访问地址：

```text
http://localhost:1313/
```
