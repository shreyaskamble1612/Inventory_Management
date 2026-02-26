# Spring Boot Backend Setup Guide

Complete step-by-step guide to set up and run the Java Spring Boot backend for the Inventory Management System.

## Prerequisites Installation

### 1. Install Java 17

**Windows:**
- Download from [oracle.com](https://www.oracle.com/java/technologies/downloads/#java17)
- Run the installer and follow the wizard
- Verify installation:
  ```bash
  java -version
  ```

**macOS (using Homebrew):**
```bash
brew install openjdk@17
```

**Linux (Ubuntu/Debian):**
```bash
sudo apt-get update
sudo apt-get install openjdk-17-jdk-headless
```

### 2. Install Maven

**Windows:**
- Download from [maven.apache.org](https://maven.apache.org/download.cgi)
- Extract to a folder (e.g., `C:\apache-maven`)
- Add Maven to PATH environment variable
- Verify installation:
  ```bash
  mvn -version
  ```

**macOS (using Homebrew):**
```bash
brew install maven
```

**Linux:**
```bash
sudo apt-get install maven
```

### 3. Install MongoDB

**Option A: Local MongoDB**

**Windows:**
- Download from [mongodb.com](https://www.mongodb.com/try/download/community)
- Run the installer
- Select "Install MongoDB as a Service"
- MongoDB will start automatically

**Verify:**
```bash
mongo --version
```

**Option B: MongoDB Atlas (Cloud)**
- Sign up at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
- Create a free cluster
- Get your connection string

## Backend Setup

### Step 1: Navigate to Backend Directory
```bash
cd c:\SHREYAS\WEB-DEV\Inventory_Management\backend-springboot
```

### Step 2: Create .env File

Create a `.env` file in the `backend-springboot` directory:

```properties
# JWT Configuration
JWT_SECRET=your_super_secret_key_make_it_at_least_32_characters_long
JWT_EXPIRATION=3600000

# MongoDB Configuration
# For local MongoDB:
MONGO_URI=mongodb://localhost:27017/inventory_management
# For MongoDB Atlas:
# MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/inventory_management

# Email Configuration (Gmail)
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-specific-password

# Server Configuration
PORT=5000
CLIENT_URL=http://localhost:5173
```

### Step 3: Gmail App Password Setup (For Email Service)

1. Go to [Google Account Security](https://myaccount.google.com/security)
2. Enable 2-Step Verification if not already enabled
3. Generate an App Password:
   - Go to [App passwords](https://myaccount.google.com/apppasswords)
   - Select "Mail" and "Windows Computer" (or your OS)
   - Click "Generate"
   - Copy the 16-character password
4. Paste it in `EMAIL_PASS` in the .env file

### Step 4: Build the Project

From the `backend-springboot` directory:

```bash
mvn clean install
```

This will:
- Download all dependencies
- Compile the Java code
- Run tests (if any)
- Package the application

### Step 5: Run the Application

#### Option A: Using Maven
```bash
mvn spring-boot:run
```

#### Option B: Run the compiled JAR
```bash
java -jar target/inventory-management-1.0.0.jar
```

#### Option C: With specific environment (development)
```bash
mvn spring-boot:run -Dspring-boot.run.arguments="--spring.profiles.active=dev"
```

**Output should show:**
```
Started InventoryManagementApplication in X seconds
```

The server will be available at: `http://localhost:5000`

## Verify Backend is Running

### Test the API

**Using cURL:**
```bash
curl http://localhost:5000/
```

**Expected Response:**
```json
{
  "message": "Welcome to Inventory Management"
}
```

**Using Postman:**
1. Create a new GET request to `http://localhost:5000/`
2. Click Send
3. Should see the welcome message

## Testing the Endpoints

### 1. Register a User

**POST** `http://localhost:5000/api/user/registerUser`

**Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phoneNo": "1234567890",
  "password": "password123"
}
```

**Expected Response:**
```json
{
  "authtoken": "eyJhbGciOiJIUzUxMiJ9...",
  "success": true,
  "message": "User registered successfully"
}
```

### 2. Login

**POST** `http://localhost:5000/api/user/login`

**Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

### 3. Add an Item

**POST** `http://localhost:5000/api/item/addItem`

**Headers:**
- Key: `authtoken`
- Value: `<your_token_from_login>`

**Body:**
```json
{
  "name": "Laptop",
  "description": "Dell XPS 13",
  "quantity": 10,
  "price": 999.99,
  "category": "Electronics"
}
```

### 4. Get All Items

**GET** `http://localhost:5000/api/item/getItemsByUser`

**Headers:**
- Key: `authtoken`
- Value: `<your_token>`

## Troubleshooting

### Error: "Cannot find MongoDB"
**Solution:**
- Ensure MongoDB is running
- Check if `mongod` service is active
- For Windows: Check Services (Ctrl+Shift+Esc → Services)
- For macOS/Linux: Run `brew services list` or `systemctl status mongod`

### Error: "Port 5000 is already in use"
**Solution:**
- Change PORT in .env to another port (e.g., 8080)
- Or kill the process using port 5000:
  - Windows: `netstat -ano | findstr :5000` then `taskkill /PID <pid> /F`
  - macOS/Linux: `lsof -i :5000` then `kill -9 <pid>`

### Error: "Email service failed"
**Solution:**
- Verify EMAIL_USER and EMAIL_PASS are correct
- Check if Gmail 2FA is enabled
- Regenerate App Password
- Enable "Less secure app access" (not recommended)

### Error: "Invalid JWT token"
**Solution:**
- Ensure JWT_SECRET matches between registration and use
- Check token hasn't expired
- Verify authtoken header is being sent correctly

### Build fails with "not found" dependencies
**Solution:**
- Clear Maven cache: `mvn clean`
- Update dependencies: `mvn clean install -U`
- Check internet connection
- Check Maven settings.xml if using corporate proxy

## Development Workflow

### 1. Edit Code
- Modify Java files in `src/main/java`
- Spring Boot DevTools will auto-restart the application

### 2. View Logs
- Check console output
- Logs are stored in `application.properties` configuration

### 3. Access Database
Using MongoDB Compass:
- Download from [mongodb.com/products/compass](https://www.mongodb.com/products/compass)
- Connect to `mongodb://localhost:27017`
- Visual interface to view collections and data

## IDE Setup

### Using IntelliJ IDEA
1. Open the project folder
2. Import as Maven project
3. Right-click `InventoryManagementApplication.java`
4. Select "Run"
5. Or click the green play button next to the main method

### Using VS Code
1. Install "Extension Pack for Java"
2. Install "Spring Boot Extension Pack"
3. Open the folder
4. Run → "Run and Debug" → "Maven start"

### Using Eclipse
1. File → Import → Maven → Existing Maven Projects
2. Select the `backend-springboot` folder
3. Right-click project → Run As → Spring Boot App

## Production Deployment

### Using Docker
```dockerfile
FROM openjdk:17-jdk-slim
WORKDIR /app
COPY target/inventory-management-1.0.0.jar app.jar
EXPOSE 5000
CMD ["java", "-jar", "app.jar"]
```

Build and run:
```bash
docker build -t inventory-management .
docker run -p 5000:5000 -e MONGO_URI=... -e JWT_SECRET=... inventory-management
```

### Using Heroku
```bash
heroku login
heroku create your-app-name
heroku config:set JWT_SECRET=your_secret MONGO_URI=your_uri
git push heroku main
```

## Performance Tuning

### JVM Heap Size
For production, increase heap size:
```bash
java -Xms512m -Xmx1024m -jar target/inventory-management-1.0.0.jar
```

### Database Indexing
MongoDB automatically creates indexes on frequently accessed fields. To manually create:
```javascript
db.users.createIndex({ "email": 1 }, { "unique": true })
db.items.createIndex({ "userId": 1 })
db.logs.createIndex({ "itemId": 1, "userId": 1 })
```

## Monitoring

### Health Check Endpoint
```bash
curl http://localhost:5000/
```

### Enable Actuator (Optional)
Add to pom.xml:
```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-actuator</artifactId>
</dependency>
```

Access: `http://localhost:5000/actuator/health`

## Security Checklist

Before deploying to production:

- [ ] Change JWT_SECRET to a strong random value
- [ ] Use MongoDB Atlas with encryption
- [ ] Enable HTTPS
- [ ] Set up firewall rules
- [ ] Use environment variables, not hardcoded values
- [ ] Enable rate limiting
- [ ] Set up logging and monitoring
- [ ] Regular backups of MongoDB
- [ ] Use CORS only for trusted domains
- [ ] Update dependencies regularly

## Next Steps

1. Connect the frontend to this backend
2. Update API_URL in frontend `.env` to `http://localhost:5000`
3. Test the full application flow
4. Deploy to production

## Common Commands

```bash
# Clean and rebuild
mvn clean install

# Run in development mode
mvn spring-boot:run -Dspring-boot.run.arguments="--spring.profiles.active=dev"

# Run in production mode
mvn spring-boot:run -Dspring-boot.run.arguments="--spring.profiles.active=prod"

# Run tests
mvn test

# Build only (skip tests)
mvn clean package -DskipTests

# Check for dependency updates
mvn versions:display-dependency-updates

# Format code
mvn spotless:apply
```

## Support

For issues or questions:
1. Check application logs: `tail -f target/*.log`
2. Verify all prerequisites are installed
3. Check .env file is configured correctly
4. Review API endpoint documentation in README.md

---

**Last Updated**: February 2026  
**Version**: 1.0.0
