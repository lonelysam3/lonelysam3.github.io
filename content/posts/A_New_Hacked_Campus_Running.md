---
title: "你邮的校园跑科技"
date: 2026-10-09T11:22:00+08:00
draft: false

# ---------------------------------------------------------------------------
# 文章模板（archetypes/default.md）
#
# 用法两种：
#   1. 命令行自动套用：hugo new posts/我的文章.md
#   2. 手动：复制本文件到 content/posts/ 下改名
#
# 下面每一项都注明用途；不用的整行删掉，不要留空值——空字符串会被当作
# 「已设置但为空」，与「未设置」的默认行为不同。
#
# 格式说明：原骨架用的是 TOML（+++），本站现有文章统一用 YAML（---），
# 因此改为 YAML，避免两种格式混用。
# ---------------------------------------------------------------------------

# 分类：建议只填一个。会显示在侧栏「分类」中，也用于面包屑与结构化数据。
categories: ["教程"]

# 标签：可填多个。用于搜索、标签页、以及侧栏「相关文章」的聚合。
tags: ["校园跑", "科技"]

# 摘要：列表页与搜索结果里显示的一段话。不填则自动截取正文开头。
summary: "一种很新的校园跑科技"

# 描述：给搜索引擎与社交分享卡片用。不填则回退到 summary。
description: ""

# 系列：同名系列的文章会自动串起来，页面上显示「第 N / M 篇」与篇目列表。
series: ["校园科技"]
seriesOrder: 1        # 可选。系列内序号；不填则按发布日期排序。

# 目录：本文是否显示目录（站点默认关闭，见 hugo.yaml）。
ShowToc: true

# 封面图：把图片放进与本文同名的目录（content/posts/我的文章/），再写文件名。
# cover:
#   image: "cover.jpg"
#   alt: "封面说明"
#   caption: "图片来源"

# 单篇覆盖站点设置，一般用不到：
# hideMeta: true         # 隐藏发布日期、字数、阅读时间等信息
# comments: false        # 关闭本文评论
# searchHidden: true     # 不让本文出现在搜索结果与命令面板里
# sidebar: false         # 不显示右侧边栏
---

## 下载SDK

[RunningByeBye/dev/CQUPT-Sports-SDK-使用总结.md at main · skh2945932142/RunningByeBye](https://github.com/skh2945932142/RunningByeBye/blob/main/dev/CQUPT-Sports-SDK-使用总结.md)

主要基于这个教程

有几点需要注意：

1. 不能直接访问[github.com/Auto-CQUPT-Plan/CQUPT-Sports-SDK](https://github.com/Auto-CQUPT-Plan/CQUPT-Sports-SDK) 会404 只能用go安装
2. go是一个独立的程序 没有内置在windows里 挂梯子去https://go.dev/dl/ 下载并添加到环境变量即可
3. 安装前需要在SDK安装目录执行`go mod init <自己任意写个名字>`
4. go的安装依赖在国外 安装前需要执行`go env -w GOPROXY=https://goproxy.cn,direct`挂载国内镜像

## 准备主程序

1. 执行`git clone https://github.com/skh2945932142/RunningByeBye.git`拉取主程序

2. 完成后`cd RunningByeBye`进入主程序目录

3. 执行`go run main.go`运行主程序

## 获取openid

1. 首先需要安装Yakit[Yak Project | 开源网络安全基础设施](https://www.yaklang.com/)
2. 启动yakit后选择第二个模式
3. 进入GUI后新建一个临时项目
4. 启动MITM交互式劫持开始抓包
5. 保持yakit抓包状态，前往电脑版微信登录用于跑步的微信号
6. 微信启动跑步小程序，返回yakit界面，寻找形如https://sport.cqupt.edu.cn/new_wxapp/wxUnifyId/checkBinding?wxCode=的包
7. 单击这个包 Response里机获得openid

## 用命令行启动跑步

1. 第一次启动执行`go run ./cmd/commandline login <openid>`绑定你抓到的openid，后续启动时无需再次绑定。能看到输出姓名学号等则说明绑定成功，否则重复 获取openid 一节3-7
2. 执行`go run ./cmd/commandline run start <openid> -f 风华运动场 -p 6.0`在风华开启配速6分钟/千米的跑步
3. 建议宿舍留人帮忙执行命令行，抱个电脑在操场上扫脸很需要勇气

## 创建前端页面(可选)

1. 让ai agent制作一个合适的前端页面

2. 然后上传到微软azure的免费服务器上方便在操场扫脸时在手机上开启(具体操作自行寻找)

