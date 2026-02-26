FROM openjdk:17-jdk-slim

# Set working directory
WORKDIR /app

# Copy the built JAR file
COPY target/inventory-management-1.0.0.jar app.jar

# Expose port
EXPOSE 5000

# Set production profile and run the application
ENTRYPOINT ["java", "-Dspring.profiles.active=prod", "-jar", "app.jar"]
