---
title: "Hermes 教程"
description: "基于 Hermes Agent 官方资料整理安装、模型、工具、网关、技能、记忆和排障方法。"
lead: "Hermes 适合 CLI 和消息网关结合的通用 AI Agent，重点是模型、工具、技能、记忆和运行状态。"
date: 2026-06-10T19:20:00+08:00
lastmod: 2026-06-10T19:20:00+08:00
draft: false
images: []
menu:
  docs:
    parent: "ai"
weight: 830
toc: true
---

## 官方参考

- [Hermes Agent](https://hermes-agent.nousresearch.com/)
- [Hermes 文档](https://hermes-agent.nousresearch.com/docs/)
- [Hermes GitHub](https://github.com/NousResearch/Hermes-Agent)
- [CLI Guide](https://hermes-agent.nousresearch.com/docs/user-guide/cli)
- [Messaging Gateway](https://hermes-agent.nousresearch.com/docs/user-guide/messaging)
- [Configuration](https://hermes-agent.nousresearch.com/docs/user-guide/configuration)

## 适用场景

Hermes 更适合这些需求：

| 场景 | 说明 |
|---|---|
| CLI Agent | 在终端中直接对话、执行任务和调用工具 |
| 消息网关 | 通过 Telegram、Discord、Slack 等渠道访问同一个 agent |
| 技能系统 | 把重复流程沉淀为可复用 skill |
| 记忆系统 | 管理跨会话经验、偏好和历史任务 |
| 自动化 | 使用 cron、工具和网关做定时任务 |

## 安装

Linux、macOS、WSL2、Termux：

```bash
curl -fsSL https://hermes-agent.nousresearch.com/install.sh | bash
```

Windows PowerShell：

```powershell
iex (irm https://hermes-agent.nousresearch.com/install.ps1)
```

安装后刷新 shell：

```bash
source ~/.bashrc
# 或者
source ~/.zshrc
```

启动 Hermes：

```bash
hermes
```

## 初始化配置

推荐先运行完整引导：

```bash
hermes setup
```

常用命令：

```bash
hermes model
hermes tools
hermes config set
hermes doctor
```

配置模型时建议记录：

| 配置项 | 示例占位 |
|---|---|
| Provider | `openai-compatible` |
| Base URL | `https://api.example.com/v1` |
| API Key | `${MODEL_API_KEY}` |
| Model | `model-name` |
| Tool policy | 哪些工具默认允许 |

## CLI 使用

常见入口：

```bash
hermes
hermes -z "Reply exactly OK."
hermes doctor
hermes update
```

CLI 内常见操作：

| 操作 | 用途 |
|---|---|
| `/model` | 切换模型 |
| `/skills` | 查看或调用技能 |
| `/new` | 开新会话 |
| `/reset` | 重置当前会话 |
| `/compress` | 压缩上下文 |
| `/usage` | 查看用量 |

## Messaging Gateway

如果要从消息平台访问 Hermes，需要启动 gateway：

```bash
hermes gateway
```

建议按这个顺序配置：

1. 先在 CLI 中确认模型可用。
2. 再配置 gateway。
3. 接入 Telegram、Discord、Slack 或其他平台。
4. 发送一条测试消息。
5. 查看 gateway 日志确认请求进入 Hermes。

{{< alert icon="i" text="CLI 可用不代表 gateway 一定可用；gateway 是长运行进程，可能缓存旧环境变量，改 Key 后要重启对应进程。" />}}

## OpenClaw 迁移

如果之前使用 OpenClaw，可以使用 Hermes 的迁移命令：

```bash
hermes claw migrate
hermes claw migrate --dry-run
```

建议先执行 dry-run，确认将迁移哪些配置、记忆、技能和密钥，再正式迁移。

## 技能和记忆

Hermes 的技能和记忆适合沉淀这些内容：

- 常用项目排障流程。
- 服务发布流程。
- 周期性巡检任务。
- 个人偏好和工作方式。
- 常见命令模板。

维护建议：

1. 技能只写流程，不写真实密钥。
2. 记忆只保留可复用经验。
3. 涉及隐私和凭据的内容放在私有配置中。
4. 大改配置前先备份。

## 更新和维护

常用命令：

```bash
hermes update
hermes doctor
hermes gateway
```

更新前建议：

- 备份配置目录。
- 确认当前工作树没有重要未提交改动。
- 记录当前版本和 provider。
- 更新后做一次简单对话和工具调用测试。

## 排障清单

| 现象 | 优先检查 |
|---|---|
| CLI 正常但 gateway 异常 | gateway 进程、环境变量、日志、旧 socket |
| 401 Unauthorized | API Key 是否正确，长运行进程是否重启 |
| 找不到模型 | 当前 provider 的模型列表和模型名 |
| 工具调用失败 | 工具是否启用、权限策略、运行后端 |
| 更新失败 | 网络、Git 代理、远端可达性、工作树状态 |

{{< alert icon="i" text="排查 Hermes 时要区分 CLI、gateway、provider、模型和工具后端；一个层级正常，不等于整条链路都正常。" />}}
