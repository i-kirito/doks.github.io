---
title: "Halo2 排障清单"
description: "按容器、数据库、反向代理和公开入口定位 Halo2 博客访问异常。"
lead: "遇到 502、超时或页面打不开时，按链路逐段确认，不跳步。"
date: 2026-06-10T16:20:00+08:00
lastmod: 2026-06-10T16:20:00+08:00
draft: false
images: []
menu:
  docs:
    parent: "halo"
weight: 930
toc: true
---

## 排障原则

Halo2 公开访问链路较长，排障时要分段确认：

```text
Halo 容器 -> 数据库 -> 反向代理 -> CDN 或托管平台 -> 公开域名
```

不要只看最终域名是否能打开。最终域名失败只能说明链路某处异常，不能直接证明 Halo 应用坏了。

## 第一段：本机 Docker

检查容器是否运行：

```bash
cd ~/halo
docker compose ps
```

检查本机页面：

```bash
curl -I --max-time 10 http://127.0.0.1:8090/
```

查看日志：

```bash
docker compose logs --tail=200 halo
```

常见问题：

| 现象 | 优先检查 |
|---|---|
| Halo 容器反复重启 | `docker compose logs --tail=200 halo` |
| 数据库不健康 | `docker compose logs --tail=200 halodb` |
| 页面 500 | Halo 日志、数据库连接、插件报错 |
| 本机都打不开 | 端口占用、容器状态、`.env` 配置 |

## 第二段：数据库

如果 Halo 容器启动了但页面报错，继续检查数据库：

```bash
docker compose ps halodb
docker compose logs --tail=200 halodb
```

重点看：

- 数据库容器是否运行。
- 用户名、密码、数据库名是否和 Halo 配置一致。
- 数据库数据目录是否可写。
- 磁盘空间是否充足。

## 第三段：反向代理

如果本机端口能打开，但域名访问异常，检查反向代理：

```bash
curl -I --max-time 10 https://blog.example.com/
```

需要确认：

- Nginx upstream 指向的端口正确。
- 反代是否保留必要请求头。
- HTTPS 证书是否有效。
- 防火墙是否放行 `80` 和 `443`。
- 上传大小限制是否满足附件上传需求。

## 第四段：CDN 或托管平台

如果反向代理正常，但公开入口偶发异常，可以多次采样：

```bash
for i in {1..10}; do
  date
  curl -I --max-time 15 https://blog.example.com/
  sleep 3
done
```

重点观察：

- 是否只有公开入口返回 502 或 504。
- 是否回源超时。
- CDN 缓存是否过期或污染。
- 托管平台最近是否改过环境变量、重定向或回源配置。

{{< alert icon="i" text="如果公开入口异常但源站正常，优化方向通常是增强源站稳定性、缓存策略和回源配置。" />}}

## 快速定位表

| Halo | 数据库 | 公开入口 | 判断 |
|---|---|---|---|
| 失败 | 未测 | 未测 | 先修 Docker/Halo |
| 正常 | 失败 | 失败 | 查数据库连接和数据目录 |
| 正常 | 正常 | 失败 | 查反向代理、DNS、CDN |
| 正常 | 正常 | 正常 | 链路当前健康 |

## 记录现场

排障时建议记录：

- 发生时间。
- 哪个 URL 失败。
- HTTP 状态码或错误文本。
- 本机端口、反向代理、公开域名的 curl 结果。
- 当时 Halo 和 MySQL 日志尾部。

有了这些信息，下一次复盘会快很多。
