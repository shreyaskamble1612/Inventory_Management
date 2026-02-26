package com.inventorymanagement.repositories;

import com.inventorymanagement.models.Item;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ItemRepository extends MongoRepository<Item, String> {
    List<Item> findByUserId(String userId);
    List<Item> findByUserIdAndCategory(String userId, String category);
}
