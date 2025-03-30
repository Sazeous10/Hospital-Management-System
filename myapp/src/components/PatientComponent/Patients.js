import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Patients.css';
import PatientCard from './PatientCard';

const Patients = () => {
    const [patients, setPatients] = useState([]);
    const [newPatient, setNewPatient] = useState({ name: '', age: '', gender: '' });
    const [selectedPatient, setSelectedPatient] = useState(null);
    const [isEditMode, setIsEditMode] = useState(false);

    useEffect(() => {
        axios.get('http://localhost:5000/patients')
            .then(response => setPatients(response.data))
            .catch(error => console.error('Error fetching patients:', error));
    }, []);

    const handleAddPatient = (e) => {
        e.preventDefault();
        axios.post('http://localhost:5000/patients/add', newPatient)
            .then(response => {
                setPatients([...patients, response.data]);
                setNewPatient({ name: '', age: '', gender: '' });
            })
            .catch(error => console.error('Error adding patient:', error));
    };

    const handleUpdatePatient = (id, e) => {
        e.preventDefault();
        axios.post(`http://localhost:5000/patients/update/${id}`, selectedPatient)
            .then(() => {
                setPatients(patients.map(patient => (patient._id === id ? selectedPatient : patient)));
                setSelectedPatient(null);
                setIsEditMode(false);
            })
            .catch(error => console.error('Error updating patient:', error));
    };

    const handleDeletePatient = (id) => {
        axios.delete(`http://localhost:5000/patients/delete/${id}`)
            .then(() => {
                setPatients(patients.filter(patient => patient._id !== id));
            })
            .catch(error => console.error('Error deleting patient:', error));
    };

    const handleEditPatient = (patient) => {
        setSelectedPatient(patient);
        setIsEditMode(true);
    };

    return (
        <div className='container'>
            {/* Left Section: Patient Form */}
            <div className='form-container'>
                <h2>{isEditMode ? 'Edit Patient' : 'Add New Patient'}</h2>
                <form className='patient-form' onSubmit={isEditMode ? (e) => handleUpdatePatient(selectedPatient._id, e) : handleAddPatient}>
                    <label>Name:</label>
                    <input type='text' value={isEditMode ? selectedPatient.name : newPatient.name}
                        onChange={(e) => isEditMode ? setSelectedPatient({ ...selectedPatient, name: e.target.value }) : setNewPatient({ ...newPatient, name: e.target.value })} />

                    <label>Age:</label>
                    <input type='number' value={isEditMode ? selectedPatient.age : newPatient.age}
                        onChange={(e) => isEditMode ? setSelectedPatient({ ...selectedPatient, age: e.target.value }) : setNewPatient({ ...newPatient, age: e.target.value })} />

                    <label>Gender:</label>
                    <select value={isEditMode ? selectedPatient.gender : newPatient.gender}
                        onChange={(e) => isEditMode ? setSelectedPatient({ ...selectedPatient, gender: e.target.value }) : setNewPatient({ ...newPatient, gender: e.target.value })}>
                        <option value=''>Select Gender</option>
                        <option value='Male'>Male</option>
                        <option value='Female'>Female</option>
                        <option value='Other'>Other</option>
                    </select>

                    <button type='submit' className='btn-primary'>{isEditMode ? 'Update Patient' : 'Add Patient'}</button>
                </form>
            </div>

            {/* Right Section: Patients List */}
            <div className='patients-container'>
                <h3>Patients ({patients.length})</h3>
                <div className='patient-list'>
                    {patients.map(patient => (
                        <PatientCard key={patient._id} patient={patient} onEdit={handleEditPatient} onDelete={handleDeletePatient} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Patients;
