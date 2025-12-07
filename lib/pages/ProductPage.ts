import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * 商品ページ - Page Object Model
 */
export class ProductPage extends BasePage {
  private readonly productTitle: Locator;
  private readonly productPrice: Locator;
  private readonly productImage: Locator;
  private readonly addToCartButton: Locator;
  private readonly quantityInput: Locator;
  private readonly productDescription: Locator;
  private readonly reviewsSection: Locator;
  private readonly relatedProducts: Locator;

  constructor(page: Page) {
    super(page);
    
    this.productTitle = page.locator('h1.product-title');
    this.productPrice = page.locator('.product-price');
    this.productImage = page.locator('.product-image img');
    this.addToCartButton = page.locator('button:has-text("カートに追加")');
    this.quantityInput = page.locator('input[name="quantity"]');
    this.productDescription = page.locator('.product-description');
    this.reviewsSection = page.locator('#reviews');
    this.relatedProducts = page.locator('.related-products .product-item');
  }

  async navigate(productId: string): Promise<void> {
    await this.goto(`/products/${productId}`);
    await this.assertVisible(this.productTitle);
  }

  async getProductTitle(): Promise<string> {
    return await this.productTitle.textContent() || '';
  }

  async getProductPrice(): Promise<string> {
    return await this.productPrice.textContent() || '';
  }

  async addToCart(quantity: number = 1): Promise<void> {
    if (quantity > 1) {
      await this.fillText(this.quantityInput, quantity.toString());
    }
    await this.safeClick(this.addToCartButton);
    this.logger.info(`Added ${quantity} item(s) to cart`);
  }

  async assertProductInfo(expectedTitle: string, expectedPrice: string): Promise<void> {
    await this.assertText(this.productTitle, expectedTitle);
    await this.assertText(this.productPrice, expectedPrice);
  }

  async getRelatedProductsCount(): Promise<number> {
    return await this.relatedProducts.count();
  }
}
