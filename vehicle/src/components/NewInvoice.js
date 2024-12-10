import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const NewInvoice = ({ inventory = [], refreshInventory }) => {
  const [formData, setFormData] = useState({
    date: new Date().toLocaleDateString(),
    patientName: "",
    doctorName: "",
    medicines: [{ id: "", quantity: "" }],
    doctorFees: "",
  });
  const [availableQuantities, setAvailableQuantities] = useState({});
  const navigate = useNavigate();

  const API_URL = "http://localhost:8085/ht/Pharmacist/inventory"; // Backend URL for inventory

  useEffect(() => {
    // Initialize available quantities from inventory
    if (inventory.length > 0) {
      const quantities = inventory.reduce((acc, item) => {
        acc[item.id] = { name: item.name, stock: item.stock };
        return acc;
      }, {});
      setAvailableQuantities(quantities);
    }
  }, [inventory]);

  const handleInputChange = (e, index = null) => {
    const { name, value } = e.target;

    if (name === "medicineId" || name === "medicineQuantity") {
      const updatedMedicines = [...formData.medicines];
      if (name === "medicineId") {
        updatedMedicines[index].id = value;
        updatedMedicines[index].quantity = ""; // Reset quantity if medicine changes
      }
      if (name === "medicineQuantity") {
        updatedMedicines[index].quantity = Number(value);
      }
      setFormData({ ...formData, medicines: updatedMedicines });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const addMedicineFields = () => {
    setFormData({
      ...formData,
      medicines: [...formData.medicines, { id: "", quantity: "" }],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form inputs
    if (
      !formData.patientName ||
      !formData.doctorName ||
      !formData.doctorFees ||
      formData.medicines.some((m) => !m.id || !m.quantity)
    ) {
      alert("Please fill out all required fields.");
      return;
    }

    // Check stock availability
    for (const medicine of formData.medicines) {
      const { id, quantity } = medicine;
      const selectedMedicine = availableQuantities[id];
      if (quantity > selectedMedicine.stock) {
        alert(`Not enough stock for ${selectedMedicine.name}. Available: ${selectedMedicine.stock}`);
        return;
      }
    }

    try {
      const token = localStorage.getItem("token");

      // Update inventory stock for each medicine
      for (const medicine of formData.medicines) {
        await axios.put(`${API_URL}/${medicine.id}/dispence`, null, {
          params: { quantity: medicine.quantity },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      }

      // Create invoice
      const response = await axios.post("http://localhost:8085/ht/add", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Invoice created successfully!");
      await refreshInventory(); // Refresh inventory after stock updates
      navigate("/invoice-bill", { state: response.data }); // Navigate to invoice bill page
    } catch (error) {
      console.error("Error creating invoice:", error.response ? error.response.data : error);
      alert("Failed to create invoice. Please try again.");
    }
  };

  const containerStyle = {
    backgroundColor: "#c6e4d6",
    padding: "30px",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    maxWidth: "900px",
    margin: "30px auto",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  };

  return (
    <div style={containerStyle}>
      <h1>Amavi Clinic - New Invoice</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Date:</label>
          <input type="text" value={formData.date} readOnly />
        </div>

        <div>
          <label>Patient Name:</label>
          <input
            type="text"
            name="patientName"
            value={formData.patientName}
            onChange={(e) => setFormData({ ...formData, patientName: e.target.value })}
            required
          />
        </div>

        <div>
          <label>Doctor Name:</label>
          <input
            type="text"
            name="doctorName"
            value={formData.doctorName}
            onChange={(e) => setFormData({ ...formData, doctorName: e.target.value })}
            required
          />
        </div>

        <div>
          <label>Medicines:</label>
          {formData.medicines.map((medicine, index) => (
            <div key={index}>
              <select
                name="medicineId"
                value={medicine.id}
                onChange={(e) => handleInputChange(e, index)}
                required
              >
                <option value="">Select Medicine</option>
                {inventory.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name} (Available: {item.stock})
                  </option>
                ))}
              </select>
              <input
                type="number"
                placeholder="Quantity"
                name="medicineQuantity"
                value={medicine.quantity}
                onChange={(e) => handleInputChange(e, index)}
                required
              />
              {medicine.id && (
                <span>
                  Available: {availableQuantities[medicine.id]?.stock || "Out of stock"}
                </span>
              )}
            </div>
          ))}
          <button type="button" onClick={addMedicineFields}>
            Add Medicine
          </button>
        </div>

        <div>
          <label>Doctor Fees:</label>
          <input
            type="number"
            name="doctorFees"
            value={formData.doctorFees}
            onChange={(e) => setFormData({ ...formData, doctorFees: e.target.value })}
            required
          />
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default NewInvoice;
