---
title: "{{ replace .File.ContentBaseName `-` ` ` | title }}"
date: {{ .Date }}
draft: true
categories: ["日记"]
tags: ["标签1", "标签2"]
---

<!-- ===========================================================================
     文章模板（archetypes/default.md）
     ---------------------------------------------------------------------------
     这两个注释标记之间的内容都是说明书，写完文章后整段删掉即可。

     → 为什么说明放在 `---` 之下，而不是之上

       原先这些说明写在 front matter 里面（`---` 之间）。看起来整齐，但有个
       真实的坑：填完 title / date 之后往下滚动开始写正文时，人以为自己已经
       「在标题下面了」，其实还在 YAML 块里——于是正文写进了 front matter，
       而残留的注释反被挤到正文区显示出来。（实测发生过一次。）

       现在 front matter 只留五行短字段，所有解释移到正文区。填入那五行，
       滚过 `---` 再写，就不会搞错位置。

     → 文件名会变成网址

         content/posts/我的文章.md   →  /posts/我的文章/
         content/posts/my-post.md    →  /posts/my-post/

       想指定别的网址，可加 `url: "/posts/自定义路径/"`。
       但【不要在多语言页面（content/en/ 下）里写 url】——该值不带语言前缀，
       中英两版会写向同一路径而互相覆盖，英文版会直接消失。

     → 英文版怎么写

       放在 content/en/posts/ 下，且【文件名与中文版完全相同】：

         content/posts/xdp-firewall.md      →  /posts/xdp-firewall/
         content/en/posts/xdp-firewall.md   →  /en/posts/xdp-firewall/

       Hugo 以「语言根目录之下的相对路径」判断两篇是否互为译文，文件名逐字符
       相同（含大小写）即自动配对。配对成功后，页头的 中/EN 切换器在两版之间
       直接互跳；若尚未写英文版，切换器变灰不可点（不会把读者送到 404）。

       建英文版用英文模板：hugo new --kind en en/posts/xdp-firewall.md

     → 一篇文章可以只有中文，也可以只有英文

       这是完全支持的，不需要任何额外声明。两种语言各自维护文章列表，
       未翻译的文章不会出现在另一种语言里，也不会显示成空条目。

     → front matter 字段

       title        列表、<title>、浏览器标签页显示的名字。随便改，不影响配对。
       date         发布日期与时间，决定各处排序。
       draft        true = 不发布。写好了改成 false。
       categories   只填一个。显示在侧栏「分类」并用于面包屑与结构化数据。
       tags         可填多个。用于搜索、标签页、侧栏「相关文章」。

       可选字段——不用就整行删掉：
         summary        列表页与搜索结果里的一段话。不填则自动截取正文开头。
                        【不要留空字符串】，那会被当作「已设置但为空」，
                        会渲染出一段空白而不是自动截取。
         description    给搜索引擎与社交分享卡片。不填则回退到 summary。
         series         同名系列的文章自动串起来，显示「第 N / M 篇」与篇目列表。
         seriesOrder    系列内序号，可选。
         ShowToc        true 则本文显示目录（站点默认关闭，见 hugo.yaml）。
         hideMeta       true 隐藏发布日期、字数、阅读时间。
         comments       false 关闭本文评论。
         searchHidden   true 不让本文出现在搜索与命令面板里。
         sidebar        false 不显示右侧边栏。

       封面图——图片放在与本文同名的目录（content/posts/我的文章/），写文件名：
         cover:
           image: "cover.jpg"
           alt: "封面说明"
           caption: "图片来源"

     → 本站支持的写法

       行内代码 `like this`，**加粗**，[链接](https://example.com)。
       公式：行内 $E = mc^2$；独立公式写成独占两行、前后各两个美元符号。
       图片放在与本文同名的目录里，用相对路径引用，构建时自动转 WebP、
       生成多档尺寸并懒加载。
=========================================================================== -->

## 标题

正文从这里开始。上面整段说明删掉即可。

{{< callout type="note" >}}
**提示框**：`type` 可选 `note` / `info` / `tip` / `warn` / `danger`。
也可以加 `title="自定义标题"`。框内正常写 Markdown。
{{< /callout >}}

{{< details title="点击展开：补充材料" >}}
**折叠块**：适合放次要细节、大段日志、完整配置。
加 `open="true"` 可默认展开。
{{< /details >}}

```python
def hello(name: str) -> str:
    return f"Hello, {name}"
```

| 列 A | 列 B |
| ---- | ---- |
| 值 1 | 值 2 |

![图片说明](图片文件名.png)
