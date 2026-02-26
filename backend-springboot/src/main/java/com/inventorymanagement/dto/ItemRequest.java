package com.inventorymanagement.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ItemRequest {
    private String name;
    private String description;
    private Integer quantity;
    private BigDecimal price;
    private Integer sold;
    private String category;
}
