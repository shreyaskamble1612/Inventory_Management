package com.inventorymanagement.controllers;

import com.inventorymanagement.dto.ApiResponse;
import com.inventorymanagement.dto.QuantityRequest;
import com.inventorymanagement.models.Log;
import com.inventorymanagement.services.LogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/log")
public class LogController {

    @Autowired
    private LogService logService;

    @PostMapping("/increaseQuantity/{id}")
    public ResponseEntity<?> increaseQuantity(@PathVariable String id,
                                             @Valid @RequestBody QuantityRequest request,
                                             HttpServletRequest httpRequest) {
        try {
            String userId = (String) httpRequest.getAttribute("userId");
            
            if (userId == null) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new ApiResponse("Please try using valid token", false));
            }

            // Validate input
            if (request.getQuantity() == null) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .body(new ApiResponse("Please enter a valid number", false));
            }
            if (request.getDescription() == null || request.getDescription().isEmpty()) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .body(new ApiResponse("Description must be a string", false));
            }

            Log log = logService.increaseQuantity(userId, id, request.getQuantity(), 
                                                  request.getDescription());
            
            Map<String, Object> response = new HashMap<>();
            response.put("log", log);
            response.put("success", true);
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(new ApiResponse(e.getMessage(), false));
        }
    }

    @PostMapping("/decreaseQuantity/{id}")
    public ResponseEntity<?> decreaseQuantity(@PathVariable String id,
                                             @Valid @RequestBody QuantityRequest request,
                                             HttpServletRequest httpRequest) {
        try {
            String userId = (String) httpRequest.getAttribute("userId");
            
            if (userId == null) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new ApiResponse("Please try using valid token", false));
            }

            // Validate input
            if (request.getQuantity() == null) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .body(new ApiResponse("Please enter a valid number", false));
            }
            if (request.getDescription() == null || request.getDescription().isEmpty()) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .body(new ApiResponse("Description must be a string", false));
            }

            Log log = logService.decreaseQuantity(userId, id, request.getQuantity(), 
                                                  request.getDescription());
            
            Map<String, Object> response = new HashMap<>();
            response.put("log", log);
            response.put("success", true);
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(new ApiResponse(e.getMessage(), false));
        }
    }
}
