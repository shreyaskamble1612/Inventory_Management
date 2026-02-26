package com.inventorymanagement.services;

import com.inventorymanagement.models.Item;
import com.inventorymanagement.models.User;
import com.inventorymanagement.repositories.ItemRepository;
import com.inventorymanagement.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

@Service
public class ItemService {

    @Autowired
    private ItemRepository itemRepository;

    @Autowired
    private UserRepository userRepository;

    public Item addItem(String userId, String name, String description, Integer quantity, 
                       BigDecimal price, Integer sold, String category) throws Exception {
        
        // Validate user exists
        Optional<User> user = userRepository.findById(userId);
        if (user.isEmpty()) {
            throw new Exception("User does not exist");
        }

        // Validate input
        if (name == null || name.isEmpty()) {
            throw new IllegalArgumentException("Name is required");
        }
        if (price == null) {
            throw new IllegalArgumentException("Price is required");
        }
        if (category == null || category.isEmpty()) {
            throw new IllegalArgumentException("Category is required");
        }
        if (quantity == null) {
            throw new IllegalArgumentException("Quantity is required");
        }

        Item item = new Item(userId, name, description != null ? description : "", 
                           quantity, price, sold, category);
        return itemRepository.save(item);
    }

    public List<Item> getItemsByUser(String userId) throws Exception {
        Optional<User> user = userRepository.findById(userId);
        if (user.isEmpty()) {
            throw new Exception("No such user");
        }
        return itemRepository.findByUserId(userId);
    }

    public List<Item> getItemsByUserCategory(String userId, String category) throws Exception {
        Optional<User> user = userRepository.findById(userId);
        if (user.isEmpty()) {
            throw new Exception("No such user");
        }
        return itemRepository.findByUserIdAndCategory(userId, category);
    }

    public Item getItem(String userId, String itemId) throws Exception {
        Optional<User> user = userRepository.findById(userId);
        if (user.isEmpty()) {
            throw new Exception("No such user");
        }

        Optional<Item> item = itemRepository.findById(itemId);
        if (item.isEmpty()) {
            throw new Exception("Item does not exist");
        }

        return item.get();
    }

    public Item updateItem(String userId, String itemId, String name, String description, 
                          Integer quantity, BigDecimal price, Integer sold, String category) throws Exception {
        Optional<User> user = userRepository.findById(userId);
        if (user.isEmpty()) {
            throw new Exception("No such user");
        }

        Optional<Item> itemOptional = itemRepository.findById(itemId);
        if (itemOptional.isEmpty() || !itemOptional.get().getUserId().equals(userId)) {
            throw new Exception("Item not found or does not belong to the user");
        }

        Item item = itemOptional.get();
        if (name != null) item.setName(name);
        if (description != null) item.setDescription(description);
        if (quantity != null) item.setQuantity(quantity);
        if (price != null) item.setPrice(price);
        if (sold != null) item.setSold(sold);
        if (category != null) item.setCategory(category);

        return itemRepository.save(item);
    }

    public void deleteItem(String userId, String itemId) throws Exception {
        Optional<User> user = userRepository.findById(userId);
        if (user.isEmpty()) {
            throw new Exception("No such user");
        }

        Optional<Item> item = itemRepository.findById(itemId);
        if (item.isEmpty() || !item.get().getUserId().equals(userId)) {
            throw new Exception("Item not found or does not belong to the user");
        }

        itemRepository.deleteById(itemId);
    }
}
