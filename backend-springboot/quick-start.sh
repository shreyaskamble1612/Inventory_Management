#!/bin/bash
# Spring Boot Backend Quick Start Script for macOS/Linux

echo ""
echo "========================================"
echo "Inventory Management - Spring Boot"
echo "Quick Start Script"
echo "========================================"
echo ""

cd "$(dirname "$0")"

# Check if Java is installed
if ! command -v java &> /dev/null; then
    echo "ERROR: Java 17 is not installed or not in PATH"
    echo "Please install Java 17 from https://www.oracle.com/java/technologies/downloads/#java17"
    exit 1
fi

echo "✓ Java found"
java -version
echo ""

# Check if Maven is installed
if ! command -v mvn &> /dev/null; then
    echo "ERROR: Maven is not installed or not in PATH"
    echo "Please install Maven from https://maven.apache.org/download.cgi"
    echo ""
    echo "For macOS with Homebrew:"
    echo "  brew install maven"
    echo ""
    echo "For Linux (Ubuntu/Debian):"
    echo "  sudo apt-get install maven"
    exit 1
fi

echo "✓ Maven found"
mvn -version
echo ""

# Check if .env file exists
if [ ! -f .env ]; then
    echo "WARNING: .env file not found!"
    echo "Please create .env file with required configuration"
    echo "Example:"
    echo "  JWT_SECRET=your_secret_key"
    echo "  MONGO_URI=mongodb://localhost:27017/inventory_management"
    echo "  EMAIL_USER=your-email@gmail.com"
    echo "  EMAIL_PASS=your-app-password"
    echo "  PORT=5000"
    echo ""
fi

echo ""
echo "Cleaning previous builds..."
mvn clean

echo ""
echo "Building the project..."
mvn install

if [ $? -ne 0 ]; then
    echo "ERROR: Build failed!"
    exit 1
fi

echo ""
echo "========================================"
echo "Build completed successfully!"
echo "========================================"
echo ""
echo "To run the application, use:"
echo "  mvn spring-boot:run"
echo ""
echo "The API will be available at:"
echo "  http://localhost:5000"
echo ""
