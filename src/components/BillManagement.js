// BillManagement.js
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const BillManagement = () => {
  const [invoices, setInvoices] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch all invoices
    const fetchInvoices = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/invoices");
        setInvoices(response.data);
      } catch (error) {
        console.error("Error fetching invoices:", error);
      }
    };
    fetchInvoices();
  }, []);

  // New inline styles with modern fonts, uppercase, and fresh look
  const containerStyle = {
    backgroundColor: "#F8F9FA", // Soft background color
    padding: "50px 20px",
    borderRadius: "12px",
    boxShadow: "0 8px 16px rgba(0, 0, 0, 0.1)",
    maxWidth: "1000px",
    margin: "30px auto",
    fontFamily: "'Roboto', sans-serif", // Clean modern font
    textAlign: "center",
    letterSpacing: "1px",
  };

  const headingStyle = {
    fontSize: "2.5rem", // Larger heading font size
    color: "#2E3A47", // Dark color for the heading
    textTransform: "uppercase", // Uppercase text for the heading
    letterSpacing: "2px",
    marginBottom: "30px",
    fontWeight: "700", // Bold heading
    fontFamily: "'Montserrat', sans-serif", // Stylish font for headings
  };

  const buttonStyle = {
    backgroundColor: "#FF6F61", // Vibrant coral button color
    color: "#FFFFFF",
    padding: "12px 24px", // Medium size button
    fontSize: "16px", // Readable font size
    fontWeight: "600", // Bold button text
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    margin: "0 15px",
    transition: "all 0.3s ease-in-out", // Smooth transition
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    textTransform: "uppercase", // Uppercase text on buttons
  };

  const buttonHoverStyle = {
    backgroundColor: "#F04E23", // Darker coral on hover
    transform: "scale(1.05)", // Slightly larger on hover
    boxShadow: "0 6px 12px rgba(0, 0, 0, 0.2)",
  };

  const btnContainerStyle = {
    display: "flex",
    justifyContent: "center",
    marginBottom: "40px",
  };

  const listItemStyle = {
    backgroundColor: "#FFFFFF", // White background for list items
    marginBottom: "20px",
    padding: "18px",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    color: "#333",
    fontSize: "1.2rem", // Larger text size for list items
    letterSpacing: "1px",
    fontFamily: "'Open Sans', sans-serif", // Simple font for list items
    textTransform: "uppercase", // Uppercase list items
  };

  const listButtonStyle = {
    backgroundColor: "#3B8C92", // Soft teal color for the "View" button
    color: "#FFFFFF",
    fontSize: "14px",
    padding: "8px 16px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "all 0.3s ease",
    textTransform: "uppercase",
  };

  const listButtonHoverStyle = {
    backgroundColor: "#2D6A64", // Darker teal on hover
    transform: "scale(1.05)", // Slightly larger on hover
  };

  return (
    <div style={containerStyle}>
      <h1 style={headingStyle}>AMAVI CLINIC IN-VOICE</h1>
      <div style={btnContainerStyle}>
        <button
          style={buttonStyle}
          onMouseEnter={(e) => Object.assign(e.target.style, buttonHoverStyle)}
          onMouseLeave={(e) => Object.assign(e.target.style, buttonStyle)}
          onClick={() => navigate("/new-invoice")}
        >
          Create New Invoice
        </button>
        <button
          style={buttonStyle}
          onMouseEnter={(e) => Object.assign(e.target.style, buttonHoverStyle)}
          onMouseLeave={(e) => Object.assign(e.target.style, buttonStyle)}
          onClick={() => navigate("/total-invoices")}
        >
          Total Invoices
        </button>
      </div>
      <ul style={{ listStyle: "none", padding: "0" }}>
        {invoices.map((invoice) => (
          <li key={invoice.id} style={listItemStyle}>
            <span>{invoice.patientName} - {invoice.date}</span>
            <button
              style={listButtonStyle}
              onMouseEnter={(e) => Object.assign(e.target.style, listButtonHoverStyle)}
              onMouseLeave={(e) => Object.assign(e.target.style, listButtonStyle)}
              onClick={() => navigate("/invoice-bill", { state: invoice })}
            >
              View
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BillManagement;
