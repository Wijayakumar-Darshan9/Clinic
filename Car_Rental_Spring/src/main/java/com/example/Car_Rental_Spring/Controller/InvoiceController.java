package com.example.Car_Rental_Spring.Controller;
import com.example.Car_Rental_Spring.Entity.Invoice;
import com.example.Car_Rental_Spring.Service.auth.InvoiceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/ht")
@CrossOrigin("*")
public class InvoiceController {

    @Autowired
    private InvoiceService invoiceService;

    // Get all invoices
    @GetMapping("/all")
    public List<Invoice> getAllInvoices() {
        return invoiceService.getAllInvoices();
    }



    // Get an invoice by ID
    @GetMapping("/{id}")
    public Invoice getInvoiceById(@PathVariable String id) {
        return invoiceService.getInvoiceById(id)
                .orElseThrow(() -> new RuntimeException("Invoice not found"));
    }



    // Create a new invoice
    @PostMapping("/add")
    public Invoice createInvoice(@RequestBody Invoice invoice) {
        return invoiceService.createInvoice(invoice);
    }

    // Update an invoice by ID
    @PutMapping("/{id}")
    public Invoice updateInvoice(@PathVariable String id, @RequestBody Invoice invoice) {
        return invoiceService.updateInvoice(id, invoice);
    }

    // Delete an invoice by ID
    @DeleteMapping("/{id}")
    public void deleteInvoice(@PathVariable String id) {
        invoiceService.deleteInvoice(id);
    }
}

