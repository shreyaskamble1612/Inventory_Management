# Node.js to Spring Boot Migration Guide

Complete guide explaining the differences and how the Node.js/Express backend has been migrated to Java Spring Boot.

## Architecture Comparison

### Node.js/Express Structure
```
backend/
├── app.js                    # Main application file with middleware setup
├── db.js                     # MongoDB connection setup
├── package.json              # Dependencies and scripts
├── Controllers/              # Request handlers
├── Models/                   # MongoDB schemas (Mongoose)
├── Middleware/               # Custom middleware (JWT verification)
├── Routes/                   # Route definitions
├── utils/                    # Helper functions (email sending)
```

### Spring Boot Structure
```
backend-springboot/
├── pom.xml                   # Maven dependencies and build config
├── src/main/java/
│   └── com/inventorymanagement/
│       ├── InventoryManagementApplication.java
│       ├── controllers/      # REST endpoints (RequestMapping)
│       ├── services/         # Business logic (Service layer)
│       ├── repositories/     # Data access (Repository pattern)
│       ├── models/           # Database entities (JPA)
│       ├── security/         # JWT handling and filters
│       ├── config/           # Configuration classes
│       ├── dto/              # Request/Response objects
│       └── utils/            # Utility classes
├── src/main/resources/
│   └── application.properties # Configuration
└── .env                      # Environment variables
```

## Key Differences

### 1. Application Entry Point

**Node.js/Express (app.js):**
```javascript
const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors(...));
app.use(bodyParser.json());
app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
```

**Spring Boot (InventoryManagementApplication.java):**
```java
@SpringBootApplication
public class InventoryManagementApplication {
  public static void main(String[] args) {
    SpringApplication.run(InventoryManagementApplication.class, args);
  }
}
```
- Spring Boot handles server startup automatically
- Configuration is centralized in application.properties
- No explicit port binding needed

### 2. Database Connection

**Node.js (db.js):**
```javascript
const mongoose = require("mongoose");

const connectToMongo = async (MONGO_URI) => {
  await mongoose.connect(MONGO_URI);
};
```

**Spring Boot (application.properties):**
```properties
spring.data.mongodb.uri=${MONGO_URI}
```
- Automatic connection pooling
- Spring Data MongoDB handles connection lifecycle
- No manual connection management needed

### 3. Data Models

**Node.js (Mongoose):**
```javascript
const UserSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  date: { type: Date, default: Date.now }
});

const User = mongoose.model("user", UserSchema);
```

**Spring Boot (JPA Entity):**
```java
@Document(collection = "users")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class User {
  @Id
  private String id;
  private String name;
  private String email;
  private LocalDateTime date;
}
```
- `@Document` maps to MongoDB collection
- `@Data` (Lombok) generates getters, setters, toString, equals, hashCode
- `@Id` marks the primary key
- Type safety with Java classes

### 4. Data Access Layer

**Node.js (Direct model usage):**
```javascript
const user = await User.findOne({ email: email });
const items = await Item.find({ user: userId });
```

**Spring Boot (Repository pattern):**
```java
// UserRepository.java
public interface UserRepository extends MongoRepository<User, String> {
  Optional<User> findByEmail(String email);
}

// Usage in service
Optional<User> user = userRepository.findByEmail(email);
List<Item> items = itemRepository.findByUserId(userId);
```
- Repositories provide type-safe database operations
- Better testability and separation of concerns
- Predefined methods like save, findById, delete

### 5. Business Logic

**Node.js (Mixed in controllers):**
```javascript
const registerUser = async (req, res) => {
  const user = await User.findOne({ email });
  const hashedPassword = await bcrypt.hash(password, salt);
  const user = await User.create({...});
  const authtoken = jwt.sign(data, JWT_SECRET);
  res.json({ authtoken });
};
```

**Spring Boot (Service layer):**
```java
@Service
public class UserService {
  @Autowired
  private UserRepository userRepository;
  
  public User registerUser(String name, String email, String password) {
    User user = new User(name, email, passwordEncoder.encode(password));
    return userRepository.save(user);
  }
}

// In controller
@PostMapping("/registerUser")
public ResponseEntity<?> registerUser(@RequestBody UserRegisterRequest request) {
  User user = userService.registerUser(request.getName(), ...);
  return ResponseEntity.ok(new AuthResponse(token));
}
```
- Clean separation of concerns
- Services contain business logic
- Controllers handle HTTP requests
- Easy to test and maintain

