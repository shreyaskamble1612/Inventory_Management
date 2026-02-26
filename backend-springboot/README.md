# Inventory Management API - Spring Boot Version

Complete Java Spring Boot backend for the Inventory Management System. This is a direct port of the Node.js/Express backend maintaining the same API structure and functionality.

## Prerequisites

- Java 17 or higher
- Maven 3.8+
- MongoDB 4.4+
- Git

## Installation

1. **Clone/Navigate to the project:**
   ```bash
   cd backend-springboot
   ```

2. **Configure Environment Variables:**
   
   Create a `.env` file in the root directory with the following:
   ```properties
   JWT_SECRET=your_jwt_secret_key_here_make_it_very_long_and_secure
   MONGO_URI=mongodb://localhost:27017/inventory_management
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-app-specific-password
   PORT=5000
   CLIENT_URL=http://localhost:5173
   ```

   Or set environment variables directly in your system.

3. **Build the project:**
   ```bash
   mvn clean install
   ```

4. **Run the application:**
   ```bash
   mvn spring-boot:run
   ```

   The server will start on `http://localhost:5000`

## Project Structure

```
backend-springboot/
├── pom.xml                          # Maven configuration
├── .env                             # Environment variables (create this)
└── src/
    └── main/
        ├── java/
        │   └── com/inventorymanagement/
        │       ├── InventoryManagementApplication.java
        │       ├── models/              # JPA Entities
        │       │   ├── User.java
        │       │   ├── Item.java
        │       │   └── Log.java
        │       ├── repositories/        # Spring Data JPA Repositories
        │       │   ├── UserRepository.java
        │       │   ├── ItemRepository.java
        │       │   └── LogRepository.java
        │       ├── services/            # Business Logic
        │       │   ├── UserService.java
        │       │   ├── ItemService.java
        │       │   └── LogService.java
        │       ├── controllers/         # REST Controllers
        │       │   ├── UserController.java
        │       │   ├── AuthController.java
        │       │   ├── ItemController.java
        │       │   ├── LogController.java
        │       │   └── HomeController.java
        │       ├── security/            # JWT Authentication
        │       │   ├── JwtTokenProvider.java
        │       │   └── JwtAuthenticationFilter.java
        │       ├── dto/                 # Data Transfer Objects
        │       │   ├── UserRegisterRequest.java
        │       │   ├── UserLoginRequest.java
        │       │   ├── AuthResponse.java
        │       │   ├── ApiResponse.java
        │       │   ├── ItemRequest.java
        │       │   ├── QuantityRequest.java
        │       │   ├── ForgotPasswordRequest.java
        │       │   ├── ResetPasswordRequest.java
        │       │   └── UserUpdateRequest.java
        │       ├── config/              # Configuration Classes
        │       │   ├── SecurityConfig.java
        │       │   └── WebConfig.java
        │       └── utils/               # Utility Classes
        │           └── EmailSender.java
        └── resources/
            └── application.properties   # Spring Boot Configuration
```

## API Endpoints

### Authentication & User Management

