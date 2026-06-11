---
title: "常用方法"
description: "整理 Doks 文档站维护中常用的命令、链接、排障方法和内容规范。"
lead: "把高频操作放在一页里，维护时不用到处翻命令。"
date: 2020-10-06T08:49:31+00:00
lastmod: 2026-06-10T16:20:00+08:00
draft: false
images: []
menu:
  docs:
    parent: "help"
weight: 630
toc: true
---

## 常用链接

| 名称 | 地址 |
|---|---|
| Hugo 文档 | [Hugo Documentation](https://gohugo.io/documentation/) |
| Hugo GitHub Pages 部署 | [Host on GitHub Pages](https://gohugo.io/host-and-deploy/host-on-github-pages/) |
| Doks 文档 | [Doks Documentation](https://getdoks.org/) |
| Doks 快速开始 | [Doks Getting Started](https://getdoks.org/docs/start-here/getting-started/) |
| Docker 文档 | [Docker Docs](https://docs.docker.com/) |
| Docker CLI | [Docker CLI reference](https://docs.docker.com/reference/cli/docker/) |
| Docker Compose | [Docker Compose reference](https://docs.docker.com/reference/cli/docker/compose/) |
| Halo 文档 | [Halo Documentation](https://docs.halo.run/) |
| Halo Docker Compose | [使用 Docker Compose 部署](https://docs.halo.run/getting-started/install/docker-compose) |
| WebStack-Hugo | [shenweiyan/WebStack-Hugo](https://github.com/shenweiyan/WebStack-Hugo) |
| AstrBot 文档 | [AstrBot Documentation](https://docs.astrbot.app/) |
| AstrBot GitHub | [AstrBotDevs/AstrBot](https://github.com/AstrBotDevs/AstrBot) |
| OpenClaw 文档 | [OpenClaw Documentation](https://docs.openclaw.ai/) |
| OpenClaw GitHub | [openclaw/openclaw](https://github.com/openclaw/openclaw) |
| Hermes Agent 文档 | [Hermes Documentation](https://hermes-agent.nousresearch.com/docs/) |
| Hermes Agent GitHub | [NousResearch/Hermes-Agent](https://github.com/NousResearch/Hermes-Agent) |
| Bootstrap 文档 | [Bootstrap Documentation](https://getbootstrap.com/docs/) |

## 常用命令

进入项目：

```bash
cd ~/projects/doks-site
```

启动本地服务：

```bash
npm run start -- --port 1324
```

完整检查：

```bash
npm run lint
npm run build
```

只检查 Markdown：

```bash
npm run lint:markdown
```

只检查样式：

```bash
npm run lint:styles
```

查看改动：

```bash
git status --short
git diff --stat
```

## 内容放哪里

| 内容 | 推荐位置 |
|---|---|
| 导航站维护 | `content/en/docs/webstack/` |
| 文档站维护 | `content/en/docs/help/` |
| Docker 教程 | `content/en/docs/docker/` |
| AI 助手教程 | `content/en/docs/ai/` |
| Halo2 博客部署 | `content/en/docs/halo/` |
| 公开长文 | `content/en/blog/` |
| 首页入口 | `layouts/index.html` |
| 菜单配置 | `config/_default/menus/menus.en.toml` |

## 新增栏目

新增文档栏目时需要：

1. 在 `content/en/docs/` 下创建目录。
2. 添加 `_index.md`。
3. 在 `config/_default/menus/menus.en.toml` 增加 `[[docs]]` 顶层菜单。
4. 子页面 front matter 中设置 `menu.docs.parent`。
5. 跑 `npm run build` 检查侧栏。

## 右侧目录不显示

检查页面 front matter：

```yaml
toc: true
```

还要确认正文有二级标题：

```markdown
## 标题
```

如果只有一级标题或没有足够标题，右侧目录可能为空。

## 左侧导航不对

重点检查：

- `config/_default/menus/menus.en.toml` 里是否有顶层 `[[docs]]`。
- 页面 front matter 的 `menu.docs.parent` 是否正确。
- `weight` 是否合理。
- 页面是否在 `content/en/docs/` 下。

## 样式没生效

先确认改的是源文件：

```text
assets/scss/
layouts/
```

再重新构建：

```bash
npm run build
```

如果本地生效但线上没生效，检查是否已经提交并推送到 GitHub。

## 页面太挤或太空

优先看这些样式文件：

| 文件 | 作用 |
|---|---|
| `assets/scss/layouts/_pages.scss` | 首页和文档页主体布局 |
| `assets/scss/layouts/_sidebar.scss` | 左侧导航和右侧目录 |
| `assets/scss/layouts/_header.scss` | 顶部导航 |
| `assets/scss/common/_dark.scss` | 深色模式 |

修改后同时检查浅色和深色模式。

## 敏感信息规则

不要写进文档或提交到仓库：

- `.env` 中的真实值。
- 数据库密码。
- API Token。
- Cookie。
- 私钥。
- 数据库文件。
- 备份包。

可以写变量名和示例占位符，例如 `HALO_DB_PASSWORD`，但不要写真实密码。

## 三个站点怎么分工

| 站点 | 作用 |
|---|---|
| 导航站 | 常用入口和资源导航 |
| 文档站 | 教程、命令、部署和排障手册 |
| 博客站 | 对外博客文章和长期内容 |

简单入口放导航站，操作流程放文档站，完整文章放博客。
