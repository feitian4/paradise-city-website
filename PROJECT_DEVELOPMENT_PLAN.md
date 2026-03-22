# 香格里拉天堂之城 - 项目开发文档
## Project Development Plan v1.0

---

# 第一部分：项目概述

## 1.1 项目基本信息

| 项目属性 | 详情 |
|---------|------|
| **项目名称** | 香格里拉天堂之城 (Paradise City) |
| **项目代号** | PARADISE-2026 |
| **项目类型** | Web3文旅元宇宙平台 |
| **开发周期** | 12个月 |
| **团队规模** | 15-20人 |
| **预算** | $500,000 - $800,000 |

## 1.2 核心目标

### 业务目标
- [ ] 构建线上线下融合的文旅元宇宙平台
- [ ] 实现藏医药疗愈数字化服务
- [ ] 打造"香格里拉"星天文体验IP
- [ ] 发行NFT数字资产（七佛圣像+十二药叉）
- [ ] 建立$SHANGRI代币经济体系

### 技术目标
- [ ] 支持中英藏三语国际化
- [ ] 实现Web3钱包集成与NFT交易
- [ ] 构建3D元宇宙虚拟空间
- [ ] 实现实时天文数据接入
- [ ] 支持高并发（10万+并发用户）

### 产品目标
- [ ] 上线6个月内用户达10万
- [ ] NFT销售额达$1M
- [ ] 代币流通市值达$10M
- [ ] 实体预约转化率达15%

---

# 第二部分：技术架构

## 2.1 整体架构图

```
┌─────────────────────────────────────────────────────────────┐
│                     用户接入层                               │
│  ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────┐        │
│  │   Web   │  │  Mobile │  │   VR    │  │ MiniApp │        │
│  │  (Next) │  │(React-N)│  │(Three.js│  │(WeChat) │        │
│  └────┬────┘  └────┬────┘  └────┬────┘  └────┬────┘        │
└───────┼────────────┼────────────┼────────────┼─────────────┘
        │            │            │            │
        └────────────┴────────────┴────────────┘
                          │
┌─────────────────────────▼──────────────────────────────────┐
│                     API网关层                                │
│  ┌────────────────────────────────────────────────────────┐ │
│  │  Kong / Nginx (负载均衡 + 限流 + 认证)                  │ │
│  └────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
                          │
        ┌─────────────────┼─────────────────┐
        │                 │                 │
┌───────▼──────┐  ┌──────▼──────┐  ┌──────▼──────┐
│   业务服务层  │  │  区块链层    │  │   数据层    │
├──────────────┤  ├─────────────┤  ├─────────────┤
│ 用户服务      │  │  智能合约    │  │  PostgreSQL │
│ 订单服务      │  │  钱包服务    │  │  MongoDB    │
│ 内容服务      │  │  NFT市场     │  │  Redis      │
│ 预约服务      │  │  代币经济    │  │  Elasticsearch│
│ 支付服务      │  │  IPFS存储    │  │  TimeScaleDB│
│ 消息服务      │  │  链上数据    │  │             │
└──────────────┘  └─────────────┘  └─────────────┘
        │                 │                 │
        └─────────────────┼─────────────────┘
                          │
┌─────────────────────────▼──────────────────────────────────┐
│                     基础设施层                               │
│  ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────┐        │
│  │  Vercel │  │  AWS    │  │Alchemy  │  │ Pinata  │        │
│  │ (前端)  │  │(后端+DB)│  │(区块链) │  │ (IPFS)  │        │
│  └─────────┘  └─────────┘  └─────────┘  └─────────┘        │
└─────────────────────────────────────────────────────────────┘
```

## 2.2 前端技术栈

### 2.2.1 技术选型

| 技术领域 | 选型 | 版本 | 用途 |
|---------|------|------|------|
| **框架** | Next.js | 14.x | SSR/SSG/React框架 |
| **语言** | TypeScript | 5.x | 类型安全 |
| **样式** | Tailwind CSS | 3.x | 原子化CSS |
| **UI组件** | shadcn/ui | latest | 组件库 |
| **动画** | Framer Motion | 10.x | 交互动画 |
| **3D** | Three.js + React Three Fiber | latest | 3D场景 |
| **状态** | Zustand | 4.x | 状态管理 |
| **数据** | TanStack Query | 5.x | 数据获取 |
| **表单** | React Hook Form + Zod | latest | 表单处理 |
| **i18n** | next-intl | 3.x | 国际化 |

