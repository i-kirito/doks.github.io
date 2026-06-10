---
title: "WebStack 介绍"
description: "整理 WebStack 及其 Hugo 相关实现的参考资料，并记录本站导航项目采用的搭建方向。"
lead: "整理 WebStack 生态里常见的实现方式，并记录本站导航项目采用的搭建方向。"
date: 2023-04-04T08:48:57+00:00
lastmod: 2023-04-04T08:48:57+00:00
draft: false
images: []
menu:
  docs:
    parent: "webstack"
weight: 100
toc: true
---

## 项目概览

WebStack 是一类纯静态网址导航站方案，适合整理常用网站、工具入口和个人资源索引。
本站导航项目主要采用 Hugo 静态生成方案，方便托管到 GitHub Pages、Vercel
等静态平台。

本站对应的线上地址：

- 导航站：[https://nav.xazz.top/](https://nav.xazz.top/)
- 文档站：[https://doks.xazz.top/](https://doks.xazz.top/)

## 为什么选择 Hugo

Hugo 版本适合个人导航站，原因是维护链路短：

- 网址数据可以直接放进仓库，变更历史清楚。
- 静态生成速度快，适合 GitHub Pages 或 Vercel 托管。
- 不需要数据库后台，迁移和备份都简单。
- 能用脚本批量检测链接状态，减少失效入口。

{{< alert icon="i" text="导航站的内容源和发布结果要分开检查：本地数据文件正确，不代表线上域名已经完成部署。" />}}

## 日常维护对象

| 对象 | 作用 | 维护重点 |
|---|---|---|
| 分类 | 决定首页分组 | 保持数量克制，避免分类过碎 |
| 链接 | 每张导航卡片 | 标题清晰、URL 可访问、图标稳定 |
| 状态点 | 标识在线状态 | 定期检测，异常链接及时修复 |
| 静态输出 | 发布文件 | 构建成功后再推送发布 |

## 参考项目

参考过的开源项目：

- [liutongxu/liutongxu.github.io](https://github.com/liutongxu/liutongxu.github.io)
- [iplaycode/webstack-hugo](https://github.com/iplaycode/webstack-hugo)
- [shenweiyan/WebStack-Hugo](https://github.com/shenweiyan/WebStack-Hugo)

## 常见实现方式

WebStack 生态有多种实现方式。静态托管最轻量，适合个人导航站；带后台的
WordPress、Laravel、Java 等版本更适合多人维护或需要在线管理的场景。

{{< details "展开参考实现清单" >}}

- **静态托管**：下载项目后修改数据文件，即可部署到静态托管平台。

- **WordPress 主题**：适合已经使用 WordPress 的站点。
  源码：[owen0o0/WebStack](https://github.com/owen0o0/WebStack)。

- **Laravel 后台系统**：适合需要后台管理的导航站。
  源码：[hui-ho/WebStack-Laravel](https://github.com/hui-ho/WebStack-Laravel)，
  Docker 镜像：[arvon2014/webstack-laravel](https://hub.docker.com/r/arvon2014/webstack-laravel)。

- **Hexo 主题**：适合 Hexo 用户。
  源码：[HCLonely/hexo-theme-webstack](https://github.com/HCLonely/hexo-theme-webstack)。

- **Hugo 主题一**：本站主要参考方向。
  源码：[shenweiyan/WebStack-Hugo](https://github.com/shenweiyan/WebStack-Hugo)，
  教程：[WebStack-Hugo 静态响应式导航主题](https://www.yuque.com/shenweiyan/cookbook/webstack-hugo)。

- **Hugo 主题二**：另一个 Hugo 实现。
  源码：[iplaycode/webstack-hugo](https://github.com/iplaycode/webstack-hugo)，
  演示：[iplaycode.github.io/nav](https://iplaycode.github.io/nav/)。

- **Java 后台系统**：源码 [jsnjfz/WebStack-Guns](https://github.com/jsnjfz/WebStack-Guns)。

- **Spring Boot 后台系统**：源码 [Nikati/WebStack-Guns-NKT](https://github.com/Nikati/WebStack-Guns-NKT)。

- **Jekyll 版本**：源码 [0xl2oot/webstack-jekyll](https://github.com/0xl2oot/webstack-jekyll)。

- **书签转换工具**：体验 [w.hanxi.info/convert.html](https://w.hanxi.info/convert.html)，
  源码 [hanxi/webstack-jekyll](https://github.com/hanxi/webstack-jekyll)。

- **Typecho 主题**：[钻芒二开版本](https://www.zmki.cn/5366.html)、
  [SEOGO 二开版本](https://www.seogo.me/muban/webstack.html)。

- **Gridea 主题**：源码 [lmm214/gridea-theme-webstack](https://github.com/lmm214/gridea-theme-webstack)，
  演示 [edui.fun](https://edui.fun/)。

- **Vue 版本**：源码 [Anjaxs/WebStack-vue](https://github.com/Anjaxs/WebStack-vue/tree/master)。

- **Flask 版本**：源码 [shitianfang/flask-blog-platform](https://github.com/shitianfang/flask-blog-platform/tree/master)。

{{< /details >}}

## 本站采用方案

本站导航站优先采用 Hugo 静态生成方案，维护成本低，部署速度快，也方便把网址数据
放到仓库里进行版本管理。

主要参考教程：

- [WebStack-Hugo | 一个静态响应式导航主题](https://www.yuque.com/shenweiyan/cookbook/webstack-hugo#RjR7K)

## 下一步

- 新增或调整链接时，优先阅读 [Vercel 部署](/docs/webstack/quick-start/)。
- 调整视觉风格时，参考 [样式调整](/docs/webstack/style-css/)。
