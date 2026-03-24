# 境外版部署指南 - Vercel

## 前置准备

### 1. 获取 WalletConnect Project ID
1. 访问 https://cloud.walletconnect.com
2. 注册/登录账号
3. 点击 "New Project"
4. 填写项目名称：Paradise City
5. 复制 Project ID（格式：32位十六进制字符串）

### 2. 安装 Vercel CLI（可选，也可用网页操作）
```
npm install -g vercel
```

---

## 方案A：Vercel 网页一键部署（推荐）

### Step 1 - Push 到 GitHub
```bash
# 在 paradise_website 目录
git remote add origin https://github.com/YOUR_USERNAME/paradise-city-international.git
git push -u origin main
```

### Step 2 - Vercel 导入项目
1. 访问 https://vercel.com/new
2. 点击 "Import Git Repository"
3. 选择 paradise-city-international 仓库
4. **重要**：设置 Root Directory 为 `code`
5. Framework Preset 选 `Next.js`
6. 点击 "Environment Variables" 添加：

| 变量名 | 值 |
|--------|----|
| NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID | 你的 WalletConnect Project ID |
| NEXT_PUBLIC_API_URL | https://你的域名.vercel.app |
| ADMIN_API_KEY | paradise-admin-2026 |
| NEXT_PUBLIC_NFT_CONTRACT_ADDRESS | （合约部署后填入）|
| NEXT_PUBLIC_TOKEN_CONTRACT_ADDRESS | （合约部署后填入）|

7. 点击 "Deploy"

### Step 3 - 绑定自定义域名（可选）
1. Vercel Dashboard → 项目 → Settings → Domains
2. 添加域名：paradise-city.com（或你的域名）
3. 按提示配置 DNS CNAME 记录

---

## 方案B：Vercel CLI 命令行部署

```bash
cd D:\Users\Administrator\workspace\paradise_website\code

# 登录 Vercel
vercel login

# 首次部署
vercel

# 设置环境变量
vercel env add NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID
# 粘贴你的 Project ID，选择 Production + Preview + Development

vercel env add NEXT_PUBLIC_API_URL
# 填入: https://你的域名.vercel.app

vercel env add ADMIN_API_KEY
# 填入: paradise-admin-2026

# 生产部署
vercel --prod
```

---

## 方案C：自有服务器 SSH 一键部署脚本

如果你有自己的 VPS/云服务器，使用以下脚本：

```bash
#!/bin/bash
# deploy-international.sh
# 用法: bash deploy-international.sh YOUR_SERVER_IP

SERVER_IP=$1
SERVER_USER=${2:-root}
DEPLOY_DIR=/var/www/paradise-international
REPO_URL=https://github.com/YOUR_USERNAME/paradise-city-international.git

echo "==> 连接服务器 $SERVER_IP"
ssh $SERVER_USER@$SERVER_IP << EOF
  # 安装 Node.js（如未安装）
  if ! command -v node &> /dev/null; then
    curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
    apt-get install -y nodejs
  fi

  # 安装 PM2（如未安装）
  if ! command -v pm2 &> /dev/null; then
    npm install -g pm2
  fi

  # 拉取代码
  if [ -d "$DEPLOY_DIR" ]; then
    cd $DEPLOY_DIR/code && git pull
  else
    git clone $REPO_URL $DEPLOY_DIR
    cd $DEPLOY_DIR/code
  fi

  # 配置环境变量
  cd $DEPLOY_DIR/code
  cat > .env.local << ENVEOF
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=YOUR_WALLETCONNECT_ID
NEXT_PUBLIC_API_URL=https://YOUR_DOMAIN
ADMIN_API_KEY=paradise-admin-2026
ENVEOF

  # 安装依赖 & 构建
  npm install
  npm run build

  # PM2 启动/重启
  pm2 delete paradise-international 2>/dev/null || true
  pm2 start npm --name paradise-international -- start -- -p 3001
  pm2 save
  pm2 startup

  echo "==> 部署完成！访问 http://$SERVER_IP:3001"
EOF
```

### Nginx 反向代理配置（服务器方案）
```nginx
server {
    listen 80;
    server_name paradise-city.com www.paradise-city.com;

    location / {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection upgrade;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_cache_bypass $http_upgrade;
    }
}
```

---

## 部署后检查清单

- [ ] 首页 `/zh` 正常加载
- [ ] 钱包连接按钮出现（WalletConnect Project ID 正确）
- [ ] NFT 页面 `/zh/nft` 正常
- [ ] 代币页面 `/zh/token` 正常
- [ ] 预约系统 `/zh/booking` 正常
- [ ] 联系页面显示朱先生/刘女士信息
- [ ] sitemap.xml 可访问
- [ ] robots.txt 可访问

## 注意事项

1. **SQLite 数据库**：Vercel 为无服务器环境，SQLite 文件不持久化。生产建议换用 PlanetScale（MySQL）或 Supabase（PostgreSQL）
2. **WalletConnect**：免费版每月 100 万次请求，足够初期使用
3. **合约地址**：部署 Hardhat 合约后，将地址填入 Vercel 环境变量
