
import { AIApp, PricingModel, PayoutRecord, SalesDataPoint, Review, Transaction, DeploymentType, AppStatus, ReferralStats, ReferralDataPoint } from './types';

const generateReviews = (count: number): Review[] => {
  const reviews: Review[] = [];
  const names = ['CryptoPunk', 'AI_Fanatic', 'Web3Builder', 'Satoshi_Lover', 'PromptEngineer', 'DevOps_Master', 'DesignGuru', 'MetaUser'];
  const contents = [
    "这个工具彻底改变了我的工作流，效率提升了至少 300%！",
    "UI 设计非常有赛博朋克感，功能也很强大，爱了。",
    "虽然价格有点贵，但绝对物超所值。Gemini 模型的响应速度很快。",
    "期待下一个版本增加导出功能，目前已经很完美了。",
    "对于初学者来说可能有点难上手，但文档写得很棒。",
    "这是我在 AI Nexus 上买过最值的应用。",
    "生成的质量比我想象的要好很多，完全可以直接用于商业项目。",
    "智能合约自动执行，交易很放心。"
  ];

  for (let i = 0; i < count; i++) {
    reviews.push({
      id: `rev_${Math.random().toString(36).substr(2, 9)}`,
      userId: `user_${Math.floor(Math.random() * 1000)}`,
      userName: names[Math.floor(Math.random() * names.length)],
      avatarUrl: `https://api.dicebear.com/7.x/avataaars/svg?seed=${Math.random()}`,
      rating: Math.floor(Math.random() * 2) + 4, 
      date: '2023-10-' + (Math.floor(Math.random() * 30) + 1),
      content: contents[Math.floor(Math.random() * contents.length)]
    });
  }
  return reviews;
};

