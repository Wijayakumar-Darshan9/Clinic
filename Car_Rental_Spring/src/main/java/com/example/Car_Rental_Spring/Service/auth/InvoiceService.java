package com.example.Car_Rental_Spring.Service.auth;

import com.example.Car_Rental_Spring.Entity.Invoice;
import com.example.Car_Rental_Spring.Repository.InvoiceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class InvoiceService {

    @Autowired
    private InvoiceRepository invoiceRepository;

    public List<Invoice> getAllInvoices() {
        return invoiceRepository.findAll();
    }

    public Optional<Invoice> getInvoiceById(String id) {
        return invoiceRepository.findById(id);
    }

    public Invoice createInvoice(Invoice invoice) {
        return invoiceRepository.save(invoice);
    }

    public Invoice updateInvoice(String id, Invoice updatedInvoice) {
        return invoiceRepository.findById(id)
                .map(invoice -> {
                    invoice.setPatientName(updatedInvoice.getPatientName());
                    invoice.setDoctorName(updatedInvoice.getDoctorName());
                    invoice.setMedicines(updatedInvoice.getMedicines());
                    invoice.setDoctorFees(updatedInvoice.getDoctorFees());
                    return invoiceRepository.save(invoice);
                }).orElseThrow(() -> new RuntimeException("Invoice not found"));
    }

    public void deleteInvoice(String id) {
        invoiceRepository.deleteById(id);
    }
}
