
export enum PricingModel {
  FREE = '免费使用',
  ONE_TIME = '永久买断',
  SUBSCRIPTION = '月度订阅'
}

export enum AppStatus {
  PUBLISHED = '已发布',
  DRAFT = '草稿',
  UNDER_REVIEW = '审核中',
  REJECTED = '未通过'
}

export enum DeploymentType {
  WEB_APP = 'Web Application',
  GRADIO = 'Gradio / Streamlit',
  API = 'REST API',
  INTERNAL = 'Nexus Internal Runtime' // New type for embedded apps
}

export interface DeploymentConfig {
  type: DeploymentType;
  url: string; 
  apiEndpoint?: string;
  docsUrl?: string;
  apiKeyHeader?: string;
  repoUrl?: string; // GitHub repository URL for auto-deployment
}

export interface VersionHistory {
  version: string;
  date: string;
  changes: string[];
}

export interface Review {
  id: string;
  userId: string;
  userName: string;
  avatarUrl: string;
  rating: number;
  date: string;
  content: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'success' | 'info' | 'warning' | 'error';
  timestamp: number;
  read: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
  role: 'user' | 'creator';
  balance: number;
  joinDate: string;
}

export interface AIApp {
  id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  features: string[];
  iconUrl: string;
  coverImageUrl?: string;
  screenshots: string[];
  videoUrl?: string;
  deployment: DeploymentConfig;
  toolsUsed: string[];
  authorName: string;
  rating: number;
  reviewCount: number;
  reviews: Review[];
  downloads: number;
  pricingModel: PricingModel;
  price: number;
  category: string;
  tags: string[];
  releaseDate: string;
  status: AppStatus;
  versionHistory: VersionHistory[];
  currentVersion: string;
  recommendationReason?: string; // Added for Leaderboard
  helpDocs?: string; // Added for Developer Documentation (Markdown)
}

export interface PayoutRecord {
  id: string;
  month: string;
  year: number;
  grossRevenue: number;
  platformFee: number;
  taxWithheld: number;
  netPayout: number;
  status: '处理中' | '已打款' | '待处理';
}

export interface SalesDataPoint {
  date: string;
  revenue: number;
  users: number;
}

export interface Transaction {
  id: string;
  type: 'DEPOSIT' | 'WITHDRAWAL' | 'PURCHASE' | 'INCOME';
  amount: number;
  date: string;
  status: 'COMPLETED' | 'PENDING' | 'FAILED';
  description: string;
}

export interface ReferralStats {
  totalInvited: number;
  totalEarnings: number;
  pendingEarnings: number;
  referralCode: string;
  referralLink: string;
}

export interface ReferralDataPoint {
  date: string;
  invites: number;
  earnings: number;
}