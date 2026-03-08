# Furinablog 维护手册

这份文档是基于你当前仓库结构整理的维护说明：

- 博客使用 **Next.js 静态导出**
- 推送到 **GitHub 仓库 main 分支** 后，会由 **GitHub Actions 自动部署到 GitHub Pages**
- 文章内容当前保存在 `src/data/posts.ts` 中
- 文章封面图放在 `public/images/` 中

---

## 一、第一次在本地运行项目

### 1）克隆仓库

```bash
git clone https://github.com/1031260154/furinablog.git
cd furinablog
```

### 2）安装依赖

```bash
npm install
```

### 3）启动本地开发环境

```bash
npm run dev
```

启动后在浏览器打开：

```bash
http://localhost:3000
```

---

## 二、你现在的文章是怎么存的

当前文章并不是单独的 `.md` 文件，而是直接写在：

```bash
src/data/posts.ts
```

每篇文章大致长这样：

```ts
{
  id: 4,
  title: '你的文章标题',
  slug: 'your-post-slug',
  summary: '这里写摘要',
  coverImage: 'cover-4.jpg',
  createdAt: '2026-03-08',
  author: { name: '站长' },
  content: `
# 这里是正文标题

这里写正文。

## 小标题

- 列表项 1
- 列表项 2

这里也可以继续写代码示例、引用、加粗内容等 Markdown 语法。
`
}
```

字段说明：

- `id`：文章唯一编号，不能重复
- `title`：文章标题
- `slug`：文章链接路径，建议只用英文、小写、短横线
- `summary`：文章摘要
- `coverImage`：封面图文件名，对应 `public/images/` 里的图片
- `createdAt`：发布日期，格式建议 `YYYY-MM-DD`
- `author.name`：作者名
- `content`：Markdown 正文内容，使用反引号包裹

---

## 三、如何新增一篇文章

### 第一步：准备封面图（可选但推荐）

把图片放到：

```bash
public/images/
```

例如新增：

```bash
public/images/cover-4.jpg
```

### 第二步：编辑文章数据文件

打开：

```bash
src/data/posts.ts
```

在 `posts` 数组里新增一篇文章对象。

建议把最新文章放在数组最前面，这样首页会优先展示它。

### 第三步：本地预览

```bash
npm run dev
```

检查以下内容是否正常：

- 首页是否出现新文章
- 点击文章后能否进入详情页
- 封面图是否显示正常
- Markdown 排版是否正常

### 第四步：本地构建检查

```bash
npm run build
```

如果这一步成功，说明静态导出通常没问题。

### 第五步：提交并推送到 GitHub

```bash
git status
git add .
git commit -m "feat: add new post"
git push origin main
```

推送后，GitHub Actions 会自动部署。

---

## 四、如何修改一篇已有文章

### 1）修改文章内容

打开：

```bash
src/data/posts.ts
```

找到对应文章对象，修改以下任意字段：

- `title`
- `summary`
- `coverImage`
- `createdAt`
- `content`

### 2）本地预览

```bash
npm run dev
```

### 3）构建检查

```bash
npm run build
```

### 4）提交并推送

```bash
git add .
git commit -m "fix: update post content"
git push origin main
```

---

## 五、如何删除一篇文章

### 1）删除 `posts.ts` 中对应文章对象

文件：

```bash
src/data/posts.ts
```

### 2）如果不再使用封面图，也可以一起删掉图片文件

例如：

```bash
public/images/cover-4.jpg
```

### 3）提交并推送

```bash
git add .
git commit -m "chore: remove old post"
git push origin main
```

---

## 六、如何更新 About 页面

当前 About 页面文件位置：

```bash
src/app/about/page.tsx
```

修改后本地预览：

```bash
npm run dev
```

确认无误后提交：

```bash
git add .
git commit -m "feat: update about page"
git push origin main
```

---

## 七、如何更新 Header 导航栏

当前 Header 文件位置：

```bash
src/components/Header.tsx
```

你可以修改：

- 博客标题
- 导航按钮文字
- 顶部按钮链接
- 整体配色和样式

修改完成后：

```bash
npm run dev
npm run build
git add .
git commit -m "feat: update header style"
git push origin main
```

---

## 八、如何更新整个 GitHub 仓库

这是最常用的一整套流程：

```bash
git status
git add .
git commit -m "你的提交说明"
git push origin main
```

常见提交说明示例：

```bash
git commit -m "feat: add new article"
git commit -m "fix: correct article typo"
git commit -m "style: improve about page UI"
git commit -m "chore: update images"
```

---

## 九、如何确认网站已经成功更新

### 方法 1：看 GitHub Actions

推送后，去仓库的 **Actions** 页面看最新工作流是否成功。

如果成功，说明站点已经完成构建和部署。

### 方法 2：打开线上网站检查

你的站点地址通常是：

```bash
https://1031260154.github.io/furinablog/
```

如果刚推送完还没看到变化，可以等 GitHub Pages 更新几分钟后再刷新。

---

## 十、常见问题排查

### 1）文章页打不开

重点检查：

- `slug` 是否重复
- `slug` 是否写得太随意（建议全英文小写）
- 新文章对象是否写坏了格式

### 2）图片不显示

重点检查：

- 图片是否真的放在 `public/images/`
- `coverImage` 文件名是否写对
- 图片扩展名是否一致（`.png` / `.jpg` / `.jpeg`）

### 3）推送后网站没更新

重点检查：

- `git push origin main` 是否成功
- GitHub Actions 是否执行成功
- 是否修改的是正确仓库
- 浏览器是否缓存了旧页面

### 4）本地跑不起来

可以尝试：

```bash
rm -rf node_modules package-lock.json
npm install
npm run dev
```

---

## 十一、每次更新的推荐标准流程

以后你每次更新博客，建议都按下面走：

```bash
npm run dev
```

先改内容，然后预览确认。

接着执行：

```bash
npm run build
```

构建没问题后，再提交：

```bash
git add .
git commit -m "你的说明"
git push origin main
```

---

## 十二、推荐你下一步做的结构升级

你当前项目可以继续用，但为了后期维护更轻松，建议后面逐步升级到下面这种结构：

### 方案 1：把文章迁移成独立 Markdown 文件

例如：

```bash
content/posts/first-post.md
content/posts/second-post.md
```

好处：

- 新增文章更方便
- 修改文章更直观
- 文章与代码分离
- 后期更容易做标签、分类、归档、搜索

### 方案 2：给每篇文章增加 frontmatter

例如：

```md
---
title: 我的新文章
slug: my-new-post
summary: 这是摘要
coverImage: cover-5.jpg
createdAt: 2026-03-08
author: 站长
---
```

这样会比直接在 `posts.ts` 里手写对象更适合长期维护。

---

## 十三、你当前最值得记住的几个命令

### 本地开发

```bash
npm run dev
```

### 本地构建

```bash
npm run build
```

### 查看 Git 状态

```bash
git status
```

### 提交修改

```bash
git add .
git commit -m "update blog"
```

### 推送到 GitHub

```bash
git push origin main
```

---

## 十四、最简维护口诀

> 改内容 → 本地预览 → 本地构建 → git 提交 → push 到 main → Actions 自动部署

