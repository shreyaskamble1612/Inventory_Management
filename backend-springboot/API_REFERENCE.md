# API Quick Reference Guide

## Base URL
```
http://localhost:5000
```

## Authentication Headers
All endpoints except registration, login, and auth require:
```
authtoken: <your_jwt_token>
```

---

## 1. USER REGISTRATION

### Request
```http
POST /api/user/registerUser
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "phoneNo": "1234567890",
  "password": "password123"
}
```

### Validation
- Name: 5-30 characters
- Email: Valid email format
- Phone: Valid phone number
- Password: Minimum 8 characters

### Response
```json
{
  "authtoken": "eyJhbGciOiJIUzUxMiJ9...",
  "success": true,
  "message": "User registered successfully"
}
```

---

## 2. USER LOGIN

### Request
```http
POST /api/user/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

### Response
```json
{
  "authtoken": "eyJhbGciOiJIUzUxMiJ9...",
  "success": true,
  "message": "Login successful"
}
```

---

## 3. UPDATE USER PROFILE

### Request
```http
PUT /api/user/updateUser
Content-Type: application/json
authtoken: <your_token>

{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "phoneNo": "9876543210"
}
```

### Response
```json
{
  "message": "User updated successfully",
  "success": true,
  "data": {
    "id": "...",
    "name": "Jane Doe",
    "email": "jane@example.com",
    "phoneNo": "9876543210"
  }
}
```

---

## 4. DELETE USER ACCOUNT

### Request
```http
DELETE /api/user/deleteUser
authtoken: <your_token>
```

### Response
```json
{
  "message": "User deleted successfully",
  "success": true
}
```

---

## 5. FORGOT PASSWORD

### Request
```http
POST /api/auth/forgot-password
Content-Type: application/json

{
  "email": "john@example.com"
}
```

### Response
```json
{
  "message": "Password reset link sent to email",
  "success": true
}
```

---

## 6. RESET PASSWORD

### Request
```http
POST /api/auth/reset-password/{token}
Content-Type: application/json

{
  "newPassword": "newpassword123"
}
```

### Response
```json
{
  "message": "Password reset successfully",
  "success": true
}
```

---

## 7. CREATE ITEM

### Request
```http
POST /api/item/addItem
Content-Type: application/json
authtoken: <your_token>

{
  "name": "Laptop",
  "description": "Dell XPS 13",
  "quantity": 10,
  "price": 999.99,
  "category": "Electronics"
}
```

### Response
```json
{
  "message": "Item successfully added",
  "success": true,
  "data": {
    "id": "...",
    "userId": "...",
    "name": "Laptop",
    "description": "Dell XPS 13",
    "quantity": 10,
    "price": 999.99,
    "sold": 0,
    "category": "Electronics",
    "soldPrice": 0,
    "date": "2026-02-19T10:30:00"
  }
}
```

---

## 8. GET ALL ITEMS

### Request
```http
GET /api/item/getItemsByUser
authtoken: <your_token>
```

### Response
```json
{
  "items": [
    {
      "id": "...",
      "name": "Laptop",
      "quantity": 10,
      "price": 999.99,
      "category": "Electronics"
    },
    {
      "id": "...",
      "name": "Mouse",
      "quantity": 25,
      "price": 29.99,
      "category": "Accessories"
    }
  ],
  "success": true
}
```

---

## 9. GET ITEMS BY CATEGORY

### Request
```http
GET /api/item/getItemsByUserCategory/Electronics
authtoken: <your_token>
```

### Response
```json
{
  "items": [
    {
      "id": "...",
      "name": "Laptop",
      "quantity": 10,
      "price": 999.99,
      "category": "Electronics"
    }
  ],
  "success": true
}
```

---

## 10. GET SINGLE ITEM

### Request
```http
GET /api/item/getItem/{itemId}
authtoken: <your_token>
```

### Response
```json
{
  "item": {
    "id": "...",
    "userId": "...",
    "name": "Laptop",
    "description": "Dell XPS 13",
    "quantity": 10,
    "price": 999.99,
    "sold": 0,
    "category": "Electronics",
    "soldPrice": 0,
    "date": "2026-02-19T10:30:00"
  },
  "success": true
}
```

---

## 11. UPDATE ITEM

### Request
```http
PUT /api/item/updateItem/{itemId}
Content-Type: application/json
authtoken: <your_token>

