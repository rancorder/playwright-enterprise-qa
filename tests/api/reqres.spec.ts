import { test, expect } from '@playwright/test';

/**
 * ReqRes API テスト（実際に動作）
 * 
 * APIサイト: https://reqres.in
 * ドキュメント: https://reqres.in/api-docs
 */
test.describe('ReqRes API - User Tests', () => {

  test('GET /users - should return user list', async ({ request }) => {
    // Act
    const response = await request.get('https://reqres.in/api/users?page=1');

    // Assert
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);

    const data = await response.json();
    
    // データ構造検証
    expect(data).toHaveProperty('page');
    expect(data).toHaveProperty('per_page');
    expect(data).toHaveProperty('total');
    expect(data).toHaveProperty('data');
    
    // ユーザーリスト検証
    expect(Array.isArray(data.data)).toBeTruthy();
    expect(data.data.length).toBeGreaterThan(0);
    
    // 1件目のユーザー検証
    const firstUser = data.data[0];
    expect(firstUser).toHaveProperty('id');
    expect(firstUser).toHaveProperty('email');
    expect(firstUser).toHaveProperty('first_name');
    expect(firstUser).toHaveProperty('last_name');
    expect(firstUser).toHaveProperty('avatar');
  });

  test('GET /users/:id - should return specific user', async ({ request }) => {
    // Arrange
    const userId = 2;

    // Act
    const response = await request.get(`https://reqres.in/api/users/${userId}`);

    // Assert
    expect(response.ok()).toBeTruthy();
    const data = await response.json();
    
    expect(data.data.id).toBe(userId);
    expect(data.data).toHaveProperty('email');
    expect(data.data).toHaveProperty('first_name');
    expect(data.data).toHaveProperty('last_name');
  });

  test('POST /users - should create new user', async ({ request }) => {
    // Arrange
    const newUser = {
      name: 'Test User',
      job: 'QA Engineer'
    };

    // Act
    const response = await request.post('https://reqres.in/api/users', {
      data: newUser
    });

    // Assert
    expect(response.status()).toBe(201);
    
    const data = await response.json();
    expect(data.name).toBe(newUser.name);
    expect(data.job).toBe(newUser.job);
    expect(data).toHaveProperty('id');
    expect(data).toHaveProperty('createdAt');
  });

  test('PUT /users/:id - should update user', async ({ request }) => {
    // Arrange
    const userId = 2;
    const updatedData = {
      name: 'Updated Name',
      job: 'Senior QA Engineer'
    };

    // Act
    const response = await request.put(`https://reqres.in/api/users/${userId}`, {
      data: updatedData
    });

    // Assert
    expect(response.ok()).toBeTruthy();
    
    const data = await response.json();
    expect(data.name).toBe(updatedData.name);
    expect(data.job).toBe(updatedData.job);
    expect(data).toHaveProperty('updatedAt');
  });

  test('PATCH /users/:id - should partially update user', async ({ request }) => {
    // Arrange
    const userId = 2;
    const updatedData = {
      job: 'Lead QA Engineer'
    };

    // Act
    const response = await request.patch(`https://reqres.in/api/users/${userId}`, {
      data: updatedData
    });

    // Assert
    expect(response.ok()).toBeTruthy();
    
    const data = await response.json();
    expect(data.job).toBe(updatedData.job);
    expect(data).toHaveProperty('updatedAt');
  });

  test('DELETE /users/:id - should delete user', async ({ request }) => {
    // Arrange
    const userId = 2;

    // Act
    const response = await request.delete(`https://reqres.in/api/users/${userId}`);

    // Assert
    expect(response.status()).toBe(204);
  });

  test('GET /users/:id (not found) - should return 404', async ({ request }) => {
    // Arrange
    const invalidUserId = 999999;

    // Act
    const response = await request.get(`https://reqres.in/api/users/${invalidUserId}`);

    // Assert
    expect(response.status()).toBe(404);
  });

  test('GET /users?page=2 - should paginate results', async ({ request }) => {
    // Act
    const response = await request.get('https://reqres.in/api/users?page=2');

    // Assert
    expect(response.ok()).toBeTruthy();
    
    const data = await response.json();
    expect(data.page).toBe(2);
    expect(data.data.length).toBeGreaterThan(0);
  });

  test('GET /users?delay=3 - should handle delayed response', async ({ request }) => {
    // Arrange
    const startTime = Date.now();

    // Act
    const response = await request.get('https://reqres.in/api/users?delay=3');

    // Assert
    const duration = Date.now() - startTime;
    expect(response.ok()).toBeTruthy();
    expect(duration).toBeGreaterThanOrEqual(3000); // 3秒以上かかる
  });
});

/**
 * ReqRes API - 認証テスト
 */
test.describe('ReqRes API - Authentication Tests', () => {

  test('POST /register - should register successfully', async ({ request }) => {
    // Arrange
    const userData = {
      email: 'eve.holt@reqres.in',
      password: 'pistol'
    };

    // Act
    const response = await request.post('https://reqres.in/api/register', {
      data: userData
    });

    // Assert
    expect(response.ok()).toBeTruthy();
    
    const data = await response.json();
    expect(data).toHaveProperty('id');
    expect(data).toHaveProperty('token');
  });

  test('POST /register - should fail without password', async ({ request }) => {
    // Arrange
    const userData = {
      email: 'sydney@fife'
    };

    // Act
    const response = await request.post('https://reqres.in/api/register', {
      data: userData
    });

    // Assert
    expect(response.status()).toBe(400);
    
    const data = await response.json();
    expect(data).toHaveProperty('error');
  });

  test('POST /login - should login successfully', async ({ request }) => {
    // Arrange
    const credentials = {
      email: 'eve.holt@reqres.in',
      password: 'cityslicka'
    };

    // Act
    const response = await request.post('https://reqres.in/api/login', {
      data: credentials
    });

    // Assert
    expect(response.ok()).toBeTruthy();
    
    const data = await response.json();
    expect(data).toHaveProperty('token');
  });

  test('POST /login - should fail with invalid credentials', async ({ request }) => {
    // Arrange
    const credentials = {
      email: 'peter@klaven'
    };

    // Act
    const response = await request.post('https://reqres.in/api/login', {
      data: credentials
    });

    // Assert
    expect(response.status()).toBe(400);
    
    const data = await response.json();
    expect(data).toHaveProperty('error');
  });
});

/**
 * ReqRes API - リソーステスト
 */
test.describe('ReqRes API - Resource Tests', () => {

  test('GET /unknown - should return resource list', async ({ request }) => {
    // Act
    const response = await request.get('https://reqres.in/api/unknown');

    // Assert
    expect(response.ok()).toBeTruthy();
    
    const data = await response.json();
    expect(Array.isArray(data.data)).toBeTruthy();
    
    // リソース構造検証
    const firstResource = data.data[0];
    expect(firstResource).toHaveProperty('id');
    expect(firstResource).toHaveProperty('name');
    expect(firstResource).toHaveProperty('year');
    expect(firstResource).toHaveProperty('color');
    expect(firstResource).toHaveProperty('pantone_value');
  });

  test('GET /unknown/:id - should return specific resource', async ({ request }) => {
    // Arrange
    const resourceId = 2;

    // Act
    const response = await request.get(`https://reqres.in/api/unknown/${resourceId}`);

    // Assert
    expect(response.ok()).toBeTruthy();
    
    const data = await response.json();
    expect(data.data.id).toBe(resourceId);
  });
});
