---
title: "博客部署"
description: "基于 Halo 官方文档整理的 Docker Compose 部署、备份恢复和日常维护方法。"
lead: "围绕 Halo2 博客整理通用部署链路、常用命令、备份恢复和排障方法。"
date: 2026-06-10T16:20:00+08:00
lastmod: 2026-06-10T16:20:00+08:00
draft: false
images: []
weight: 900
---

Halo2 博客推荐使用 Docker Compose 部署，将应用、数据库和持久化目录写清楚，后续升级、迁移和排障都会轻很多。

## 阅读顺序

- [部署链路](/docs/halo/deployment/)：从官方部署方式、目录结构、容器启动到访问验证。
- [常用方法](/docs/halo/operations/)：日常检查、备份、重启、更新和日志排查。
- [排障清单](/docs/halo/troubleshooting/)：按容器、数据库、反向代理和公开入口分段定位问题。

{{< alert icon="i" text="文档中只保留占位域名、通用路径和变量名；真实密码、Token、数据库文件和备份包不要提交到文档仓库。" />}}
