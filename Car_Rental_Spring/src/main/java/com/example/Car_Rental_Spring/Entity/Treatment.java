package com.example.Car_Rental_Spring.Entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

@Document(collection = "Treatment")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Treatment {
    @Id
    private String id; // Use String for MongoDB IDs


    private String patientId; // Reference to User document

    private String doctorName;
    private Date treatmentDate;
    private Date nextTreatmentDate;
    private String description;
}
