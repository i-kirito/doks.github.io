---
title: "Docker"
description: "整理 Docker 安装、容器、镜像、卷、网络、Compose 和日常维护的常用方法。"
lead: "把 Docker 的日常使用拆成可执行的命令清单，适合部署服务、排查容器和维护数据。"
date: 2026-06-11T09:20:00+08:00
lastmod: 2026-06-11T09:20:00+08:00
draft: false
images: []
weight: 700
---

Docker 适合把应用和依赖打包成可重复运行的容器。日常维护时，重点不是记住所有参数，而是分清容器、镜像、卷、网络和 Compose 项目的边界。

## 阅读顺序

- [基础教程](/docs/docker/getting-started/)：从安装检查、运行第一个容器到理解镜像、容器、端口和数据。
- [常用指令](/docs/docker/commands/)：整理高频的查看、日志、进入容器、更新、清理、备份和排障命令。
- [Compose 工作流](/docs/docker/compose/)：适合多容器服务的启动、更新、验证、备份和发布检查。

{{< alert icon="i" text="清理镜像、容器和卷之前先确认数据是否已备份；生产服务优先使用 Docker Compose 管理，而不是散落的 docker run 命令。" />}}
