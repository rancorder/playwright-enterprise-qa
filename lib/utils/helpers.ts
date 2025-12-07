/**
 * ヘルパー関数集
 */

/**
 * ランダム文字列生成
 */
export function randomString(length: number = 10): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

/**
 * ランダムメールアドレス生成
 */
export function randomEmail(): string {
  return `test_${randomString(8)}@example.com`;
}

/**
 * 日付フォーマット（YYYY-MM-DD）
 */
export function formatDate(date: Date = new Date()): string {
  return date.toISOString().split('T')[0];
}

/**
 * タイムスタンプ生成
 */
export function timestamp(): string {
  return new Date().toISOString();
}

/**
 * 遅延実行（Promise版sleep）
 */
export function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * リトライ処理
 */
export async function retry<T>(
  fn: () => Promise<T>,
  maxRetries: number = 3,
  delay: number = 1000
): Promise<T> {
  let lastError: Error | undefined;
  
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error as Error;
      if (i < maxRetries - 1) {
        await sleep(delay * (i + 1)); // Exponential backoff
      }
    }
  }
  
  throw lastError;
}

/**
 * 環境変数取得（デフォルト値付き）
 */
export function getEnv(key: string, defaultValue: string = ''): string {
  return process.env[key] || defaultValue;
}

/**
 * 金額フォーマット
 */
export function formatCurrency(amount: number, currency: string = 'JPY'): string {
  return new Intl.NumberFormat('ja-JP', {
    style: 'currency',
    currency
  }).format(amount);
}

/**
 * URLパラメータ構築
 */
export function buildQueryString(params: Record<string, string | number>): string {
  return new URLSearchParams(
    Object.entries(params).map(([k, v]) => [k, String(v)])
  ).toString();
}

/**
 * Base64エンコード
 */
export function base64Encode(str: string): string {
  return Buffer.from(str).toString('base64');
}

/**
 * Base64デコード
 */
export function base64Decode(str: string): string {
  return Buffer.from(str, 'base64').toString('utf-8');
}

/**
 * 配列からランダム要素取得
 */
export function randomElement<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

/**
 * 配列シャッフル
 */
export function shuffle<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

/**
 * パフォーマンス計測
 */
export async function measurePerformance<T>(
  fn: () => Promise<T>,
  label: string = 'Operation'
): Promise<{ result: T; duration: number }> {
  const start = Date.now();
  const result = await fn();
  const duration = Date.now() - start;
  
  console.log(`⏱️  ${label}: ${duration}ms`);
  
  return { result, duration };
}
