import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const UpdateInvoice = () => {
  const { state } = useLocation(); // Get the passed data (invoice ID)
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    date: new Date().toLocaleDateString(),
    patientName: "",
    doctorName: "",
    medicines: [{ name: "", quantity: "" }],
    doctorFees: "",
  });

  useEffect(() => {
    const fetchInvoiceData = async () => {
      try {
        const response = await axios.get(`http://localhost:8085/ht/${state.id}`);
        setFormData({
          date: response.data.date,
          patientName: response.data.patientName,
          doctorName: response.data.doctorName,
          medicines: response.data.medicines,
          doctorFees: response.data.doctorFees,
        });
      } catch (error) {
        console.error("Error fetching invoice data:", error);
        alert("Failed to fetch invoice data.");
      }
    };

    if (state?.id) {
      fetchInvoiceData();
    }
  }, [state?.id]);

  const handleInputChange = (e, index = null) => {
    const { name, value } = e.target;

    if (name === "medicineName" || name === "medicineQuantity") {
      const updatedMedicines = [...formData.medicines];
      if (name === "medicineName") updatedMedicines[index].name = value;
      if (name === "medicineQuantity") updatedMedicines[index].quantity = value;
      setFormData({ ...formData, medicines: updatedMedicines });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const addMedicineFields = () => {
    setFormData({
      ...formData,
      medicines: [...formData.medicines, { name: "", quantity: "" }],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.patientName ||
      !formData.doctorName ||
      !formData.doctorFees ||
      formData.medicines.some((m) => !m.name || !m.quantity)
    ) {
      alert("Please fill out all required fields.");
      return;
    }

    try {
      const response = await axios.put(`http://localhost:8085/ht/${state.id}`, formData);
      alert("Invoice updated successfully!");
      navigate("/invoice-bill", { state: response.data });
    } catch (error) {
      console.error("Error updating invoice:", error);
      alert("Failed to update invoice. Please try again.");
    }
  };

  // Inline CSS styles
  const containerStyle = {
    backgroundColor: "#f4f7fa",
    padding: "30px",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    maxWidth: "900px",
    margin: "30px auto",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  };

  const headingStyle = {
    fontSize: "2rem",
    color: "#333",
    textAlign: "center",
    marginBottom: "20px",
  };

  const formStyle = {
    display: "flex",
    flexDirection: "column",
  };

  const labelStyle = {
    fontSize: "16px",
    marginBottom: "8px",
    color: "#333",
  };

  const inputStyle = {
    padding: "10px",
    marginBottom: "20px",
    border: "1px solid #ddd",
    borderRadius: "5px",
    fontSize: "16px",
  };

  const buttonStyle = {
    backgroundColor: "#28a745",
    color: "white",
    padding: "12px 24px",
    fontSize: "16px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "background-color 0.3s",
    width: "200px",
    margin: "10px auto",
  };

  const medicineFieldStyle = {
    display: "flex",
    gap: "10px",
    marginBottom: "10px",
  };

  const addMedicineButtonStyle = {
    backgroundColor: "#007bff",
    color: "white",
    padding: "8px 16px",
    fontSize: "14px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "background-color 0.3s",
  };

  return (
    <div style={containerStyle}>
      <h1 style={headingStyle}>Amavi Clinic - Edit Invoice</h1>
      <form onSubmit={handleSubmit} style={formStyle}>
        <div>
          <label style={labelStyle}>Date: </label>
          <input type="text" value={formData.date} readOnly style={inputStyle} />
        </div>

        <div>
          <label style={labelStyle}>Patient Name: </label>
          <input
            type="text"
            name="patientName"
            value={formData.patientName}
            onChange={handleInputChange}
            required
            style={inputStyle}
          />
        </div>

        <div>
          <label style={labelStyle}>Doctor Name: </label>
          <input
            type="text"
            name="doctorName"
            value={formData.doctorName}
            onChange={handleInputChange}
            required
            style={inputStyle}
          />
        </div>

        <div>
          <label style={labelStyle}>Medicines:</label>
          {formData.medicines.map((medicine, index) => (
            <div key={index} style={medicineFieldStyle}>
              <input
                type="text"
                placeholder="Medicine Name"
                name="medicineName"
                value={medicine.name}
                onChange={(e) => handleInputChange(e, index)}
                required
                style={inputStyle}
              />
              <input
                type="number"
                placeholder="Quantity"
                name="medicineQuantity"
                value={medicine.quantity}
                onChange={(e) => handleInputChange(e, index)}
                required
                style={inputStyle}
              />
            </div>
          ))}
          <button type="button" onClick={addMedicineFields} style={addMedicineButtonStyle}>
            Add Medicine
          </button>
        </div>

        <div>
          <label style={labelStyle}>Doctor Fees: </label>
          <input
            type="number"
            name="doctorFees"
            value={formData.doctorFees}
            onChange={handleInputChange}
            required
            style={inputStyle}
          />
        </div>

        <button type="submit" style={buttonStyle}>
          Update Invoice
        </button>
      </form>
    </div>
  );
};

export default UpdateInvoice;
