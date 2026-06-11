---
title: "Docker Compose 工作流"
description: "整理 Docker Compose 文件结构、启动、更新、日志、备份、清理和发布检查流程。"
lead: "多容器服务优先写成 Compose 项目，让配置、数据、网络和更新过程都能被重复执行。"
date: 2026-06-11T09:20:00+08:00
lastmod: 2026-06-11T09:20:00+08:00
draft: false
images: []
menu:
  docs:
    parent: "docker"
weight: 730
toc: true
---

## 官方参考

- [Docker Compose CLI reference](https://docs.docker.com/reference/cli/docker/compose/)
- [Compose file reference](https://docs.docker.com/reference/compose-file/)
- [docker compose up](https://docs.docker.com/reference/cli/docker/compose/up/)
- [docker compose down](https://docs.docker.com/reference/cli/docker/compose/down/)
- [Compose volumes](https://docs.docker.com/reference/compose-file/volumes/)

## 什么时候用 Compose

这些场景优先用 Compose：

- 一个应用需要数据库、缓存、反向代理等多个容器。
- 需要长期运行，后续要更新、备份和迁移。
- 需要把端口、环境变量、卷和网络写成可复用配置。
- 需要在不同机器上重复部署同一套服务。

临时测试可以用 `docker run`，长期服务建议写进 `compose.yml`。

## 目录结构

推荐一个服务一个目录：

```text
app-stack/
├── compose.yml
├── .env
├── data/
├── config/
└── backups/
```

用途说明：

| 路径 | 用途 |
|---|---|
| `compose.yml` | 服务、网络、卷、端口和环境变量 |
| `.env` | 本地变量和密钥，不提交真实值 |
| `data/` | 绑定挂载的数据目录 |
| `config/` | 可编辑配置文件 |
| `backups/` | 手动备份输出 |

## 最小 Compose 示例

```yaml
services:
  web:
    image: nginx:alpine
    restart: unless-stopped
    ports:
      - "8080:80"
    volumes:
      - ./site:/usr/share/nginx/html:ro
```

启动：

```bash
docker compose up -d
```

查看状态：

```bash
docker compose ps
```

查看日志：

```bash
docker compose logs -f --tail=120
```

停止并移除容器和默认网络：

```bash
docker compose down
```

## 带数据库的示例

```yaml
services:
  app:
    image: example/app:latest
    restart: unless-stopped
    depends_on:
      - db
    environment:
      APP_DATABASE_HOST: db
      APP_DATABASE_PASSWORD: ${APP_DATABASE_PASSWORD}
    ports:
      - "8080:8080"
    volumes:
      - ./data/app:/app/data

  db:
    image: postgres:16-alpine
    restart: unless-stopped
    environment:
      POSTGRES_PASSWORD: ${APP_DATABASE_PASSWORD}
      POSTGRES_DB: app
    volumes:
      - db-data:/var/lib/postgresql/data

volumes:
  db-data:
```

`.env` 示例只写变量名：

```text
APP_DATABASE_PASSWORD=change-me
```

{{< alert icon="i" text=".env 文件不要提交真实密码；公开文档和 README 里只写变量名或占位值。" />}}

## 启动前检查

先让 Compose 展开并校验配置：

```bash
docker compose config
```

再启动：

```bash
docker compose up -d
```

启动后确认：

```bash
docker compose ps
docker compose logs --tail=120
```

## 更新流程

通用更新：

```bash
docker compose pull
docker compose up -d
docker compose ps
docker compose logs --tail=120
```

如果镜像由本地 Dockerfile 构建：

```bash
docker compose build
docker compose up -d
```

强制重建单个服务：

```bash
docker compose up -d --build service-name
```

## 备份流程

备份绑定挂载目录：

```bash
mkdir -p backups
tar czf backups/app-data.tar.gz data/
```

备份命名卷：

```bash
mkdir -p backups

docker run --rm \
  -v app-stack_db-data:/data:ro \
  -v "$PWD/backups:/backup" \
  alpine \
  tar czf /backup/db-data.tar.gz -C /data .
```

数据库最好使用数据库自己的导出工具。例如 PostgreSQL 可以在对应容器中执行 `pg_dump`，MySQL 可以使用 `mysqldump`。

## 回滚思路

回滚前先保留现场：

```bash
docker compose ps
docker compose logs --tail=200 > backups/last-error.log
```

常见回滚方式：

1. 把镜像 tag 改回上一个版本。
2. 恢复更新前的 `compose.yml`。
3. 如涉及数据迁移，按备份恢复数据库或数据目录。
4. 执行 `docker compose up -d`。
5. 检查页面、日志和核心功能。

## 生产发布检查

发布后至少检查：

- `docker compose ps` 中核心服务都在运行。
- `docker compose logs --tail=120` 没有持续错误。
- 端口映射没有冲突。
- 需要持久化的数据已经挂载。
- 反向代理可以访问上游服务。
- 外部域名、HTTPS、回源和缓存都正常。

## 慎用命令

这些命令需要先确认影响范围：

| 命令 | 风险 |
|---|---|
| `docker compose down -v` | 删除 Compose 声明的命名卷和匿名卷 |
| `docker volume prune` | 删除所有未使用卷 |
| `docker image prune -a` | 删除所有未使用镜像，可能导致下次启动重新拉取 |
| `docker system prune -a --volumes` | 同时清理镜像、容器、网络、构建缓存和未使用卷 |

{{< alert icon="i" text="生产环境清理前先备份、再确认 compose 文件和数据卷名称；不要只凭容器是否运行判断数据能不能删。" />}}
