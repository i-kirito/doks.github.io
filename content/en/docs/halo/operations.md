---
title: "Halo2 常用方法"
description: "整理 Halo2 博客日常维护中最常用的检查、备份、重启、更新和日志命令。"
lead: "把高频操作整理成可复制命令，减少每次维护时重新回忆。"
date: 2026-06-10T16:20:00+08:00
lastmod: 2026-06-10T16:20:00+08:00
draft: false
images: []
menu:
  docs:
    parent: "halo"
weight: 920
toc: true
---

## 进入目录

所有命令默认在部署目录中执行：

```bash
cd ~/halo
```

## 查看状态

查看容器：

```bash
docker compose ps
```

查看资源占用：

```bash
docker stats
```

查看最近日志：

```bash
docker compose logs --tail=120 halo
docker compose logs --tail=120 halodb
```

持续跟踪 Halo 日志：

```bash
docker compose logs -f halo
```

## 重启服务

只重启 Halo：

```bash
docker compose restart halo
```

重启整套服务：

```bash
docker compose restart
```

停止服务：

```bash
docker compose down
```

重新启动：

```bash
docker compose up -d
```

## 数据备份

备份数据库前先创建备份目录：

```bash
mkdir -p backups
```

如果使用 MySQL，可以导出 SQL：

```bash
docker compose exec halodb sh -c 'mysqldump -u"$MYSQL_USER" -p"$MYSQL_PASSWORD" halo' \
  > backups/halo_mysql_$(date +%Y%m%d_%H%M%S).sql
```

如果使用 PostgreSQL，可以导出 dump：

```bash
docker compose exec halodb sh -c 'pg_dump -U "$POSTGRES_USER" "$POSTGRES_DB"' \
  > backups/halo_postgres_$(date +%Y%m%d_%H%M%S).sql
```

压缩备份：

```bash
gzip backups/halo_*_*.sql
```

备份 Halo 应用数据目录：

```bash
tar -czf backups/halo_data_$(date +%Y%m%d_%H%M%S).tar.gz halo2
```

{{< alert icon="i" text="数据库目录和 Halo 数据目录都是运行时数据，不能当普通源码提交；备份包也应放在私有归档位置。" />}}

## 恢复数据

恢复前先停止 Halo，避免应用写入：

```bash
docker compose stop halo
```

导入 SQL：

```bash
docker compose exec -T halodb sh -c 'mysql -u"$MYSQL_USER" -p"$MYSQL_PASSWORD" halo' \
  < backups/halo_mysql_YYYYMMDD_HHMMSS.sql
```

恢复后启动 Halo：

```bash
docker compose start halo
```

再检查健康状态：

```bash
curl -I --max-time 10 http://127.0.0.1:8090/
```

## 更新镜像

更新前先备份数据库和 Halo 数据目录。确认备份完成后：

```bash
docker compose pull
docker compose up -d
```

更新后查看日志和健康检查：

```bash
docker compose logs --tail=120 halo
curl -I --max-time 10 http://127.0.0.1:8090/
```

## 公开入口检查

如果配置了域名或反向代理，检查公开入口：

```bash
curl -I --max-time 10 https://blog.example.com/
```

确认状态码、证书和页面内容都符合预期。

## 发布后巡检

建议每次维护完成后按顺序执行：

```bash
docker compose ps
curl -I --max-time 10 http://127.0.0.1:8090/
curl -I --max-time 10 https://blog.example.com/
```

如果公开域名异常，但本机端口正常，继续看反向代理、DNS、证书或 CDN。
