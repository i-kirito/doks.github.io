---
title: "博客部署"
description: "Halo2 博客的本地 Docker 部署、NPS 隧道、Vercel 入口和日常维护记录。"
lead: "围绕 xazz.top 博客整理部署链路、常用命令、备份恢复和排障方法。"
date: 2026-06-10T16:20:00+08:00
lastmod: 2026-06-10T16:20:00+08:00
draft: false
images: []
weight: 900
---

Halo2 博客部署分成三个层次：本机 Docker 运行 Halo 和 MySQL，NPS 将本机服务暴露到 ECS，Vercel 作为公开访问入口。

## 阅读顺序

- [部署链路](/docs/halo/deployment/)：从目录结构、容器启动到公开域名验证。
- [常用方法](/docs/halo/operations/)：日常检查、备份、重启、更新和日志排查。
- [排障清单](/docs/halo/troubleshooting/)：按本机、NPS、ECS、Vercel 分段定位问题。

{{< alert icon="i" text="Halo2 相关文档只记录变量名、路径和检查方法；真实密码、Token、数据库文件和备份包不要提交到文档仓库。" />}}
