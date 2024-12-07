package com.example.Car_Rental_Spring.ServiceDis;

import com.example.Car_Rental_Spring.Entity.InventoryItem;
import com.example.Car_Rental_Spring.Repository.InventoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
class InventoryService {
    @Autowired
    private InventoryRepository inventoryRepository;

    public List<InventoryItem> getAllItems() {
        return inventoryRepository.findAll();
    }

    public InventoryItem dispenseItem(Long id, int quantity) {
        InventoryItem item = inventoryRepository.findById(String.valueOf(id)).orElseThrow(() -> new RuntimeException("Item not found"));
        if (item.getQuantity() < quantity) {
            throw new RuntimeException("Not enough stock available.");
        }
        item.setQuantity(item.getQuantity() - quantity);
        return inventoryRepository.save(item);
    }
}
