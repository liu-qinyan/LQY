# 柳卿烟 · 个人博客

固定访问地址：**https://liu-qinyan.github.io/LQY/**

纯静态博客，没有构建步骤，没有后端。所有页面都是可以直接用浏览器打开的 HTML。

视觉风格还原自 [astro-koharu](https://github.com/cosZone/astro-koharu)
（灵感源自 [hexo-theme-shoka](https://github.com/amehime/hexo-theme-shoka)）：
粉橙渐变、斜切封面卡片、圆体字、波浪 cover、深浅双主题。

## 目录结构

```
index.html          首页（cover + 侧栏 + 交替斜切文章卡）
archive.html        归档（按年份 + 分类/标签筛选）
tags.html           标签（标签云 + 按标签分组）
moments.html        瞬间（时间线碎念）
friends.html        友链
about.html          关于
404.html            找不到页面
posts/*.html        文章详情
assets/css/main.css 全部样式（koharu 风格设计令牌）
assets/js/main.js   全部交互（主题切换/搜索/目录高亮/灯箱等）
assets/img/         图片
search.json         站内搜索索引
feed.xml            RSS 订阅
sitemap.xml         站点地图
```

## 怎么改

### 1. 改配色

打开 `assets/css/main.css`，主题变量集中在文件开头的 `:root` 与
`html[data-theme="dark"]` 两段（shadcn 风格 HSL 变量 + shoka 渐变）。
主色是 `--primary: 351 77% 62%`（粉），按钮渐变是
`--gradient-shoka-button`（粉 → 橙）。

### 2. 改站点信息

站点名字、描述、社交链接都在 `_tools/content.py` 的 `SITE` 字典里，
改完重新运行 `build.py` 即可。

### 3. 新增一篇文章

在 `content.py` 的 `POSTS` 列表里加一条记录（标题、日期、分类、标签、
正文 HTML），重新生成即可。归档、标签、搜索索引、RSS、sitemap 全部自动更新。

### 4. 换图片

把 `assets/img/` 里的同名文件替换掉即可：

| 文件 | 用途 |
| --- | --- |
| `hero.jpg` | 每页顶部 cover 大图（建议 1920×1000 左右） |
| `avatar.jpg` | 侧栏头像 + 顶栏 logo（正方形） |
| `portrait.jpg` | 关于页插画（竖图） |
| `cover-a/b/c/d.jpg` | 文章封面（16:9） |
| `moment-1/2/3.jpg` | 瞬间页配图（4:3） |

### 5. 字体（可选）

标题与正文使用「寒蝉全圆体（ChillRoundF）」字体栈，未安装时自动回退到
系统圆体/黑体。想强制启用：下载字体 woff2 放到 `assets/fonts/`，并在
`main.css` 的 `--font-round` 前加 `@font-face` 声明。

## 部署

推送到 `main` 分支后，在仓库 Settings → Pages 里把 Source 设为
`Deploy from a branch`，分支选 `main`，目录选 `/ (root)`。

因为是子路径部署（/LQY），页面内所有链接都写成了相对路径，
所以换域名或改仓库名都不用改代码；只有 `404.html`、`feed.xml`、
`sitemap.xml` 里用了绝对地址，换域名时需要同步替换。