### 2.2.2 项目结构

```
app/
├── [locale]/                    # 多语言路由
│   ├── (main)/                  # 主站
│   │   ├── page.tsx             # 首页
│   │   ├── healing/             # 疗愈中心
│   │   │   ├── page.tsx
│   │   │   ├── seven-buddhas/   # 七佛愿力
│   │   │   ├── three-dharmas/   # 药师定三法
│   │   │   └── twelve-yakshas/  # 十二药叉
│   │   ├── museum/              # 博物馆
│   │   ├── pilgrimage/          # 朝圣之旅
│   │   ├── observatory/         # 天文馆
│   │   ├── nft/                 # NFT市场
│   │   │   ├── page.tsx
│   │   │   ├── buddhas/         # 七佛圣像
│   │   │   ├── yakshas/         # 十二药叉
│   │   │   └── marketplace/     # 交易市场
│   │   ├── metaverse/           # 元宇宙
│   │   ├── about/               # 关于我们
│   │   └── contact/             # 联系我们
│   │
│   ├── (dashboard)/             # 用户后台
│   │   ├── dashboard/
│   │   ├── profile/
│   │   ├── bookings/
│   │   ├── nfts/
│   │   └── wallet/
│   │
│   └── layout.tsx               # 根布局
│
├── api/                         # API路由
│   ├── auth/
│   ├── bookings/
│   ├── payments/
│   └── webhooks/
│
├── components/                  # 公共组件
│   ├── ui/                      # UI组件
│   ├── layout/                  # 布局组件
│   ├── three/                   # 3D组件
│   └── web3/                    # Web3组件
│
├── lib/                         # 工具库
│   ├── utils/
│   ├── hooks/
│   ├── contracts/               # 合约ABI
│   └── i18n/                    # 翻译文件
│
├── styles/                      # 全局样式
├── public/                      # 静态资源
│   ├── images/
│   ├── models/                  # 3D模型
│   └── audio/                   # 音频资源
│
├── types/                       # TypeScript类型
└── middleware.ts                # 中间件
```

## 2.3 区块链架构

### 2.3.1 链选择

| 用途 | 链 | 理由 |
|-----|---|------|
| **主链** | Polygon | 低Gas费，快速确认，生态成熟 |
| **备选** | BSC | 成本低，用户基数大 |
| **存储** | IPFS + Pinata | 去中心化文件存储 |
| **数据** | The Graph | 链上数据索引 |

### 2.3.2 智能合约清单

