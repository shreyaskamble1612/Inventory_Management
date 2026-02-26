@echo off
REM Spring Boot Backend Quick Start Script for Windows

echo.
echo ========================================
echo Inventory Management - Spring Boot
echo Quick Start Script
echo ========================================
echo.

cd /d "%~dp0"

REM Check if Java is installed
java -version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Java 17 is not installed or not in PATH
    echo Please install Java 17 from https://www.oracle.com/java/technologies/downloads/#java17
    exit /b 1
)

echo ✓ Java found
java -version

REM Check if Maven is installed
mvn -version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Maven is not installed or not in PATH
    echo Please install Maven from https://maven.apache.org/download.cgi
    exit /b 1
)

echo ✓ Maven found
mvn -version

REM Check if .env file exists
if not exist .env (
    echo WARNING: .env file not found!
    echo Please create .env file with required configuration
    echo Example:
    echo   JWT_SECRET=your_secret_key
    echo   MONGO_URI=mongodb://localhost:27017/inventory_management
    echo   EMAIL_USER=your-email@gmail.com
    echo   EMAIL_PASS=your-app-password
    echo   PORT=5000
    echo.
)

echo.
echo Cleaning previous builds...
call mvn clean

echo.
echo Building the project...
call mvn install

if errorlevel 1 (
    echo ERROR: Build failed!
    exit /b 1
)

echo.
echo ========================================
echo Build completed successfully!
echo ========================================
echo.
echo To run the application, use:
echo   mvn spring-boot:run
echo.
echo The API will be available at:
echo   http://localhost:5000
echo.
pause
