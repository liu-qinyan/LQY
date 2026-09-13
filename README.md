# 柳卿烟 · 个人博客

固定访问地址：**https://liu-qinyan.github.io/LQY/**

纯静态博客，没有构建步骤，没有后端。所有页面都是可以直接用浏览器打开的 HTML。

## 目录结构

```
index.html          首页（大横幅 + 侧栏 + 文章列表）
archive.html        归档（按年份 + 分类/标签筛选）
tags.html           标签（标签云 + 按标签分组）
moments.html        瞬间（时间线碎念）
friends.html        友链
about.html          关于
404.html            找不到页面
posts/*.html        文章详情
assets/css/main.css 全部样式（含设计令牌）
assets/js/main.js   全部交互（主题/搜索/目录高亮等）
assets/img/         图片
search.json         站内搜索索引
feed.xml            RSS 订阅
sitemap.xml         站点地图
```

## 怎么改

### 1. 换主题色

打开 `assets/css/main.css`，找到最上面的：

```css
--h: 315;   /* 315 樱粉 / 350 绯红 / 30 暖橘 / 160 薄荷 / 205 青空 / 265 紫罗兰 */
```

改一个数字，整站配色（含深色模式）全部跟着变。也可以不改代码，直接在网页顶栏点调色盘图标临时切换。

### 2. 改站点信息

`index.html` 等页面里搜索「柳卿烟」即可替换名字；页脚、侧栏的标语在 `assets/css` 之外出现在各 HTML 里。

### 3. 新增一篇文章

复制 `posts/hello-world.html` 改内容，然后在 `index.html`、`archive.html`、`tags.html` 里加一条链接（照抄现有格式）。

### 4. 换图片

把 `assets/img/` 里的同名文件替换掉即可：

| 文件 | 用途 |
| --- | --- |
| `hero.jpg` | 首页大横幅（建议 1920×880 左右） |
| `avatar.jpg` | 侧栏头像（正方形） |
| `portrait.jpg` | 关于页插画（竖图） |
| `cover-a/b/c/d.jpg` | 文章封面（16:9） |
| `moment-1/2/3.jpg` | 瞬间页配图（4:3） |

## 部署

推送到 `main` 分支后，在仓库 Settings → Pages 里把 Source 设为
`Deploy from a branch`，分支选 `main`，目录选 `/ (root)`。

因为是子路径部署（/LQY），页面内所有链接都写成了相对路径，
所以换域名或改仓库名都不用改代码；只有 `404.html`、`feed.xml`、
`sitemap.xml` 里用了绝对地址，换域名时需要同步替换。
