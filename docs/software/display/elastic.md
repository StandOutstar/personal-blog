---
title: 使用 Elastic 记录和展示数据
---


## docker 安装，单节点运行

```shell
$docker run -d -p 9200:9200 -p 9300:9300 -e "discovery.type=single-node" docker.elastic.co/elasticsearch/elasticsearch:7.5.2
```

## 索引操作

集合的名字

### 查看索引

### 增加索引

### 删除索引

## 文档操作

### 创建文档

### 获取文档

### 更新文档

### 删除文档

### 批处理

## 搜索操作

