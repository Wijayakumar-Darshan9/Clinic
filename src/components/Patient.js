import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './PatientDetails.css'; // Make sure to create this CSS file

const PatientDetails = () => {
    const { id } = useParams();
    const [patient, setPatient] = useState(null);
    const [treatments, setTreatments] = useState([]);
    const [selectedTreatmentId, setSelectedTreatmentId] = useState(null);
    const [showAddForm, setShowAddForm] = useState(false);
    const [showUpdateForm, setShowUpdateForm] = useState(false);
    const [newTreatment, setNewTreatment] = useState({
        doctorName: '',
        treatmentDate: '',
        nextTreatmentDate: '',
        description: ''
    });

    useEffect(() => {
        axios.get(`http://localhost:8085/ht/patients/${id}`)
            .then(response => {
                setPatient(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the patient details!', error);
            });

        axios.get(`http://localhost:8085/ht/patients/${id}/treatments`)
            .then(response => {
                setTreatments(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the treatments!', error);
            });
    }, [id]);

    const handleViewTreatment = (treatmentId) => {
        setSelectedTreatmentId(selectedTreatmentId === treatmentId ? null : treatmentId);
    };

    const handleAddTreatment = () => {
        setShowAddForm(true);
    };

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setNewTreatment(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        axios.post(`http://localhost:8085/ht/patients/${id}/treatments`, newTreatment)
            .then(response => {
                setTreatments([...treatments, response.data]);
                setShowAddForm(false);
                setNewTreatment({
                    doctorName: '',
                    treatmentDate: '',
                    nextTreatmentDate: '',
                    description: ''
                });
            })
            .catch(error => {
                console.error('There was an error adding the treatment!', error);
            });
    };

    const handleUpdateTreatment = (treatment) => {
        setNewTreatment({
            doctorName: treatment.doctorName,
            treatmentDate: treatment.treatmentDate.split('T')[0], // Ensure date format is correct
            nextTreatmentDate: treatment.nextTreatmentDate.split('T')[0], // Ensure date format is correct
            description: treatment.description
        });
        setSelectedTreatmentId(treatment.id);
        setShowUpdateForm(true);
    };

    const handleUpdateFormSubmit = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:8085/ht/treatments/${selectedTreatmentId}`, newTreatment)
            .then(response => {
                setTreatments(treatments.map(treatment => 
                    treatment.id === selectedTreatmentId ? response.data : treatment
                ));
                setShowUpdateForm(false);
                setNewTreatment({
                    doctorName: '',
                    treatmentDate: '',
                    nextTreatmentDate: '',
                    description: ''
                });
                setSelectedTreatmentId(null);
            })
            .catch(error => {
                console.error('There was an error updating the treatment!', error);
            });
    };

    const handleDeleteTreatment = (treatmentId) => {
        axios.delete(`http://localhost:8085/ht/treatments/${treatmentId}`)
            .then(() => {
                setTreatments(treatments.filter(treatment => treatment.id !== treatmentId));
                if (selectedTreatmentId === treatmentId) {
                    setSelectedTreatmentId(null);
                }
            })
            .catch(error => {
                console.error('There was an error deleting the treatment!', error);
            });
    };

    if (!patient) {
        return <div>Loading...</div>;
    }

    return (
        <div className="patient-details-container">
            <h2>Patient Details</h2>
            <p><strong>Name:</strong> {patient.name}</p>
            <p><strong>Email:</strong> {patient.email}</p>
            <p><strong>NIC:</strong> {patient.nic}</p>
            <p><strong>Date of Birth:</strong> {new Date(patient.dateOfBirth).toLocaleDateString()}</p>
            <h3>Treatments</h3>
            <button className="add-button" onClick={handleAddTreatment}>Add Treatment</button>
            {showAddForm && (
                <form onSubmit={handleFormSubmit}>
                    <div>
                        <label>Doctor Name:</label>
                        <input
                            type="text"
                            name="doctorName"
                            value={newTreatment.doctorName}
                            onChange={handleFormChange}
                            required
                        />
                    </div>
                    <div>
                        <label>Treatment Date:</label>
                        <input
                            type="date"
                            name="treatmentDate"
                            value={newTreatment.treatmentDate}
                            onChange={handleFormChange}
                            required
                        />
                    </div>
                    <div>
                        <label>Next Treatment Date:</label>
                        <input
                            type="date"
                            name="nextTreatmentDate"
                            value={newTreatment.nextTreatmentDate}
                            onChange={handleFormChange}
                        />
                    </div>
                    <div>
                        <label>Description:</label>
                        <textarea
                            name="description"
                            value={newTreatment.description}
                            onChange={handleFormChange}
                            required
                        />
                    </div>
                    <button className="submit-button" type="submit">Submit</button>
                    <button className="cancel-button" type="button" onClick={() => setShowAddForm(false)}>Cancel</button>
                </form>
            )}
            {showUpdateForm && (
                <form onSubmit={handleUpdateFormSubmit}>
                    <div>
                        <label>Doctor Name:</label>
                        <input
                            type="text"
                            name="doctorName"
                            value={newTreatment.doctorName}
                            onChange={handleFormChange}
                            required
                        />
                    </div>
                    <div>
                        <label>Treatment Date:</label>
                        <input
                            type="date"
                            name="treatmentDate"
                            value={newTreatment.treatmentDate}
                            onChange={handleFormChange}
                            required
                        />
                    </div>
                    <div>
                        <label>Next Treatment Date:</label>
                        <input
                            type="date"
                            name="nextTreatmentDate"
                            value={newTreatment.nextTreatmentDate}
                            onChange={handleFormChange}
                        />
                    </div>
                    <div>
                        <label>Description:</label>
                        <textarea
                            name="description"
                            value={newTreatment.description}
                            onChange={handleFormChange}
                            required
                        />
                    </div>
                    <button className="submit-button" type="submit">Update</button>
                    <button className="cancel-button" type="button" onClick={() => setShowUpdateForm(false)}>Cancel</button>
                </form>
            )}
            <ul>
                {treatments.map(treatment => (
                    <li key={treatment.id}>
                        <button className="date-button" onClick={() => handleViewTreatment(treatment.id)}>
                            {new Date(treatment.treatmentDate).toLocaleDateString()}
                        </button>
                        {selectedTreatmentId === treatment.id && (
                            <div className="treatment-details">
                                <h4>Treatment Details</h4>
                                <p><strong>Doctor:</strong> {treatment.doctorName}</p>
                                <p><strong>Date:</strong> {new Date(treatment.treatmentDate).toLocaleDateString()}</p>
                                <p><strong>Next Treatment Date:</strong> {new Date(treatment.nextTreatmentDate).toLocaleDateString()}</p>
                                <p><strong>Description:</strong> {treatment.description}</p>
                            </div>
                        )}
                        <button className="update-button" onClick={() => handleUpdateTreatment(treatment)}>Update</button>
                        <button className="delete-button" onClick={() => handleDeleteTreatment(treatment.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PatientDetails;
