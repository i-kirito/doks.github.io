---
title: "导航站维护"
description: "记录 nav.xazz.top 导航站的内容维护、链接检测、本地构建和线上发布流程。"
lead: "从修改导航数据到检查在线状态，再到构建和验证公开域名的一套常用流程。"
date: 2020-11-16T13:59:39+01:00
lastmod: 2026-06-10T16:20:00+08:00
draft: false
images: []
menu:
  docs:
    parent: "webstack"
weight: 110
toc: true
---

## 项目位置

导航站本地项目：

```text
/Volumes/ikirito/Claude/hugo/nav.github.io
```

线上地址：

```text
https://nav.xazz.top/
```

常用入口：

| 对象 | 路径或地址 | 用途 |
|---|---|---|
| 内容源 | `data/webstack.yml` | 首页分类和网址卡片 |
| 友情链接 | `data/friendlinks.yml` | 友链数据 |
| 顶部导航 | `data/headers.yml` | 顶部菜单入口 |
| 链接状态 | `data/link_status.yml` | 绿色/红色在线状态点 |
| 检测脚本 | `scripts/check_links.py` | 批量检测网址可用性 |
| 静态输出 | `docs/` | GitHub Pages 发布目录 |

{{< alert icon="i" text="导航站的内容源是 data/*.yml，docs/ 是构建结果。不要只改 docs/ 里的 HTML，否则下次构建会被覆盖。" />}}

## 新增网址

打开 `data/webstack.yml`，按现有分类添加卡片。

常见字段：

| 字段 | 说明 |
|---|---|
| `title` | 卡片标题，尽量短 |
| `url` | 主要访问地址 |
| `logo` | 本地图标或远程 favicon |
| `description` | 一句话说明用途 |
| `qrcode` | 可选二维码 |
| `usrl` | 可选备用链接 |

示例：

```yaml
- title: 示例站点
  logo: "https://www.google.com/s2/favicons?sz=64&domain=example.com"
  url: https://example.com/
  description: 示例站点说明
```

维护建议：

- 优先放进已有分类，避免轻易新增大类。
- 标题使用站点名，不写过长营销描述。
- 描述写用途，不写泛泛的“很好用”。
- 图标优先用本地稳定资源；没有图标时可用 Google S2 favicon。
- 新增大量网址后一定跑链接检测。

## 检测链接状态

进入项目目录：

```bash
cd /Volumes/ikirito/Claude/hugo/nav.github.io
```

运行检测脚本：

```bash
python3 scripts/check_links.py --timeout 10 --workers 24
```

脚本会读取：

- `data/webstack.yml`
- `data/friendlinks.yml`
- `data/headers.yml`

并生成：

```text
data/link_status.yml
```

状态含义：

| 状态 | 页面表现 | 说明 |
|---|---|---|
| `online` | 绿色点 | 链接可访问 |
| `restricted` | 通常视为可用 | 需要登录、限流或禁止 HEAD |
| `offline` | 红色点 | 链接异常或检测失败 |

{{< details "为什么有些正常网站会 restricted？" >}}
部分网站会对脚本访问返回 `403`、`429` 或类似限制状态。它们不一定是真的挂了，但需要人工打开确认。
{{< /details >}}

## 本地构建

导航站使用 Hugo 生成静态页面：

```bash
hugo --minify
```

构建后检查：

- `docs/index.html` 是否更新。
- `docs/CNAME` 是否仍然存在。
- 首页卡片、图标、状态点是否正常。

如果本机有多个 Hugo 版本，优先使用项目实际可工作的版本，不要随手换全局 Hugo。

## 发布到 GitHub Pages

确认改动范围：

```bash
git status --short
git diff --stat
```

提交并推送：

```bash
git add data/webstack.yml data/link_status.yml docs
git commit -m "content: update navigation links"
git push origin main
```

如果还改了脚本、样式或配置，把对应文件也加入提交。

## 线上验证

本地构建成功不代表线上已经更新。推送后打开：

```text
https://nav.xazz.top/
```

检查项：

- 新增网址是否出现在正确分类。
- 图标是否加载。
- 绿色/红色状态点是否显示。
- 异常链接是否符合预期。
- 手机宽度下卡片是否挤压。

可以用命令确认公开站点响应：

```bash
curl -I --max-time 10 https://nav.xazz.top/
```

## 常见维护动作

### 修复失效链接

1. 在 `data/link_status.yml` 中找到 `offline` 链接。
2. 回到 `data/webstack.yml` 查找对应卡片。
3. 人工打开确认是否迁移、改域名或永久失效。
4. 更新 `url`、`logo`、`description`。
5. 重新运行检测脚本。

### 调整分类顺序

分类顺序由 `data/webstack.yml` 中的顺序决定。移动整段分类前，先确认子分类结构没有被破坏。

### 增加常用热门站点

优先补到已有栏目：

- AI 工具放到 AI 或效率类。
- 编程工具放到编程学习。
- 资源站放到素材资源。
- 娱乐站放到悠闲娱乐。

新增后统一跑检测和本地构建。

### 联系方式更新

联系入口优先放在 `content/about.md`、顶部导航或个人相关卡片里。变更后同时检查导航站和文档站是否有旧地址残留。
