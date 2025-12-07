import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * ログインページ - Page Object Model
 * 
 * 責務:
 * - ログインフォームの操作
 * - 認証処理
 * - エラーメッセージ検証
 */
export class LoginPage extends BasePage {
  // ロケーター定義
  private readonly emailInput: Locator;
  private readonly passwordInput: Locator;
  private readonly loginButton: Locator;
  private readonly errorMessage: Locator;
  private readonly successMessage: Locator;
  private readonly forgotPasswordLink: Locator;
  private readonly rememberMeCheckbox: Locator;

  constructor(page: Page) {
    super(page);
    
    // セレクタ定義（メンテナンス性向上）
    this.emailInput = page.locator('input[name="email"]');
    this.passwordInput = page.locator('input[name="password"]');
    this.loginButton = page.locator('button[type="submit"]');
    this.errorMessage = page.locator('.error-message');
    this.successMessage = page.locator('.success-message');
    this.forgotPasswordLink = page.locator('a:has-text("パスワードを忘れた")');
    this.rememberMeCheckbox = page.locator('input[name="remember"]');
  }

  /**
   * ログインページへ遷移
   */
  async navigate(): Promise<void> {
    await this.goto('/login');
    await this.assertVisible(this.loginButton, 'Login page loaded');
  }

  /**
   * ログイン実行（基本）
   */
  async login(email: string, password: string): Promise<void> {
    this.logger.info(`Logging in as: ${email}`);
    
    await this.fillText(this.emailInput, email);
    await this.fillText(this.passwordInput, password);
    await this.safeClick(this.loginButton);
    
    // ログイン完了待機（URLが変わるまで）
    await this.page.waitForURL(/dashboard|home/, { timeout: 10000 });
    this.logger.info('Login successful');
  }

  /**
   * ログイン実行（Remember Me有効）
   */
  async loginWithRememberMe(email: string, password: string): Promise<void> {
    await this.fillText(this.emailInput, email);
    await this.fillText(this.passwordInput, password);
    await this.rememberMeCheckbox.check();
    await this.safeClick(this.loginButton);
    
    await this.page.waitForURL(/dashboard|home/, { timeout: 10000 });
  }

  /**
   * ログイン失敗の確認
   */
  async assertLoginError(expectedMessage?: string): Promise<void> {
    await this.assertVisible(this.errorMessage, 'Error message displayed');
    
    if (expectedMessage) {
      await this.assertText(this.errorMessage, expectedMessage);
    }
  }

  /**
   * ログイン成功の確認
   */
  async assertLoginSuccess(): Promise<void> {
    await this.assertURL(/dashboard|home/);
    this.logger.info('Login success verified');
  }

  /**
   * パスワードリセットリンククリック
   */
  async clickForgotPassword(): Promise<void> {
    await this.safeClick(this.forgotPasswordLink);
    await this.assertURL(/reset-password|forgot-password/);
  }

  /**
   * バリデーションエラーチェック
   */
  async assertEmailValidationError(): Promise<void> {
    const emailError = this.page.locator('.email-error');
    await this.assertVisible(emailError);
  }

  /**
   * ソーシャルログイン（Google）
   */
  async loginWithGoogle(): Promise<void> {
    const googleButton = this.page.locator('button:has-text("Google")');
    await this.safeClick(googleButton);
    
    // Google OAuth画面への遷移待機
    await this.page.waitForURL(/accounts\.google\.com/, { timeout: 15000 });
  }

  /**
   * SSO (Single Sign-On) ログイン
   */
  async loginWithSSO(domain: string): Promise<void> {
    const ssoInput = this.page.locator('input[name="domain"]');
    const ssoButton = this.page.locator('button:has-text("SSO")');
    
    await this.fillText(ssoInput, domain);
    await this.safeClick(ssoButton);
  }

  /**
   * ログアウト
   */
  async logout(): Promise<void> {
    const logoutButton = this.page.locator('button:has-text("ログアウト")');
    await this.safeClick(logoutButton);
    await this.assertURL(/login/);
    this.logger.info('Logout successful');
  }

  /**
   * フォームクリア
   */
  async clearForm(): Promise<void> {
    await this.emailInput.clear();
    await this.passwordInput.clear();
  }

  /**
   * 入力値検証（デバッグ用）
   */
  async getInputValues(): Promise<{ email: string; password: string }> {
    return {
      email: await this.emailInput.inputValue(),
      password: await this.passwordInput.inputValue()
    };
  }
}
