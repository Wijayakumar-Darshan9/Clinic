package com.example.Car_Rental_Spring.Repository;

import com.example.Car_Rental_Spring.Entity.InventoryItem;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface InventoryRepository extends MongoRepository<InventoryItem, String> {
}

