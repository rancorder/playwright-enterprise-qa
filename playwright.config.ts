import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

/**
 * Enterprise-grade Playwright Configuration
 * Features:
 * - Multi-browser testing (Chromium, Firefox, WebKit, Mobile)
 * - Parallel execution with workers
 * - Retry mechanism for flaky tests
 * - Multiple reporters (HTML, JSON, Allure)
 * - Video/Screenshot on failure
 * - Environment-specific base URLs
 * - CI/CD optimization
 */
export default defineConfig({
  // テストディレクトリ
  testDir: './tests',
  
  // フルパラレル実行
  fullyParallel: true,
  
  // CI環境でfailFastを無効化
  forbidOnly: !!process.env.CI,
  
  // リトライ回数（CI: 2回, Local: 0回）
  retries: process.env.CI ? 2 : 0,
  
  // 並列実行数（CI: 2, Local: undefined=auto）
  workers: process.env.CI ? 2 : undefined,
  
  // レポーター設定（複数レポート同時出力）
  reporter: [
    ['html', { outputFolder: 'playwright-report', open: 'never' }],
    ['json', { outputFile: 'test-results.json' }],
    ['junit', { outputFile: 'junit-results.xml' }],
    ['list'],
    ['allure-playwright', { 
      outputFolder: 'allure-results',
      detail: true,
      suiteTitle: false
    }]
  ],
  
  // 共通設定
  use: {
    // ベースURL（環境変数で切り替え）
    baseURL: process.env.BASE_URL || 'https://the-internet.herokuapp.com',
    
    // トレース設定（失敗時のみ記録）
    trace: 'on-first-retry',
    
    // スクリーンショット（失敗時のみ）
    screenshot: 'only-on-failure',
    
    // ビデオ録画（失敗時のみ）
    video: 'retain-on-failure',
    
    // タイムアウト
    actionTimeout: 15000,
    navigationTimeout: 30000,
    
    // User-Agent
    userAgent: 'Playwright-Enterprise-QA/1.0',
    
    // ロケール設定
    locale: 'ja-JP',
    timezoneId: 'Asia/Tokyo',
    
    // ビューポート
    viewport: { width: 1920, height: 1080 },
    
    // HTTPクレデンシャル（必要に応じて）
    // httpCredentials: {
    //   username: process.env.HTTP_USER!,
    //   password: process.env.HTTP_PASS!,
    // },
  },

  // プロジェクト設定（複数ブラウザ対応）
  projects: [
    // Desktop Browsers
    {
      name: 'chromium',
      use: { 
        ...devices['Desktop Chrome'],
        // Chrome固有の設定
        launchOptions: {
          args: ['--disable-web-security'] // CORS対策（必要に応じて）
        }
      },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },

    // Mobile Browsers
    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 5'] },
    },
    {
      name: 'Mobile Safari',
      use: { ...devices['iPhone 13'] },
    },

    // Tablet
    {
      name: 'iPad',
      use: { ...devices['iPad Pro'] },
    },

    // API Testing（ブラウザ不要）
    {
      name: 'api',
      testMatch: /.*\.api\.spec\.ts/,
      use: {
        baseURL: process.env.API_BASE_URL || 'https://reqres.in/api',
      }
    }
  ],

  // ローカル開発サーバー（必要に応じて）
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  //   timeout: 120 * 1000,
  // },

  // グローバルタイムアウト
  timeout: 60000,
  expect: {
    timeout: 10000,
  },

  // 失敗時の最大差分出力行数
  maxFailures: process.env.CI ? 10 : undefined,
});