export const MOCK_APPS: AIApp[] = [
  {
    id: '1',
    title: 'CodeWhiz 智能编程助手',
    shortDescription: '您的私人结对编程专家，秒懂遗留代码。',
    fullDescription: 'CodeWhiz 利用先进的 Gemini 2.5 模型来解析、理解和记录复杂的遗留代码库。只需将其指向一个 GitHub 仓库，它就能生成全面的文档和重构建议。支持 Python, TypeScript, Rust 等多种语言。特别适合处理那些没有文档的“屎山”代码，让重构变得轻松愉快。',
    features: [
      '智能解析 GitHub 仓库，自动生成技术文档',
      '基于 AST 的精准重构建议，降低技术债务',
      '支持 20+ 种主流编程语言',
      '私有化部署选项，代码不离本地'
    ],
    iconUrl: 'https://api.dicebear.com/7.x/shapes/svg?seed=CodeWhiz&backgroundColor=0a0a0a',
    coverImageUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop',
    screenshots: [
      'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&auto=format&fit=crop&q=60',
      'https://images.unsplash.com/photo-1607799275518-d58665d096b1?w=800&auto=format&fit=crop&q=60',
      'https://images.unsplash.com/photo-1555099962-4199c345e5dd?w=800&auto=format&fit=crop&q=60'
    ],
    videoUrl: 'https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_1mb.mp4',
    deployment: {
      type: DeploymentType.WEB_APP,
      url: 'https://codewhiz.ai-nexus.demo',
      repoUrl: 'https://github.com/codewhiz/app'
    },
    toolsUsed: ['Gemini 1.5 Pro', 'TypeScript', 'VS Code API', 'LangChain'],
    authorName: '极客工坊',
    rating: 4.9,
    reviewCount: 128,
    reviews: generateReviews(8),
    downloads: 12500,
    pricingModel: PricingModel.SUBSCRIPTION,
    price: 68.00,
    category: '开发工具',
    tags: ['编程', '代码重构', '自动化文档'],
    releaseDate: '2023-10-15',
    status: AppStatus.PUBLISHED,
    currentVersion: '2.1.0',
    versionHistory: [
        { version: '2.1.0', date: '2023-10-25', changes: ['新增 Rust 语言支持', '优化了长文本的解析速度', '修复了 Token 计费显示错误'] },
        { version: '2.0.0', date: '2023-10-15', changes: ['全面升级至 Gemini 1.5 模型', '全新 UI 界面', '支持 GitHub OAuth 登录'] }
    ],
    recommendationReason: '程序员必备神器，代码解释能力业界领先。',
    helpDocs: `
# CodeWhiz 使用指南

## 快速开始
1. 登录 CodeWhiz 控制台。
2. 点击 "New Project" 并授权 GitHub 访问权限。
3. 选择目标仓库，点击 "Start Analysis"。

## 配置说明
您可以在 \`.codewhizrc\` 文件中配置忽略路径：
\`\`\`json
{
  "ignore": ["node_modules", "dist"],
  "language": "typescript"
}
\`\`\`

## 常见问题
**Q: 支持私有仓库吗？**
A: 支持，请确保授予了相应的 OAuth 权限。
    `
  },
  {
    id: '2',
    title: 'DreamScape 梦境生成器',
    shortDescription: '一键将文字转化为沉浸式 3D 环境贴图。',
    fullDescription: '使用简单的文本提示词为游戏或 VR 体验创建令人惊叹的 3D 世界。支持导出为 Unity 和 Unreal Engine 格式。不仅能生成贴图，还能生成完整的高多边形模型拓扑。内置多种渲染风格，从低多边形到写实风格一应俱全。',
    features: [
      '文本生成 8K 全景 HDR 贴图',
      '自动生成 PBR 材质通道 (法线, 粗糙度)',
      '无缝集成 Unity / Unreal 插件',
      '云端极速渲染，无需本地显卡'
    ],
    iconUrl: 'https://api.dicebear.com/7.x/shapes/svg?seed=Dream&backgroundColor=1a1a2e',
    coverImageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1964&auto=format&fit=crop',
    screenshots: [
      'https://images.unsplash.com/photo-1614726365723-49cfae9f0294?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1633412802994-5c058f151b66?w=800&auto=format&fit=crop'
    ],
    deployment: {
      type: DeploymentType.GRADIO,
      url: 'https://huggingface.co/spaces/dreamscape-demo',
    },
    toolsUsed: ['Stable Diffusion XL', 'Three.js', 'WebGL', 'Python'],
    authorName: '灵感 AI 实验室',
    rating: 4.6,
    reviewCount: 842,
    reviews: generateReviews(12),
    downloads: 3400,
    pricingModel: PricingModel.ONE_TIME,
    price: 328.00,
    category: '设计创意',
    tags: ['3D模型', '生成式艺术', '游戏开发'],
    releaseDate: '2023-11-01',
    status: AppStatus.PUBLISHED,
    currentVersion: '1.5.2',
    versionHistory: [
        { version: '1.5.2', date: '2023-11-10', changes: ['修复法线贴图反转问题', '增加 2 个新的艺术风格滤镜'] },
        { version: '1.5.0', date: '2023-11-01', changes: ['初始发布', '支持 4K 贴图生成'] }
    ],
    recommendationReason: '游戏开发者的福音，大幅降低美术资产制作成本。',
    helpDocs: `
# DreamScape 入门手册

## 基础操作
- **Prompt Engineering**: 尽可能描述光影、材质和氛围。例如 "Cyberpunk city street, neon lights, wet pavement, 8k resolution".
- **Negative Prompts**: 使用 "blur, low quality, distortion" 来排除负面效果。

## 导出格式
支持以下导出格式：
- .EXR (高动态范围)
- .JPG (预览)
- .PNG (带通道)

## Unity 集成
下载 Unity Package 包，导入项目后，在 Window > DreamScape 中登录您的 API Key 即可直接在编辑器内生成。
    `
  },
  {
    id: '3',
    title: 'LegalEagle 合同卫士',
    shortDescription: '智能分析合同风险，一键总结法律文档。',
    fullDescription: 'LegalEagle 专为个人用户设计的免费工具，快速理解服务条款和租赁协议中的细则。由安全、隐私优先的大语言模型驱动，确保您的文档不会被用于模型训练。识别隐藏条款，保护您的合法权益。\n\n**演示说明：** 这是一个内置的演示应用，点击“启动”将进入系统内部的合同分析沙箱界面。',
    features: [
      'OCR 识别扫描版 PDF 合同',
      '风险等级自动标注 (高/中/低)',
      '律师视角的修改建议',
      '完全本地化隐私保护，数据不上云'
    ],
    iconUrl: 'https://api.dicebear.com/7.x/shapes/svg?seed=Legal&backgroundColor=2d3748',
    coverImageUrl: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=2012&auto=format&fit=crop',
    screenshots: [
      'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&auto=format&fit=crop'
    ],
    deployment: {
      type: DeploymentType.INTERNAL, // Changed to Internal for the demo
      url: '/apps/legal-eagle',
    },
    toolsUsed: ['GPT-4 Turbo', 'OCR', 'Privacy Vault'],
    authorName: 'OpenLaw AI',
    rating: 4.3,
    reviewCount: 320,
    reviews: generateReviews(5),
    downloads: 8900,
    pricingModel: PricingModel.FREE,
    price: 0,
    category: '生产力',
    tags: ['法律', '文档总结', '风险风控'],
    releaseDate: '2023-09-20',
    status: AppStatus.PUBLISHED,
    currentVersion: '3.0.1',
    versionHistory: [
        { version: '3.0.1', date: '2023-11-20', changes: ['更新隐私政策合规性检查', '优化 PDF 解析引擎'] },
        { version: '3.0.0', date: '2023-10-05', changes: ['引入实时风险评分系统', '支持多语言合同对照'] },
        { version: '2.5.0', date: '2023-09-20', changes: ['增加 OCR 模块', '支持扫描件上传'] }
    ],
    recommendationReason: '免费且强大的法律助手，隐私保护机制值得信赖。',
    helpDocs: `
# 使用说明

## 文件上传
点击主界面的“上传文件”区域，选择 PDF 或图片格式的合同文件。建议文件大小不超过 20MB。

## 报告解读
- **红色高亮**: 高风险条款，建议务必修改。
- **黄色高亮**: 风险提示，建议咨询专业人士。
- **绿色**: 安全或标准条款。

## 隐私声明
所有上传的文件仅在您的浏览器本地内存中处理或通过加密通道传输至临时沙箱，分析完成后立即销毁。
    `
  },
  {
    id: '4',
    title: 'VoiceMint 声音克隆',
    shortDescription: '只需3秒样本，完美克隆任何声音。',
    fullDescription: 'VoiceMint 提供了即时的语音克隆服务。上传一段 3-5 秒的音频，即可生成数字孪生声音，用于配音、有声书制作或游戏角色对话。支持多语种情感迁移。',
    features: [
      '零样本学习 (Zero-Shot) 克隆技术',
      '跨语言情感保留',
      'API 实时流式输出',
      '版权水印保护'
    ],
    iconUrl: 'https://api.dicebear.com/7.x/shapes/svg?seed=Voice&backgroundColor=4c1d95',
    screenshots: [],
    deployment: {
      type: DeploymentType.API,
      url: 'https://api.voicemint.ai/v1/synthesize',
      docsUrl: 'https://docs.voicemint.ai'
    },
    toolsUsed: ['VITS', 'PyTorch', 'React'],
    authorName: 'AudioFuture',
    rating: 4.8,
    reviewCount: 210,
    reviews: generateReviews(6),
    downloads: 5600,
    pricingModel: PricingModel.SUBSCRIPTION,
    price: 45.00,
    category: '音频处理',
    tags: ['TTS', '语音克隆', '配音'],
    releaseDate: '2023-12-05',
    status: AppStatus.PUBLISHED,
    currentVersion: '1.0.0',
    versionHistory: [
        { version: '1.0.0', date: '2023-12-05', changes: ['正式版发布'] }
    ],
    recommendationReason: '惊人的真实度，多语言支持非常适合出海视频制作。'
  },
  {
    id: '5',
    title: 'DataWiz 财报分析师',
    shortDescription: '将复杂的 Excel 表格转化为可视化洞察。',
    fullDescription: 'DataWiz 可以读取 Excel、CSV 甚至 PDF 格式的财务报表，自动识别关键指标，生成增长趋势图、成本构成图，并给出基于 AI 的投资建议。',
    features: [
        '自动清洗杂乱数据',
        '自然语言提问生成图表',
        '一键导出 PowerPoint 报告',
        '多维数据透视表自动生成'
    ],
    iconUrl: 'https://api.dicebear.com/7.x/shapes/svg?seed=Data&backgroundColor=047857',
    screenshots: ['https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop'],
    deployment: {
        type: DeploymentType.WEB_APP,
        url: 'https://datawiz.ai',
    },
    toolsUsed: ['PandasAI', 'Gemini 1.5 Flash', 'D3.js'],
    authorName: 'FinTech Pro',
    rating: 4.5,
    reviewCount: 150,
    reviews: generateReviews(4),
    downloads: 2100,
    pricingModel: PricingModel.SUBSCRIPTION,
    price: 99.00,
    category: '数据分析',
    tags: ['金融', '可视化', '商业智能'],
    releaseDate: '2023-10-30',
    status: AppStatus.UNDER_REVIEW, // Demo status
    currentVersion: '0.9.0-beta',
    versionHistory: [
        { version: '0.9.0', date: '2023-10-30', changes: ['公测版发布', '支持 CSV 导入'] }
    ],
    recommendationReason: '金融从业者必备，几秒钟完成几小时的报表工作。'
  },
  // Added more mock apps to fill the leaderboard
  {
    id: '6',
    title: 'CopyCat 营销文案',
    shortDescription: '一键生成高转化率的广告文案。',
    fullDescription: 'CopyCat 专为电商卖家设计，输入产品关键词，自动生成小红书、抖音、Instagram 风格的种草文案。',
    features: ['多平台风格适配', 'Emoji 智能插入', 'SEO 关键词优化', '多语言支持'],
    iconUrl: 'https://api.dicebear.com/7.x/shapes/svg?seed=Copy&backgroundColor=db2777',
    screenshots: [],
    deployment: { type: DeploymentType.WEB_APP, url: 'https://copycat.ai' },
    toolsUsed: ['GPT-4', 'Next.js'],
    authorName: 'GrowthHacker',
    rating: 4.7,
    reviewCount: 540,
    reviews: generateReviews(10),
    downloads: 15000,
    pricingModel: PricingModel.SUBSCRIPTION,
    price: 29.00,
    category: '写作辅助',
    tags: ['营销', '文案', '电商'],
    releaseDate: '2023-11-15',
    status: AppStatus.PUBLISHED,
    currentVersion: '1.2.0',
    versionHistory: [],
    recommendationReason: '电商运营神器，文案产出效率提升10倍。'
  },
  {
    id: '7',
    title: 'PixelPerfect 图片修复',
    shortDescription: '老照片修复，画质增强放大。',
    fullDescription: '利用先进的 GAN 网络，将模糊、低分辨率的图片无损放大 4 倍，并修复老照片的划痕和折痕。',
    features: ['4倍无损放大', '划痕修复', '黑白上色', '人脸增强'],
    iconUrl: 'https://api.dicebear.com/7.x/shapes/svg?seed=Pixel&backgroundColor=2563eb',
    screenshots: [],
    deployment: { type: DeploymentType.API, url: 'https://api.pixelperfect.com' },
    toolsUsed: ['Real-ESRGAN', 'Python'],
    authorName: 'ImageLab',
    rating: 4.9,
    reviewCount: 980,
    reviews: generateReviews(15),
    downloads: 22000,
    pricingModel: PricingModel.ONE_TIME,
    price: 19.90,
    category: '设计创意',
    tags: ['修图', 'AI增强', '老照片'],
    releaseDate: '2023-08-20',
    status: AppStatus.PUBLISHED,
    currentVersion: '2.0.1',
    versionHistory: [],
    recommendationReason: '目前市面上效果最好的图片放大工具之一。'
  },
  {
    id: '8',
    title: 'BeatMaster 编曲助手',
    shortDescription: '哼唱一段旋律，生成完整伴奏。',
    fullDescription: 'BeatMaster 听懂你的哼唱，自动生成鼓点、贝斯和和弦进程，让音乐创作变得前所未有的简单。',
    features: ['哼唱转 MIDI', '智能和弦推荐', '多种风格伴奏', '导出 Ableton Live 工程'],
    iconUrl: 'https://api.dicebear.com/7.x/shapes/svg?seed=Beat&backgroundColor=ea580c',
    screenshots: [],
    deployment: { type: DeploymentType.WEB_APP, url: 'https://beatmaster.music' },
    toolsUsed: ['Magenta', 'TensorFlow.js'],
    authorName: 'MusicAI',
    rating: 4.4,
    reviewCount: 180,
    reviews: generateReviews(5),
    downloads: 4500,
    pricingModel: PricingModel.SUBSCRIPTION,
    price: 58.00,
    category: '音频处理',
    tags: ['音乐', '编曲', 'MIDI'],
    releaseDate: '2023-12-01',
    status: AppStatus.PUBLISHED,
    currentVersion: '1.0.0',
    versionHistory: [],
    recommendationReason: '音乐爱好者的创意画板，激发无限灵感。'
  },
  {
    id: '9',
    title: 'SlideGen 演示文稿',
    shortDescription: '输入大纲，自动生成精美 PPT。',
    fullDescription: 'SlideGen 根据您的文字大纲，自动设计 PPT 页面布局，配合 Unsplash 高清配图，支持导出为 PowerPoint 格式。',
    features: ['智能排版', '自动配图', '母版定制', '导出可编辑 PPTX'],
    iconUrl: 'https://api.dicebear.com/7.x/shapes/svg?seed=Slide&backgroundColor=ca8a04',
    screenshots: [],
    deployment: { type: DeploymentType.WEB_APP, url: 'https://slidegen.io' },
    toolsUsed: ['Python-pptx', 'GPT-3.5'],
    authorName: 'OfficePlus',
    rating: 4.2,
    reviewCount: 310,
    reviews: generateReviews(8),
    downloads: 7800,
    pricingModel: PricingModel.FREE,
    price: 0,
    category: '生产力',
    tags: ['PPT', '办公', '效率'],
    releaseDate: '2023-09-10',
    status: AppStatus.PUBLISHED,
    currentVersion: '3.1.0',
    versionHistory: [],
    recommendationReason: '职场救星，紧急会议前的最佳准备工具。'
  },
  {
    id: '10',
    title: 'TransLingo 实时翻译',
    shortDescription: '会议实时同传，支持 50+ 种语言。',
    fullDescription: 'TransLingo 接入 Zoom/Teams 会议，提供低延迟的实时字幕翻译，支持术语库定制。',
    features: ['实时双语字幕', '会议纪要自动生成', '行业术语库', '本地录音翻译'],
    iconUrl: 'https://api.dicebear.com/7.x/shapes/svg?seed=Trans&backgroundColor=059669',
    screenshots: [],
    deployment: { type: DeploymentType.WEB_APP, url: 'https://translingo.app' },
    toolsUsed: ['Whisper', 'DeepL API'],
    authorName: 'GlobalConnect',
    rating: 4.6,
    reviewCount: 420,
    reviews: generateReviews(12),
    downloads: 9200,
    pricingModel: PricingModel.SUBSCRIPTION,
    price: 88.00,
    category: '生产力',
    tags: ['翻译', '会议', '同传'],
    releaseDate: '2023-10-20',
    status: AppStatus.PUBLISHED,
    currentVersion: '1.5.0',
    versionHistory: [],
    recommendationReason: '跨国团队沟通的桥梁，翻译准确度极高。'
  }
];

