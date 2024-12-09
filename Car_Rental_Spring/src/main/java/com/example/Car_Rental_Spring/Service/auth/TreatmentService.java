package com.example.Car_Rental_Spring.Service.auth;

import com.example.Car_Rental_Spring.Entity.Treatment;
import com.example.Car_Rental_Spring.Repository.TreatmentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;

@Service
@RequiredArgsConstructor
public class TreatmentService {
    private final TreatmentRepository treatmentRepository;

    public List<Treatment> getTreatmentsByPatientId(String patientId) {
        return treatmentRepository.findByPatientId(patientId);
    }

    public Treatment createTreatment(Treatment treatment) {
        return treatmentRepository.save(treatment);
    }

    public Treatment updateTreatment(String id, Treatment treatmentDetails) {
        Treatment treatment = treatmentRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Treatment not found"));
        treatment.setDoctorName(treatmentDetails.getDoctorName());
        treatment.setTreatmentDate(treatmentDetails.getTreatmentDate());
        treatment.setNextTreatmentDate(treatmentDetails.getNextTreatmentDate());
        treatment.setDescription(treatmentDetails.getDescription());
        return treatmentRepository.save(treatment);
    }

    public void deleteTreatment(String id) {
        Treatment treatment = treatmentRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Treatment not found"));
        treatmentRepository.delete(treatment);
    }
}
