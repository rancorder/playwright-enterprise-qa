import { test, expect } from '@playwright/test';
import { TEST_USERS } from '../../lib/fixtures/test-data';

/**
 * The Internet - 認証テスト（実際に動作）
 * 
 * テストサイト: https://the-internet.herokuapp.com
 * 認証情報: tomsmith / SuperSecretPassword!
 */
test.describe('The Internet - Authentication Tests', () => {

  test('should login successfully with valid credentials', async ({ page }) => {
    // Arrange
    const user = TEST_USERS.user;

    // Act: ログインページへ遷移
    await page.goto('https://the-internet.herokuapp.com/login');

    // ログインフォーム入力
    await page.locator('#username').fill(user.email);
    await page.locator('#password').fill(user.password);
    await page.locator('button[type="submit"]').click();

    // Assert: ログイン成功メッセージ
    await expect(page.locator('.flash.success')).toBeVisible();
    await expect(page.locator('.flash.success')).toContainText('You logged into a secure area!');
    
    // URLチェック
    await expect(page).toHaveURL(/secure/);
  });

  test('should show error with invalid credentials', async ({ page }) => {
    // Arrange
    const user = TEST_USERS.invalidUser;

    // Act: ログインページへ遷移
    await page.goto('https://the-internet.herokuapp.com/login');

    // 無効な認証情報で試行
    await page.locator('#username').fill(user.email);
    await page.locator('#password').fill(user.password);
    await page.locator('button[type="submit"]').click();

    // Assert: エラーメッセージ
    await expect(page.locator('.flash.error')).toBeVisible();
    await expect(page.locator('.flash.error')).toContainText('Your username is invalid!');
  });

  test('should logout successfully', async ({ page }) => {
    // Arrange: まずログイン
    const user = TEST_USERS.user;
    await page.goto('https://the-internet.herokuapp.com/login');
    await page.locator('#username').fill(user.email);
    await page.locator('#password').fill(user.password);
    await page.locator('button[type="submit"]').click();

    // Assert: ログイン成功確認
    await expect(page.locator('.flash.success')).toBeVisible();

    // Act: ログアウト
    await page.locator('a[href="/logout"]').click();

    // Assert: ログアウト成功
    await expect(page.locator('.flash.success')).toContainText('You logged out of the secure area!');
    await expect(page).toHaveURL(/login/);
  });

  test('should handle empty username', async ({ page }) => {
    // Act
    await page.goto('https://the-internet.herokuapp.com/login');
    await page.locator('#password').fill('password');
    await page.locator('button[type="submit"]').click();

    // Assert
    await expect(page.locator('.flash.error')).toBeVisible();
    await expect(page.locator('.flash.error')).toContainText('Your username is invalid!');
  });

  test('should handle empty password', async ({ page }) => {
    // Act
    await page.goto('https://the-internet.herokuapp.com/login');
    await page.locator('#username').fill('tomsmith');
    await page.locator('button[type="submit"]').click();

    // Assert
    await expect(page.locator('.flash.error')).toBeVisible();
    await expect(page.locator('.flash.error')).toContainText('Your password is invalid!');
  });
});

/**
 * The Internet - その他のE2Eテスト
 */
test.describe('The Internet - E2E Tests', () => {

  test('Dropdown - should select option', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/dropdown');
    
    // ドロップダウン選択
    await page.locator('#dropdown').selectOption('1');
    
    // 選択値確認
    const value = await page.locator('#dropdown').inputValue();
    expect(value).toBe('1');
  });

  test('Checkboxes - should toggle checkboxes', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/checkboxes');
    
    const checkbox1 = page.locator('input[type="checkbox"]').first();
    const checkbox2 = page.locator('input[type="checkbox"]').last();
    
    // チェックボックス操作
    await checkbox1.check();
    await checkbox2.uncheck();
    
    // 状態確認
    await expect(checkbox1).toBeChecked();
    await expect(checkbox2).not.toBeChecked();
  });

  test('File Upload - should upload file', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/upload');
    
    // テストファイル作成（メモリ上）
    const buffer = Buffer.from('Test file content');
    
    // ファイルアップロード
    await page.locator('#file-upload').setInputFiles({
      name: 'test.txt',
      mimeType: 'text/plain',
      buffer: buffer
    });
    
    await page.locator('#file-submit').click();
    
    // アップロード成功確認
    await expect(page.locator('#uploaded-files')).toContainText('test.txt');
  });

  test('Dynamic Loading - should wait for element', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/dynamic_loading/1');
    
    // 開始ボタンクリック
    await page.locator('button').click();
    
    // 動的に表示される要素を待機
    await expect(page.locator('#finish h4')).toBeVisible({ timeout: 10000 });
    await expect(page.locator('#finish h4')).toHaveText('Hello World!');
  });

  test('Hovers - should show tooltip on hover', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/hovers');
    
    // 最初の画像にホバー
    await page.locator('.figure').first().hover();
    
    // キャプション表示確認
    await expect(page.locator('.figcaption').first()).toBeVisible();
  });

  test('JavaScript Alerts - should handle alert', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/javascript_alerts');
    
    // アラートハンドラ設定
    page.once('dialog', dialog => {
      expect(dialog.message()).toBe('I am a JS Alert');
      dialog.accept();
    });
    
    // アラート表示
    await page.locator('button:has-text("Click for JS Alert")').click();
    
    // 結果確認
    await expect(page.locator('#result')).toHaveText('You successfully clicked an alert');
  });

  test('Key Presses - should detect key press', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/key_presses');
    
    // キー入力
    await page.locator('#target').press('Enter');
    
    // 結果確認
    await expect(page.locator('#result')).toHaveText('You entered: ENTER');
  });
});
