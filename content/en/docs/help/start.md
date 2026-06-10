---
title: "文档站搭建"
description: "记录 Doks/Hugo 文档站的本地环境、目录结构、内容编辑和预览方法。"
lead: "从依赖安装到本地预览，快速启动 doks.xazz.top 这类 Doks/Hugo 文档站。"
date: 2020-11-12T13:26:54+01:00
lastmod: 2026-06-10T16:20:00+08:00
draft: false
images: []
menu:
  docs:
    parent: "help"
weight: 610
toc: true
---

{{< alert icon="i" text="本站使用 Node.js 管理前端依赖，并通过 Hugo 生成静态页面；日常维护优先使用 npm 脚本，避免不同 Hugo 版本混用。" />}}

## 项目位置

文档站本地项目：

```text
/Volumes/ikirito/Claude/hugo/doks.github.io
```

线上地址：

```text
https://doks.xazz.top/
```

源码仓库：

```text
https://github.com/i-kirito/doks.github.io
```

## 适用场景

当需要整理教程、记录部署流程、修改页面样式或发布前检查时，按本文流程启动文档站。

文档站主要负责沉淀三类内容：

- 导航站 `nav.xazz.top` 的维护方法。
- 文档站 `doks.xazz.top` 自己的搭建和发布方法。
- Halo2 博客 `xazz.top` 的部署、运维和排障方法。

## 环境准备

需要具备：

- Node.js LTS，用于运行 npm 脚本。
- npm，用于安装前端依赖。
- Git，用于提交和推送。
- 项目内置 Hugo，由 `hugo-installer` 安装到 `node_modules/.bin/hugo`。

检查版本：

```bash
node --version
npm --version
git --version
```

进入项目：

```bash
cd /Volumes/ikirito/Claude/hugo/doks.github.io
```

## 安装依赖

首次拉取项目，或者 `node_modules/` 不存在时：

```bash
npm install
```

如果依赖损坏，可以重新安装：

```bash
npm run clean:install
npm install
```

## 启动本地服务

默认启动：

```bash
npm run start
```

指定端口：

```bash
npm run start -- --port 1324
```

常用访问地址：

```text
http://localhost:1324/
http://localhost:1324/docs/help/start/
```

{{< details "端口被占用怎么办？" >}}
换一个端口即可，例如：

```bash
npm run start -- --port 1325
```

如果要查占用进程：

```bash
lsof -i :1324
```

{{< /details >}}

## 目录结构

常改位置：

| 路径 | 用途 |
|---|---|
| `content/en/docs/` | 文档内容 |
| `content/en/blog/` | 博客类内容 |
| `layouts/index.html` | 首页结构 |
| `layouts/docs/` | 文档页模板 |
| `layouts/partials/sidebar/` | 侧边栏和目录 |
| `layouts/partials/header/` | 顶部导航 |
| `layouts/partials/footer/` | 页脚 |
| `assets/scss/` | 主题样式 |
| `assets/js/` | 前端脚本 |
| `config/_default/menus/menus.en.toml` | 菜单配置 |

## 新增文档

文档页放在 `content/en/docs/` 下。每个栏目一个目录：

```text
content/en/docs/webstack/
content/en/docs/help/
content/en/docs/halo/
```

新增页面需要 front matter：

```yaml
---
title: "页面标题"
description: "页面描述"
lead: "页面导语"
date: 2026-06-10T16:20:00+08:00
lastmod: 2026-06-10T16:20:00+08:00
draft: false
images: []
menu:
  docs:
    parent: "help"
weight: 640
toc: true
---
```

字段说明：

| 字段 | 说明 |
|---|---|
| `title` | 页面标题 |
| `description` | SEO 和列表描述 |
| `lead` | 页面标题下方导语 |
| `menu.docs.parent` | 所属左侧栏目 |
| `weight` | 栏目内排序 |
| `toc` | 是否显示右侧目录 |

## Markdown 规范

建议：

- 从 `##` 开始组织正文标题。
- 命令统一使用代码块。
- 路径、文件名、变量名使用行内代码。
- 一屏内不要堆太多项目符号，必要时拆成表格。
- 真实密码、Token、Cookie、数据库文件不要写进文档。

常用提示块：

```go-html-template
{{</* alert icon="i" text="这里写提示内容。" */>}}
```

折叠详情：

```go-html-template
{{</* details "标题" */>}}
这里写展开内容。
{{</* /details */>}}
```

## 本地检查

每次修改后至少检查：

- 首页：`/`
- 文档索引：`/docs/`
- 导航站文档：`/docs/webstack/introduction/`
- 文档站文档：`/docs/help/start/`
- Halo2 文档：`/docs/halo/deployment/`

重点看：

- 左侧导航是否展开正确。
- 右侧目录是否匹配标题。
- 代码块是否可读。
- 提示块是否不贴边。
- 深色模式是否保持可读。
- 手机宽度下导航是否正常。

## 构建检查

提交前执行：

```bash
npm run lint
npm run build
```

如果只改样式，可以先跑：

```bash
npm run lint:styles
```

构建输出在 `public/`。它只是本地构建结果，不代表线上站点已经更新。
