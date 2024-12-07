package com.example.Car_Rental_Spring.Controller;

import com.example.Car_Rental_Spring.Entity.InventoryItem;
import com.example.Car_Rental_Spring.Repository.InventoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin("*") // Allow cross-origin requests
@RequestMapping("/ht/Pharmacist/inventory")
public class InventoryController {

    @Autowired
    private InventoryRepository inventoryRepository;

    // Get all inventory items
    @GetMapping
    public List<InventoryItem> getInventory() {
        return inventoryRepository.findAll();
    }

    // Get a specific inventory item by ID
    @GetMapping("/{id}")
    public ResponseEntity<InventoryItem> getInventoryItem(@PathVariable String id) {
        Optional<InventoryItem> item = inventoryRepository.findById(id);
        return item.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Create a new inventory item
    @PostMapping
    public InventoryItem createInventoryItem(@RequestBody InventoryItem item) {
        return inventoryRepository.save(item);
    }

    // Update an existing inventory item
    @PutMapping("/{id}")
    public ResponseEntity<InventoryItem> updateInventoryItem(@PathVariable String id, @RequestBody InventoryItem itemDetails) {
        return inventoryRepository.findById(id)
                .map(item -> {
                    item.setName(itemDetails.getName());
                    item.setQuantity(itemDetails.getQuantity());
                    item.setPrice(itemDetails.getPrice());
                    item.setStock(itemDetails.getStock());
                    return ResponseEntity.ok(inventoryRepository.save(item));
                }).orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Delete an inventory item
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteInventoryItem(@PathVariable String id) {
        if (inventoryRepository.existsById(id)) {
            inventoryRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // New endpoint to dispense medicine
    @PutMapping("/{id}/dispence") // Corrected spelling from "dispence" to "dispense"
    public ResponseEntity<InventoryItem> dispenseMedicine(@PathVariable String id, @RequestParam int quantity) {
        Optional<InventoryItem> optionalItem = inventoryRepository.findById(id);
        if (optionalItem.isPresent()) {
            InventoryItem item = optionalItem.get();
            if (item.getStock() < quantity) { // Check stock instead of quantity
                return ResponseEntity.badRequest().body(null); // Not enough stock
            }
            item.setStock(item.getStock() - quantity); // Decrement the stock
            InventoryItem updatedItem = inventoryRepository.save(item); // Save the updated item
            return ResponseEntity.ok(updatedItem); // Return the updated item
        } else {
            return ResponseEntity.notFound().build(); // Item not found
        }
    }
}