export const MOCK_PAYOUTS: PayoutRecord[] = [
  {
    id: 'pay_001',
    month: '9月',
    year: 2023,
    grossRevenue: 15000.00,
    platformFee: 2250.00,
    taxWithheld: 1500.00,
    netPayout: 11250.00,
    status: '已打款'
  },
  {
    id: 'pay_002',
    month: '10月',
    year: 2023,
    grossRevenue: 22000.00,
    platformFee: 3300.00,
    taxWithheld: 2200.00,
    netPayout: 16500.00,
    status: '处理中'
  }
];

export const MOCK_SALES_DATA: SalesDataPoint[] = [
  { date: '10-01', revenue: 800, users: 5 },
  { date: '10-05', revenue: 1500, users: 12 },
  { date: '10-10', revenue: 1200, users: 8 },
  { date: '10-15', revenue: 2500, users: 20 },
  { date: '10-20', revenue: 2800, users: 25 },
  { date: '10-25', revenue: 2600, users: 22 },
  { date: '10-30', revenue: 4200, users: 35 },
];

export const MOCK_TRANSACTIONS: Transaction[] = [
  { id: 'tx_1', type: 'PURCHASE', amount: -68.00, date: '2023-10-25', status: 'COMPLETED', description: '购买: CodeWhiz' },
  { id: 'tx_2', type: 'DEPOSIT', amount: 500.00, date: '2023-10-20', status: 'COMPLETED', description: '钱包充值 (USDT)' },
  { id: 'tx_3', type: 'INCOME', amount: 125.50, date: '2023-10-15', status: 'COMPLETED', description: '创作者收益' },
];

export const MOCK_REFERRAL_STATS: ReferralStats = {
  totalInvited: 42,
  totalEarnings: 1250.50,
  pendingEarnings: 340.00,
  referralCode: 'NEXUS_K8J2',
  referralLink: 'https://nexus.ai/ref/NEXUS_K8J2'
};

export const MOCK_REFERRAL_CHART: ReferralDataPoint[] = [
  { date: 'W1', invites: 5, earnings: 120 },
  { date: 'W2', invites: 8, earnings: 240 },
  { date: 'W3', invites: 12, earnings: 310 },
  { date: 'W4', invites: 15, earnings: 450 },
  { date: 'W5', invites: 9, earnings: 200 },
  { date: 'W6', invites: 18, earnings: 580 },
];