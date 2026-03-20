# Paradise City - 部署指南

## 🚀 快速部署到 Vercel（推荐）

### 方法1：通过 Vercel CLI 部署（最快）

1. **安装 Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **登录 Vercel**
   ```bash
   vercel login
   ```

3. **部署**
   ```bash
   cd paradise_website
   vercel --prod
   ```

4. **获得线上地址**
   - 例如：`https://paradise-city.vercel.app`

---

### 方法2：通过 GitHub + Vercel（推荐长期维护）

1. **创建 GitHub 仓库**
   - 访问 https://github.com/new
   - 仓库名：`paradise-city-website`
   - 设置为 Public 或 Private

2. **上传代码到 GitHub**
   ```bash
   cd paradise_website
   git remote add origin https://github.com/YOUR_USERNAME/paradise-city-website.git
   git branch -M main
   git push -u origin main
   ```

3. **连接 Vercel**
   - 访问 https://vercel.com/new
   - 导入 GitHub 仓库
   - 点击 Deploy

4. **自动部署**
   - 每次 push 到 GitHub，Vercel 自动更新

---

### 方法3：通过 ZIP 文件上传（最简单）

1. **压缩网站文件**
   - 将 `paradise_website` 文件夹压缩为 ZIP

2. **上传到 Vercel**
   - 访问 https://vercel.com/new
   - 选择 "Import Git Repository" → "Upload"
   - 上传 ZIP 文件

3. **完成部署**
   - 等待 1-2 分钟
   - 获得 `.vercel.app` 域名

---

## 🌐 自定义域名（可选）

1. 在 Vercel Dashboard 进入项目
2. 点击 "Settings" → "Domains"
3. 添加你的域名（如 `paradisecity.io`）
4. 按提示配置 DNS

---

## 📁 文件结构

```
paradise_website/
├── index.html      # 主页面（多语言支持）
├── package.json    # Vercel 配置
└── README.md       # 本文件
```

---

## 🎨 网站特性

- ✅ **多语言支持**：英文 / 中文 / 藏文
- ✅ **响应式设计**：适配手机、平板、电脑
- ✅ **现代 UI**：Web3 风格 + 藏文化元素
- ✅ **SEO 优化**：元标签、语义化 HTML
- ✅ **快速加载**：静态网站，全球 CDN 加速

---

## 🔗 部署后地址

- **Vercel 域名**：`https://paradise-city-xxx.vercel.app`
- **自定义域名**：`https://paradisecity.io`（需配置）

---

## 💡 提示

- 免费版 Vercel 有 100GB 带宽/月，足够初期使用
- 如需更多功能，可升级到 Pro 版（$20/月）
- 支持 HTTPS 自动配置
- 支持自定义 404 页面

---

**预计部署时间**：2-5 分钟
**技术难度**：⭐☆☆☆☆（简单）
