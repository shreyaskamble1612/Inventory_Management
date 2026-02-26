package com.inventorymanagement.controllers;

import com.inventorymanagement.dto.*;
import com.inventorymanagement.models.User;
import com.inventorymanagement.security.JwtTokenProvider;
import com.inventorymanagement.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/user")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private JwtTokenProvider tokenProvider;

    @PostMapping("/registerUser")
    public ResponseEntity<?> registerUser(@Valid @RequestBody UserRegisterRequest request) {
        try {
            // Validate input
            if (request.getName() == null || request.getName().length() < 5 || request.getName().length() > 30) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .body(new ApiResponse("Name must be between 5 and 30 characters", false));
            }
            if (request.getPhoneNo() == null || request.getPhoneNo().isEmpty()) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .body(new ApiResponse("Mobile phone number is required", false));
            }
            if (request.getEmail() == null || request.getEmail().isEmpty()) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .body(new ApiResponse("Email is required", false));
            }
            if (request.getPassword() == null || request.getPassword().length() < 8) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .body(new ApiResponse("Password must be at least 8 characters", false));
            }

            User user = userService.registerUser(request.getName(), request.getEmail(), 
                                                 request.getPhoneNo(), request.getPassword());
            
            String authtoken = tokenProvider.generateToken(user.getId());
            AuthResponse response = new AuthResponse(authtoken, true, "User registered successfully");
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                .body(new ApiResponse(e.getMessage(), false));
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody UserLoginRequest request) {
        try {
            // Validate input
            if (request.getEmail() == null || request.getEmail().isEmpty()) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .body(new ApiResponse("Email is required", false));
            }
            if (request.getPassword() == null || request.getPassword().length() < 8) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .body(new ApiResponse("Password is required", false));
            }

            User user = userService.loginUser(request.getEmail(), request.getPassword());
            String authtoken = tokenProvider.generateToken(user.getId());
            AuthResponse response = new AuthResponse(authtoken, true, "Login successful");
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(new ApiResponse(e.getMessage(), false));
        }
    }

    @PutMapping("/updateUser")
    public ResponseEntity<?> updateUser(@RequestBody UserUpdateRequest request, 
                                       HttpServletRequest httpRequest) {
        try {
            String userId = (String) httpRequest.getAttribute("userId");
            
            if (userId == null) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new ApiResponse("Please try using valid token", false));
            }

            User updatedUser = userService.updateUser(userId, request.getName(), 
                                                     request.getEmail(), request.getPhoneNo());
            
            return ResponseEntity.ok(new ApiResponse("User updated successfully", true, updatedUser));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(new ApiResponse(e.getMessage(), false));
        }
    }

    @DeleteMapping("/deleteUser")
    public ResponseEntity<?> deleteUser(HttpServletRequest request) {
        try {
            String userId = (String) request.getAttribute("userId");
            
            if (userId == null) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new ApiResponse("Please try using valid token", false));
            }

            userService.deleteUser(userId);
            
            return ResponseEntity.ok(new ApiResponse("User deleted successfully", true));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(new ApiResponse(e.getMessage(), false));
        }
    }
}
