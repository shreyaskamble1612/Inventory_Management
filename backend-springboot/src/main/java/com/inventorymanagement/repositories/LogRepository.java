package com.inventorymanagement.repositories;

import com.inventorymanagement.models.Log;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LogRepository extends MongoRepository<Log, String> {
    List<Log> findByItemIdAndUserId(String itemId, String userId);
}
