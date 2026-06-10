---
title: "导航站概览"
description: "说明 nav.xazz.top 导航站的定位、数据结构、发布方式和维护原则。"
lead: "个人导航站用于集中整理常用网站、工具入口和自建服务，重点是好找、可用、易维护。"
date: 2023-04-04T08:48:57+00:00
lastmod: 2026-06-10T16:20:00+08:00
draft: false
images: []
menu:
  docs:
    parent: "webstack"
weight: 100
toc: true
---

## 站点定位

`nav.xazz.top` 是个人导航站，用来聚合常用入口：

- 自建服务：博客、文档站、探针、AI 镜像等。
- 编程学习：文档、教程、开发工具。
- 素材资源：图标、图片、字体、设计素材。
- 娱乐和生活：视频、游戏、工具站。
- 最近热门工具：AI、前端、效率类站点。

导航站适合做“入口”，不适合放太长教程。详细说明和维护流程放在 Doks 文档站。

## 本地项目

本地路径：

```text
/Volumes/ikirito/Claude/hugo/nav.github.io
```

公开地址：

```text
https://nav.xazz.top/
```

源码仓库：

```text
https://github.com/i-kirito/nav.github.io
```

## 数据结构

主要维护对象：

| 文件 | 作用 |
|---|---|
| `data/webstack.yml` | 首页主体分类和网址 |
| `data/friendlinks.yml` | 友情链接 |
| `data/headers.yml` | 顶部导航 |
| `data/link_status.yml` | 检测后的在线状态 |
| `content/about.md` | 关于页面 |
| `static/` | 图标、图片和静态资源 |
| `docs/` | 构建后的发布目录 |

`data/webstack.yml` 是最重要的内容源。每次新增、删除或调整网址，都应该优先改这里。

## 维护原则

1. 先保持分类稳定，再扩展内容。
2. 每个卡片只表达一个用途。
3. 标题短，描述清楚。
4. 图标稳定，不依赖容易失效的临时地址。
5. 批量更新后必须跑链接检测。
6. 本地构建和公开域名都要检查。

{{< alert icon="i" text="导航站最容易出问题的是链接失效、图标失效和公开站点未更新。每次发布都要分别检查数据、构建结果和线上域名。" />}}

## 状态点

导航站卡片上的在线状态点来自 `data/link_status.yml`。

| 颜色 | 含义 |
|---|---|
| 绿色 | 检测正常 |
| 红色 | 检测异常 |

检测脚本会同时收集 `webstack.yml`、`friendlinks.yml` 和 `headers.yml` 中的 URL。检测结果不是绝对真相，遇到登录墙、反爬、限流时需要人工复核。

## 和文档站的分工

| 站点 | 适合放什么 |
|---|---|
| 导航站 | 入口、链接、简短说明 |
| 文档站 | 教程、命令、排障记录、维护流程 |
| 博客 | 长文、折腾记录、公开文章 |

如果一个内容超过一两句话，就不适合塞进导航站卡片，应该写到文档站或博客。

## 常用流程

一次完整维护通常是：

```text
修改 data/webstack.yml
-> 运行 scripts/check_links.py
-> Hugo 构建 docs/
-> 本地检查页面
-> git 提交推送
-> 打开 nav.xazz.top 验证
```

详细命令见 [导航站维护](/docs/webstack/quick-start/)。