```solidity
// contracts/BuddhaNFT.sol
contract BuddhaNFT is ERC721, ERC721Enumerable, Ownable {
    uint256 public constant MAX_SUPPLY = 7000;
    uint256 public mintPrice = 0.5 ether;
    string public baseURI;
    
    struct BuddhaInfo {
        uint8 buddhaType;      // 0-6: 七佛
        uint8 rarity;          // 0-3: 普通/稀有/史诗/传说
        uint256 mintTime;
    }
    
    mapping(uint256 => BuddhaInfo) public buddhaInfo;
    
    event BuddhaMinted(address indexed to, uint256 tokenId, uint8 buddhaType);
}

// contracts/YakshaNFT.sol
contract YakshaNFT is ERC721, VRFConsumerBaseV2, Ownable {
    uint256 public constant MAX_SUPPLY = 84000;
    uint256 public mintPrice = 0.05 ether;
    
    struct YakshaInfo {
        uint8 yakshaType;      // 0-11: 十二药叉
        uint8 rarity;          // 0-3: 普通/稀有/史诗/传说
        uint256 randomness;
    }
    
    // Chainlink VRF for randomness
    function mint() public payable returns (uint256) {
        require(msg.value >= mintPrice, "Insufficient payment");
        requestRandomWords();
    }
    
    function fulfillRandomWords(uint256 requestId, uint256[] memory randomWords) internal override {
        // 根据随机数确定稀有度
        uint256 rarityRoll = randomWords[0] % 10000;
        uint8 rarity;
        if (rarityRoll < 10) rarity = 3;      // 传说 0.1%
        else if (rarityRoll < 110) rarity = 2; // 史诗 1%
        else if (rarityRoll < 1110) rarity = 1; // 稀有 10%
        else rarity = 0;                       // 普通 88.9%
    }
}

// contracts/ShangriToken.sol
contract ShangriToken is ERC20, ERC20Burnable, Ownable {
    uint256 public constant MAX_SUPPLY = 500_000_000 * 10**18;
    
    // 质押相关
    mapping(address => uint256) public stakingBalance;
    mapping(address => uint256) public stakingTimestamp;
    uint256 public rewardRate = 100; // 每区块奖励基数
    
    function stake(uint256 amount) public {
        require(balanceOf(msg.sender) >= amount, "Insufficient balance");
        _transfer(msg.sender, address(this), amount);
        stakingBalance[msg.sender] += amount;
        stakingTimestamp[msg.sender] = block.timestamp;
    }
    
    function calculateReward(address account) public view returns (uint256) {
        uint256 stakedTime = block.timestamp - stakingTimestamp[account];
        return stakingBalance[account] * rewardRate * stakedTime / 1 days;
    }
}

// contracts/MeritLedger.sol
contract MeritLedger {
    struct MeritRecord {
        address user;
        uint256 meritType;    // 0:持咒 1:朝圣 2:疗愈 3:捐赠
        uint256 amount;
        uint256 timestamp;
        string metadata;
    }
    
    MeritRecord[] public records;
    mapping(address => uint256) public totalMerit;
    
    event MeritRecorded(address indexed user, uint256 meritType, uint256 amount);
    
    function recordMerit(address user, uint256 meritType, uint256 amount, string memory metadata) public {
        records.push(MeritRecord(user, meritType, amount, block.timestamp, metadata));
        totalMerit[user] += amount;
        emit MeritRecorded(user, meritType, amount);
    }
}

// contracts/Marketplace.sol
contract Marketplace is ReentrancyGuard, Ownable {
    struct Listing {
        address seller;
        address nftContract;
        uint256 tokenId;
        uint256 price;
        bool active;
    }
    
    mapping(uint256 => Listing) public listings;
    uint256 public listingCounter;
    uint256 public platformFee = 250; // 2.5%
    
    function createListing(address nftContract, uint256 tokenId, uint256 price) public {
        IERC721(nftContract).transferFrom(msg.sender, address(this), tokenId);
        listings[listingCounter] = Listing(msg.sender, nftContract, tokenId, price, true);
        listingCounter++;
    }
    
    function buy(uint256 listingId) public payable nonReentrant {
        Listing memory listing = listings[listingId];
        require(msg.value >= listing.price, "Insufficient payment");
        require(listing.active, "Listing not active");
        
        uint256 fee = listing.price * platformFee / 10000;
        uint256 sellerAmount = listing.price - fee;
        
        payable(listing.seller).transfer(sellerAmount);
        payable(owner()).transfer(fee);
        
        IERC721(listing.nftContract).transferFrom(address(this), msg.sender, listing.tokenId);
        listings[listingId].active = false;
    }
}
```

## 2.4 后端架构

### 2.4.1 服务拆分

| 服务 | 技术 | 职责 |
|-----|------|------|
| **API Gateway** | Kong | 路由、认证、限流 |
| **User Service** | Node.js + Express | 用户管理、认证 |
| **Booking Service** | Node.js + Express | 预约管理 |
| **Payment Service** | Node.js + Stripe | 支付处理 |
| **Content Service** | Node.js + Express | 内容管理 |
| **Notification Service** | Node.js + Socket.io | 实时通知 |
| **Blockchain Service** | Node.js + Ethers.js | 链上交互 |
| **Analytics Service** | Python + FastAPI | 数据分析 |

### 2.4.2 数据库设计

