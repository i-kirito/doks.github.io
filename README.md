<p align="center">
  <a href="https://doks.xazz.top/">
    <img alt="小A猪崽知识库" src="static/logo-doks.svg" width="72">
  </a>
</p>

<h1 align="center">小A猪崽 | 有用的知识库</h1>

<p align="center">
  基于 Hugo + Doks 的个人知识库，用来整理常用操作、文档站搭建流程、导航站维护记录和日常技术笔记。
</p>

<p align="center">
  <a href="https://doks.xazz.top/">在线访问</a>
  ·
  <a href="https://github.com/i-kirito/doks.github.io">GitHub 仓库</a>
  ·
  <a href="https://nav.xazz.top/">导航站</a>
</p>

## 项目简介

这个仓库是 [doks.xazz.top](https://doks.xazz.top/) 的源码，站点主要用于沉淀个人常用知识和维护说明。

当前内容包括：

- Doks/Hugo 文档站的本地搭建和启动流程
- 静态站点发布、部署和维护记录
- WebStack-Hugo 导航站相关资料
- 后续技术笔记和折腾记录

## 本地开发

环境要求：

- [Node.js](https://nodejs.org/) 16.16 或更高版本
- npm

安装依赖：

```bash
npm ci
```

启动本地预览：

```bash
npm run start
```

默认访问地址：

```text
http://localhost:1313/
```

如果需要指定端口：

```bash
npm run start -- --port 1324
```

## 常用命令

```bash
npm run lint    # 检查脚本、样式和 Markdown
npm run build   # 生成生产静态文件
npm run clean   # 清理 public 和 resources
```

## 目录说明

```text
content/            站点内容
layouts/            Hugo 模板
assets/scss/        样式源码
assets/js/          前端脚本
config/_default/    Hugo 配置
static/             favicon、logo、manifest 等静态资源
```

## 相关项目

- [Hugo](https://gohugo.io/)
- [Doks](https://getdoks.org/)
- [WebStack-Hugo 导航站源码](https://github.com/i-kirito/nav.github.io)
- [小A猪崽导航站](https://nav.xazz.top/)

## 许可

本仓库沿用 MIT License，详见 [LICENSE](LICENSE)。