### 6. Request Validation

**Node.js (express-validator middleware):**
```javascript
router.post("/registerUser", [
  body("name").isString().isLength({ min: 5, max: 30 }),
  body("email").isEmail(),
  body("password").isLength({ min: 8 })
], registerUser);
```

**Spring Boot (Annotations):**
```java
@PostMapping("/registerUser")
public ResponseEntity<?> registerUser(
  @Valid @RequestBody UserRegisterRequest request) {
  
  if (request.getName().length() < 5) {
    return ResponseEntity.status(HttpStatus.FORBIDDEN)
      .body(new ApiResponse("Name validation failed", false));
  }
}
```
- Spring Validation with `@Valid` annotation
- Custom validation in service layer
- Better error response handling

### 7. Authentication & JWT

**Node.js (Custom middleware):**
```javascript
const fetchuser = async (req, res, next) => {
  const token = req.header("authtoken");
  const data = jwt.verify(token, JWT_SECRET);
  req.user = data.user;
  next();
};
```

**Spring Boot (Filter + Provider):**
```java
// JwtTokenProvider.java
public String generateToken(String userId) {
  return Jwts.builder()
    .claim("user", new UserIdClaim(userId))
    .signWith(key, SignatureAlgorithm.HS512)
    .compact();
}

// JwtAuthenticationFilter.java
protected void doFilterInternal(HttpServletRequest request, ...) {
  String token = request.getHeader("authtoken");
  String userId = tokenProvider.getUserIdFromToken(token);
  request.setAttribute("userId", userId);
}
```
- `JwtTokenProvider` generates and validates tokens
- `JwtAuthenticationFilter` verifies tokens on every request
- Token extracted from `authtoken` header
- User ID stored in request attributes

### 8. Email Service

**Node.js (Nodemailer):**
```javascript
const sendEmail = async (to, subject, html) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: { user, pass }
  });
  await transporter.sendMail({ from, to, subject, html });
};
```

**Spring Boot (Spring Mail):**
```java
@Component
public class EmailSender {
  @Autowired
  private JavaMailSender mailSender;
  
  public void sendHtmlEmail(String to, String subject, String html) 
    throws MessagingException {
    MimeMessage message = mailSender.createMimeMessage();
    MimeMessageHelper helper = new MimeMessageHelper(message, true);
    helper.setTo(to);
    helper.setSubject(subject);
    helper.setText(html, true);
    mailSender.send(message);
  }
}
```
- `JavaMailSender` injected by Spring
- Configuration in application.properties
- Same Gmail SMTP credentials setup

### 9. API Responses

**Node.js (Direct response):**
```javascript
res.json({ authtoken: token, success: true });
res.status(404).send({ error: "User not found" });
```

**Spring Boot (ResponseEntity + DTO):**
```java
return ResponseEntity.ok(new AuthResponse(token, true, "Success"));
return ResponseEntity.status(HttpStatus.NOT_FOUND)
  .body(new ApiResponse("User not found", false));
```
- Consistent response structure with DTOs
- Type-safe response objects
- HTTP status codes explicitly set

### 10. CORS Configuration

**Node.js:**
```javascript
app.use(cors({
  origin: ["http://localhost:5173", "https://..."],
  credentials: true
}));
```

**Spring Boot (SecurityConfig.java):**
```java
@Configuration
public class SecurityConfig {
  @Bean
  public CorsConfigurationSource corsConfigurationSource() {
    CorsConfiguration config = new CorsConfiguration();
    config.setAllowedOrigins(Arrays.asList("http://localhost:5173", "..."));
    config.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE"));
    config.setAllowedHeaders(Arrays.asList("Content-Type", "Authtoken"));
    // ...
  }
}
```
- CORS configured in SecurityConfig
- Applied via CorsConfigurationSource
- Filter-based approach

## Dependency Mapping

| Functionality | Node.js | Spring Boot |
|---|---|---|
| Web Framework | express | spring-boot-starter-web |
| Database (MongoDB) | mongoose | spring-boot-starter-data-mongodb |
| Authentication | jsonwebtoken | jjwt (io.jsonwebtoken) |
| Password Hashing | bcryptjs | spring-security-crypto |
| Email Service | nodemailer | spring-boot-starter-mail |
| Validation | express-validator | spring-boot-starter-validation |
| CORS | cors | spring-security (SecurityConfig) |
| Environment Variables | dotenv | dotenv-java |
| HTTP Requests | express | spring-boot-starter-web |
| Body Parsing | body-parser | Built-in (Jackson) |

