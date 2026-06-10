---
title: "AstrBot 教程"
description: "基于 AstrBot 官方文档整理 Docker 部署、消息平台接入、AI 接入、插件和日常维护方法。"
lead: "AstrBot 适合做消息平台机器人，重点是先部署核心服务，再接入消息平台和模型服务。"
date: 2026-06-10T19:20:00+08:00
lastmod: 2026-06-10T19:20:00+08:00
draft: false
images: []
menu:
  docs:
    parent: "ai"
weight: 810
toc: true
---

## 官方参考

- [AstrBot 官方文档](https://docs.astrbot.app/)
- [AstrBot GitHub](https://github.com/AstrBotDevs/AstrBot)
- [Docker 部署](https://docs.astrbot.app/deploy/astrbot/docker.html)
- [接入消息平台](https://docs.astrbot.app/platform/start.html)
- [接入 AI](https://docs.astrbot.app/providers/start.html)
- [插件开发](https://docs.astrbot.app/dev/star/plugin-new.html)

## 适用场景

AstrBot 更适合这些需求：

| 场景 | 说明 |
|---|---|
| 消息机器人 | 接入 QQ、Telegram、Discord、企业微信、飞书等消息平台 |
| 插件扩展 | 通过插件增加指令、事件监听、消息处理和外部服务调用 |
| WebUI 管理 | 通过管理面板维护配置、插件和运行状态 |
| 模型接入 | 接入 OpenAI 兼容接口、Ollama、LMStudio 或其他模型服务 |

## Docker Compose 部署

先准备 Docker 环境，再拉取官方仓库：

```bash
git clone https://github.com/AstrBotDevs/AstrBot
cd AstrBot
```

使用项目提供的 compose 配置启动：

```bash
docker compose up -d
```

查看容器状态：

```bash
docker compose ps
```

查看日志：

```bash
docker compose logs -f
```

{{< alert icon="i" text="首次登录 WebUI 时，按启动日志中打印的地址、用户名和初始密码进入；登录后应立即修改默认密码。" />}}

## 单容器部署

如果只想快速启动 AstrBot，可以使用官方镜像并挂载数据目录：

```bash
mkdir -p ~/astrbot/data
cd ~/astrbot

docker run -itd \
  -p 6185:6185 \
  -p 6199:6199 \
  -v "$PWD/data:/AstrBot/data" \
  -v /etc/localtime:/etc/localtime:ro \
  --name astrbot \
  soulter/astrbot:latest
```

常用检查：

```bash
docker logs -f astrbot
docker ps --filter name=astrbot
```

如果部署在服务器上，需要在防火墙、安全组或反向代理中放行对应端口。

## 接入消息平台

AstrBot 的典型接入顺序：

1. 确认 AstrBot 本体和 WebUI 正常运行。
2. 选择消息平台适配器。
3. 在平台侧创建 Bot 或应用。
4. 把平台提供的 Token、Secret、Webhook 或 WebSocket 参数填入 AstrBot。
5. 发送测试消息，确认收发链路正常。

常见平台包括：

| 类型 | 常见选择 |
|---|---|
| QQ | QQ 官方机器人、OneBot v11、NapCat |
| 企业协作 | 企业微信、飞书、钉钉、Slack、Discord |
| 公开聊天 | Telegram、LINE、Mattermost、Matrix |
| 微信生态 | 微信公众号、个人微信适配器 |

## 接入 AI 服务

接入模型时建议先准备一张配置表：

| 配置项 | 示例占位 |
|---|---|
| Provider 名称 | `openai-compatible` |
| Base URL | `https://api.example.com/v1` |
| API Key | `${MODEL_API_KEY}` |
| Model | `model-name` |
| 超时和重试 | 按服务商建议填写 |

验证方法：

```text
WebUI 中保存模型配置
-> 发送一条简单测试消息
-> 查看 AstrBot 日志
-> 确认模型服务侧是否有请求记录
```

## 插件维护

插件适合扩展这些能力：

- 自定义指令。
- 监听消息事件。
- 调用外部 API。
- 管理群聊或频道规则。
- 做定时任务或自动回复。

维护插件时建议：

1. 先确认插件是否支持当前 AstrBot 版本。
2. 插件配置只写占位变量，不写真实密钥。
3. 安装或升级后重启 AstrBot。
4. 查看日志确认没有导入错误、依赖错误或权限错误。

## 日常维护

常用命令：

```bash
docker compose ps
docker compose logs --tail=120
docker compose pull
docker compose up -d
```

如果是单容器部署：

```bash
docker logs --tail=120 astrbot
docker pull soulter/astrbot:latest
docker restart astrbot
```

建议定期备份：

- `data/` 数据目录。
- 插件配置。
- 平台接入配置。
- 自定义规则和知识库文件。

## 排障清单

| 现象 | 优先检查 |
|---|---|
| WebUI 打不开 | 容器状态、端口映射、防火墙、安全组 |
| 首次密码找不到 | 启动日志、容器日志、数据目录是否新建 |
| 消息平台无响应 | 平台 Token、Webhook、WebSocket、回调地址 |
| 模型无响应 | Base URL、API Key、模型名、网络连通性 |
| 插件报错 | 插件版本、依赖、配置项、权限 |

{{< alert icon="i" text="Bot Token、模型 Key、Webhook Secret 都属于敏感信息，只能放在环境变量、私有配置或平台后台，不要写入公开仓库。" />}}
