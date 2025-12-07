/**
 * テストデータフィクスチャ
 * 環境ごとにデータを切り替え可能
 */

export interface User {
  email: string;
  password: string;
  role: 'admin' | 'user' | 'guest';
}

export interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
}

/**
 * テストユーザー (The Internet用)
 */
export const TEST_USERS: Record<string, User> = {
  admin: {
    email: process.env.ADMIN_EMAIL || 'tomsmith',
    password: process.env.ADMIN_PASSWORD || 'SuperSecretPassword!',
    role: 'admin'
  },
  user: {
    email: process.env.USER_EMAIL || 'tomsmith',
    password: process.env.USER_PASSWORD || 'SuperSecretPassword!',
    role: 'user'
  },
  invalidUser: {
    email: 'invalid',
    password: 'wrongpassword',
    role: 'guest'
  }
};

/**
 * テスト商品 (ReqRes API用)
 */
export const TEST_PRODUCTS: Record<string, Product> = {
  laptop: {
    id: '1',
    name: 'Gaming Laptop',
    price: 150000,
    stock: 10
  },
  mouse: {
    id: '2',
    name: 'Wireless Mouse',
    price: 3000,
    stock: 50
  },
  keyboard: {
    id: '3',
    name: 'Mechanical Keyboard',
    price: 12000,
    stock: 30
  }
};

/**
 * テストAPI (ReqRes用)
 */
export const API_ENDPOINTS = {
  login: '/login',
  logout: '/logout',
  users: '/users',
  products: '/users', // ReqResは/usersエンドポイントを使用
  orders: '/users'
};

/**
 * 環境設定
 */
export const ENV = {
  baseURL: process.env.BASE_URL || 'https://the-internet.herokuapp.com',
  apiBaseURL: process.env.API_BASE_URL || 'https://reqres.in/api',
  timeout: parseInt(process.env.TIMEOUT || '30000'),
  retries: parseInt(process.env.RETRIES || '2')
};
