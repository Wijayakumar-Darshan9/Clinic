import React, { useState, useEffect } from "react";
import axios from "axios";
import './TotalInvoice.css'; // Assuming you have a CSS file for styling
import './style.css';

const TotalInvoices = () => {
  const [invoices, setInvoices] = useState([]); // Store all fetched invoices
  const [filteredInvoices, setFilteredInvoices] = useState([]); // Store filtered invoices
  const [loading, setLoading] = useState(true); // To handle loading state
  const [filterDate, setFilterDate] = useState(""); // Date filter input

  // Fetch all invoices from the backend
  const fetchInvoices = async () => {
    try {
      const response = await axios.get("http://localhost:8085/ht/all");
      setInvoices(response.data); // Set fetched invoices
      setFilteredInvoices(response.data); // Initially, show all invoices
      setLoading(false); // Set loading to false once the data is fetched
    } catch (error) {
      console.error("Error fetching invoices", error);
      setLoading(false);
    }
  };

  // Fetch invoices when the component is mounted
  useEffect(() => {
    fetchInvoices();
  }, []);

  // Handle date filter change
  const handleFilterChange = (e) => {
    const selectedDate = e.target.value;
    setFilterDate(selectedDate);

    if (selectedDate) {
      // Filter invoices by selected date
      const filtered = invoices.filter((invoice) => invoice.date === selectedDate);
      setFilteredInvoices(filtered);
    } else {
      // If no date is selected, show all invoices
      setFilteredInvoices(invoices);
    }
  };

  // Inline styles for the table
  const containerStyle = {
    padding: "20px",
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#81c784",
    maxWidth: "1000px",
    margin: "0 auto",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  };

  const headingStyle = {
    textAlign: "center",
    color: "#333",
    fontSize: "2rem",
    marginBottom: "20px",
  };

  const tableStyle = {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: "20px",
    backgroundColor: "white"
  };

  const tableHeaderStyle = {
    backgroundColor: "#4CAF50", // Green background for headers
    color: "#fff",
    padding: "12px",
    textAlign: "center",
  };

  const tableCellStyle = {
    padding: "12px",
    textAlign: "center",
    borderBottom: "1px solid #ddd",
  };

  const filterContainerStyle = {
    display: "flex",
    justifyContent: "center",
    marginBottom: "20px",
  };

  const inputStyle = {
    padding: "8px",
    fontSize: "1rem",
    borderRadius: "5px",
    border: "1px solid #ddd",
    width: "200px",
    textAlign: "center",
  };

  return (
    <div style={containerStyle}>
      <h1 style={headingStyle}>Total Invoice History</h1>

      {loading ? (
        <p>Loading invoices...</p>
      ) : (
        <>
          {/* Date filter section */}
          <div style={filterContainerStyle}>
            <label htmlFor="filter-date" style={{ marginRight: "10px" }}>
              Filter by Date:
            </label>
            <input
              type="date"
              id="filter-date"
              value={filterDate}
              onChange={handleFilterChange}
              style={inputStyle}
            />
          </div>

          {/* Table of invoices */}
          {filteredInvoices.length > 0 ? (
            <table style={tableStyle}>
              <thead>
                <tr>
                  <th style={tableHeaderStyle}>Date</th>
                  <th style={tableHeaderStyle}>Patient Name</th>
                  <th style={tableHeaderStyle}>Doctor Name</th>
                  <th style={tableHeaderStyle}>Medicines</th>
                  <th style={tableHeaderStyle}>Doctor Fees</th>
                </tr>
              </thead>
              <tbody>
                {filteredInvoices.map((invoice) => (
                  <tr key={invoice.id}>
                    <td style={tableCellStyle}>{invoice.date}</td>
                    <td style={tableCellStyle}>{invoice.patientName}</td>
                    <td style={tableCellStyle}>{invoice.doctorName}</td>
                    <td style={tableCellStyle}>
                      <ul style={{ padding: "0", listStyle: "none" }}>
                        {invoice.medicines.map((medicine, index) => (
                          <li key={index}>{medicine.name} - {medicine.quantity}</li>
                        ))}
                      </ul>
                    </td>
                    <td style={tableCellStyle}>{invoice.doctorFees}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No invoices found for the selected date.</p>
          )}
        </>
      )}
    </div>
  );
};

export default TotalInvoices;
