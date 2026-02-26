package com.inventorymanagement.controllers;

import com.inventorymanagement.dto.ApiResponse;
import com.inventorymanagement.dto.ItemRequest;
import com.inventorymanagement.models.Item;
import com.inventorymanagement.services.ItemService;
import com.inventorymanagement.services.LogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/item")
public class ItemController {

    @Autowired
    private ItemService itemService;

    @Autowired
    private LogService logService;

    @PostMapping("/addItem")
    public ResponseEntity<?> addItem(@Valid @RequestBody ItemRequest request, 
                                    HttpServletRequest httpRequest) {
        try {
            String userId = (String) httpRequest.getAttribute("userId");
            
            if (userId == null) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new ApiResponse("Please try using valid token", false));
            }

            // Validate input
            if (request.getName() == null || request.getName().isEmpty()) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .body(new ApiResponse("Name is required", false));
            }
            if (request.getPrice() == null) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .body(new ApiResponse("Price is required", false));
            }
            if (request.getCategory() == null || request.getCategory().isEmpty()) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .body(new ApiResponse("Category is required", false));
            }
            if (request.getQuantity() == null) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .body(new ApiResponse("Quantity is required", false));
            }

            Item item = itemService.addItem(userId, request.getName(), request.getDescription(),
                    request.getQuantity(), request.getPrice(), request.getSold(), request.getCategory());
            
            return ResponseEntity.ok(new ApiResponse("Item successfully added", true, item));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(new ApiResponse(e.getMessage(), false));
        }
    }

    @GetMapping("/getItemsByUser")
    public ResponseEntity<?> getItemsByUser(HttpServletRequest request) {
        try {
            String userId = (String) request.getAttribute("userId");
            
            if (userId == null) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new ApiResponse("Please try using valid token", false));
            }

            List<Item> items = itemService.getItemsByUser(userId);
            
            Map<String, Object> response = new HashMap<>();
            response.put("items", items);
            response.put("success", true);
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(new ApiResponse(e.getMessage(), false));
        }
    }

    @GetMapping("/getItemsByUserCategory/{category}")
    public ResponseEntity<?> getItemsByUserCategory(@PathVariable String category, 
                                                   HttpServletRequest request) {
        try {
            String userId = (String) request.getAttribute("userId");
            
            if (userId == null) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new ApiResponse("Please try using valid token", false));
            }

            List<Item> items = itemService.getItemsByUserCategory(userId, category);
            
            Map<String, Object> response = new HashMap<>();
            response.put("items", items);
            response.put("success", true);
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(new ApiResponse(e.getMessage(), false));
        }
    }

    @GetMapping("/getItem/{id}")
    public ResponseEntity<?> getItem(@PathVariable String id, 
                                    HttpServletRequest request) {
        try {
            String userId = (String) request.getAttribute("userId");
            
            if (userId == null) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new ApiResponse("Please try using valid token", false));
            }

            Item item = itemService.getItem(userId, id);
            
            Map<String, Object> response = new HashMap<>();
            response.put("item", item);
            response.put("success", true);
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(new ApiResponse(e.getMessage(), false));
        }
    }

    @GetMapping("/getLogs/{id}")
    public ResponseEntity<?> getLogs(@PathVariable String id, 
                                    HttpServletRequest request) {
        try {
            String userId = (String) request.getAttribute("userId");
            
            if (userId == null) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new ApiResponse("Please try using valid token", false));
            }

            var logs = logService.getLogs(userId, id);
            
            Map<String, Object> response = new HashMap<>();
            response.put("logs", logs);
            response.put("success", true);
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(new ApiResponse(e.getMessage(), false));
        }
    }

    @PutMapping("/updateItem/{id}")
    public ResponseEntity<?> updateItem(@PathVariable String id, 
                                       @RequestBody ItemRequest request,
                                       HttpServletRequest httpRequest) {
        try {
            String userId = (String) httpRequest.getAttribute("userId");
            
            if (userId == null) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new ApiResponse("Please try using valid token", false));
            }

            Item updatedItem = itemService.updateItem(userId, id, request.getName(), 
                    request.getDescription(), request.getQuantity(), request.getPrice(), 
                    request.getSold(), request.getCategory());
            
            return ResponseEntity.ok(new ApiResponse("Item updated successfully", true, updatedItem));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(new ApiResponse(e.getMessage(), false));
        }
    }

    @DeleteMapping("/deleteItem/{id}")
    public ResponseEntity<?> deleteItem(@PathVariable String id, 
                                       HttpServletRequest request) {
        try {
            String userId = (String) request.getAttribute("userId");
            
            if (userId == null) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new ApiResponse("Please try using valid token", false));
            }

            itemService.deleteItem(userId, id);
            
            return ResponseEntity.ok(new ApiResponse("Item deleted successfully", true));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(new ApiResponse(e.getMessage(), false));
        }
    }
}
