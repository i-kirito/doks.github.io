---
title: "OpenClaw 教程"
description: "基于 OpenClaw 官方文档整理安装、onboard、网关、模型、渠道、安全和日常维护方法。"
lead: "OpenClaw 适合本地优先的个人 AI 助手，重点是网关、渠道、模型和安全策略。"
date: 2026-06-10T19:20:00+08:00
lastmod: 2026-06-10T19:20:00+08:00
draft: false
images: []
menu:
  docs:
    parent: "ai"
weight: 820
toc: true
---

## 官方参考

- [OpenClaw 文档](https://docs.openclaw.ai/)
- [安装文档](https://docs.openclaw.ai/install)
- [Getting Started](https://docs.openclaw.ai/start/getting-started)
- [Gateway](https://docs.openclaw.ai/gateway)
- [Channels](https://docs.openclaw.ai/channels)
- [Providers](https://docs.openclaw.ai/providers)
- [OpenClaw GitHub](https://github.com/openclaw/openclaw)

## 适用场景

OpenClaw 更适合这些需求：

| 场景 | 说明 |
|---|---|
| 本地优先助手 | 运行在自己的设备或服务器上，控制权更清晰 |
| 多渠道入口 | 支持从多个聊天平台或桌面端进入同一个助手 |
| Gateway 运维 | 通过网关统一管理渠道、会话、工具和事件 |
| 模型切换 | 通过 providers 管理不同模型服务 |
| 安全隔离 | 通过配对、allowlist、sandbox 降低远程入口风险 |

## 安装方式

官方推荐使用安装脚本：

```bash
curl -fsSL https://openclaw.ai/install.sh | bash
```

Windows PowerShell：

```powershell
iwr -useb https://openclaw.ai/install.ps1 | iex
```

如果已经自己管理 Node.js，也可以使用 npm：

```bash
npm install -g openclaw@latest
openclaw onboard --install-daemon
```

官方建议使用 Node 24，或者 Node 22.19 以上版本。

## Onboard 初始化

安装后先运行引导流程：

```bash
openclaw onboard --install-daemon
```

引导通常会配置：

- Gateway 启动方式。
- 工作目录和数据目录。
- 模型 provider。
- 消息渠道。
- 安全策略。
- 技能和工具。

验证安装：

```bash
openclaw --version
openclaw doctor
openclaw gateway status
```

## Gateway 运维

Gateway 是 OpenClaw 的控制平面。常用命令：

```bash
openclaw gateway status
openclaw gateway stop
openclaw gateway --port 18789 --verbose
```

建议把网关分成两个模式：

| 模式 | 用途 |
|---|---|
| daemon | 日常运行，随系统启动 |
| foreground | 排障时前台运行，方便看日志 |

## 渠道接入

接入渠道前先准备：

| 配置项 | 说明 |
|---|---|
| Channel | Telegram、Slack、Discord、Signal、QQ、WebChat 等 |
| Token 或 Secret | 平台后台生成，不能提交到仓库 |
| Allowlist | 允许哪些账号、群组或频道访问 |
| DM Policy | 未配对用户如何处理 |
| 回调地址 | 如果使用 webhook，需要稳定公网地址 |

接入后用测试消息确认：

```bash
openclaw gateway status
openclaw doctor
```

## 模型和 Provider

模型配置建议写成清单：

| 配置项 | 示例占位 |
|---|---|
| Provider | `openai-compatible` |
| Base URL | `https://api.example.com/v1` |
| API Key | `${MODEL_API_KEY}` |
| Model | `model-name` |
| Fallback | 是否配置备用模型 |

验证时不要只看配置文件，要发送一次实际消息，确认：

- 模型服务有请求记录。
- OpenClaw 日志没有 401、404、timeout。
- 回复内容来自预期模型。

## 安全默认值

远程消息入口需要按“不可信输入”处理：

1. 默认开启配对或 allowlist。
2. 不把管理命令暴露给公开群组。
3. 不在群聊里开启高风险本地工具。
4. 对非主会话使用 sandbox。
5. 定期运行 `openclaw doctor`。

{{< alert icon="i" text="把 Gateway 暴露到公网前，先确认配对策略、allowlist、反向代理、HTTPS 和日志脱敏都已配置。" />}}

## 更新和维护

常用命令：

```bash
openclaw update
openclaw doctor
openclaw gateway status
```

维护建议：

- 更新前备份配置和数据目录。
- 更新后先跑 `openclaw doctor`。
- 检查网关是否仍在运行。
- 给每个渠道发一条测试消息。

## 排障清单

| 现象 | 优先检查 |
|---|---|
| `openclaw` 找不到 | Node/npm 全局 bin 是否在 `PATH` 中 |
| Gateway 未运行 | daemon 状态、端口占用、前台日志 |
| 渠道收不到消息 | Token、Webhook、allowlist、平台回调日志 |
| 模型调用失败 | Base URL、API Key、模型名、服务商限额 |
| 远程入口风险 | DM policy、allowlist、sandbox、工具权限 |
