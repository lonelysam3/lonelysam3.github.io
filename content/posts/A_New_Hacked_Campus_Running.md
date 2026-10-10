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

1. 不能直接访问[github.com/Auto-CQUPT-Plan/CQUPT-Sports-SDK](https://github.com/Auto-CQUPT-Plan/CQUPT-Sports-SDK) 会404 只能用 go 安装
2. go 是一个独立的程序 没有内置在 windows 里 挂梯子去https://go.dev/dl/ 下载并添加到环境变量即可
3. 安装前需要在SDK安装目录执行`go mod init <自己任意写个名字>`
4. go 的安装依赖在国外 安装前需要执行`go env -w GOPROXY=https://goproxy.cn,direct`挂载国内镜像

## 准备主程序

1. 执行`git clone https://github.com/skh2945932142/RunningByeBye.git`拉取主程序

2. 完成后`cd RunningByeBye`进入主程序目录

3. 执行`go run main.go`运行主程序

## 获取 openid：Yakit 抓包完整流程

### 1. 安装 Yakit

从官网下载并安装：[Yak Project | 开源网络安全基础设施](https://www.yaklang.com/)

安装完成后先启动一次，选择安全专家模式，保持GUI在后台不要关闭

### 2. 安装 CA 证书

CA 证书文件在 Yakit 的安装目录下，比如`D:\yakit\yakit-projects\yak-mitm-ca.crt`

如果没看见就跳到4.4节 在 Yakit 界面右上角免配置启动旁边有一个证书下载

1. 双击 `yak-mitm-ca.crt`
2. 点安装证书→ 存储位置选 本地计算机
3. 下一步选 将所有的证书都放入下列存储 → 浏览 → 受信任的根证书颁发机构
4. 确认安全警告

存储位置必须是受信任的根证书颁发机构。装到个人里抓包会失败，而且报错不明显

装完可以用 `certmgr.msc` 确认：受信任的根证书颁发机构 → 证书，应该能看到
`CN=Yakit MITM Root CA` 的条目

### 3. 改系统代理

1. 在 Yakit 页面顶部设置中找到系统代理，开启，并记下端口号
2. Win 键搜索代理服务器设置→ 打开代理设置页
3. 打开使用代理服务器并开启，确认使用代理服务器里的端口与 Yakit 的系统代理端口一致

### 4. 启动 MITM 抓包

1. 回到 Yakit 首页，新建一个临时项目
2. 点击左侧的 MITM交互式劫持
3. 确认代理监听端口，应该与设置-系统代理中的端口一致
4. 点击启动劫持

### 5. 抓取 openid

1. 保持 Yakit 处于运行状态，把微信完全退出再重新打开，然后登录用于跑步的那个微信号
3. 在微信里启动校园跑小程序
4. 回到 Yakit，找到形如这样的请求：`https://sport.cqupt.edu.cn/new_wxapp/wxUnifyId/checkBinding?wxCode=xxxxxxxx`

6. 点击这个包，在 Response 里就能看到 `openid` 字段，复制出来

### 6. 抓不到包时的排查顺序

按可能性从高到低：

| 现象 | 可能原因 | 处理 |
| --- | --- | --- |
| Yakit 里完全没有记录 | 未设置系统代理 | 重复3、4节 |
| Yakit 里完全没有记录 | 系统代理被其他程序占用 | 关闭可能占用系统代理的软件（比如steam++，梯子等） |
| 只有 `CONNECT`，没有请求内容 | 未解密 HTTPS | 开启强制 HTTPS 抓包，确认 CA 已装入受信任根 |
| 小程序转圈 / 提示网络异常 | CA 证书位置错误 | 重新安装到受信任的根证书颁发机构 |
| 能抓到别的应用，唯独没有小程序 | 小程序独立进程 | 确认系统代理已生效后，把微信完全退出再重开，重新进小程序 |
| 抓完电脑上不了网 | 系统代理没还原 | 改回原值或关闭使用代理服务器 |

## 用命令行启动跑步

| 命令 | 作用 |
| --- | --- |
| `login <openid>` | 登录并获取用户信息 |
| `run start <openid> -f <场地> -p <配速>` | 启动跑步 |
| `run resume <openid>` | 恢复跑步 |
| `run stop <openid>` | 停止跑步 |
| `task <openid>` | 查询任务详情 |
| `records <openid> [学期]` | 查询锻炼记录 |
| `recover` | 恢复未完成的跑步任务 |

1. 第一次启动执行 `go run ./cmd/commandline login <openid>` 绑定抓到的 openid，
   后续启动时无需再次绑定。能看到输出姓名学号等则说明绑定成功，否则重复
   获取openid一节重新抓取

2. 执行 `go run ./cmd/commandline run start <openid> -f 风华运动场 -p 6.0`
   在风华开启配速 6 分钟/千米的跑步

   `-f` 可选场地：`风华运动场` / `太极运动场` / `宁静苑`
   `-p` 配速，填 `0` 表示随机
   `-i` 点位上报间隔秒数，填 `0` 表示自动

3. 建议宿舍留人帮忙执行命令行，抱个电脑在操场上扫脸很需要勇气

## 制作前端页面（可选）

让 ai agent 阅读这个项目文件夹，做一个前端页面

利用 Github 学生认证从微软 Azure 获取免费的服务器，上传前端页面方便在操场用手机查看