```sql
-- 用户表
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    wallet_address VARCHAR(42) UNIQUE,
    email VARCHAR(255),
    phone VARCHAR(20),
    name VARCHAR(100),
    avatar_url TEXT,
    preferred_language VARCHAR(10) DEFAULT 'zh',
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- NFT持有表
CREATE TABLE nft_holdings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id),
    contract_address VARCHAR(42),
    token_id INTEGER,
    token_type VARCHAR(20), -- 'buddha' | 'yaksha'
    acquired_at TIMESTAMP,
    acquired_price DECIMAL(20, 8),
    metadata JSONB
);

-- 预约表
CREATE TABLE bookings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id),
    booking_type VARCHAR(50), -- 'healing' | 'pilgrimage' | 'observatory'
    service_id UUID,
    booking_date DATE,
    status VARCHAR(20), -- 'pending' | 'confirmed' | 'completed' | 'cancelled'
    payment_status VARCHAR(20),
    amount DECIMAL(10, 2),
    currency VARCHAR(10),
    tx_hash VARCHAR(66),
    created_at TIMESTAMP DEFAULT NOW()
);

-- 功德记录表
CREATE TABLE merit_records (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id),
    merit_type INTEGER, -- 0:持咒 1:朝圣 2:疗愈 3:捐赠
    amount INTEGER,
    chain_tx_hash VARCHAR(66),
    metadata JSONB,
    created_at TIMESTAMP DEFAULT NOW()
);

-- 内容表
CREATE TABLE contents (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug VARCHAR(100) UNIQUE,
    type VARCHAR(50), -- 'buddha' | 'yaksha' | 'healing' | 'article'
    title_zh TEXT,
    title_en TEXT,
    title_bo TEXT,
    content_zh TEXT,
    content_en TEXT,
    content_bo TEXT,
    images TEXT[],
    published BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT NOW()
);
```

---

# 第三部分：开发计划

## 3.1 里程碑规划

```
Phase 1: 基础搭建 (M1-M2)
├── M1: 项目启动 + 基础架构
│   ├── Week 1-2: 团队组建、环境搭建
│   ├── Week 3-4: UI设计系统、组件库
│   └── 交付物: 设计规范、项目脚手架
│
├── M2: 核心功能开发
│   ├── Week 5-6: 前端框架、多语言支持
│   ├── Week 7-8: 用户系统、内容管理
│   └── 交付物: 可演示的基础版本
│
Phase 2: Web3集成 (M3-M4)
├── M3: 区块链开发
│   ├── Week 9-10: 智能合约开发、审计
│   ├── Week 11-12: 钱包集成、NFT展示
│   └── 交付物: 测试网合约、NFT浏览功能
│
├── M4: NFT市场 + 代币
│   ├── Week 13-14: NFT铸造、交易市场
│   ├── Week 15-16: 代币合约、质押功能
│   └── 交付物: 完整的Web3功能
│
Phase 3: 业务功能 (M5-M7)
├── M5: 疗愈预约系统
│   ├── Week 17-18: 预约流程、日历系统
│   ├── Week 19-20: 支付集成、通知系统
│   └── 交付物: 可预约的疗愈服务
│
├── M6: 天文馆体验
│   ├── Week 21-22: 天文数据接入、3D展示
│   ├── Week 23-24: 观测预约、星空模拟
│   └── 交付物: 天文体验功能
│
├── M7: 元宇宙V1
│   ├── Week 25-26: 3D场景搭建、虚拟寺庙
│   ├── Week 27-28: 虚拟角色、基础交互
│   └── 交付物: 可探索的元宇宙空间
│
Phase 4: 优化上线 (M8-M10)
├── M8: 性能优化
│   ├── Week 29-30: 加载优化、缓存策略
│   ├── Week 31-32: 安全加固、代码审计
│   └── 交付物: 性能报告、安全报告
│
├── M9: 测试验收
│   ├── Week 33-34: 功能测试、集成测试
│   ├── Week 35-36: 用户测试、Bug修复
│   └── 交付物: 测试报告、修复清单
│
├── M10: 正式上线
│   ├── Week 37-38: 主网部署、NFT首发
│   ├── Week 39-40: 营销推广、运营启动
│   └── 交付物: 正式上线版本
│
Phase 5: 持续迭代 (M11-M12)
├── M11: 功能扩展
│   └── 社区功能、DAO治理、新玩法
│
└── M12: 数据分析
    └── 用户行为分析、运营优化
```

## 3.2 详细排期表

### Phase 1: 基础搭建 (Week 1-8)

| Week | 前端 | 后端 | 合约 | 设计 | 测试 |
|-----|------|------|------|------|------|
| **W1** | 项目初始化 | 架构设计 | - | 品牌设计 | - |
| **W2** | 组件库搭建 | API设计 | - | UI设计系统 | - |
| **W3** | 首页开发 | 用户服务 | - | 页面设计 | - |
| **W4** | 多语言支持 | 内容服务 | - | 插画设计 | - |
| **W5** | 疗愈中心页 | 预约服务 | 合约设计 | NFT设计 | - |
| **W6** | 博物馆页 | 支付服务 | 合约开发 | 3D模型 | - |
| **W7** | 天文馆页 | 通知服务 | 合约测试 | 动画设计 | 单元测试 |
| **W8** | 整合调试 | 接口联调 | 审计准备 | 设计交付 | 集成测试 |

