---
title: "文档站发布"
description: "记录 Doks/Hugo 文档站从本地检查、提交推送到线上验证的发布流程。"
lead: "本地构建成功只是第一步，最终要以 GitHub 和 doks.xazz.top 的实际状态为准。"
date: 2023-04-04T15:22:20+01:00
lastmod: 2026-06-10T16:20:00+08:00
draft: false
images: []
menu:
  docs:
    parent: "help"
weight: 620
toc: true
---

## 发布流程

一次完整发布建议按这个顺序：

```text
确认改动范围
-> 本地 lint 和 build
-> 本地预览
-> git 提交
-> git push
-> 等待部署
-> 线上验证
```

{{< alert icon="i" text="不要把本地 public/ 构建成功当成线上已经更新。线上是否生效，要打开 https://doks.xazz.top/ 验证。" />}}

## 确认改动范围

查看当前状态：

```bash
git status --short
```

查看文件级别统计：

```bash
git diff --stat
```

如果有不属于本次发布的文件，先不要 `git add -A`，只添加本次需要的路径。

## 本地检查

完整检查：

```bash
npm run lint
npm run build
```

常见单项检查：

```bash
npm run lint:styles
npm run lint:markdown
npm run lint:scripts
```

检查本地服务：

```bash
npm run start -- --port 1324
```

然后打开：

```text
http://localhost:1324/
http://localhost:1324/docs/help/start/
```

## 提交改动

添加文件：

```bash
git add content/en/docs config layouts assets
```

如果本次只改内容，可以更精确：

```bash
git add content/en/docs
```

提交：

```bash
git commit -m "docs: expand site operations guides"
```

提交信息建议：

| 类型 | 适用场景 |
|---|---|
| `docs:` | 只改文档内容 |
| `style:` | 样式、布局、视觉 |
| `fix:` | 修复页面错误 |
| `content:` | 内容数据更新 |

## 推送 GitHub

推送到主分支：

```bash
git push origin main
```

确认本地和远端一致：

```bash
git fetch origin main
git status --short --branch
git rev-parse HEAD origin/main
```

两个 hash 一致，才说明 GitHub 收到了最新提交。

## 线上验证

打开：

```text
https://doks.xazz.top/
```

至少检查：

- 首页首屏是否更新。
- `/docs/` 文档索引是否出现新栏目。
- `/docs/help/start/` 是否能打开。
- `/docs/webstack/quick-start/` 是否能打开。
- `/docs/halo/deployment/` 是否能打开。
- 左侧导航、右侧目录、深色模式是否正常。

命令检查：

```bash
curl -I --max-time 10 https://doks.xazz.top/
curl -I --max-time 10 https://doks.xazz.top/docs/halo/deployment/
```

## 发布后记录

建议记录：

- 提交 hash。
- 发布时间。
- 检查过的页面。
- 是否有异常和后续处理。

如果线上延迟，先等部署完成，再刷新浏览器缓存。

## 回滚思路

如果线上出现明显问题：

1. 先确认是哪一个提交引入问题。
2. 如果只是文档内容错误，直接新提交修复。
3. 如果布局大面积异常，可以使用 `git revert` 生成回滚提交。
4. 回滚后仍要重新跑 `npm run build` 并推送。

不要使用会丢失本地改动的破坏性命令，除非已经确认有备份。
