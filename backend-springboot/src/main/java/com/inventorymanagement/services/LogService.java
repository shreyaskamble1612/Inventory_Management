package com.inventorymanagement.services;

import com.inventorymanagement.models.Item;
import com.inventorymanagement.models.Log;
import com.inventorymanagement.models.User;
import com.inventorymanagement.repositories.ItemRepository;
import com.inventorymanagement.repositories.LogRepository;
import com.inventorymanagement.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

@Service
public class LogService {

    @Autowired
    private LogRepository logRepository;

    @Autowired
    private ItemRepository itemRepository;

    @Autowired
    private UserRepository userRepository;

    public Log increaseQuantity(String userId, String itemId, Integer quantity, String description) throws Exception {
        // Validate user
        Optional<User> user = userRepository.findById(userId);
        if (user.isEmpty()) {
            throw new Exception("User does not exist");
        }

        // Validate quantity
        if (quantity == null || quantity <= 0) {
            throw new IllegalArgumentException("Please enter a valid number");
        }

        if (description == null || description.isEmpty()) {
            throw new IllegalArgumentException("Description must be a string");
        }

        // Get item
        Optional<Item> itemOptional = itemRepository.findById(itemId);
        if (itemOptional.isEmpty()) {
            throw new Exception("Item does not exist");
        }

        Item item = itemOptional.get();
        item.setQuantity(item.getQuantity() + quantity);
        itemRepository.save(item);

        // Create log
        Log log = new Log(userId, itemId, "Increase Quantity", quantity, description);
        return logRepository.save(log);
    }

    public Log decreaseQuantity(String userId, String itemId, Integer quantity, String description) throws Exception {
        // Validate user
        Optional<User> user = userRepository.findById(userId);
        if (user.isEmpty()) {
            throw new Exception("User does not exist");
        }

        // Validate quantity
        if (quantity == null || quantity <= 0) {
            throw new IllegalArgumentException("Please enter a valid number");
        }

        if (description == null || description.isEmpty()) {
            throw new IllegalArgumentException("Description must be a string");
        }

        // Get item
        Optional<Item> itemOptional = itemRepository.findById(itemId);
        if (itemOptional.isEmpty()) {
            throw new Exception("Item does not exist");
        }

        Item item = itemOptional.get();
        int quantityToDecrease = Math.min(quantity, item.getQuantity());
        
        item.setSold(item.getSold() + quantityToDecrease);
        item.setSoldPrice(BigDecimal.valueOf(item.getSold()).multiply(item.getPrice()));
        item.setQuantity(item.getQuantity() - quantityToDecrease);
        
        itemRepository.save(item);

        // Create log
        Log log = new Log(userId, itemId, "Decrease Quantity", quantity, description);
        return logRepository.save(log);
    }

    public List<Log> getLogs(String userId, String itemId) throws Exception {
        // Validate user
        Optional<User> user = userRepository.findById(userId);
        if (user.isEmpty()) {
            throw new Exception("No such user");
        }

        // Validate item
        Optional<Item> item = itemRepository.findById(itemId);
        if (item.isEmpty()) {
            throw new Exception("Item does not exist");
        }

        return logRepository.findByItemIdAndUserId(itemId, userId);
    }
}
