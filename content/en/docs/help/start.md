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

{{< alert icon="i" text="本站使用 Node.js 管理前端依赖，并通过 Hugo 生成静态页面；日常维护优先使用 npm 脚本，避免不同 Hugo 版本混用。" />}}

## 适用场景

当需要在本机预览、修改样式、整理 Markdown 内容或发布前做最后检查时，按本文流程启动站点。

## 环境准备

- 安装 [Node.js LTS](https://nodejs.org/en)，用于运行 npm 脚本。
- 克隆本站源码：[i-kirito/doks.github.io](https://github.com/i-kirito/doks.github.io)。
- 确认终端位于项目根目录，也就是包含 `package.json` 的目录。

可以先检查当前环境：

```bash
node --version
npm --version
```

## 安装依赖

首次拉取项目，或者 `node_modules/` 不存在时，安装依赖：

```bash
npm install
```

## 启动本地服务

启动开发预览：

```bash
npm run start
```

默认访问地址通常是：

```text
http://localhost:1313/
```

{{< details "端口被占用怎么办？" >}}
如果 `1313` 已被占用，可以直接指定端口：

```bash
npm run start -- --port 1324
```

然后访问 `http://localhost:1324/`。
{{< /details >}}

## 修改内容

- 文档内容放在 `content/en/docs/`。
- 首页布局在 `layouts/index.html`。
- 文档页布局在 `layouts/docs/` 和 `layouts/partials/sidebar/`。
- 主题样式主要在 `assets/scss/`。

## 本地检查

修改完成后至少打开以下页面：

- 首页：`/`
- 文档索引：`/docs/`
- 文档页：`/docs/help/start/`

如果页面能正常打开、侧栏能展开、搜索框不遮挡内容，就可以进入构建检查。
