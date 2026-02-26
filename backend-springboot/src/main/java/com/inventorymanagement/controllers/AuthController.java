package com.inventorymanagement.controllers;

import com.inventorymanagement.dto.ForgotPasswordRequest;
import com.inventorymanagement.dto.ResetPasswordRequest;
import com.inventorymanagement.dto.ApiResponse;
import com.inventorymanagement.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private UserService userService;

    @PostMapping("/forgot-password")
    public ResponseEntity<?> forgotPassword(@Valid @RequestBody ForgotPasswordRequest request) {
        try {
            userService.initiatePasswordReset(request.getEmail());
            return ResponseEntity.ok(new ApiResponse("Password reset link sent to email", true));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(new ApiResponse(e.getMessage(), false));
        }
    }

    @PostMapping("/reset-password/{token}")
    public ResponseEntity<?> resetPassword(@PathVariable String token, 
                                          @Valid @RequestBody ResetPasswordRequest request) {
        try {
            userService.resetPassword(token, request.getNewPassword());
            return ResponseEntity.ok(new ApiResponse("Password reset successfully", true));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(new ApiResponse(e.getMessage(), false));
        }
    }
}