{
  "name": "Updated Laptop",
  "quantity": 15,
  "price": 1099.99
}
```

### Response
```json
{
  "message": "Item updated successfully",
  "success": true,
  "data": {
    "id": "...",
    "name": "Updated Laptop",
    "quantity": 15,
    "price": 1099.99
  }
}
```

---

## 12. DELETE ITEM

### Request
```http
DELETE /api/item/deleteItem/{itemId}
authtoken: <your_token>
```

### Response
```json
{
  "message": "Item deleted successfully",
  "success": true
}
```

---

## 13. INCREASE QUANTITY

### Request
```http
POST /api/log/increaseQuantity/{itemId}
Content-Type: application/json
authtoken: <your_token>

{
  "quantity": 5,
  "description": "Restocked from supplier ABC"
}
```

### Response
```json
{
  "log": {
    "id": "...",
    "userId": "...",
    "itemId": "...",
    "action": "Increase Quantity",
    "quantity": 5,
    "description": "Restocked from supplier ABC",
    "date": "2026-02-19T10:35:00"
  },
  "success": true
}
```

---

## 14. DECREASE QUANTITY (SELL)

### Request
```http
POST /api/log/decreaseQuantity/{itemId}
Content-Type: application/json
authtoken: <your_token>

{
  "quantity": 2,
  "description": "Sold to customer X"
}
```

### Response
```json
{
  "log": {
    "id": "...",
    "userId": "...",
    "itemId": "...",
    "action": "Decrease Quantity",
    "quantity": 2,
    "description": "Sold to customer X",
    "date": "2026-02-19T10:40:00"
  },
  "success": true
}
```

---

## 15. GET ITEM LOGS

### Request
```http
GET /api/item/getLogs/{itemId}
authtoken: <your_token>
```

### Response
```json
{
  "logs": [
    {
      "id": "...",
      "userId": "...",
      "itemId": "...",
      "action": "Increase Quantity",
      "quantity": 5,
      "description": "Restocked",
      "date": "2026-02-19T10:35:00"
    },
    {
      "id": "...",
      "userId": "...",
      "itemId": "...",
      "action": "Decrease Quantity",
      "quantity": 2,
      "description": "Sold",
      "date": "2026-02-19T10:40:00"
    }
  ],
  "success": true
}
```

---

## 16. WELCOME ENDPOINT

### Request
```http
GET /
```

### Response
```json
{
  "message": "Welcome to Inventory Management"
}
```

---

## Error Responses

### Bad Request (400/403)
```json
{
  "message": "Name must be between 5 and 30 characters",
  "success": false
}
```

### Unauthorized (401)
```json
{
  "message": "Please try using valid token",
  "success": false
}
```

### Not Found (404)
```json
{
  "message": "User not found",
  "success": false
}
```

### Server Error (500)
```json
{
  "message": "Internal server error",
  "success": false
}
```

---

## Testing with cURL

### Register User
```bash
curl -X POST http://localhost:5000/api/user/registerUser \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "phoneNo": "1234567890",
    "password": "password123"
  }'
```

### Add Item
```bash
curl -X POST http://localhost:5000/api/item/addItem \
  -H "Content-Type: application/json" \
  -H "authtoken: YOUR_TOKEN_HERE" \
  -d '{
    "name": "Laptop",
    "description": "Dell XPS",
    "quantity": 10,
    "price": 999.99,
    "category": "Electronics"
  }'
```

### Get All Items
```bash
curl -X GET http://localhost:5000/api/item/getItemsByUser \
  -H "authtoken: YOUR_TOKEN_HERE"
```

---

## Testing with Postman

1. **Create New Request**
   - Select HTTP method (GET, POST, PUT, DELETE)
   - Enter URL
   - Set headers if needed (authtoken)
   - Set body (JSON) if needed

2. **Headers Tab**
   - For protected endpoints, add:
     - Key: `authtoken`
     - Value: Your JWT token from login

3. **Body Tab** (for POST/PUT)
   - Set to `raw`
   - Select `JSON` format
   - Paste the request body

4. **Send Request**
   - Click "Send"
   - View response in "Response" section

---

## Common Status Codes

| Code | Meaning |
|---|---|
| 200 | Success |
| 400 | Bad Request (validation error) |
| 401 | Unauthorized (missing/invalid token) |
| 403 | Forbidden (validation error) |
| 404 | Not Found (resource doesn't exist) |
| 500 | Server Error |

---

## Tips

1. **Save Token**: After login, copy the `authtoken` value
2. **Use in Headers**: Add token to `authtoken` header for all protected endpoints
3. **Test Validation**: Send invalid data to understand error messages
4. **Check Response**: Always verify `success` field in responses
5. **Use Postman**: Easier than cURL for testing multiple endpoints

---

**Last Updated**: February 2026  
**Version**: 1.0.0
