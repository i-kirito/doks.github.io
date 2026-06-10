---
title: "Halo2 部署链路"
description: "记录 Halo2 博客从本机 Docker 到 NPS、ECS、Vercel 的完整部署路径。"
lead: "把 Halo2 本机服务、数据库、隧道和公网入口拆开管理，方便发布和排障。"
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

## 架构概览

当前博客链路可以按访问路径理解：

```text
访客 -> Vercel -> ECS/Nginx -> NPS 隧道 -> 本机 Halo Docker -> MySQL
```

各层职责如下：

| 层级 | 作用 | 常见检查点 |
|---|---|---|
| 本机 Docker | 运行 Halo2 和 MySQL | 容器状态、健康检查、日志 |
| NPS 隧道 | 将本机 `18090` 暴露到 ECS | 隧道在线、端口可访问 |
| ECS/Nginx | 作为 Vercel 的 origin | 反代、缓存、连通性 |
| Vercel | 对外域名入口 | 部署状态、边缘到 origin 稳定性 |

{{< alert icon="i" text="排障时不要一上来改 Vercel。先证明本机 Halo 正常，再证明 NPS/ECS 正常，最后再看 Vercel 到 origin 的连接。" />}}

## 本地目录

Halo2 本地部署目录：

```text
/Volumes/ikirito/docker/halo2
```

主要文件和目录：

| 路径 | 用途 |
|---|---|
| `docker-compose.yml` | Halo 和 MySQL 编排 |
| `.env` | 端口、外部地址、数据库密码等环境变量 |
| `halo2/` | Halo 应用数据目录 |
| `mysql/` | MySQL 数据目录 |
| `mysqlBackup/` | 手动 SQL 备份目录 |
| `backups/` | 迁移或远程备份归档 |
| `logs/halo.log` | Halo 日志文件 |

## Compose 服务

当前 compose 中有两个核心服务：

- `halo-local`：Halo2 应用，容器内端口 `8090`，本机默认映射到 `18090`。
- `halodb-local`：MySQL 8.1，容器内端口 `3306`，本机默认映射到 `13306`。

环境变量只记录名称，不在文档中写真实值：

| 变量 | 说明 |
|---|---|
| `HALO_PORT` | 本机 Halo 端口，默认 `18090` |
| `MYSQL_PORT` | 本机 MySQL 端口，默认 `13306` |
| `HALO_DB_PASSWORD` | MySQL root 和 Halo 数据库密码 |
| `HALO_EXTERNAL_URL` | Halo 对外访问地址 |
| `HALO_SUPERADMIN_USERNAME` | 初始化管理员用户名 |
| `HALO_SUPERADMIN_PASSWORD` | 初始化管理员密码 |

## 启动服务

进入部署目录：

```bash
cd /Volumes/ikirito/docker/halo2
```

检查 compose 配置：

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

## 本机健康检查

先检查 Halo readiness：

```bash
curl -fsS http://localhost:18090/actuator/health/readiness
```

再检查首页是否能返回页面：

```bash
curl -I --max-time 10 http://127.0.0.1:18090/
```

如果本机检查失败，优先看日志：

```bash
docker compose logs --tail=120 halo
docker compose logs --tail=120 halodb
```

## NPS 与公网入口

本机 Halo 通常通过 NPS 隧道暴露给 ECS。维护时按这个顺序检查：

1. 本机 `http://127.0.0.1:18090/` 是否正常。
2. ECS/NPS 暴露端口是否能访问。
3. Vercel 公开域名是否稳定。

示例检查：

```bash
curl -I --max-time 10 http://127.0.0.1:18090/
curl -I --max-time 10 http://8.134.251.200:8090/
curl -I --max-time 10 https://xazz.top/
```

{{< alert icon="i" text="如果本机和 ECS/NPS 都稳定，但 Vercel 偶发 502，问题大概率在 Vercel 到 origin 的链路，先保留现场并做多次采样。" />}}

## 发布后确认

每次调整后至少确认：

- `docker compose ps` 中 Halo 和 MySQL 都是运行状态。
- readiness 接口返回健康。
- 本机首页可访问。
- ECS/NPS 入口可访问。
- `https://xazz.top/` 可以打开。

如果修改了 Vercel 项目配置，还要等待生产部署完成后再验证公开域名。
