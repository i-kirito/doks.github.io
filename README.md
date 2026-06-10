<p align="center">
  <a href="https://getdoks.org/">
    <img alt="小A猪崽知识库" src="static/logo-doks.svg" width="72">
  </a>
</p>

<h1 align="center">小A猪崽 | 有用的知识库</h1>

<p align="center">
  基于 Hugo + Doks 的文档站，用来整理文档站搭建流程、导航站维护方法、AI 助手教程、Halo2 部署教程和日常技术笔记。
</p>

<p align="center">
  <a href="https://getdoks.org/">Doks</a>
  ·
  <a href="https://gohugo.io/">Hugo</a>
  ·
  <a href="https://docs.halo.run/">Halo</a>
  ·
  <a href="https://docs.astrbot.app/">AstrBot</a>
  ·
  <a href="https://docs.openclaw.ai/">OpenClaw</a>
  ·
  <a href="https://hermes-agent.nousresearch.com/docs/">Hermes</a>
</p>

## 项目简介

这个仓库是一个 Doks/Hugo 文档站示例，站点主要用于沉淀常用知识和维护说明。

当前内容包括：

- Doks/Hugo 文档站的本地搭建和启动流程
- 静态站点发布、部署和维护记录
- WebStack-Hugo 导航站相关资料
- AstrBot、OpenClaw、Hermes Agent 的安装、配置和排障教程
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
- [WebStack-Hugo](https://github.com/shenweiyan/WebStack-Hugo)
- [Halo](https://docs.halo.run/)
- [AstrBot](https://docs.astrbot.app/)
- [OpenClaw](https://docs.openclaw.ai/)
- [Hermes Agent](https://hermes-agent.nousresearch.com/docs/)

## 许可

本仓库沿用 MIT License，详见 [LICENSE](LICENSE)。
