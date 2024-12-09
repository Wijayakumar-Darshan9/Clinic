package com.example.Car_Rental_Spring.Repository;

import com.example.Car_Rental_Spring.Entity.Invoice;
import org.springframework.data.mongodb.repository.MongoRepository;
public interface InvoiceRepository extends MongoRepository<Invoice, String> {
}
