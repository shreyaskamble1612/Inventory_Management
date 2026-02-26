package com.inventorymanagement.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
public class HomeController {

    @GetMapping("/")
    public ResponseEntity<?> welcome() {
        Map<String, String> response = new HashMap<>();
        response.put("message", "Welcome to Inventory Management");
        return ResponseEntity.ok(response);
    }
}
