package com.example.Car_Rental_Spring.Entity;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

// MongoDB document representation
@Data
@Document(collection = "invoices")
public class Invoice {
    @Id
    private String id;
    private String date;
    private String patientName;
    private String doctorName;
    private List<Medicine> medicines;
    private double doctorFees;

    @Data
    public static class Medicine {
        private String name;
        private int quantity;
    }
}