### Phase 2: Web3集成 (Week 9-16)

| Week | 前端 | 后端 | 合约 | 测试 |
|-----|------|------|------|------|
| **W9** | 钱包连接 | 链上服务 | BuddhaNFT开发 | - |
| **W10** | NFT展示页 | IPFS集成 | YakshaNFT开发 | 合约测试 |
| **W11** | 铸造功能 | 事件监听 | Token合约 | 安全审计 |
| **W12** | 盲盒UI | 空投服务 | Marketplace | - |
| **W13** | 交易市场 | 交易索引 | 部署测试网 | 功能测试 |
| **W14** | 质押界面 | 奖励计算 | 优化Gas | 压力测试 |
| **W15** | 治理界面 | 投票服务 | 主网准备 | 安全复查 |
| **W16** | Web3整合 | 数据同步 | 主网部署 | 全量测试 |

### Phase 3: 业务功能 (Week 17-28)

| Week | 前端 | 后端 | 3D/VR | 测试 |
|-----|------|------|-------|------|
| **W17** | 预约流程 | 日历系统 | - | - |
| **W18** | 支付流程 | 订单系统 | - | 流程测试 |
| **W19** | 用户中心 | 通知系统 | - | - |
| **W20** | 管理后台 | 数据报表 | - | 验收测试 |
| **W21** | 星空展示 | 天文API | 3D场景搭建 | - |
| **W22** | 观测预约 | 排期系统 | 望远镜模型 | - |
| **W23** | VR预览 | 流媒体 | 寺庙建模 | VR测试 |
| **W24** | 导览系统 | 内容管理 | 角色动画 | - |
| **W25** | 元宇宙入口 | 房间服务 | 场景优化 | - |
| **W26** | 虚拟角色 | 状态同步 | 交互开发 | 性能测试 |
| **W27** | 社交功能 | 聊天系统 | 特效开发 | - |
| **W28** | 游戏玩法 | 经济系统 | 音效集成 | UAT测试 |

## 3.3 团队配置

### 核心团队 (15人)

| 角色 | 人数 | 职责 |
|-----|------|------|
| **项目经理** | 1 | 项目管理、进度把控 |
| **产品经理** | 1 | 需求分析、产品设计 |
| **UI/UX设计师** | 2 | 界面设计、交互设计 |
| **3D设计师** | 1 | 3D模型、元宇宙场景 |
| **前端工程师** | 3 | Next.js开发、Web3集成 |
| **后端工程师** | 2 | API开发、数据库设计 |
| **区块链工程师** | 2 | 智能合约、链上服务 |
| **测试工程师** | 1 | 测试策略、质量保障 |
| **DevOps** | 1 | 部署、CI/CD、监控 |
| **内容运营** | 1 | 内容策划、文案撰写 |

### 外包/合作

| 服务 | 合作方 | 预算 |
|-----|--------|------|
| 智能合约审计 | CertiK/OpenZeppelin | $30,000 |
| 3D场景建模 | 外部工作室 | $50,000 |
| 唐卡/NFT艺术 | 藏族艺术家 | $40,000 |
| 藏语翻译 | 专业机构 | $10,000 |
| 安全渗透测试 | 安全公司 | $20,000 |

---

# 第四部分：开发规范

## 4.1 代码规范

### 4.1.1 前端规范

```typescript
// 文件命名: PascalCase for components, camelCase for utils
// Button.tsx, useWallet.ts, formatAddress.ts

// 组件结构
interface ButtonProps {
  variant: 'primary' | 'secondary' | 'ghost';
  size: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
}

export function Button({ 
  variant = 'primary', 
  size = 'md', 
  children, 
  onClick,
  disabled,
  loading 
}: ButtonProps) {
  // 实现
}

// Hook规范
export function useNFTBalance(address: string) {
  const { data, isLoading, error } = useQuery({
    queryKey: ['nftBalance', address],
    queryFn: () => fetchNFTBalance(address),
    enabled: !!address,
  });
  
  return { balance: data, isLoading, error };
}

// 类型定义
export type BuddhaType = 0 | 1 | 2 | 3 | 4 | 5 | 6;
export type Rarity = 'common' | 'rare' | 'epic' | 'legendary';

export interface BuddhaNFT {
  tokenId: number;
  buddhaType: BuddhaType;
  rarity: Rarity;
  name: string;
  image: string;
  attributes: {
    trait_type: string;
    value: string;
  }[];
}
```

