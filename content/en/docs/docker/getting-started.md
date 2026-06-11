---
title: "Docker 基础教程"
description: "基于 Docker 官方文档整理安装检查、容器运行、镜像、端口、挂载和基本排障方法。"
lead: "先理解镜像、容器、端口、卷和网络，再把常用服务写进 Compose。"
date: 2026-06-11T09:20:00+08:00
lastmod: 2026-06-11T09:20:00+08:00
draft: false
images: []
menu:
  docs:
    parent: "docker"
weight: 710
toc: true
---

## 官方参考

- [Docker Docs](https://docs.docker.com/)
- [Get Docker](https://docs.docker.com/get-started/get-docker/)
- [Docker CLI reference](https://docs.docker.com/reference/cli/docker/)
- [docker run](https://docs.docker.com/reference/cli/docker/container/run/)
- [Dockerfile reference](https://docs.docker.com/reference/dockerfile/)
- [Compose file reference](https://docs.docker.com/reference/compose-file/)

## 核心概念

| 名称 | 说明 | 常见命令 |
|---|---|---|
| Image | 镜像，是应用和依赖的只读模板 | `docker images`、`docker pull`、`docker build` |
| Container | 容器，是镜像运行后的实例 | `docker ps`、`docker logs`、`docker exec` |
| Volume | 卷，用来持久化数据 | `docker volume ls`、`docker volume inspect` |
| Network | 网络，用来连接容器 | `docker network ls`、`docker network inspect` |
| Compose | 多容器编排 | `docker compose up -d`、`docker compose ps` |

{{< alert icon="i" text="容器删掉不等于数据一定删掉；数据是否保留取决于是否使用了命名卷、绑定挂载或容器内部临时文件系统。" />}}

## 安装检查

安装 Docker 后先确认 CLI 和服务端都可用：

```bash
docker version
docker info
```

如果 `docker version` 只有 Client 没有 Server，通常说明 Docker Desktop、Docker Engine 或对应的容器运行时还没有启动。

## 运行第一个容器

用 Nginx 跑一个最小 Web 服务：

```bash
docker run -d \
  --name demo-nginx \
  -p 8080:80 \
  nginx:alpine
```

检查状态：

```bash
docker ps
docker logs --tail=50 demo-nginx
```

停止并删除：

```bash
docker stop demo-nginx
docker rm demo-nginx
```

## 端口映射

端口映射格式：

```text
主机端口:容器端口
```

示例：

```bash
docker run -d --name web -p 8080:80 nginx:alpine
```

含义是把主机的 `8080` 转发到容器里的 `80`。如果端口被占用，换一个主机端口即可：

```bash
docker run -d --name web-test -p 18080:80 nginx:alpine
```

## 数据持久化

临时测试可以不挂载数据，生产服务必须明确数据放在哪里。

命名卷示例：

```bash
docker volume create app-data

docker run -d \
  --name app \
  -v app-data:/data \
  example/app:latest
```

绑定挂载示例：

```bash
mkdir -p ./data

docker run -d \
  --name app \
  -v "$PWD/data:/data" \
  example/app:latest
```

选择建议：

| 方式 | 适合场景 |
---|---|
| 命名卷 | 数据由 Docker 管理，适合数据库和通用持久化 |
| 绑定挂载 | 需要直接编辑配置文件或备份目录 |
| 临时文件系统 | 不需要保留数据的测试容器 |

## 进入容器

容器内有 shell 时：

```bash
docker exec -it app sh
```

如果镜像包含 Bash：

```bash
docker exec -it app bash
```

不要默认认为容器里有完整 Linux 工具；很多轻量镜像只包含最小命令集。

## 镜像构建

一个最小 Dockerfile 示例：

```dockerfile
FROM nginx:alpine
COPY ./site /usr/share/nginx/html
```

构建镜像：

```bash
docker build -t demo-site:local .
```

运行镜像：

```bash
docker run -d --name demo-site -p 8080:80 demo-site:local
```

## 日常习惯

建议固定这些习惯：

1. 服务类项目优先写 `compose.yml`。
2. 所有持久化数据都显式写成卷或绑定挂载。
3. `.env` 只放变量，不提交真实密钥。
4. 更新前先备份数据目录或数据库。
5. 清理前先看 `docker ps -a`、`docker images`、`docker volume ls`。
6. 排障先看容器状态和日志，再看网络、端口和挂载。

## 最小排障顺序

| 问题 | 先看什么 |
|---|---|
| 服务打不开 | `docker ps`、端口映射、防火墙、反向代理 |
| 容器反复重启 | `docker logs --tail=120 容器名` |
| 配置不生效 | 环境变量、挂载路径、容器是否已重建 |
| 数据丢失 | 卷、绑定挂载、是否执行过带 `--volumes` 的删除 |
| 镜像拉不下来 | 网络、镜像名、tag、Registry 登录状态 |
