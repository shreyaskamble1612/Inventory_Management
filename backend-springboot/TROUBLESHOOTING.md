# Troubleshooting Guide

Complete guide for resolving common issues and errors.

## Table of Contents
1. [Installation Issues](#installation-issues)
2. [Database Connection](#database-connection)
3. [Application Startup](#application-startup)
4. [API Issues](#api-issues)
5. [Authentication Issues](#authentication-issues)
6. [Email Service Issues](#email-service-issues)
7. [Database Issues](#database-issues)
8. [Performance Issues](#performance-issues)
9. [Docker Issues](#docker-issues)

---

## Installation Issues

### Error: Java not found

**Symptom**: `'java' is not recognized as an internal or external command`

**Solution**:
1. Install Java 17 from [oracle.com](https://www.oracle.com/java/technologies/downloads/#java17)
2. Add Java to PATH:
   - Windows: `setx PATH "%PATH%;C:\Program Files\Java\jdk-17\bin"`
   - macOS/Linux: Already in PATH after installation
3. Verify: `java -version`

---

### Error: Maven not found

**Symptom**: `'mvn' is not recognized as an internal or external command`

**Solution**:
1. Install Maven from [maven.apache.org](https://maven.apache.org/download.cgi)
2. Extract to a folder (e.g., `C:\apache-maven`)
3. Add to PATH:
   - Windows: `setx PATH "%PATH%;C:\apache-maven\bin"`
   - macOS: `brew install maven`
   - Linux: `sudo apt-get install maven`
4. Verify: `mvn -version`

---

### Error: Build fails with dependency issues

**Symptom**: `[ERROR] Failure to find ...`

**Solutions**:
1. Clear Maven cache:
   ```bash
   mvn clean
   ```

2. Update dependencies:
   ```bash
   mvn clean install -U
   ```

3. Check internet connection

4. If behind corporate proxy, configure Maven settings.xml

5. Delete `.m2` folder and rebuild:
   ```bash
   rm -rf ~/.m2/repository
   mvn clean install
   ```

---

### Error: File not found during build

**Symptom**: `.env file not found`

**Solution**:
1. Create `.env` file in `backend-springboot` directory
2. Add required variables:
   ```
   JWT_SECRET=your_key
   MONGO_URI=mongodb://localhost:27017/inventory_management
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-app-password
   PORT=5000
   ```

---

## Database Connection

### Error: MongoDB connection refused

**Symptom**: `Connection refused: connect`

**Solutions**:

1. **Check if MongoDB is running**:
   - Windows: Services → MongoDB Server (should be running)
   - macOS: `brew services list | grep mongodb`
   - Linux: `systemctl status mongod`

2. **Start MongoDB**:
   ```bash
   # Windows
   net start MongoDB
   
   # macOS
   brew services start mongodb-community
   
   # Linux
   sudo systemctl start mongod
   ```

3. **Check connection string**:
   ```bash
   # Test connection
   mongo mongodb://localhost:27017
   ```

4. **Check port**:
   ```bash
   # Windows
   netstat -ano | findstr :27017
   
   # macOS/Linux
   lsof -i :27017
   ```

5. **If port is in use**, either:
   - Kill the process
   - Change MONGO_URI to different port

---

### Error: Authentication failed for MongoDB

**Symptom**: `Unauthorized: authentication failed`

**Solutions**:
1. For local MongoDB without auth, use: `mongodb://localhost:27017/inventory_management`
2. For MongoDB Atlas:
   - Get connection string from Atlas console
   - Format: `mongodb+srv://username:password@cluster.mongodb.net/dbname`
   - Replace username, password, and cluster name
3. Verify username and password in connection string

---

### Error: Database already exists

**Symptom**: Collection or database exists

**Solution**:
- Drop the database to start fresh:
  ```javascript
  use inventory_management
  db.dropDatabase()
  ```

---

## Application Startup

### Error: Port already in use

**Symptom**: `Address already in use: bind`

**Solutions**:

1. **Change port in .env**:
   ```
   PORT=8080
   ```

2. **Kill process using port**:
   ```bash
   # Windows
   netstat -ano | findstr :5000
   taskkill /PID <pid> /F
   
   # macOS/Linux
   lsof -i :5000
   kill -9 <pid>
   ```

3. **Wait a minute** for the port to be released

---

### Error: Spring Boot fails to start

**Symptom**: Application exits immediately after start

**Solutions**:
1. Check console for error messages
2. Verify all environment variables are set
3. Check if MongoDB is running
4. Verify .env file syntax (no spaces around =)
5. Run with verbose output:
   ```bash
   mvn spring-boot:run -X
   ```

---

### Error: Class not found

**Symptom**: `java.lang.ClassNotFoundException`

**Solutions**:
1. Rebuild project:
   ```bash
   mvn clean install
   ```

2. Clear IDE cache if using IDE

3. Check if all files are in correct directories

4. Verify Java version:
   ```bash
   java -version
   ```

---

## API Issues

### Error: 404 Not Found

**Symptom**: API endpoint returns 404

**Solutions**:
1. Verify endpoint URL spelling
2. Check if server is running on correct port
3. Verify request method (GET, POST, etc.)
4. Check base URL: `http://localhost:5000`

---

### Error: 500 Internal Server Error

**Symptom**: API returns 500 error

**Solutions**:
1. Check server logs for detailed error
2. Verify MongoDB connection
3. Check .env configuration
4. Restart application

---

### Error: CORS error

**Symptom**: `Access to XMLHttpRequest has been blocked by CORS policy`

**Solutions**:
1. Verify origin is whitelisted in SecurityConfig.java:
   ```java
   configuration.setAllowedOrigins(Arrays.asList(
       "http://localhost:5173",
       "https://your-domain.com"
   ));
   ```

2. Rebuild application:
   ```bash
   mvn clean install
   ```

3. Verify frontend is sending correct origin

4. Check if headers are correct:
   - Content-Type
   - authtoken

---

## Authentication Issues

### Error: Invalid token

**Symptom**: `Please try using valid token`

**Solutions**:
1. Verify token is being sent in `authtoken` header
2. Check token hasn't expired (1 hour default)
3. Verify JWT_SECRET in .env matches server
4. Try logging in again to get fresh token

---

### Error: Token missing

**Symptom**: `Please try using valid token` on protected route

**Solutions**:
1. Add `authtoken` header to request
2. Verify token is copied correctly
3. Check for typos in header name (case-sensitive)

---

### Error: Login fails

**Symptom**: `User not found` or `Invalid Password`

**Solutions**:
1. Verify email is correct
2. Verify password is correct
3. Check if user was registered successfully
4. Try registering a new user
5. Check MongoDB for user data:
   ```javascript
   use inventory_management
   db.users.findOne({email: "your-email"})
   ```

---

### Error: Unauthorized 401

**Symptom**: Endpoint returns 401 Unauthorized

**Solutions**:
1. Ensure request includes valid `authtoken` header
2. Login to get fresh token
3. Verify token isn't expired
4. Check JWT_SECRET configuration

---

## Email Service Issues

### Error: Email not sending

**Symptom**: Password reset fails silently

**Solutions**:
1. Verify email configuration in .env:
   ```
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-app-specific-password
   ```

2. For Gmail, use App Password:
   - Go to [myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords)
   - Generate password for "Mail" and "Windows Computer"
   - Copy the 16-character password
   - Use it as EMAIL_PASS

3. Check spam folder for email

4. Enable "Less secure apps" (not recommended):
   - [myaccount.google.com/lesssecureapps](https://myaccount.google.com/lesssecureapps)

5. Verify SMTP settings in application.properties:
   ```properties
   spring.mail.host=smtp.gmail.com
   spring.mail.port=587
   spring.mail.properties.mail.smtp.starttls.enable=true
   ```

---

### Error: 550 User not recognized

**Symptom**: Email sending returns 550 error

**Solutions**:
1. Verify EMAIL_USER is correct Gmail address
2. Check Gmail is not blocking the app
3. Regenerate app password
4. Try from different network/VPN

---

### Error: Connection timeout

**Symptom**: Email sending hangs then fails

**Solutions**:
1. Check internet connection
2. Verify firewall allows SMTP (port 587)
3. Check if Gmail is blocking connection
4. Try from different network

---

## Database Issues

### Error: Duplicate key error

**Symptom**: `E11000 duplicate key error`

**Solutions**:
1. Email is marked as unique - verify email isn't already registered
2. Drop database and start fresh:
   ```javascript
   use inventory_management
   db.dropDatabase()
   ```

---

### Error: Document too large

**Symptom**: `BSON document too large`

**Solutions**:
1. MongoDB has 16MB document limit
2. Reduce amount of data per document
3. Archive old logs to separate collection

---

### Error: Index creation failed

**Symptom**: `index build failed`

**Solutions**:
1. Drop the index:
   ```javascript
   db.users.dropIndex("email_1")
   ```

2. Let Spring Data create indexes automatically

3. Restart application

---

## Performance Issues

### Slow API responses

**Symptom**: API responses take >1 second

**Solutions**:
1. **Check database indexes**:
   ```bash
   # In MongoDB
   db.items.getIndexes()
   ```

2. **Verify MongoDB is running locally** (not on network)

3. **Check network latency**:
   ```bash
   ping localhost
   ```

4. **Increase JVM heap size**:
   ```bash
   java -Xms512m -Xmx1024m -jar target/inventory-management-1.0.0.jar
   ```

5. **Check for blocking operations** in logs

---

### High memory usage

**Symptom**: Application uses 1GB+ RAM

**Solutions**:
1. Limit JVM heap:
   ```bash
   java -Xmx512m -jar target/inventory-management-1.0.0.jar
   ```

2. Check for memory leaks in logs

3. Reduce connection pool size in application.properties

4. Close unused database connections

---

### Slow compilation

**Symptom**: `mvn clean install` takes > 5 minutes

**Solutions**:
1. Check internet speed for dependency download
2. Run with parallel builds:
   ```bash
   mvn clean install -T 1C
   ```

3. Use `-DskipTests` to skip tests:
   ```bash
   mvn clean install -DskipTests
   ```

---

## Docker Issues

### Error: Docker image build fails

**Symptom**: `docker build` fails

**Solutions**:
1. Verify Dockerfile syntax
2. Build project first:
   ```bash
   mvn clean install
   ```

3. Verify JAR exists:
   ```bash
   ls target/inventory-management-1.0.0.jar
   ```

4. Build with verbose output:
   ```bash
   docker build -t inventory-management . --debug
   ```

---

### Error: Container fails to start

**Symptom**: `docker run` exits immediately

**Solutions**:
1. Check container logs:
   ```bash
   docker logs <container_id>
   ```

2. Verify environment variables:
   ```bash
   docker run -e MONGO_URI=... -e JWT_SECRET=... ...
   ```

3. Verify MongoDB container is running if using docker-compose:
   ```bash
   docker-compose up -d
   ```

---

### Error: Port binding in Docker

**Symptom**: `bind: address already in use`

**Solutions**:
1. Stop existing container:
   ```bash
   docker stop <container_id>
   ```

2. Use different port:
   ```bash
   docker run -p 8080:5000 inventory-management
   ```

---

## Getting Help

If you encounter issues not covered here:

1. **Check logs**: Look for error messages in console output
2. **Search documentation**: Read README.md, SETUP_GUIDE.md
3. **Verify configuration**: Double-check .env file
4. **Try clean build**: `mvn clean install`
5. **Restart services**: MongoDB, application
6. **Clear cache**: `.m2` folder, IDE cache
7. **Check network**: Ensure internet connectivity

---

## Debug Mode

### Enable verbose logging

Add to application.properties:
```properties
logging.level.com.inventorymanagement=DEBUG
logging.level.org.springframework.web=DEBUG
logging.level.org.springframework.security=DEBUG
```

### Run with debug output

```bash
mvn spring-boot:run -X
```

### Check database directly

```javascript
// Connect to MongoDB
mongo mongodb://localhost:27017/inventory_management

// List collections
show collections

// View users
db.users.find()

// View items
db.items.find()

// View logs
db.logs.find()
```

---

## Contact Support

For unresolved issues:
1. Share error logs
2. Provide version information
3. Describe steps to reproduce
4. Check if issue is in documentation

---

**Last Updated**: February 2026  
**Version**: 1.0.0
