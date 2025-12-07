import { Page, Locator, expect } from '@playwright/test';
import { Logger } from '../utils/logger';

/**
 * Page Object Model 基底クラス
 * 全ページクラスがこれを継承する
 * 
 * 機能:
 * - 共通メソッドの提供
 * - ロギング統合
 * - 待機処理の標準化
 * - エラーハンドリング
 */
export class BasePage {
  protected page: Page;
  protected logger: Logger;
  protected baseURL: string;

  constructor(page: Page) {
    this.page = page;
    this.logger = new Logger('BasePage');
    this.baseURL = process.env.BASE_URL || 'https://demo.playwright.dev';
  }

  /**
   * ページ遷移（ロギング付き）
   */
  async goto(path: string = ''): Promise<void> {
    const url = `${this.baseURL}${path}`;
    this.logger.info(`Navigating to: ${url}`);
    
    await this.page.goto(url, {
      waitUntil: 'domcontentloaded',
      timeout: 30000
    });
    
    await this.waitForPageLoad();
  }

  /**
   * ページロード完了待機
   */
  async waitForPageLoad(): Promise<void> {
    await this.page.waitForLoadState('networkidle', { timeout: 30000 });
    this.logger.info('Page loaded successfully');
  }

  /**
   * 要素クリック（安全版）
   */
  async safeClick(locator: Locator, options?: { timeout?: number }): Promise<void> {
    const timeout = options?.timeout || 10000;
    
    await locator.waitFor({ state: 'visible', timeout });
    await locator.scrollIntoViewIfNeeded();
    await locator.click({ timeout });
    
    this.logger.info(`Clicked: ${await locator.textContent() || 'element'}`);
  }

  /**
   * テキスト入力（クリア→入力）
   */
  async fillText(locator: Locator, text: string): Promise<void> {
    await locator.clear();
    await locator.fill(text);
    this.logger.info(`Filled text: "${text}"`);
  }

  /**
   * セレクトボックス選択
   */
  async selectOption(locator: Locator, value: string): Promise<void> {
    await locator.selectOption(value);
    this.logger.info(`Selected option: "${value}"`);
  }

  /**
   * 要素の表示確認
   */
  async assertVisible(locator: Locator, message?: string): Promise<void> {
    await expect(locator).toBeVisible({ timeout: 10000 });
    this.logger.info(message || 'Element is visible');
  }

  /**
   * テキスト内容確認
   */
  async assertText(locator: Locator, expectedText: string): Promise<void> {
    await expect(locator).toHaveText(expectedText);
    this.logger.info(`Text assertion passed: "${expectedText}"`);
  }

  /**
   * URL確認
   */
  async assertURL(expectedURL: string | RegExp): Promise<void> {
    await expect(this.page).toHaveURL(expectedURL);
    this.logger.info(`URL assertion passed`);
  }

  /**
   * スクリーンショット撮影
   */
  async takeScreenshot(name: string): Promise<void> {
    await this.page.screenshot({ 
      path: `screenshots/${name}.png`,
      fullPage: true 
    });
    this.logger.info(`Screenshot saved: ${name}.png`);
  }

  /**
   * ページタイトル取得
   */
  async getTitle(): Promise<string> {
    return await this.page.title();
  }

  /**
   * 現在のURL取得
   */
  getCurrentURL(): string {
    return this.page.url();
  }

  /**
   * ローカルストレージ設定
   */
  async setLocalStorage(key: string, value: string): Promise<void> {
    await this.page.evaluate(
      ({ k, v }) => localStorage.setItem(k, v),
      { k: key, v: value }
    );
  }

  /**
   * Cookie設定
   */
  async setCookie(name: string, value: string): Promise<void> {
    await this.page.context().addCookies([
      {
        name,
        value,
        domain: new URL(this.baseURL).hostname,
        path: '/',
      }
    ]);
  }

  /**
   * 待機（明示的）
   */
  async wait(milliseconds: number): Promise<void> {
    await this.page.waitForTimeout(milliseconds);
  }

  /**
   * JavaScript実行
   */
  async evaluate<T>(script: string | Function, arg?: any): Promise<T> {
    return await this.page.evaluate(script, arg);
  }

  /**
   * iframeハンドリング
   */
  async getFrame(selector: string): Promise<Page> {
    const frameElement = await this.page.waitForSelector(selector);
    const frame = await frameElement!.contentFrame();
    if (!frame) throw new Error(`Frame not found: ${selector}`);
    return frame as unknown as Page;
  }

  /**
   * ファイルアップロード
   */
  async uploadFile(locator: Locator, filePath: string): Promise<void> {
    await locator.setInputFiles(filePath);
    this.logger.info(`File uploaded: ${filePath}`);
  }

  /**
   * ダウンロード処理
   */
  async downloadFile(triggerLocator: Locator): Promise<string> {
    const [download] = await Promise.all([
      this.page.waitForEvent('download'),
      triggerLocator.click()
    ]);
    
    const path = await download.path();
    this.logger.info(`File downloaded: ${path}`);
    return path || '';
  }

  /**
   * アラート処理
   */
  async handleAlert(action: 'accept' | 'dismiss' = 'accept'): Promise<void> {
    this.page.once('dialog', async dialog => {
      this.logger.info(`Alert detected: ${dialog.message()}`);
      if (action === 'accept') {
        await dialog.accept();
      } else {
        await dialog.dismiss();
      }
    });
  }

  /**
   * 新しいタブ/ウィンドウを開く
   */
  async openNewTab(): Promise<Page> {
    const newPage = await this.page.context().newPage();
    this.logger.info('New tab opened');
    return newPage;
  }

  /**
   * ページクローズ
   */
  async close(): Promise<void> {
    await this.page.close();
    this.logger.info('Page closed');
  }
}