### 4.1.2 合约规范

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

/**
 * @title BuddhaNFT
 * @notice 七佛圣像NFT合约
 * @dev 限量7000枚，支持白名单、批量铸造
 */
contract BuddhaNFT is ERC721, Ownable {
    // 常量
    uint256 public constant MAX_SUPPLY = 7000;
    uint256 public constant MAX_PER_WALLET = 7;
    
    // 状态变量
    uint256 public mintPrice = 0.5 ether;
    uint256 public totalMinted;
    bool public publicSaleActive;
    
    // 映射
    mapping(address => uint256) public mintedPerWallet;
    mapping(address => bool) public whitelist;
    
    // 事件
    event BuddhaMinted(address indexed to, uint256 tokenId, uint8 buddhaType);
    event PriceUpdated(uint256 newPrice);
    event SaleStatusChanged(bool active);
    
    // 错误
    error MaxSupplyReached();
    error MaxPerWalletReached();
    error InsufficientPayment();
    error NotWhitelisted();
    error SaleNotActive();
    
    // 修饰器
    modifier whenSaleActive() {
        if (!publicSaleActive) revert SaleNotActive();
        _;
    }
    
    /**
     * @notice 铸造七佛NFT
     * @param quantity 铸造数量
     */
    function mint(uint256 quantity) external payable whenSaleActive {
        if (totalMinted + quantity > MAX_SUPPLY) revert MaxSupplyReached();
        if (mintedPerWallet[msg.sender] + quantity > MAX_PER_WALLET) revert MaxPerWalletReached();
        if (msg.value < mintPrice * quantity) revert InsufficientPayment();
        
        for (uint256 i = 0; i < quantity; i++) {
            uint256 tokenId = totalMinted + 1;
            _safeMint(msg.sender, tokenId);
            
            uint8 buddhaType = uint8((tokenId - 1) % 7);
            emit BuddhaMinted(msg.sender, tokenId, buddhaType);
            
            totalMinted++;
        }
        
        mintedPerWallet[msg.sender] += quantity;
    }
    
    /**
     * @notice 提取合约余额
     */
    function withdraw() external onlyOwner {
        (bool success, ) = payable(owner()).call{value: address(this).balance}("");
        require(success, "Transfer failed");
    }
}
```

## 4.2 Git工作流

```bash
# 分支策略
main        # 生产分支
├── develop # 开发分支
│   ├── feature/nft-minting
│   ├── feature/booking-system
│   ├── feature/metaverse-v1
│   └── bugfix/payment-issue
└── hotfix  # 紧急修复

# 提交规范
type(scope): subject

# Types: feat, fix, docs, style, refactor, test, chore
# Example:
feat(nft): add BuddhaNFT minting functionality
fix(booking): resolve timezone issue in calendar
docs(readme): update installation instructions
```

## 4.3 测试策略

| 测试类型 | 工具 | 覆盖率目标 |
|---------|------|-----------|
| 单元测试 | Jest + React Testing Library | 80%+ |
| 合约测试 | Hardhat + Chai | 95%+ |
| 集成测试 | Cypress | 核心流程 |
| 性能测试 | Lighthouse | 90+分 |
| 安全测试 | Slither + Mythril | 无高危漏洞 |

---

# 第五部分：部署与运维

## 5.1 部署流程

### 5.1.1 前端部署 (Vercel)

```yaml
# .github/workflows/deploy.yml
name: Deploy to Vercel

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          
      - name: Install dependencies
        run: npm ci
        
      - name: Run tests
        run: npm test
        
      - name: Build
        run: npm run build
        env:
          NEXT_PUBLIC_API_URL: ${{ secrets.API_URL }}
          NEXT_PUBLIC_CONTRACT_BUDDHA: ${{ secrets.CONTRACT_BUDDHA }}
          NEXT_PUBLIC_CONTRACT_YAKSHA: ${{ secrets.CONTRACT_YAKSHA }}
          
      - name: Deploy to Vercel
        uses: vercel/action-deploy@v1
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
```

### 5.1.2 合约部署流程

```bash
# 1. 编译
npx hardhat compile

# 2. 测试网部署
npx hardhat run scripts/deploy.ts --network mumbai

# 3. 验证合约
npx hardhat verify --network mumbai CONTRACT_ADDRESS

