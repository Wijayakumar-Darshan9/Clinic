package com.example.Car_Rental_Spring.Controller;

import com.example.Car_Rental_Spring.Entity.Treatment;

import com.example.Car_Rental_Spring.Entity.User;
import com.example.Car_Rental_Spring.Repository.UserRepository;
import com.example.Car_Rental_Spring.Service.auth.TreatmentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.NoSuchElementException;

@RestController
@RequestMapping("/ht")
@RequiredArgsConstructor
public class TreatmentController {
    private final TreatmentService treatmentService;
    private final UserRepository userRepository;

    @GetMapping("/patients/email/{email}/treatments")
    public ResponseEntity<List<Treatment>> getTreatmentsByPatientEmail(@PathVariable String email) {
        User patient = userRepository.findByEmail(email)
                .orElseThrow(() -> new NoSuchElementException("User not found"));
        List<Treatment> treatments = treatmentService.getTreatmentsByPatientId(patient.getId());
        return ResponseEntity.ok(treatments);
    }


    @GetMapping("/patients/{patientId}/treatments")
    public ResponseEntity<List<Treatment>> getTreatmentsByPatientId(@PathVariable String patientId) {
        List<Treatment> treatments = treatmentService.getTreatmentsByPatientId(patientId);
        return ResponseEntity.ok(treatments);
    }
    @PostMapping("/patients/{patientId}/treatments")
    public ResponseEntity<Treatment> createTreatment(@PathVariable String patientId, @RequestBody Treatment treatment) {
        User patient = userRepository.findById(patientId)
                .orElseThrow(() -> new NoSuchElementException("User not found"));
        treatment.setPatientId(patientId);
        Treatment createdTreatment = treatmentService.createTreatment(treatment);
        return ResponseEntity.ok(createdTreatment);
    }


    @PutMapping("/treatments/{id}")
    public ResponseEntity<Treatment> updateTreatment(@PathVariable String id, @RequestBody Treatment treatmentDetails) {
        Treatment updatedTreatment = treatmentService.updateTreatment(id, treatmentDetails);
        return ResponseEntity.ok(updatedTreatment);
    }

    @DeleteMapping("/treatments/{id}")
    public ResponseEntity<Void> deleteTreatment(@PathVariable String id) {
        treatmentService.deleteTreatment(id);
        return ResponseEntity.noContent().build();
    }
}
