---
title: "Vercel 部署"
description: "记录使用 Vercel 托管 WebStack-Hugo 静态导航站的基础流程。"
lead: "从本地修改导航数据、检测链接状态，到使用 Vercel 发布静态站点。"
date: 2020-11-16T13:59:39+01:00
lastmod: 2020-11-16T13:59:39+01:00
draft: false
images: []
menu:
  docs:
    parent: "webstack"
weight: 110
toc: true
---

## 准备工作

- 注册 [Vercel](https://vercel.com/) 账号，并绑定 GitHub。
- 准备 WebStack-Hugo 项目仓库，例如
  [shenweiyan/WebStack-Hugo](https://github.com/shenweiyan/WebStack-Hugo)。
- 确认本地可以执行 Hugo 构建命令。

{{< details "Vercel 是什么？" >}}
Vercel 是一个云端部署平台，适合托管静态站点和现代前端应用。对于 Hugo
这类静态站点，只需要绑定仓库并配置构建命令，就可以自动完成部署。
{{< /details >}}

## 修改导航数据

导航站的常规维护流程通常是：

1. 在数据文件中新增或调整网址。
2. 为新网址补充标题、说明、图标和分类。
3. 运行链接检测脚本，生成在线状态。
4. 本地构建确认页面正常。
5. 提交并推送到远程仓库。

{{< alert icon="i" text="新增大量网址时，优先保持原有分类结构；只有分类明显装不下时再新增大类。" />}}

## 检测链接

如果项目内已有链接检测脚本，发布前先执行：

```bash
python3 scripts/check_links.py --timeout 10 --workers 24
```

检测结果会用于页面上的在线状态点：

- 绿色：链接可访问。
- 红色：链接异常或检测失败。

## 本地构建

构建静态页面：

```bash
hugo --minify
```

如果项目使用 npm 脚本封装 Hugo，则优先使用项目里的脚本命令。

## 创建 Vercel 项目

在 Vercel 控制台中创建新项目，选择 GitHub 仓库，确认构建配置后点击部署。

常见配置：

| 配置项 | 示例 |
|---|---|
| Framework Preset | Other |
| Build Command | `hugo --minify` |
| Output Directory | `public` 或项目指定发布目录 |

## 绑定域名

在项目的域名设置中添加自定义域名，并按 Vercel 提示配置 DNS 记录。

绑定完成后，用线上域名确认最新内容是否生效：

```text
https://nav.xazz.top/
```
