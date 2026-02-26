package com.inventorymanagement.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Document(collection = "items")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Item {
    
    @Id
    private String id;
    private String userId;
    private String name;
    private String description;
    private Integer quantity;
    private BigDecimal price;
    private Integer sold;
    private String category;
    private BigDecimal soldPrice;
    private LocalDateTime date;

    public Item(String userId, String name, String description, Integer quantity, 
                BigDecimal price, Integer sold, String category) {
        this.userId = userId;
        this.name = name;
        this.description = description;
        this.quantity = quantity;
        this.price = price;
        this.sold = sold != null ? sold : 0;
        this.category = category;
        this.soldPrice = BigDecimal.ZERO;
        this.date = LocalDateTime.now();
    }
}