#### Register User
- **POST** `/api/user/registerUser`
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "phoneNo": "1234567890",
    "password": "password123"
  }
  ```
  Response: `{ "authtoken": "...", "success": true }`

#### Login
- **POST** `/api/user/login`
  ```json
  {
    "email": "john@example.com",
    "password": "password123"
  }
  ```
  Response: `{ "authtoken": "...", "success": true }`

#### Update User
- **PUT** `/api/user/updateUser`
  - Header: `authtoken: <your_token>`
  ```json
  {
    "name": "Jane Doe",
    "email": "jane@example.com",
    "phoneNo": "9876543210"
  }
  ```

#### Delete User
- **DELETE** `/api/user/deleteUser`
  - Header: `authtoken: <your_token>`

#### Forgot Password
- **POST** `/api/auth/forgot-password`
  ```json
  {
    "email": "john@example.com"
  }
  ```

#### Reset Password
- **POST** `/api/auth/reset-password/{token}`
  ```json
  {
    "newPassword": "newpassword123"
  }
  ```

### Item Management

#### Add Item
- **POST** `/api/item/addItem`
  - Header: `authtoken: <your_token>`
  ```json
  {
    "name": "Laptop",
    "description": "Dell XPS 13",
    "quantity": 10,
    "price": 999.99,
    "category": "Electronics"
  }
  ```

#### Get All Items
- **GET** `/api/item/getItemsByUser`
  - Header: `authtoken: <your_token>`

#### Get Items by Category
- **GET** `/api/item/getItemsByUserCategory/{category}`
  - Header: `authtoken: <your_token>`

#### Get Single Item
- **GET** `/api/item/getItem/{itemId}`
  - Header: `authtoken: <your_token>`

#### Update Item
- **PUT** `/api/item/updateItem/{itemId}`
  - Header: `authtoken: <your_token>`
  ```json
  {
    "name": "Updated Name",
    "quantity": 15,
    "price": 1099.99
  }
  ```

#### Delete Item
- **DELETE** `/api/item/deleteItem/{itemId}`
  - Header: `authtoken: <your_token>`

### Quantity Management (Logs)

#### Increase Quantity
- **POST** `/api/log/increaseQuantity/{itemId}`
  - Header: `authtoken: <your_token>`
  ```json
  {
    "quantity": 5,
    "description": "Restocked from supplier"
  }
  ```

#### Decrease Quantity (Sell)
- **POST** `/api/log/decreaseQuantity/{itemId}`
  - Header: `authtoken: <your_token>`
  ```json
  {
    "quantity": 2,
    "description": "Sold to customer ABC"
  }
  ```

#### Get Item Logs
- **GET** `/api/item/getLogs/{itemId}`
  - Header: `authtoken: <your_token>`

## Key Features

✅ **User Authentication** - JWT-based authentication with secure password hashing  
✅ **User Management** - Register, login, update, and delete users  
✅ **Password Reset** - Email-based password reset functionality  
✅ **Item Management** - Create, read, update, delete items  
✅ **Inventory Tracking** - Track quantity increases and decreases with logs  
✅ **Sales Tracking** - Track sold items and sold prices  
✅ **Category Management** - Organize items by categories  
✅ **CORS Support** - Configured for frontend integration  
✅ **MongoDB Integration** - NoSQL database for flexible data storage  
✅ **Email Service** - Gmail SMTP for password reset emails  

## Technology Stack

- **Framework**: Spring Boot 3.2
- **Language**: Java 17
- **Database**: MongoDB
- **Security**: Spring Security + JWT
- **Build Tool**: Maven
- **Email**: Spring Mail (Gmail SMTP)
- **Validation**: Spring Validation
- **ORM**: Spring Data MongoDB

## Configuration Notes

### MongoDB Connection
- Default: `mongodb://localhost:27017/inventory_management`
- For MongoDB Atlas: Use your connection string in MONGO_URI

### Email Service
- Uses Gmail SMTP
- Requires an [App-Specific Password](https://myaccount.google.com/apppasswords) for Gmail
- Set EMAIL_USER and EMAIL_PASS in .env

### JWT Secret
- Generate a strong random secret key
- Minimum 32 characters recommended
- Keep it secure and never commit to version control

## CORS Configuration

The API is configured to accept requests from:
- `http://localhost:5173` (Local development frontend)
- `https://inventory-management-three-virid.vercel.app` (Production frontend)

To add more origins, modify `SecurityConfig.java`

## Error Handling

The API returns consistent error responses:
```json
{
  "message": "Error description",
  "success": false
}
```

## Development Tips

1. **Enable Debug Logging**: Set `logging.level.com.inventorymanagement=DEBUG` in application.properties
2. **Hot Reload**: Use Spring Boot DevTools for faster development
3. **MongoDB GUI**: Use MongoDB Compass for visual database management
4. **API Testing**: Use Postman or REST Client VSCode extension

## Running Tests

```bash
mvn test
```

## Building for Production

```bash
mvn clean package
java -jar target/inventory-management-1.0.0.jar \
  --spring.data.mongodb.uri=$MONGO_URI \
  --jwt.secret=$JWT_SECRET \
  --spring.mail.username=$EMAIL_USER \
  --spring.mail.password=$EMAIL_PASS \
  --app.client.url=$CLIENT_URL
```

## Comparison with Node.js/Express Version

| Feature | Node.js | Spring Boot |
|---------|---------|-------------|
| Framework | Express.js | Spring Boot |
| Database | MongoDB | MongoDB |
| Authentication | JWT | JWT |
| Email | Nodemailer | Spring Mail |
| Validation | express-validator | Spring Validation |
| Password Hashing | bcryptjs | BCryptPasswordEncoder |
| Server Startup | ~500ms | ~3-5s |

## Troubleshooting

### Connection refused
- Ensure MongoDB is running: `mongod --dbpath <your-db-path>`

### Email sending fails
- Verify EMAIL_USER and EMAIL_PASS are correct
- Enable "Less secure app access" or use App Password for Gmail
- Check SMTP settings in application.properties

### JWT token invalid
- Ensure JWT_SECRET is set correctly
- Check token expiration time
- Verify authtoken header is being sent

## Support & Contribution

For issues or improvements, please refer to the main project repository.

---

**Version**: 1.0.0  
**Last Updated**: February 2026  
**Created**: From existing Node.js/Express backend
