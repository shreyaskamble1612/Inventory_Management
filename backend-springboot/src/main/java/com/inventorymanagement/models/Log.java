package com.inventorymanagement.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Document(collection = "logs")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Log {
    
    @Id
    private String id;
    private String userId;
    private String itemId;
    private String action;
    private Integer quantity;
    private String description;
    private LocalDateTime date;

    public Log(String userId, String itemId, String action, Integer quantity, String description) {
        this.userId = userId;
        this.itemId = itemId;
        this.action = action;
        this.quantity = quantity;
        this.description = description;
        this.date = LocalDateTime.now();
    }
}