## API Endpoint Mapping

| Feature | Node.js Route | Spring Boot Controller |
|---|---|---|
| Register | POST /api/user/registerUser | UserController @PostMapping |
| Login | POST /api/user/login | UserController @PostMapping |
| Update User | PUT /api/user/updateUser | UserController @PutMapping |
| Delete User | DELETE /api/user/deleteUser | UserController @DeleteMapping |
| Forgot Password | POST /api/auth/forget-password | AuthController @PostMapping |
| Reset Password | POST /api/auth/reset-password/:token | AuthController @PostMapping |
| Add Item | POST /api/item/addItem | ItemController @PostMapping |
| Get Items | GET /api/item/getItemsByUser | ItemController @GetMapping |
| Get Items by Category | GET /api/item/getItemsByUserCategory/:category | ItemController @GetMapping |
| Get Single Item | GET /api/item/getItem/:id | ItemController @GetMapping |
| Update Item | PUT /api/item/updateItem/:id | ItemController @PutMapping |
| Delete Item | DELETE /api/item/deleteItem/:id | ItemController @DeleteMapping |
| Increase Quantity | POST /api/log/increaseQuantity/:id | LogController @PostMapping |
| Decrease Quantity | POST /api/log/decreaseQuantity/:id | LogController @PostMapping |
| Get Logs | GET /api/item/getLogs/:id | ItemController @GetMapping |

## Performance Comparison

### Startup Time
- **Node.js**: ~500ms
- **Spring Boot**: ~3-5s

### Memory Usage
- **Node.js**: ~50-100MB
- **Spring Boot**: ~300-500MB (JVM overhead)

### Request Handling
- **Node.js**: Single-threaded event loop
- **Spring Boot**: Thread pool (default 200 threads)

### Database Queries
- **Node.js**: Driver-level optimization
- **Spring Boot**: Built-in query optimization + caching support

## Advantages of Spring Boot Version

1. **Type Safety**: Compile-time checking prevents runtime errors
2. **Better IDE Support**: Superior autocomplete and refactoring
3. **Built-in Features**: Security, validation, templating included
4. **Scalability**: Better handling of concurrent requests
5. **Enterprise-Ready**: Production hardened, widely used in enterprises
6. **Testability**: Dependency injection makes testing easier
7. **Performance**: Thread pooling and connection pooling
8. **Monitoring**: Built-in actuators and health checks
9. **Documentation**: Extensive Spring Boot documentation
10. **Maturity**: Stable, well-tested framework

## Disadvantages of Spring Boot Version

1. **Startup Time**: Slower application startup
2. **Memory**: Higher memory footprint
3. **Learning Curve**: More complex for simple projects
4. **Build Time**: Maven compilation slower than npm install
5. **Dependencies**: Larger JAR file size

## Migration Checklist

When migrating from Node.js to Spring Boot:

- [x] Models → JPA Entities
- [x] Routes → Controllers
- [x] Middleware → Filters/Interceptors
- [x] Services → Service Layer
- [x] Authentication → JWT Filter
- [x] Database Access → Repositories
- [x] Email → Spring Mail
- [x] Validation → Spring Validation
- [x] Configuration → application.properties
- [x] Error Handling → GlobalExceptionHandler
- [x] CORS → SecurityConfig
- [x] Environment Variables → .env + application.properties

## Common Pitfalls

1. **Forgetting @Transactional** for database operations
2. **Not injecting dependencies** with @Autowired
3. **Wrong imports** (multiple Jackson libraries)
4. **Hardcoded configuration** instead of properties
5. **No error handling** in repositories
6. **Not validating input** in controllers
7. **Mixing business logic** in controllers
8. **Using Optional incorrectly**
9. **Not setting up MongoDB indexes**
10. **Forgetting JWT filter bean registration**

## Conclusion

The Spring Boot version provides:
- **Same functionality** as the Node.js version
- **Better maintainability** with clear separation of concerns
- **Enhanced type safety** with Java
- **Production-ready** features out of the box
- **Enterprise-grade** reliability and scalability

The API endpoints remain identical, ensuring smooth migration for the frontend.

---

**Migration Date**: February 2026  
**Status**: Complete and Production Ready
