---
title: "Docker 常用指令"
description: "整理 Docker 容器、镜像、日志、进入容器、卷、网络、更新、备份和清理的高频命令。"
lead: "维护 Docker 服务时，常用命令可以按查看、日志、进入、更新、备份、清理和排障来记。"
date: 2026-06-11T09:20:00+08:00
lastmod: 2026-06-11T09:20:00+08:00
draft: false
images: []
menu:
  docs:
    parent: "docker"
weight: 720
toc: true
---

## 官方参考

- [Docker CLI reference](https://docs.docker.com/reference/cli/docker/)
- [docker run](https://docs.docker.com/reference/cli/docker/container/run/)
- [docker compose up](https://docs.docker.com/reference/cli/docker/compose/up/)
- [docker compose down](https://docs.docker.com/reference/cli/docker/compose/down/)
- [Compose file reference](https://docs.docker.com/reference/compose-file/)

## 状态查看

```bash
docker version
docker info
docker ps
docker ps -a
docker stats
```

查看单个容器详情：

```bash
docker inspect container-name
```

只看容器挂载：

```bash
docker inspect container-name --format '{{json .Mounts}}'
```

## 容器生命周期

```bash
docker start container-name
docker stop container-name
docker restart container-name
docker rm container-name
```

强制删除停止不了的容器：

```bash
docker rm -f container-name
```

{{< alert icon="i" text="删除容器前确认数据是否在卷或绑定挂载里；只存在容器内部的数据会随容器删除而丢失。" />}}

## 日志查看

查看最近日志：

```bash
docker logs --tail=120 container-name
```

持续跟随日志：

```bash
docker logs -f --tail=120 container-name
```

带时间戳：

```bash
docker logs -f --timestamps container-name
```

## 进入容器

```bash
docker exec -it container-name sh
```

如果容器里有 Bash：

```bash
docker exec -it container-name bash
```

执行一次性命令：

```bash
docker exec container-name env
docker exec container-name ls -la /app
```

## 镜像管理

```bash
docker images
docker pull image-name:tag
docker build -t image-name:tag .
docker rmi image-name:tag
```

查看镜像历史：

```bash
docker history image-name:tag
```

保存和导入镜像：

```bash
docker save image-name:tag | gzip > image-name.tar.gz
gunzip -c image-name.tar.gz | docker load
```

## 卷管理

```bash
docker volume ls
docker volume inspect volume-name
docker volume create volume-name
docker volume rm volume-name
```

备份命名卷：

```bash
docker run --rm \
  -v volume-name:/data:ro \
  -v "$PWD:/backup" \
  alpine \
  tar czf /backup/volume-name.tar.gz -C /data .
```

恢复命名卷：

```bash
docker volume create volume-name

docker run --rm \
  -v volume-name:/data \
  -v "$PWD:/backup" \
  alpine \
  sh -c "cd /data && tar xzf /backup/volume-name.tar.gz"
```

## 网络管理

```bash
docker network ls
docker network inspect network-name
docker network create app-net
docker network rm app-net
```

把容器加入网络：

```bash
docker network connect app-net container-name
```

从网络移除：

```bash
docker network disconnect app-net container-name
```

## Compose 常用命令

```bash
docker compose config
docker compose ps
docker compose up -d
docker compose logs --tail=120
docker compose logs -f --tail=120 service-name
docker compose restart service-name
docker compose pull
docker compose up -d
docker compose down
```

只重建单个服务：

```bash
docker compose up -d --build service-name
```

进入 Compose 服务容器：

```bash
docker compose exec service-name sh
```

{{< alert icon="i" text="公开分享 docker compose config 输出前要先脱敏；它可能把 .env 里的变量展开到结果中。" />}}

## 更新服务

单容器更新流程：

```bash
docker pull image-name:tag
docker stop container-name
docker rm container-name
docker run -d --name container-name image-name:tag
```

Compose 更新流程：

```bash
docker compose pull
docker compose up -d
docker compose ps
docker compose logs --tail=120
```

如果服务有数据库或重要文件，更新前先备份。

## 清理命令

查看磁盘占用：

```bash
docker system df
```

清理未使用容器、网络、悬空镜像和构建缓存：

```bash
docker system prune
```

清理未使用镜像：

```bash
docker image prune -a
```

清理未使用卷：

```bash
docker volume prune
```

{{< alert icon="i" text="不要习惯性执行 docker system prune -a --volumes；它会把未使用镜像和未使用卷一起清掉，误删后恢复会很麻烦。" />}}

## 快速排障

| 现象 | 命令 |
|---|---|
| 容器是否存在 | `docker ps -a` |
| 容器为什么退出 | `docker logs --tail=120 container-name` |
| 端口怎么映射 | `docker port container-name` |
| 环境变量是否进入容器 | `docker exec container-name env` |
| 挂载是否正确 | `docker inspect container-name --format '{{json .Mounts}}'` |
| 网络是否正确 | `docker inspect container-name --format '{{json .NetworkSettings.Networks}}'` |
| 磁盘占用多少 | `docker system df` |
