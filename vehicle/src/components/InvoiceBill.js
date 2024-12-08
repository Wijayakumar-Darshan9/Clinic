import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const InvoiceBill = () => {
  const { state } = useLocation(); // Invoice data passed from NewInvoice
  const navigate = useNavigate();

  const handlePrint = () => {
    window.print();
  };

  const handleUpdate = () => {
    navigate("/update-bill", { state: { id: state.id } }); // Navigate back to update form with data
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:8085/ht/${state.id}`);
      alert("Invoice deleted successfully!");
      navigate("/bill-management");
    } catch (error) {
      console.error("Error deleting invoice:", error);
      alert("Failed to delete invoice. Please try again.");
    }
  };

  // Inline styles with light colors and small button sizes
  const containerStyle = {
    backgroundColor: "#f1f8e9", // Very light green
    padding: "30px",
    borderRadius: "15px",
    color: "#333",
    maxWidth: "900px",
    margin: "20px auto",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
    fontFamily: "Arial, sans-serif",
    animation: "fadeIn 1.5s ease-in-out",
  };

  const headingStyle = {
    fontSize: "2.5rem",
    textAlign: "center",
    marginBottom: "20px",
    color: "#388e3c", // Green color
    animation: "slideDown 1s ease",
  };

  const tableStyle = {
    width: "100%",
    borderCollapse: "collapse",
    marginBottom: "20px",
    animation: "fadeInUp 1s ease",
  };

  const tableHeaderStyle = {
    backgroundColor: "#c8e6c9", // Light green
    color: "#388e3c", // Green color
    textAlign: "center",
    padding: "10px",
  };

  const tableCellStyle = {
    textAlign: "center",
    padding: "10px",
    border: "1px solid #ccc",
    backgroundColor: "#f9fbe7", // Light yellowish
  };

  const buttonStyle = {
    backgroundColor: "#81c784", // Light green
    color: "white",
    padding: "8px 16px", // Smaller size
    margin: "10px",
    border: "none",
    borderRadius: "5px",
    fontSize: "14px", // Smaller font size
    cursor: "pointer",
    transition: "background-color 0.3s ease, width 0.3s ease",
    width: "140px", // Small button width
    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.2)",
  };

  const buttonHoverStyle = {
    transform: "scale(1.05)", // Slight scale up on hover
    backgroundColor: "#66bb6a", // Slightly darker green
    width: "100px", // Increase width on hover
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.3)",
  };

  const listItemStyle = {
    backgroundColor: "#f1f8e9", // Very light green
    color: "#388e3c", // Green color
    margin: "5px 0",
    padding: "5px 10px",
    borderRadius: "5px",
  };

  const buttonWrapperStyle = {
    textAlign: "center",
  };

  // Button styles for Update, Delete, and Print with specific colors:
  const updateButtonStyle = {
    ...buttonStyle,
    backgroundColor: "#81c784", // Light green
  };

  const deleteButtonStyle = {
    ...buttonStyle,
    backgroundColor: "#ff7043", // Light red
  };

  const printButtonStyle = {
    ...buttonStyle,
    backgroundColor: "#4fc3f7", // Light blue
  };

  // Button hover styles for Update, Delete, and Print:
  const updateButtonHoverStyle = {
    ...buttonHoverStyle,
    backgroundColor: "#66bb6a", // Slightly darker green
  };

  const deleteButtonHoverStyle = {
    ...buttonHoverStyle,
    backgroundColor: "#f4511e", // Slightly darker red
  };

  const printButtonHoverStyle = {
    ...buttonHoverStyle,
    backgroundColor: "#29b6f6", // Slightly darker blue
  };

  return (
    <div style={containerStyle}>
      <h1 style={headingStyle}>Invoice Bill</h1>
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
          <tr>
            <td style={tableCellStyle}>{state.date}</td>
            <td style={tableCellStyle}>{state.patientName}</td>
            <td style={tableCellStyle}>{state.doctorName}</td>
            <td style={tableCellStyle}>
              <ul style={{ listStyle: "none", padding: "0" }}>
                {state.medicines.map((medicine, index) => (
                  <li key={index} style={listItemStyle}>
                    {medicine.name} - {medicine.quantity}
                  </li>
                ))}
              </ul>
            </td>
            <td style={tableCellStyle}>{state.doctorFees}</td>
          </tr>
        </tbody>
      </table>
      <div style={buttonWrapperStyle}>
        <button
          style={updateButtonStyle}
          onMouseEnter={(e) => Object.assign(e.target.style, updateButtonHoverStyle)}
          onMouseLeave={(e) => Object.assign(e.target.style, updateButtonStyle)}
          onClick={handleUpdate}
        >
          Update
        </button>
        <button
          style={deleteButtonStyle}
          onMouseEnter={(e) => Object.assign(e.target.style, deleteButtonHoverStyle)}
          onMouseLeave={(e) => Object.assign(e.target.style, deleteButtonStyle)}
          onClick={handleDelete}
        >
          Delete
        </button>
        <button
          style={printButtonStyle}
          onMouseEnter={(e) => Object.assign(e.target.style, printButtonHoverStyle)}
          onMouseLeave={(e) => Object.assign(e.target.style, printButtonStyle)}
          onClick={handlePrint}
        >
          Print
        </button>
      </div>
    </div>
  );
};

export default InvoiceBill;
