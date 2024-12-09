package com.example.Car_Rental_Spring.Entity;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "inventoryItems")
@Data
public class InventoryItem {
    @Id
    private String id;
    private String name;
    private String inventoryCode;
    private int quantity;
    private double price;
    private int stock;
}