# 4. 审计
# 提交至CertiK/OpenZeppelin

# 5. 主网部署
npx hardhat run scripts/deploy.ts --network polygon

# 6. 配置合约
# 设置URI、开启销售、添加白名单
```

## 5.2 监控告警

| 监控项 | 工具 | 告警条件 |
|-------|------|---------|
| 网站可用性 | UptimeRobot |  downtime > 1分钟 |
| 性能指标 | Vercel Analytics | LCP > 2.5s |
| 错误日志 | Sentry | 错误率 > 0.1% |
| 合约活动 | Tenderly | 异常交易 |
| 服务器 | Datadog | CPU > 80% |

## 5.3 应急预案

| 场景 | 响应时间 | 处理方案 |
|-----|---------|---------|
| 合约漏洞 | 立即 | 暂停合约、迁移资金 |
| 网站攻击 | 15分钟 | 启用CDN、WAF |
| 数据丢失 | 30分钟 | 恢复备份、数据校验 |
| 服务宕机 | 5分钟 | 自动切换备用节点 |

---

# 第六部分：风险管理

## 6.1 技术风险

| 风险 | 可能性 | 影响 | 缓解措施 |
|-----|--------|------|---------|
| 智能合约漏洞 | 中 | 极高 | 多重审计、Bug Bounty |
| 区块链网络拥堵 | 高 | 中 | 多链部署、Gas优化 |
| 3D性能问题 | 中 | 中 | 渐进加载、LOD优化 |
| 多语言兼容 | 低 | 中 | 完整测试、专业翻译 |

## 6.2 业务风险

| 风险 | 可能性 | 影响 | 缓解措施 |
|-----|--------|------|---------|
| 政策监管 | 中 | 高 | 合规审查、法律意见 |
| NFT市场波动 | 高 | 中 | 多元收入、不依赖单一来源 |
| 内容争议 | 低 | 高 | 宗教顾问审核 |
| 竞争加剧 | 中 | 中 | 差异化定位、持续创新 |

---

# 第七部分：文档清单

## 7.1 已生成文档

| 文档名称 | 路径 | 状态 |
|---------|------|------|
| 项目统筹规划 | PARADISE_CITY_FINAL_MASTERPLAN.md | ✅ 完成 |
| 网站内容方案 | WEBSITE_CONTENT_MASTERPLAN_v4.md | ✅ 完成 |
| 项目开发文档 | PROJECT_DEVELOPMENT_PLAN.md | ✅ 完成 |
| 智能合约代码 | contracts/ | 📋 待开发 |
| 前端代码 | app/ | 📋 待开发 |
| 后端代码 | server/ | 📋 待开发 |
| 测试报告 | tests/reports/ | 📋 待生成 |
| 部署手册 | docs/deployment.md | 📋 待编写 |

## 7.2 待补充文档

- [ ] API接口文档 (Swagger)
- [ ] 数据库ER图
- [ ] 用户操作手册
- [ ] 运营SOP
- [ ] 安全审计报告
- [ ] 性能测试报告

---

# 附录

## A. 技术选型对比

### 前端框架对比

| 框架 | 优点 | 缺点 | 选择 |
|-----|------|------|------|
| Next.js | SSR/SSG、生态成熟 | 较重 | ✅ |
| Nuxt.js | Vue生态 | 社区较小 | |
| Remix | 数据加载优化 | 较新 | |

### 区块链对比

| 链 | Gas费 | 速度 | 生态 | 选择 |
|---|-------|------|------|------|
| Polygon | 极低 | 快 | 成熟 | ✅ |
| BSC | 低 | 快 | 大 | 备选 |
| Arbitrum | 低 | 快 | 增长 | 备选 |
| Ethereum | 高 | 慢 | 最大 | 不推荐 |

## B. 预算明细

| 类别 | 项目 | 预算 |
|-----|------|------|
| **人力** | 15人团队×12月 | $400,000 |
| **设计** | UI/3D/NFT艺术 | $100,000 |
| **审计** | 合约+安全测试 | $70,000 |
| **基础设施** | 服务器+工具 | $50,000 |
| **营销** | 预热+首发 | $100,000 |
| **储备** | 应急资金 | $80,000 |
| **总计** | | $800,000 |

---

**文档版本**: v1.0  
**创建日期**: 2026-03-21  
**下次更新**: 2026-04-01  
**状态**: 待执行

---

*项目启动，愿一切顺利。*
