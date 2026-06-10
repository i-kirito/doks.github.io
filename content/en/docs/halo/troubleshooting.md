---
title: "Halo2 排障清单"
description: "按本机 Docker、NPS、ECS/Nginx、Vercel 四段定位 Halo2 博客访问异常。"
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
本机 Halo -> NPS -> ECS/Nginx -> Vercel -> 公开域名
```

不要只看最终域名是否能打开。最终域名失败只能说明链路某处异常，不能直接证明 Halo 应用坏了。

## 第一段：本机 Docker

检查容器是否运行：

```bash
cd /Volumes/ikirito/docker/halo2
docker compose ps
```

检查健康接口：

```bash
curl -fsS http://localhost:18090/actuator/health/readiness
```

检查本机页面：

```bash
curl -I --max-time 10 http://127.0.0.1:18090/
```

常见问题：

| 现象 | 优先检查 |
|---|---|
| Halo 容器反复重启 | `docker compose logs --tail=200 halo` |
| MySQL 不健康 | `docker compose logs --tail=200 halodb` |
| 页面 500 | Halo 日志、数据库连接、插件报错 |
| 本机都打不开 | 端口占用、容器状态、`.env` 配置 |

## 第二段：NPS 隧道

本机正常后，再检查 NPS 暴露地址：

```bash
curl -I --max-time 10 http://8.134.251.200:8090/
```

如果本机正常但这个地址不通，重点看：

- NPS 客户端是否在线。
- 隧道目标是否仍指向本机 `18090`。
- 本机局域网 IP 是否变化。
- ECS 防火墙或安全组是否放行对应端口。

## 第三段：ECS/Nginx

如果 NPS 入口能打开，但 Vercel 访问异常，检查 ECS 上的 Nginx：

```bash
curl -I --max-time 10 http://8.134.251.200:8090/
```

需要确认：

- Nginx upstream 指向的端口正确。
- 反代是否保留必要请求头。
- 缓存目录是否可写。
- ECS 到 NPS 入口是否稳定。

## 第四段：Vercel

如果本机、NPS、ECS 都正常，但公开域名偶发异常，可以多次采样：

```bash
for i in {1..10}; do
  date
  curl -I --max-time 15 https://xazz.top/
  sleep 3
done
```

重点观察：

- 是否只有 Vercel 返回 502。
- 是否出现 `ROUTER_EXTERNAL_TARGET_CONNECTION_ERROR`。
- 失败是否集中在 Vercel 到 origin 的链路。
- Vercel 项目最近是否改过 Node.js 版本、环境变量或重定向配置。

{{< alert icon="i" text="公开入口必须继续走 Vercel 时，优化方向是增强 origin 稳定性和缓存，不要直接改成绕过 Vercel 的方案。" />}}

## 快速定位表

| 本机 | NPS/ECS | Vercel | 判断 |
|---|---|---|---|
| 失败 | 未测 | 未测 | 先修 Docker/Halo |
| 正常 | 失败 | 失败 | 查 NPS、ECS 端口或隧道 |
| 正常 | 正常 | 失败 | 查 Vercel 到 origin |
| 正常 | 正常 | 正常 | 链路当前健康 |

## 记录现场

排障时建议记录：

- 发生时间。
- 哪个 URL 失败。
- HTTP 状态码或错误文本。
- 本机、NPS、Vercel 三段 curl 结果。
- 当时 Halo 和 MySQL 日志尾部。

有了这些信息，下一次复盘会快很多。
