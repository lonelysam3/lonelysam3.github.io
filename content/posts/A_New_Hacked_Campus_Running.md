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

## 获取 openid：Yakit 抓包完整流程

### 一、安装 Yakit

从官网下载并安装：[Yak Project | 开源网络安全基础设施](https://www.yaklang.com/)

安装完成后先启动一次，把首次运行的初始化步骤走完。

### 二、安装 CA 证书（最容易卡住的一步，别跳过）

Yakit 要解密 HTTPS，必须让系统信任它自己签发的证书，否则微信的请求会因证书校验失败而直接中断，
表现为「Yakit 里什么都抓不到」或者「小程序一直转圈加载不出来」。

CA 证书文件就在 Yakit 的安装目录下：

```
D:\yakit\yakit-projects\yak-mitm-ca.crt
```

（同一目录下还有一个 `yak-mitm-gm-ca.crt`，那是国密算法版本，一般用不到。）

1. 双击 `yak-mitm-ca.crt`
2. 点「安装证书」→ 存储位置选 **本地计算机**
3. 下一步选 **将所有的证书都放入下列存储** → 浏览 → **受信任的根证书颁发机构**
4. 确认安全警告

{{< callout type="warn" title="这一步的判断标准" >}}
存储位置必须是**受信任的根证书颁发机构**。装到「个人」里抓包会失败，而且报错不明显。

装完可以用 `certmgr.msc` 确认：受信任的根证书颁发机构 → 证书，应该能看到
`CN=Yakit MITM Root CA` 的条目。
{{< /callout >}}

### 三、启动 MITM 抓包

1. 启动 Yakit，进入 **MITM 交互式劫持**（Yakit 首页有醒目入口）
2. 新建一个临时项目，或直接用默认项目
3. 确认 **代理监听端口**，默认是 `8083`，记下这个数字
4. 点击启动劫持，状态变为运行中

{{< callout type="note" >}}
有些版本需要手动开启「强制 HTTPS 抓包」才会解密。如果抓到的包全是 `CONNECT`
而没有正常请求内容，先检查这一项。
{{< /callout >}}

### 四、改系统代理（关键：微信内置的代理设置对小程序无效）

{{< callout type="warn" title="走弯路的地方：微信 → 设置 → 代理 填了也没用" >}}
微信自带的代理设置**只作用于微信主进程**（聊天、朋友圈那些）。小程序跑在独立的
进程里，**不读这个设置**，所以按微信里的代理配好之后，主程序能抓到、小程序一条都抓不到。

必须改 **Windows 系统代理**，让所有流量都经过 Yakit。
{{< /callout >}}

**方法一：图形界面**

1. Win 键搜索「代理服务器设置」→ 打开「代理」设置页
2. 打开「使用代理服务器」
3. 地址填 `127.0.0.1`，端口填 Yakit 的监听端口（默认 `8083`）
4. 保存

**方法二：命令行（推荐，方便来回切换）**

```powershell
# 开启：把系统代理指向 Yakit
Set-ItemProperty "HKCU:\Software\Microsoft\Windows\CurrentVersion\Internet Settings" -Name ProxyEnable -Value 1
Set-ItemProperty "HKCU:\Software\Microsoft\Windows\CurrentVersion\Internet Settings" -Name ProxyServer -Value "127.0.0.1:8083"

# 抓完还原（改回你自己的梯子端口，或者直接关掉代理）
Set-ItemProperty "HKCU:\Software\Microsoft\Windows\CurrentVersion\Internet Settings" -Name ProxyServer -Value "127.0.0.1:7897"
```

{{< callout type="danger" title="两个必踩的坑" >}}
**坑一：系统代理只能指向一个端口。**

如果你平时挂着梯子（系统代理已经是 `127.0.0.1:7897` 这类），它和 Yakit **会互相顶掉**——
系统代理只认一个值。要抓包就必须把系统代理改成 Yakit 的 `8083`，此时**梯子会失效**。

如果抓包过程中需要访问外网，在 Yakit 里把上游代理设成你的梯子端口（`127.0.0.1:7897`），
这样链路变成 `系统 → Yakit → 梯子 → 外网`，两者能共存。

**坑二：改完必须还原。**

系统代理是全局的，抓完不改回去、又关掉了 Yakit，**整台电脑都上不了网**，
而且现象很迷惑人（浏览器打不开、微信连不上，但网络图标正常）。
{{< /callout >}}

**改完的建议**：先随便打开一个网站确认能正常访问，再往下走。如果这样就不通了，
说明 Yakit 没启动或端口填错，先解决这个再抓包。

### 五、抓取 openid

1. 保持 Yakit 处于运行状态，确认系统代理已指向它
2. 把微信**完全退出**（托盘图标右键退出，不是关窗口）再重新打开，
   然后登录用于跑步的那个微信号——微信对网络设置有缓存，不重启可能仍走旧链路
3. 在微信里启动校园跑小程序，随便点几下让它发起网络请求
4. 回到 Yakit，在请求列表里过滤 `sport.cqupt.edu.cn`
5. 找到形如这样的请求：

```
https://sport.cqupt.edu.cn/new_wxapp/wxUnifyId/checkBinding?wxCode=xxxxxxxx
```

6. 点击这个包，在 **Response** 里就能看到 `openid` 字段，复制出来

### 六、抓不到包时的排查顺序

按可能性从高到低：

| 现象 | 可能原因 | 处理 |
| --- | --- | --- |
| Yakit 里完全没有记录 | **只配了微信内置代理，没改系统代理** | 按第四节改 Windows 系统代理（小程序不读微信那个设置） |
| Yakit 里完全没有记录 | 系统代理被梯子占着 | 系统代理只能指向一个端口；改成 Yakit 的 `8083`，需要梯子就在 Yakit 里设上游代理 |
| 只有 `CONNECT`，没有请求内容 | 未解密 HTTPS | 开启「强制 HTTPS 抓包」，确认 CA 已装入受信任根 |
| 小程序转圈 / 提示网络异常 | CA 证书没装对位置 | 重新安装到「受信任的根证书颁发机构」 |
| 能抓到别的应用，唯独没有小程序 | 小程序确实走了独立进程 | 确认系统代理已生效后，把微信完全退出再重开，重新进小程序 |
| 抓完电脑上不了网 | 系统代理没还原 | 改回原值或关闭「使用代理服务器」 |

{{< callout type="note" title="判断系统代理是否真的生效" >}}
最省事的验证：改完系统代理后随便打开一个网页。能正常打开 → 链路通了；
打不开 → Yakit 没启动或端口填错，先解决这个再抓包，否则后面全是无用功。
{{< /callout >}}

### 七、用网页控制台代替命令行（可选，但更实用）

命令行有个现实问题：跑步过程中要做人脸验证，抱着笔记本站在操场上很尴尬。
项目自带网页控制台，可以部署后在手机浏览器上操作：

```bash
go run ./cmd/httpserver
```

启动后打开终端打印的地址（默认 `http://127.0.0.1:8787`），输入 openid 即可登录。

想在手机上访问需要让它监听局域网：

```bash
go run ./cmd/httpserver -addr 0.0.0.0:8787 -access-token <你自己设一个密码>
```

{{< callout type="warn" title="暴露到局域网必须设 -access-token" >}}
默认只绑回环地址（`127.0.0.1`）是刻意的——openid 等同于你的身份凭据。
一旦监听 `0.0.0.0` 又不设 token，同一 WiFi 下的任何人都能用你的身份开跑。

设了 `-access-token` 后，所有 `/api` 请求都需要携带 `X-Access-Token` 头。
{{< /callout >}}

## 用命令行启动跑步

命令清单（参数已对照源码 `internal/cli/` 核实）：

| 命令 | 作用 |
| --- | --- |
| `login <openid>` | 登录并获取用户信息 |
| `run start <openid> -f <场地> -p <配速>` | 启动跑步 |
| `run resume <openid>` | 恢复跑步 |
| `run stop <openid>` | 停止跑步 |
| `task <openid>` | 查询任务详情 |
| `records <openid> [学期]` | 查询锻炼记录 |
| `recover` | 恢复未完成的跑步任务 |

1. 第一次启动执行 `go run ./cmd/commandline login <openid>` 绑定你抓到的 openid，
   后续启动时无需再次绑定。能看到输出姓名学号等则说明绑定成功，否则重复
   「获取openid」一节重新抓取

2. 执行 `go run ./cmd/commandline run start <openid> -f 风华运动场 -p 6.0`
   在风华开启配速 6 分钟/千米的跑步

   `-f` 可选场地：`风华运动场` / `太极运动场` / `宁静苑`
   `-p` 配速，填 `0` 表示随机
   `-i` 点位上报间隔秒数，填 `0` 表示自动

3. 建议宿舍留人帮忙执行命令行，抱个电脑在操场上扫脸很需要勇气
   （或者用上面的网页控制台方案，手机就能操作）

## 其他

命令行与网页控制台共用同一套运行时内核（`internal/runc/`），因此两种方式
产生的任务状态是互通的：命令行开的跑步，网页里也能看到进度。

持久化数据在 `data/` 下：`data/tasks/`（任务）、`data/points/`（轨迹点）、
`data/cache/`（缓存）。换目录可以用 `-tasks` / `-points` / `-cache` 指定。

