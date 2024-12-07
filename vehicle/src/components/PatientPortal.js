import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './PatientPortal.css'; // Ensure this CSS file exists

const PatientPortal = () => {
    const [patient, setPatient] = useState(null);
    const [treatments, setTreatments] = useState([]);
    const [selectedTreatmentId, setSelectedTreatmentId] = useState(null);
    const [nextTreatmentDate, setNextTreatmentDate] = useState('');
    const [loading, setLoading] = useState(true);
    const [showTreatmentList, setShowTreatmentList] = useState(false);

    const userId = localStorage.getItem('userId'); // Retrieve patient ID from local storage

    useEffect(() => {
        const fetchPatientData = async () => {
            setLoading(true);
            try {
                if (!userId) {
                    throw new Error('User ID is not defined');
                }
                console.log('Fetching data for user ID:', userId);

                const userResponse = await axios.get(`http://localhost:8085/users/${userId}`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}` // Include token if using JWT
                    }
                });

                console.log('User API Response:', userResponse.data);

                if (userResponse.status === 200) {
                    setPatient(userResponse.data);

                    // Fetch treatments data
                    const treatmentsResponse = await axios.get(`http://localhost:8085/ht/patients/${userId}/treatments`, {
                        headers: {
                            'Authorization': `Bearer ${localStorage.getItem('token')}` // Include token if using JWT
                        }
                    });

                    setTreatments(treatmentsResponse.data);
                    
                    // Find the next treatment date
                    findNextTreatmentDate(treatmentsResponse.data);
                } else {
                    console.error('User not found');
                }
            } catch (error) {
                console.error('There was an error fetching the patient details!', error);
            } finally {
                setLoading(false);
            }
        };

        if (userId) {
            fetchPatientData();
        }
    }, [userId]);

    // Function to find the next treatment date
    const findNextTreatmentDate = (treatments) => {
        const currentDate = new Date();
        const upcomingTreatments = treatments
            .map(treatment => new Date(treatment.treatmentDate))
            .filter(date => date >= currentDate); // Filter upcoming treatment dates

        if (upcomingTreatments.length > 0) {
            const closestDate = new Date(Math.min(...upcomingTreatments)); // Find the closest upcoming date
            setNextTreatmentDate(closestDate.toLocaleDateString());
        } else {
            console.log('No valid upcoming treatment dates available.');
        }
    };

    const handleViewTreatment = (treatmentId) => {
        console.log('Selected Treatment ID:', treatmentId);
        setSelectedTreatmentId(treatmentId === selectedTreatmentId ? null : treatmentId);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!patient) {
        return <div>No patient data found.</div>; 
    }

    return (
        <div className="patient-portal-container">
            <header>
                <h2>Patient Portal</h2>
                {nextTreatmentDate ? (
                    <div className="notification">
                        <p>Next Treatment Date: {nextTreatmentDate}</p>
                    </div>
                ) : (
                    <div className="notification">
                        <p>No upcoming treatment date available.</p>
                    </div>
                )}
            </header>
            <div className="patient-details">
                <p><strong>Name:</strong> {patient.name}</p>
                <p><strong>NIC:</strong> {patient.nic}</p>
                <p><strong>Email:</strong> {patient.email}</p>
            </div>
            <button className="medical-history-button" onClick={() => setShowTreatmentList(!showTreatmentList)}>
                Medical History
            </button>
            {showTreatmentList && (
                <ul className="treatment-list">
                    {treatments.map((treatment) => (
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
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default PatientPortal;
