---
title: "Halo2 部署链路"
description: "基于 Halo 官方 Docker Compose 文档整理 Halo2 博客部署流程。"
lead: "把 Halo2 应用、数据库、数据目录和公开入口拆开管理，方便发布和排障。"
date: 2026-06-10T16:20:00+08:00
lastmod: 2026-06-10T16:20:00+08:00
draft: false
images: []
menu:
  docs:
    parent: "halo"
weight: 910
toc: true
---

## 官方参考

- [Halo 官方文档](https://docs.halo.run/)
- [使用 Docker Compose 部署](https://docs.halo.run/getting-started/install/docker-compose)
- [配置说明](https://docs.halo.run/getting-started/install/config)

官方文档推荐生产部署优先使用 Docker Compose，并根据实际情况选择 PostgreSQL、MySQL 或外部数据库。

## 架构概览

一个通用的生产链路可以按访问路径理解：

```text
访客 -> 域名/CDN -> 反向代理 -> Halo 容器 -> 数据库
```

各层职责如下：

| 层级 | 作用 | 常见检查点 |
|---|---|---|
| Docker Compose | 编排 Halo 和数据库 | 容器状态、网络、挂载目录 |
| Halo | 提供博客和后台服务 | 健康检查、日志、插件 |
| 数据库 | 保存文章、配置和用户数据 | 连接状态、备份、磁盘空间 |
| 反向代理 | 提供 HTTPS 和域名访问 | 证书、转发头、上游地址 |
| CDN 或托管平台 | 对外访问入口 | 回源状态、缓存、部署状态 |

{{< alert icon="i" text="排障时先确认 Halo 容器和数据库正常，再检查反向代理、CDN 或托管平台，不要只盯最终域名。" />}}

## 项目目录

官方示例使用 `~/halo` 作为部署目录，也可以换成团队约定的路径：

```text
~/halo
```

主要文件和目录：

| 路径 | 用途 |
|---|---|
| `docker-compose.yaml` | Halo 和数据库编排 |
| `.env` | 可选，保存端口、域名、数据库密码等变量 |
| `halo2/` | Halo 应用数据目录 |
| `db/` | 数据库数据目录 |
| `backups/` | 手动备份目录 |

## Compose 服务

常见 compose 中至少包含两个核心服务：

- `halo`：Halo2 应用，容器内端口通常为 `8090`。
- `halodb`：数据库服务，可以选择 PostgreSQL 或 MySQL。

环境变量只记录名称，不在文档中写真实值。下面是常见示例：

| 变量 | 说明 |
|---|---|
| `HALO_EXTERNAL_URL` | Halo 对外访问地址，例如 `https://blog.example.com/` |
| `SPRING_R2DBC_URL` | Halo 连接数据库的 R2DBC 地址 |
| `SPRING_R2DBC_USERNAME` | 数据库用户名 |
| `SPRING_R2DBC_PASSWORD` | 数据库密码 |
| `SPRING_SQL_INIT_PLATFORM` | 数据库平台，例如 `mysql` 或 `postgresql` |

## 启动服务

进入部署目录：

```bash
mkdir -p ~/halo
cd ~/halo
```

创建或调整 `docker-compose.yml` 后，先检查 compose 配置：

```bash
docker compose config
```

启动服务：

```bash
docker compose up -d
```

查看容器状态：

```bash
docker compose ps
```

## 访问检查

先检查本机端口是否响应：

```bash
curl -I --max-time 10 http://127.0.0.1:8090/
```

如果已配置反向代理和域名，再检查公开入口：

```bash
curl -I --max-time 10 https://blog.example.com/
```

如果本机检查失败，优先看日志：

```bash
docker compose logs --tail=120 halo
docker compose logs --tail=120 halodb
```

## 反向代理

如果使用 Nginx、Caddy 或托管平台做公开入口，至少确认：

- 上游地址指向 `127.0.0.1:8090` 或 compose 网络中的 `halo:8090`。
- `Host`、`X-Forwarded-Proto`、`X-Forwarded-For` 等请求头正确传递。
- HTTPS 证书有效。
- 上传附件大小限制符合实际需求。
- `HALO_EXTERNAL_URL` 与公开域名一致。

{{< alert icon="i" text="如果公开域名异常但本机端口正常，通常优先检查反向代理、证书、DNS、CDN 回源和防火墙。" />}}

## 发布后确认

每次调整后至少确认：

- `docker compose ps` 中 Halo 和数据库都处于运行状态。
- 本机 Halo 页面可访问。
- 公开域名可以访问。
- 后台登录页可以打开。
- 新建或编辑文章后数据能正常保存。
- 日志没有持续报错。

如果修改了托管平台或 CDN 配置，要等待生产部署完成后再验证公开域名。
